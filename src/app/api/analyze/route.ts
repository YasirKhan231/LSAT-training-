import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 10; // Vercel timeout limit

export async function POST(request: Request) {
  try {
    const { caseData, userAnalysis } = await request.json();

    if (!caseData || !userAnalysis) {
      return NextResponse.json(
        { error: "Case data and analysis required" },
        { status: 400 }
      );
    }

    // Shortened prompt with strict formatting
    const prompt = `Provide concise legal feedback in this JSON format:
{
  "score": 0.85,
  "feedback": "Brief paragraph feedback",
  "suggestions": ["Short suggestion"],
  "analysis": {
    "facts": "1-2 sentence summary",
    "issue": "1 sentence",
    "rule": "1 sentence",
    "application": "2 sentences",
    "conclusion": "1 sentence"
  }
}

Case: ${caseData.title.substring(0, 100)}
Facts: ${caseData.facts.substring(0, 300)}
Question: ${caseData.question.substring(0, 150)}

User Analysis: ${userAnalysis.substring(0, 500)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Faster than GPT-4
      messages: [
        { 
          role: "system", 
          content: "Provide very concise legal feedback. Keep all responses extremely brief." 
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 400, // Reduced from 1500
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content || '{}';
    return NextResponse.json(JSON.parse(response), { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { 
        error: "Brief analysis failed",
        score: 0,
        feedback: "Please try a shorter analysis",
        suggestions: ["Keep under 300 words"],
        analysis: {
          facts: "",
          issue: "",
          rule: "",
          application: "",
          conclusion: ""
        }
      },
      { status: 200 }
    );
  }
}