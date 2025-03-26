import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 10 // Vercel timeout limit

export async function POST(request: Request) {
  try {
    const { caseScenario, userArgument, side } = await request.json()

    if (!caseScenario || !userArgument || !side) {
      return NextResponse.json(
        { error: "Case scenario, argument, and side (plaintiff/defendant) required" },
        { status: 400 },
      )
    }

    const prompt = `Provide moot court feedback in this JSON format:
{
  "persuasiveness": 0.85,
  "legalReasoning": 0.80,
  "caseUsage": 0.75,
  "delivery": 0.70,
  "overallFeedback": "Brief paragraph on overall performance",
  "strengthPoints": ["Strong point 1", "Strong point 2"],
  "improvementAreas": ["Area to improve 1", "Area to improve 2"],
  "counterArguments": ["Potential counter 1", "Potential counter 2"],
  "benchQuestions": ["Question a judge might ask 1", "Question 2"]
}

Case Scenario: ${caseScenario.substring(0, 200)}
Side: ${side} (Plaintiff/Defendant/Appellant/Respondent)
User Argument: ${userArgument.substring(0, 500)}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a law professor evaluating moot court performances. Provide constructive feedback.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 400,
      temperature: 0.7,
      response_format: { type: "json_object" },
    })

    const response = completion.choices[0]?.message?.content || "{}"
    return NextResponse.json(JSON.parse(response), { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      {
        error: "Moot court analysis failed",
        persuasiveness: 0,
        legalReasoning: 0,
        caseUsage: 0,
        delivery: 0,
        overallFeedback: "Please try again with a more focused argument",
        strengthPoints: [],
        improvementAreas: [],
        counterArguments: [],
        benchQuestions: [],
      },
      { status: 200 },
    )
  }
}

