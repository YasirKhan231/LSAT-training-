import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { studyPlans, StudyPlanKey } from "@/data/plan"; // Import StudyPlanKey

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export async function POST(request: Request) {
  try {
    // Extract UUID from query parameters
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json(
        { error: "UUID is required in query parameters" },
        { status: 400 }
      );
    }
    console.log("processoed uui" , uuid)

    const data = await request.json();

    // Extract required fields
    const {
      examDate,
      targetScore,
      studyHours,
      currentScore,
      challengingAreas,
      focusAreas,
      additionalInfo,
      lsatPreparationMaterial,
    } = data;

    if (
      !examDate ||
      !targetScore ||
      !studyHours ||
      !currentScore ||
      !challengingAreas ||
      !focusAreas ||
      !additionalInfo ||
      !lsatPreparationMaterial
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine study plan based on currentScore
    let planKey: StudyPlanKey = "terrible";
    if (currentScore >= 170) {
      planKey = "amazing";
    } else if (currentScore >= 160) {
      planKey = "good";
    } else if (currentScore >= 150) {
      planKey = "decent";
    } else if (currentScore >= 140) {
      planKey = "bad";
    }

    // Get predefined study plan
    const studyPlan = studyPlans[planKey];
    console.log("Study Plan:", studyPlan); // Log the study plan

    // Firestore reference for the user
    const userRef = db.collection("users").doc(uuid);

    // Update user onboarding data
    console.log("Updating user document in Firestore...");
    await userRef.set(
      {
        lsatTestDate: examDate,
        targetScore,
        currentScore,
        weeklyHours: studyHours,
        onboarded: true,
        updatedAt: new Date().toISOString(),
        progress: {
          logicalReasoning: 0,
          analyticalReasoning: 0,
          readingComprehension: 0,
          totalTimeSpent: 0,
          testAttempts: 0,
          lastUpdated: null,
        },
        performanceInsights: [],
        StudyStreak: 1,
        PracticeQuestions: 0,
        practiceHistory: [],
        bookmarkedQuestions: [],
        simulatedExams: [],
        logicGames: [],
        specificAreas: focusAreas,
        challengingAreas: challengingAreas,
        additionalInformation: additionalInfo,
        lsatPreparationMaterial,
        payments: [],
      },
      { merge: true } // Use merge to avoid overwriting existing fields
    );
    console.log("User document updated successfully.");

    return NextResponse.json({
      success: true,
      message: "Your study plan has been created successfully",
      data: {
        examDate,
        targetScore,
        currentScore,
        studyHours,
        challengingAreas,
        focusAreas,
        additionalInfo,
        lsatPreparationMaterial,
        studyPlan,
        completedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding data", details: error },
      { status: 500 }
    );
  }
}