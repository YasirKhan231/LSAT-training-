import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { caseId, hypothetical, userResponse } = await request.json();

    if (!caseId && !hypothetical) {
      return NextResponse.json(
        { error: "Case ID or hypothetical is required" },
        { status: 400 }
      );
    }

    if (!hypothetical) {
      // Generate a hypothetical
      const prompt = `
        Generate a unique legal hypothetical scenario based on the case with ID "${caseId}". Return the hypothetical as a string in valid JSON format:
        {
          "hypothetical": "<generated hypothetical>"
        }
        Ensure the response is valid JSON without markdown.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a legal education expert." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      });

      const responseText = completion.choices[0].message.content;
      const cleanedResponse =
        responseText?.trim().replace(/^```json\s*|\s*```$/g, "") || "{}";
      const data = JSON.parse(cleanedResponse);
      return NextResponse.json(data, { status: 200 });
    }

    // Analyze user response to hypothetical
    const prompt = `
      You are an expert legal educator. Analyze the user's response to the following legal hypothetical and provide feedback in this JSON format:
      {
        "issueSpottingScore": <score from 0 to 1>,
        "issueSpottingFeedback": "<feedback on issue spotting>",
        "reasoningScore": <score from 0 to 1>,
        "reasoningFeedback": "<feedback on reasoning>",
        "precedentScore": <score from 0 to 1>,
        "precedentFeedback": "<feedback on precedent use>",
        "clarityScore": <score from 0 to 1>,
        "clarityFeedback": "<feedback on writing clarity>",
        "suggestions": ["<suggestion 1>", "<suggestion 2>", ...],
        "modelResponse": "<model legal analysis>"
      }

      Hypothetical: ${hypothetical}
      User Response: ${userResponse}

      Ensure your response is valid JSON without markdown code blocks or extra text.
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
    console.error("Error in hypothetical analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
