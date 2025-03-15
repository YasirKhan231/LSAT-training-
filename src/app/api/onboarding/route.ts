import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth"; // Firebase Admin Auth

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
    const { examDate, targetScore, studyHours } = data;

    if (!examDate || !targetScore || !studyHours) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Firebase ID token
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Firestore Admin uses `.doc("users/{uid}")` directly
    const userRef = db.collection("users").doc(uid);

    // Update user onboarding data
    await userRef.set(
      {
        lsatDate: examDate,
        targetScore,
        weeklyHours: studyHours,
        onboarded: true,
        progress: {
          logicalReasoning: 0,
          analyticalReasoning: 0,
          readingComprehension: 0,
        },
        practiceHistory: [],
        bookmarkedQuestions: [],
        testAttempts: 0,
        totalTimeSpent: 0,
        performanceInsights: [],
      },
      { merge: true } // 🔥 Ensures we don't overwrite existing data
    );

    return NextResponse.json({
      success: true,
      message: "Your study plan has been created successfully",
      data: { examDate, targetScore, studyHours, completedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json({ error: "Failed to save onboarding data" }, { status: 500 });
  }
}
