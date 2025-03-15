import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  console.log("Received UID:", uid); // Log the UID

  if (!uid) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch user data from Firestore
    const userRef = db.collection("users").doc(uid);
console.log("Firestore Path:", userRef.path);
    const userDoc = await userRef.get();
    console.log("User Document Exists:", userDoc.exists); // Log if the document exists

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    console.log("User Data:", userData); // Log the user data

    // Handle the current Firestore structure
    const onboarding = userData?.onboarding;
    if (
      !onboarding ||
      !onboarding.examDate ||
      !onboarding.targetScore ||
      !onboarding.studyHours
    ) {
      return NextResponse.json(
        { error: "User data is incomplete" },
        { status: 400 }
      );
    }

    // Parse the fields if necessary
    const examDate = onboarding.examDate; // Already a string
    const targetScore = parseInt(onboarding.targetScore, 10); // Convert to number
    const studyHours = onboarding.studyHours; // Already a string

    if (isNaN(targetScore)) {
      return NextResponse.json(
        { error: "Invalid target score" },
        { status: 400 }
      );
    }

    // Generate study plan using OpenAI
    const prompt = `Create a 7-day LSAT study plan for a student preparing for LSAT on ${examDate}. Their target score is ${targetScore}, and they can study ${studyHours} hours per week. Provide the plan in a structured JSON format with daily tasks, including practice questions, review sessions, and full-length tests.`;

    console.log("Sending Prompt to OpenAI:", prompt); // Log the prompt

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    console.log("OpenAI Response:", response); // Log the OpenAI response

    const studyPlan = response.choices[0].message.content;
    if (!studyPlan) {
      throw new Error("Failed to generate study plan: No content from OpenAI");
    }

    // Parse the study plan
    const parsedStudyPlan = JSON.parse(studyPlan);
    console.log("Parsed Study Plan:", parsedStudyPlan); // Log the parsed study plan

    // Save the study plan to Firestore under the user's document
    await userRef.update({ studyPlan: parsedStudyPlan });

    // Return the study plan to the frontend
    return NextResponse.json({ studyPlan: parsedStudyPlan }, { status: 200 });
  } catch (error) {
    console.error("Error generating study plan:", error);
    return NextResponse.json(
      { error: "Failed to generate study plan" },
      { status: 500 }
    );
  }
}