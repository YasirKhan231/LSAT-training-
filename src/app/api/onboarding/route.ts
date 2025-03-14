import { NextResponse } from "next/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Initialize Firebase Admin if it hasn't been initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const db = getFirestore()

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.examDate || !data.targetScore || !data.studyHours) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the user ID from the session (you would implement your auth logic here)
    // This is a placeholder - replace with your actual auth implementation
    const userId = "user_123" // Example user ID

    // Save to Firestore
    const userRef = db.collection("users").doc(userId)
    await userRef.set(
      {
        onboarding: {
          examDate: data.examDate,
          targetScore: data.targetScore,
          studyHours: data.studyHours,
          completedAt: new Date().toISOString(),
        },
      },
      { merge: true },
    )

    return NextResponse.json({
      success: true,
      message: "Your study plan has been created successfully",
      data: {
        examDate: data.examDate,
        targetScore: data.targetScore,
        studyHours: data.studyHours,
        completedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error saving onboarding data:", error)
    return NextResponse.json({ error: "Failed to save onboarding data" }, { status: 500 })
  }
}

