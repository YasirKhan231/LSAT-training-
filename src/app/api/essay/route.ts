import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Essay content is required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert legal writing tutor analyzing a bar exam essay. Provide feedback in the following EXACT JSON format:
      {
        "structure": <number between 0 and 1>,
        "structureFeedback": "<feedback>",
        "legalAnalysis": <number between 0 and 1>,
        "legalAnalysisFeedback": "<feedback>",
        "writingQuality": <number between 0 and 1>,
        "writingQualityFeedback": "<feedback>",
        "suggestions": ["<suggestion1>", "<suggestion2>"]
      }

      IMPORTANT: 
      - Return ONLY the JSON object, no additional text
      - Do not wrap the response in markdown code blocks
      - Ensure all fields are included
      - Keep all feedback text within the JSON structure

      Essay Prompt: "Analyze the constitutional implications of a law requiring social media age verification."
      Essay Content: "${content}"
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-4-turbo" if available
      messages: [
        { 
          role: "system", 
          content: "You are a legal writing expert. You must respond with ONLY a valid JSON object containing the requested feedback fields, without any additional commentary or markdown formatting." 
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    let feedback;

    try {
      // Clean the response by removing any markdown code blocks if they exist
      const cleanedResponse = responseText?.replace(/```json|```/g, '').trim() || '{}';
      feedback = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError, "Response:", responseText);
      return NextResponse.json(
        { error: "Failed to process feedback. Please try again." },
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
        { error: "Invalid feedback format received from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error in essay analysis:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}