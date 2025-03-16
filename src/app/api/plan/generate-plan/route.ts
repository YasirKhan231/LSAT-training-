import { db } from "@/lib/firebaseAdmin";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

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

    // Generate study plan if missing
    let plan = userData.plan || "";
    if (!plan) {
      const planPrompt = `
        Create a detailed LSAT study plan for a student who currently has a score of ${currentScore} and wants to achieve a target score of ${targetScore}.
        They are studying ${weeklyHours} hours per week, focusing on ${challengingAreas.join(", ")}.
        Their preferred schedule is ${preferredSchedule}, and they are using ${lsatPreparationMaterial} as preparation material.
        Additional information: ${additionalInformation}
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: planPrompt }],
        max_tokens: 1000,
      });

      plan = completion.choices[0].message.content;
    }

    // Merge existing data with the new updates
    const updatedUserData = {
      ...userData, // Preserve existing fields
      lsatDate: lsatDate || userData.lsatDate,
      currentScore: currentScore ?? userData.currentScore,
      targetScore: targetScore || userData.targetScore,
      weeklyHours: weeklyHours || userData.weeklyHours,
      challengingAreas: challengingAreas || userData.challengingAreas,
      specificAreas: specificAreas || userData.specificAreas,
      preferredSchedule: preferredSchedule || userData.preferredSchedule,
      lsatPreparationMaterial: lsatPreparationMaterial || userData.lsatPreparationMaterial,
      additionalInformation: additionalInformation || userData.additionalInformation,
      plan, // Always update the plan if generated
      updatedAt: new Date().toISOString(),
    };

    // Save the updated user data
    await userRef.set(updatedUserData, { merge: true });

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

    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    return NextResponse.json(userDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
