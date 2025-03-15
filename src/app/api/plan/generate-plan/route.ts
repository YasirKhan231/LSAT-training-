import { db } from "@/lib/firebaseAdmin";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    const { 
      lsatDate, 
      currentScore, 
      targetScore, 
      weeklyHours, 
      challengingAreas, 
      specificAreas, 
      preferredSchedule, 
      lsatPreparationMaterial, 
      additionalInformation 
    } = await req.json();

    if (!lsatDate || currentScore === undefined || !targetScore || !weeklyHours || !challengingAreas || !specificAreas || !preferredSchedule || !lsatPreparationMaterial || !additionalInformation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch the existing user document
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Generate study plan
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

    const plan = completion.choices[0].message.content;

    // Update only the missing fields or overwrite existing ones
    const updatedUserData = {
      ...userData, // Keep existing fields
      lsatDate,
      currentScore,
      targetScore,
      weeklyHours,
      challengingAreas,
      specificAreas,
      preferredSchedule,
      lsatPreparationMaterial,
      additionalInformation,
      plan,
      updatedAt: new Date().toISOString(),
    };

    // Save updated user data
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
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

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
