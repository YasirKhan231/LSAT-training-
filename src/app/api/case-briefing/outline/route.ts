import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert legal educator. Generate a personalized legal outline for user "${userId}" based on their study history and weak areas. For this demo, assume the user struggles with constitutional law and precedent application. Return the outline as a string in valid JSON format:
      {
        "outline": "<detailed legal outline>"
      }
      Ensure the response is valid JSON without markdown code blocks or extra text.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a legal education expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    });

    const responseText = completion.choices[0].message.content;
    const cleanedResponse =
      responseText?.trim().replace(/^```json\s*|\s*```$/g, "") || "{}";
    let data;

    try {
      data = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error(
        "Failed to parse OpenAI response:",
        parseError,
        "Raw:",
        responseText
      );
      return NextResponse.json(
        { error: "Failed to process outline from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in outline generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
