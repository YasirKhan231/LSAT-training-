import { db } from "@/lib/firebaseAdmin";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

import { studyPlans, StudyPlanKey } from "@/data/plan"; // Import prebuilt study plans

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    uuid = uuid.trim(); // Remove any newline or extra spaces
    console.log("Processed UUID:", uuid);

    // Reference the user document in Firestore
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() || {}; // Ensure userData is not undefined

    // Extract fields from the request body
    const {
      lsatDate,
      currentScore,
      targetScore,
      weeklyHours,
      challengingAreas,
      specificAreas,
      preferredSchedule,
      lsatPreparationMaterial,
      additionalInformation,
    } = await req.json();

    // Validate required fields
    if (
      !lsatDate ||
      !currentScore ||
      !targetScore ||
      !weeklyHours ||
      !challengingAreas ||
      !specificAreas ||
      !preferredSchedule ||
      !lsatPreparationMaterial ||
      !additionalInformation
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Determine the plan key based on the current score
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

    // Get the prebuilt study plan based on the plan key
    const plan = studyPlans[planKey];

    // Merge existing data with the new updates
    const updatedUserData = {
      ...userData, // Preserve existing fields
      lsatTestDate: lsatDate || userData.lsatDate,
      currentScore: currentScore ?? userData.currentScore,
      targetScore: targetScore || userData.targetScore,
      weeklyHours: weeklyHours || userData.weeklyHours,
      challengingAreas: challengingAreas || userData.challengingAreas,
      specificAreas: specificAreas || userData.specificAreas,
      preferredSchedule: preferredSchedule || userData.preferredSchedule,
      lsatPreparationMaterial: lsatPreparationMaterial || userData.lsatPreparationMaterial,
      additionalInformation: additionalInformation || userData.additionalInformation,
      plan, // Store the prebuilt plan
      updatedAt: new Date().toISOString(), // Update the timestamp
    };

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


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    uuid = uuid.trim(); // Remove any newline or extra spaces

    // Fetch user data
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}