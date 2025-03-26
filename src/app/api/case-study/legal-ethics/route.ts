import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 10 // Vercel timeout limit

export async function POST(request: Request) {
  try {
    const { scenario, userResponse, jurisdiction } = await request.json()

    if (!scenario || !userResponse) {
      return NextResponse.json({ error: "Ethical scenario and response required" }, { status: 400 })
    }

    const prompt = `Provide legal ethics feedback in this JSON format:
{
  "ethicalAnalysis": 0.85,
  "ruleIdentification": 0.80,
  "conflictResolution": 0.75,
  "professionalJudgment": 0.70,
  "overallFeedback": "Brief paragraph on ethical reasoning",
  "relevantRules": ["Model Rule 1.6", "Model Rule 1.7"],
  "ethicalConsiderations": ["Consideration 1", "Consideration 2"],
  "alternativeApproaches": ["Alternative 1", "Alternative 2"],
  "potentialConsequences": ["Consequence 1", "Consequence 2"],
  "modelResponse": "Brief example of a well-reasoned ethical response"
}

Ethical Scenario: ${scenario.substring(0, 300)}
Jurisdiction: ${jurisdiction || "Model Rules of Professional Conduct"}
User Response: ${userResponse.substring(0, 500)}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal ethics professor. Provide constructive feedback on ethical reasoning.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
      response_format: { type: "json_object" },
    })

    const response = completion.choices[0]?.message?.content || "{}"
    return NextResponse.json(JSON.parse(response), { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      {
        error: "Ethics analysis failed",
        ethicalAnalysis: 0,
        ruleIdentification: 0,
        conflictResolution: 0,
        professionalJudgment: 0,
        overallFeedback: "Please try again with a more detailed response",
        relevantRules: [],
        ethicalConsiderations: [],
        alternativeApproaches: [],
        potentialConsequences: [],
        modelResponse: "",
      },
      { status: 200 },
    )
  }
}

