import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const maxDuration = 10 // Vercel timeout limit

export async function POST(request: Request) {
  try {
    const { documentType, userWriting, assignment } = await request.json()

    if (!documentType || !userWriting || !assignment) {
      return NextResponse.json(
        { error: "Document type, writing sample, and assignment details required" },
        { status: 400 },
      )
    }

    const prompt = `Provide legal writing feedback in this JSON format:
{
  "clarity": 0.85,
  "organization": 0.80,
  "legalAnalysis": 0.75,
  "citation": 0.70,
  "grammar": 0.90,
  "overallFeedback": "Brief paragraph on overall quality",
  "strengthPoints": ["Strong point 1", "Strong point 2"],
  "improvementAreas": ["Area to improve 1", "Area to improve 2"],
  "suggestedRevisions": ["Specific revision 1", "Specific revision 2"],
  "modelExample": "Brief example of improved writing for a section"
}

Document Type: ${documentType} (Memo, Brief, Opinion, etc.)
Assignment: ${assignment.substring(0, 200)}
User Writing: ${userWriting.substring(0, 800)}`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a legal writing professor. Provide constructive feedback on legal writing.",
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
        error: "Legal writing analysis failed",
        clarity: 0,
        organization: 0,
        legalAnalysis: 0,
        citation: 0,
        grammar: 0,
        overallFeedback: "Please try again with a more complete writing sample",
        strengthPoints: [],
        improvementAreas: [],
        suggestedRevisions: [],
        modelExample: "",
      },
      { status: 200 },
    )
  }
}

