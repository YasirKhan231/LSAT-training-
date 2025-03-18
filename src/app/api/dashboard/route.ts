import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Ensure you have Firebase initialized and exported in your lib/firebase file

export async function GET(req: NextRequest) {
  try {
    // Extract UUID from query parameters
    const { searchParams } = new URL(req.url);
    let uuid = searchParams.get("uuid");

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    uuid = uuid.trim(); // Remove any extra spaces or newlines

    // Fetch user data from Firestore
    const userRef = db.collection("users").doc(uuid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Return the user data as a JSON response
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}