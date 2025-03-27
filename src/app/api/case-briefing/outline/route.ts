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

    // Create prompt asking for plain text format
    const prompt = `Generate a comprehensive Constitutional Law outline in PLAIN TEXT format (no markdown) with these sections:
    
    INTRODUCTION
    THE CONSTITUTION
    JUDICIAL REVIEW 
    FEDERALISM
    SEPARATION OF POWERS
    INDIVIDUAL RIGHTS
    LANDMARK CASES
    CONCLUSION

    Format requirements:
    - UPPERCASE section headers
    - No numbers, bullets, or markdown symbols
    - Each key point on its own line
    - Blank line between sections`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: `You are a constitutional law expert. Generate outlines that:
          1. Use plain text only (no markdown symbols)
          2. Put section headers in UPPERCASE
          3. One key point per line
          4. Blank line between sections
          5. Never use markdown or special formatting`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2500,
    });

    let content = completion.choices[0]?.message?.content || "";
    
    // ES2017-compatible cleanup
    content = content
      .replace(/#/g, '')              // Remove # headers
      .replace(/[-*]/g, '')          // Remove bullet points
      .replace(/`/g, '')             // Remove code ticks
      .replace(/^\s+|\s+$/g, '')     // Trim whitespace
      .replace(/\n{3,}/g, '\n\n');   // Limit to 2 newlines

    // Verify all required sections are present
    const requiredSections = [
      'INTRODUCTION',
      'THE CONSTITUTION',
      'JUDICIAL REVIEW',
      'FEDERALISM',
      'SEPARATION OF POWERS',
      'INDIVIDUAL RIGHTS',
      'LANDMARK CASES',
      'CONCLUSION'
    ];

    requiredSections.forEach(section => {
      if (content.indexOf(section) === -1) {
        content += `\n\n${section}\nKey points about ${section.toLowerCase()}`;
      }
    });

    return NextResponse.json({
      success: true,
      outline: content,
      metadata: {
        topics: [
          "Judicial Review", 
          "Federalism",
          "Separation of Powers",
          "Individual Rights"
        ],
        focusAreas: [
          "Landmark Cases",
          "Constitutional Interpretation", 
          "Modern Applications"
        ],
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("Outline generation error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Outline generation failed",
    }, { status: 500 });
  }
}