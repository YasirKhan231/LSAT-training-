import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Store your API key in .env.local
});

// Define the POST handler
export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Essay content is required" },
        { status: 400 }
      );
    }

    // Define the prompt for OpenAI
    const prompt = `
      You are an expert legal writing tutor. Analyze the following essay written for a bar exam prompt and provide feedback in the following format:
      {
        "structure": <score from 0 to 1>,
        "structureFeedback": "<detailed feedback on essay structure>",
        "legalAnalysis": <score from 0 to 1>,
        "legalAnalysisFeedback": "<detailed feedback on legal reasoning and analysis>",
        "writingQuality": <score from 0 to 1>,
        "writingQualityFeedback": "<detailed feedback on grammar, clarity, and style>",
        "suggestions": ["<suggestion 1>", "<suggestion 2>", ...]
      }

      Essay Prompt: "Analyze the following constitutional law issue: The state of Jefferson has passed a law requiring all social media companies to verify the age of their users and prohibit access to anyone under 18. Discuss the constitutional implications of this law."

      Essay Content: "${content}"
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use a suitable model (e.g., gpt-4o or gpt-3.5-turbo)
      messages: [
        { role: "system", content: "You are a legal writing expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Extract and parse the response
    const responseText = completion.choices[0].message.content;
    let feedback;

    try {
      feedback = JSON.parse(responseText || "{}");
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      return NextResponse.json(
        { error: "Failed to process feedback" },
        { status: 500 }
      );
    }

    // Validate the response structure
    const requiredFields = [
      "structure",
      "structureFeedback",
      "legalAnalysis",
      "legalAnalysisFeedback",
      "writingQuality",
      "writingQualityFeedback",
      "suggestions",
    ];
    const isValid = requiredFields.every(
      (field) => field in feedback && feedback[field] !== undefined
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid feedback format from AI" },
        { status: 500 }
      );
    }

    // Return the feedback to the frontend
    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error in essay analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
