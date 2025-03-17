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
      lsatPreparationMaterial, // Add this field
    } = data;

    if (
      !examDate ||
      !targetScore ||
      !studyHours ||
      !currentScore ||
      !challengingAreas ||
      !focusAreas ||
      !additionalInfo ||
      !lsatPreparationMaterial // Ensure this field is required
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Firebase ID token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing token" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

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
    console.log(studyPlan)

    // Firestore references
    const userRef = db.collection("users").doc(uid);
    const planRef = db.collection("plans").doc(uid);

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
        lsatPreparationMaterial, // Add this field
        payments: [],
      },
      { merge: true } // Use merge to avoid overwriting existing fields
    );
    console.log("User document updated successfully.");

    // Create or update the plan document in the `plans` collection
    console.log("Creating or updating plan document in Firestore...");
    await planRef.set({
      userId: uid,
      planKey,
      studyPlan,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log("Plan document created or updated successfully.");

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
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }
}