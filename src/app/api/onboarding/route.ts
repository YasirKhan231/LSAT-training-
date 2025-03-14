import { NextResponse, NextRequest } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getToken } from "next-auth/jwt"; // Use getToken for server-side authentication

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
  }
}

const db = getFirestore();

export async function POST(request: NextRequest) {
  console.log("POST request received.");

  try {
    const data = await request.json();
    console.log("Request data received:", data);

    // Validate required fields
    if (!data.examDate || !data.targetScore || !data.studyHours) {
      console.error("Missing required fields:", data);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the token to retrieve the user ID
    const token = await getToken({ req: request });
    console.log("Token retrieved:", token);

    // Check if the user is authenticated
    if (!token || !token.sub) {
      console.error("Unauthorized: User not authenticated or token missing 'sub'.");
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    // Get the user ID from the token
    const userId = token.sub;
    console.log("User ID from token:", userId);

    // Save to Firestore in the "onboarding-data" collection
    const onboardingRef = db.collection("onboarding-data").doc(userId);
    console.log("Firestore reference created for user:", userId);

    const onboardingData = {
      onboarding: {
        examDate: data.examDate,
        targetScore: data.targetScore,
        studyHours: data.studyHours,
        completedAt: new Date().toISOString(),
      },
    };

    console.log("Data to be saved to Firestore:", onboardingData);

    await onboardingRef.set(onboardingData, { merge: true });
    console.log("Data successfully saved to Firestore.");

    return NextResponse.json({
      success: true,
      message: "Your study plan has been created successfully",
      data: onboardingData.onboarding,
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json(
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }
}