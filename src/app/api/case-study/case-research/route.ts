import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 10 // Vercel timeout limit

export async function POST(request: Request) {
  try {
    const { researchQuery, userSources } = await request.json()

    if (!researchQuery || !userSources) {
      return NextResponse.json({ error: "Research query and sources required" }, { status: 400 })
    }

    const prompt = `Provide legal research feedback in this JSON format:
{
  "score": 0.85,
  "feedback": "Brief paragraph feedback on research quality",
  "sourcesAnalysis": "Analysis of the sources provided",
  "missingPrecedents": ["Case or statute that should have been included"],
  "suggestedResearch": "Suggestions for further research",
  "modelSources": ["Relevant case 1", "Relevant statute 1"]
}

Research Query: ${researchQuery.substring(0, 200)}
User Sources: ${userSources.substring(0, 500)}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal research expert. Provide concise feedback on legal research.",
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
        error: "Research analysis failed",
        score: 0,
        feedback: "Please try again with more specific sources",
        sourcesAnalysis: "",
        missingPrecedents: [],
        suggestedResearch: "",
        modelSources: [],
      },
      { status: 200 },
    )
  }
}

