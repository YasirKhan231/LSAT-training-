// app/api/chat/route.js
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key to .env.local
});

export async function POST(req: NextRequest) {
  try {
    // Extract UUID from query parameters
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("uuid");

    // Extract message from request body
    const { message } = await req.json();

    if (!uuid || !message) {
      return NextResponse.json(
        { error: "UUID and message are required" },
        { status: 400 }
      );
    }

    // Get bar exam-related response from ChatGPT
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI coach specializing in bar exam preparation. Provide concise, accurate, and bar exam-related responses. Keep your answers brief and to the point, focusing on legal principles, case law, and exam strategies. Limit your response to 2-3 sentences.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 100, // Set a token limit for the response
    });

    const aiMessage = chatResponse.choices[0].message.content;

    // Send ChatGPT response back to the frontend
    return NextResponse.json({ response: aiMessage }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}