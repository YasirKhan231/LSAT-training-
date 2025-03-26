import { NextResponse } from "next/server";
import { analyzeUserBrief } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { userBrief, caseData } = await req.json();

    const analysis = await analyzeUserBrief(userBrief, caseData);

    return NextResponse.json({ feedback: analysis });
  } catch (error) {
    console.error("Error analyzing brief:", error);
    return NextResponse.json(
      { error: "Failed to analyze brief" },
      { status: 500 }
    );
  }
}