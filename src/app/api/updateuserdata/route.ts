import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Firebase Admin SDK instance

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      console.error("Error: UUID is missing from request");
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    // Reference the user document in Firestore
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error(`Error: User not found for UUID: ${uuid}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract fields from the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("Error parsing JSON request body:", error);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const {
      examResultFinal, // Changed from examResult to examResultFinal
      barExamTestDate,
      currentScore,
      targetScore
    } = requestBody;

    // Validate required fields
    if (!barExamTestDate || !currentScore || !targetScore) {
      console.error("Error: Missing required fields in request", {
        barExamTestDate,
        currentScore,
        targetScore
      });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate score ranges (260-400)
    if (parseInt(currentScore) < 260 || parseInt(currentScore) > 400 ||
        parseInt(targetScore) < 260 || parseInt(targetScore) > 400) {
      return NextResponse.json(
        { error: "Scores must be between 260 and 400" },
        { status: 400 }
      );
    }

    // Validate target >= current
    if (parseInt(targetScore) < parseInt(currentScore)) {
      return NextResponse.json(
        { error: "Target score must be greater than or equal to current score" },
        { status: 400 }
      );
    }

    // Prepare exam result final data
    let examResultFinalData = null;
    if (examResultFinal === "pass" || examResultFinal === "fail") {
      examResultFinalData = {
        passed: examResultFinal === "pass",
      };
    } else if (examResultFinal === "prefer-not") {
      examResultFinalData = {
        passed: null,
      };
    }
 
    // Prepare update data
    const updateData: any = {
      barExamTestDate,
      currentScore,
      targetScore,
      updatedAt: new Date().toISOString()
    };

    // Only add examResultFinal if it was provided
    if (examResultFinalData !== null) {
      updateData.examResultFinal = examResultFinalData;
    }

    // Update the user document
    try {
      await userRef.set(updateData, { merge: true });
      console.log("Exam information updated successfully");
      
      // Return the updated user data
      const updatedDoc = await userRef.get();
      return NextResponse.json(updatedDoc.data(), { status: 200 });
    } catch (error) {
      console.error("Failed to update Firestore document:", error);
      return NextResponse.json(
        { error: "Failed to update user data" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating exam information:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}