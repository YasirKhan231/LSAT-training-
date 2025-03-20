import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Firebase Admin SDK instance
import { examStrengthsAndImprovements } from "@/lib/examStrengthsAndImprovements"; // Import hardcoded data

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let uuid = searchParams.get("uuid");

    // Validate UUID
    if (!uuid) {
      console.error("Error: UUID is missing from request");
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    uuid = uuid.trim(); // Remove any extra spaces or newlines
    console.log("Processed UUID:", uuid);

    // Reference the user document in Firestore
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    // Check if the user exists
    if (!userDoc.exists) {
      console.error(`Error: User not found for UUID: ${uuid}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() || {}; // Ensure userData is not undefined

    // Parse the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("Error parsing JSON request body:", error);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    // Extract fields from the request body
    const {
      examId,
      totalQuestions,
      correctAnswers,
      totalTimeMinutes,
    } = requestBody;

    // Validate required fields
    if (
      !examId ||
      !totalQuestions ||
      correctAnswers === undefined ||
      totalTimeMinutes === undefined
    ) {
      console.error("Error: Missing required fields in request", {
        examId,
        totalQuestions,
        correctAnswers,
        totalTimeMinutes,
      });

      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Validated request data successfully.");

    // Calculate BAR Score (4 marks per correct answer)
    const barScore = correctAnswers * 4;

    // Calculate Percentile (example: simple formula for demonstration)
    const percentile = Math.round((correctAnswers / totalQuestions) * 100);

    // Calculate Time Management (average time per question in seconds)
    const totalTimeSeconds = totalTimeMinutes * 60;
    const averageTimePerQuestion = totalTimeSeconds / totalQuestions;

    // Calculate Performance Summary
    const incorrectAnswers = totalQuestions - correctAnswers;
    const skippedAnswers = 0; // Assuming no skipped answers for now

    // Get strengths and areas for improvement based on examId
    const strengthsAndImprovements = examStrengthsAndImprovements[examId] || {
      strengths: [],
      areasForImprovement: [],
    };

    // Prepare the exam result object
    const examResult = {
      examId,
      barScore,
      percentile,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      skippedAnswers,
      totalTimeMinutes,
      averageTimePerQuestion,
      strengths: strengthsAndImprovements.strengths,
      areasForImprovement: strengthsAndImprovements.areasForImprovement,
      timestamp: new Date().toISOString(), // Current timestamp
    };

    // Update study streak logic
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const lastStudyDate = userData.lastStudyDate || ""; // Get the last study date from the user's document
    let studyStreak = userData.studyStreak || 0; // Get the current study streak

    if (lastStudyDate !== today) {
      // If the user hasn't studied today, increment the streak
      studyStreak += 1;
    }

    // Calculate total marks
    const totalMarks = totalQuestions * 4;

    // Update the user's document with the new exam result, study streak, and total marks
    await userRef.update({
      examResult, // Store the new exam result, replacing the old one
      studyStreak,
      lastStudyDate: today, // Update the last study date
      totalMarks, // Store total marks
    });

    // Return success response
    return NextResponse.json(
      { message: "Exam results saved successfully", examResult, studyStreak, totalMarks },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving exam results:", error);
    return NextResponse.json(
      { error: "Failed to save exam results" },
      { status: 500 }
    );
  }
}