import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { caseData, userAnalysis } = await request.json();

    if (!caseData || !userAnalysis) {
      return NextResponse.json(
        { error: "Case data and user analysis are required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert legal educator. Analyze the following user-submitted legal analysis against the hypothetical case data and provide detailed feedback in this JSON format:
      {
        "analysisScore": <score from 0 to 1>,
        "analysisFeedback": "<feedback on the analysis>",
        "suggestions": ["<suggestion 1>", "<suggestion 2>", ...],
        "modelAnalysis": {
          "facts": "<model facts analysis>",
          "issue": "<model issue analysis>",
          "rule": "<model rule analysis>",
          "application": "<model application analysis>",
          "conclusion": "<model conclusion analysis>"
        }
      }

      Hypothetical Case Data:
      - Title: ${caseData.title}
      - Facts: ${caseData.facts}
      - Issue: ${caseData.question}

      User Analysis:
      ${userAnalysis}

      Ensure your response is valid JSON without markdown code blocks or extra text.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a legal education expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    const cleanedResponse =
      responseText?.trim().replace(/^```json\s*|\s*```$/g, "") || "{}";
    let feedback;

    try {
      feedback = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error(
        "Failed to parse OpenAI response:",
        parseError,
        "Raw:",
        responseText
      );
      return NextResponse.json(
        { error: "Failed to process feedback from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error in legal analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}