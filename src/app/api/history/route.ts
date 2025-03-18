import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Firebase Admin SDK instance

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let uuid = searchParams.get("uuid");

    if (!uuid) {
      console.error("Error: UUID is missing from request");
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    uuid = uuid.trim(); // Remove any newline or extra spaces
    console.log("Processed UUID:", uuid);

    // Reference the user document in Firestore
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error(`Error: User not found for UUID: ${uuid}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() || {}; // Ensure userData is not undefined

    // Extract fields from the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("Error parsing JSON request body:", error);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    // console.log("Received request body:", requestBody);

    const {
      sessionId,
      timestamp,
      section,
      questionIds,
      responses,
      score,
      totalQuestions,
      timeTaken,
      bookmarkedQuestionIds,
    } = requestBody;

    // Validate required fields
    if (
      !sessionId ||
      !timestamp ||
      !section ||
      !questionIds ||
      !responses ||
      score === undefined || // Allow score = 0
      !totalQuestions ||
      timeTaken === undefined
    ) {
      console.error("Error: Missing required fields in request", {
        sessionId,
        timestamp,
        section,
        questionIds,
        responses,
        score,
        totalQuestions,
        timeTaken,
      });

      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Validated request data successfully.");

    // Create a new practice session object
    const newPracticeSession = {
      sessionId,
      timestamp,
      section,
      questionIds,
      responses,
      score,
      totalQuestions,
      timeTaken,
    };

    // Get the current practiceHistory array
    const currentPracticeHistory = userData.practiceHistory || [];

    // Ensure only 3 sessions are stored, one for each section
    const updatedPracticeHistory = currentPracticeHistory.filter(
      (session: any) => session.section !== section // Remove existing session for the same section
    );

    // Add the new session
    updatedPracticeHistory.push(newPracticeSession);

    // If there are more than 3 sessions, remove the oldest one
    if (updatedPracticeHistory.length > 3) {
      updatedPracticeHistory.shift(); // Remove the oldest session
    }

    // console.log("Updated practice history:", updatedPracticeHistory);

    // Update the bookmarkedQuestions array
    const updatedBookmarkedQuestions = [
      ...new Set([...(userData.bookmarkedQuestions || []), ...bookmarkedQuestionIds]),
    ];

    // console.log("Updated bookmarked questions:", updatedBookmarkedQuestions);

    // Update the progress map
    const updatedProgress = {
      ...userData.progress,
      analyticalReasoning: (userData.progress?.analyticalReasoning || 0) + (section === "analytical-reasoning" ? 1 : 0),
      logicalReasoning: (userData.progress?.logicalReasoning || 0) + (section === "logical-reasoning" ? 1 : 0),
      readingComprehension: (userData.progress?.readingComprehension || 0) + (section === "reading-comprehension" ? 1 : 0),
      testAttempts: (userData.progress?.testAttempts || 0) + 1,
      totalTimeSpent: (userData.progress?.totalTimeSpent || 0) + timeTaken,
    };

    // console.log("Updated progress data:", updatedProgress);

    // Update the PracticeQuestions count
    const currentPracticeQuestions = userData.PracticeQuestions || 0;
    const updatedPracticeQuestions = currentPracticeQuestions + totalQuestions;

    console.log("Updated PracticeQuestions count:", updatedPracticeQuestions);

    // Update the StudyStreak
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const lastStudyDate = userData.lastStudyDate || currentDate; // Default to current date if not set
    let StudyStreak = userData.StudyStreak || 0;

    if (lastStudyDate === currentDate) {
      // Request is on the same day, do not increment streak
      console.log("Request is on the same day. StudyStreak remains unchanged.");
    } else {
      const lastStudyDateObj = new Date(lastStudyDate);
      const currentDateObj = new Date(currentDate);
      const timeDifference = currentDateObj.getTime() - lastStudyDateObj.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference === 1) {
        // Request is on the next day, increment streak by 1
        StudyStreak += 1;
        console.log("Request is on the next day. StudyStreak incremented to:", StudyStreak);
      } else {
        // Request is after a gap of more than one day, reset streak to 1
        StudyStreak = 1;
        console.log("Request is after a gap. StudyStreak reset to:", StudyStreak);
      }
    }

    // Merge existing data with the new updates
    const updatedUserData = {
      ...userData, // Preserve existing fields
      practiceHistory: updatedPracticeHistory,
      bookmarkedQuestions: updatedBookmarkedQuestions,
      progress: updatedProgress,
      PracticeQuestions: updatedPracticeQuestions, // Update the PracticeQuestions count
      StudyStreak, // Update the StudyStreak
      lastStudyDate: currentDate, // Update the last study date
      updatedAt: new Date().toISOString(), // Update the timestamp
    };

    // console.log("Final updated user data:", updatedUserData);

    // Save the updated user data
    try {
      await userRef.set(updatedUserData, { merge: true });
      console.log("Firestore document updated successfully.");
    } catch (error) {
      console.error("Failed to update Firestore document:", error);
      return NextResponse.json({ error: "Failed to update Firestore document" }, { status: 500 });
    }

    return NextResponse.json(updatedUserData, { status: 200 });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ error: "Failed to update user data" }, { status: 500 });
  }
}