import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Validate request
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const { userId } = await request.json();

    // Validate userId
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: "Valid user ID is required" },
        { status: 400 }
      );
    }

    // Create prompt with explicit JSON request
    const prompt = `As a legal education expert, create a detailed study outline in JSON format focusing on constitutional law concepts for user ${userId}. 
    Structure the response as a JSON object with these properties:
    - outline: string (markdown formatted content)
    - topics: string[]
    - focusAreas: string[]
    
    Example:
    {
      "outline": "## Constitutional Law Outline...",
      "topics": ["Judicial Review", "Federalism"],
      "focusAreas": ["Landmark Cases", "Amendment Analysis"]
    }`;

    // API call with JSON response format
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a constitutional law expert. Return all responses in valid JSON format." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500,
    });

    // Validate response structure
    if (!completion.choices?.[0]?.message?.content) {
      throw new Error("No content in OpenAI response");
    }

    // Process response
    let responseContent = completion.choices[0].message.content;
    
    // Clean response (handle markdown code blocks if present)
    responseContent = responseContent.replace(/^```json|```$/g, '').trim();
    
    // Parse and validate
    const result = JSON.parse(responseContent);
    
    if (!result.outline || typeof result.outline !== 'string') {
      throw new Error("Invalid outline format from AI");
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      outline: result.outline,
      metadata: {
        topics: result.topics || [],
        focusAreas: result.focusAreas || [],
        generatedAt: new Date().toISOString()
      }
    }, { status: 200 });

  } catch (error:any) {
    console.error("Outline generation error:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message || "Outline generation failed",
      suggestion: "Please try again with a different prompt",
      timestamp: new Date().toISOString()
    }, { status: error.message.includes('user ID') ? 400 : 500 });
  }
}