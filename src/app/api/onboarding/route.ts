import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
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
    console.log("Processed UUID:", uuid);

    const data = await request.json();

    // Extract required fields
    const {
      barExamTestDate,
      targetScore,
      studyHours,
      currentScore,
      challengingAreas,
      focusAreas,
      additionalInfo,
      barExamPreparationMaterial,
    } = data;

    if (
      !barExamTestDate ||
      !targetScore ||
      !studyHours ||
      !currentScore ||
      !challengingAreas ||
      !focusAreas ||
      !additionalInfo ||
      !barExamPreparationMaterial
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine study plan based on currentScore
    let planKey: StudyPlanKey = "terrible";
    if (currentScore >= 360) {
      planKey = "amazing";
    } else if (currentScore >= 320) {
      planKey = "good";
    } else if (currentScore >= 280) {
      planKey = "decent";
    } else if (currentScore >= 240) {
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
        barExamTestDate,
        targetScore,
        currentScore,
        weeklyHours: studyHours,
        onboarded: true,
        updatedAt: new Date().toISOString(),
        progress: {
          constitutionalLaw: 0, // Changed from logicalReasoning to constitutionalLaw
          contracts: 0, // Changed from analyticalReasoning to contracts
          criminalLaw: 0, // Changed from readingComprehension to criminalLaw
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
        essays: [], // Changed from logicGames to essays
        specificAreas: focusAreas,
        challengingAreas: challengingAreas,
        additionalInformation: additionalInfo,
        barExamPreparationMaterial,
        payments: [],
        questionDataKey: planKey, // Set questionDataKey based on the study plan
      },
      { merge: true } // Use merge to avoid overwriting existing fields
    );
    console.log("User document updated successfully.");

    return NextResponse.json({
      success: true,
      message: "Your study plan has been created successfully",
      data: {
        barExamTestDate,
        targetScore,
        currentScore,
        studyHours,
        challengingAreas,
        focusAreas,
        additionalInfo,
        barExamPreparationMaterial,
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