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

    // Convert existing plan from string to JSON (if it exists and is a string)
    let plan = userData.plan || [];
    if (typeof plan === "string") {
      try {
        plan = JSON.parse(plan); // Convert string to JSON
      } catch (error) {
        console.error("Failed to parse existing plan as JSON:", error);
        plan = []; // Fallback to an empty array if parsing fails
      }
    }

    // If no plan exists, generate a new one
    if (!plan || plan.length === 0) {
      const planPrompt = `
      Create a comprehensive LSAT study plan for a student who currently has a score of ${currentScore} and wants to achieve a target score of ${targetScore}.
      They are studying ${weeklyHours} hours per week, focusing on ${challengingAreas.join(", ")}.
      Their preferred schedule is ${preferredSchedule}, and they are using ${lsatPreparationMaterial} as preparation material.
      Additional information: ${additionalInformation}.

      Format the response as a JSON array of objects. Each object should represent a day and include:
      - "date": The date in YYYY-MM-DD format.
      - "day": The day of the week.
      - "tasks": An array of study sessions, where each session includes:
        - "subject": The section being studied (e.g., Logical Reasoning, Reading Comprehension).
        - "topic": The specific focus of the session.
        - "duration": Duration in minutes.
        - "description": A detailed description of the session.
        - "status": The status of the session (default to "pending").
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: planPrompt }],
        max_tokens: 3000,
      });

      console.log("OpenAI Response:", completion.choices[0].message.content); // Log the response

      // Parse the response as JSON
      try {
        const content = completion.choices[0].message.content;
        if (typeof content === "string") {
          plan = JSON.parse(content); // Ensure the plan is in JSON format
        } else {
          console.error("OpenAI response content is null or not a string.");
          return NextResponse.json({ error: "Failed to generate a valid study plan" }, { status: 500 });
        }
      } catch (error) {
        console.error("Failed to parse the study plan as JSON:", error);
        return NextResponse.json({ error: "Failed to generate a valid study plan" }, { status: 500 });
      }
    }

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
      plan, // Store the plan in JSON format
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