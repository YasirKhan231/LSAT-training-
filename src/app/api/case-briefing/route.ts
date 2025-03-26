import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { caseData, userBrief } = await request.json();

    if (!caseData || !userBrief) {
      return NextResponse.json(
        { error: "Case data and user brief are required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert legal educator. Analyze the following user-submitted case brief against the actual case data and provide detailed feedback in this JSON format:
      {
        "factsScore": <score from 0 to 1>,
        "factsFeedback": "<feedback on facts>",
        "issueScore": <score from 0 to 1>,
        "issueFeedback": "<feedback on issue>",
        "ruleScore": <score from 0 to 1>,
        "ruleFeedback": "<feedback on rule>",
        "applicationScore": <score from 0 to 1>,
        "applicationFeedback": "<feedback on application>",
        "conclusionScore": <score from 0 to 1>,
        "conclusionFeedback": "<feedback on conclusion>",
        "suggestions": ["<suggestion 1>", "<suggestion 2>", ...],
        "modelBrief": {
          "facts": "<model facts>",
          "issue": "<model issue>",
          "rule": "<model rule>",
          "application": "<model application>",
          "conclusion": "<model conclusion>"
        }
      }

      Case Data:
      - Title: ${caseData.title}
      - Facts: ${caseData.facts}
      - Issue: ${caseData.issue}
      - Holding: ${caseData.holding}
      - Reasoning: ${caseData.reasoning}

      User Brief:
      - Facts: ${userBrief.facts}
      - Issue: ${userBrief.issue}
      - Rule: ${userBrief.rule}
      - Application: ${userBrief.application}
      - Conclusion: ${userBrief.conclusion}

      Ensure your response is valid JSON without markdown code blocks or extra text.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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
    console.error("Error in case briefing analysis:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
