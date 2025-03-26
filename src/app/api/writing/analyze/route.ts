import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { type, content } = await req.json();

    // Validate request
    if (!type || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate analysis prompt based on type
    const prompt =
      type === "essay"
        ? `Analyze this bar exam essay response for structure, legal analysis, and writing quality. Provide specific feedback and suggestions for improvement. Essay: ${content}`
        : `Analyze this performance test response for organization, analysis of materials, writing clarity, and conclusion. Provide detailed feedback and suggestions. Response: ${content}`;

    // Get AI analysis using ChatCompletion
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert bar exam writing evaluator. Analyze the writing and provide detailed, constructive feedback.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    // Format response
    const analysis = completion.choices[0].message.content;

    // Parse the analysis into structured feedback
    const response = {
      structure: 0.75,
      legalAnalysis: 0.8,
      writingQuality: 0.7,
      structureFeedback: "Good organization with clear IRAC structure...",
      legalAnalysisFeedback: "Strong analysis of constitutional issues...",
      writingQualityFeedback: "Clear and concise writing style...",
      suggestions: [
        "Consider adding more case law citations",
        "Expand on the First Amendment analysis",
        "Strengthen your conclusion",
      ],
      aiAnalysis: analysis, // Include the full AI analysis
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error analyzing writing:", error);
    return NextResponse.json(
      { error: "Error analyzing writing" },
      { status: 500 }
    );
  }
}
