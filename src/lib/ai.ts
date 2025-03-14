import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to generate study plan using OpenAI
export async function generateStudyPlan(userData: {
  examDate: string
  targetScore: number
  currentScore: number
  hoursPerWeek: number
  challengingSection: string
  preferredSchedule: string
  focusAreas: string[]
}) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Generate a personalized LSAT study plan based on the following information:
      - Exam Date: ${userData.examDate}
      - Target Score: ${userData.targetScore}
      - Current Score: ${userData.currentScore}
      - Hours Available Per Week: ${userData.hoursPerWeek}
      - Most Challenging Section: ${userData.challengingSection}
      - Preferred Study Schedule: ${userData.preferredSchedule}
      - Focus Areas: ${userData.focusAreas.join(", ")}
      
      The study plan should include:
      1. Daily tasks with time allocations
      2. Weekly goals
      3. Monthly milestones
      4. Specific exercises for improving weak areas
      5. Regular assessment points
      
      Format the response as a structured JSON object that can be parsed and displayed in a user interface.`,
  })

  return JSON.parse(text)
}

// Function to get AI coaching feedback
export async function getAICoachingFeedback(
  question: string,
  userPerformance: {
    recentScores: { section: string; score: number; date: string }[]
    weakAreas: string[]
    strengths: string[]
  },
) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    system:
      "You are an expert LSAT tutor with years of experience helping students achieve their target scores. Provide personalized, actionable advice based on the student's performance data.",
    prompt: `Question from student: "${question}"
    
    Student's recent performance:
    - Recent scores: ${JSON.stringify(userPerformance.recentScores)}
    - Weak areas: ${userPerformance.weakAreas.join(", ")}
    - Strengths: ${userPerformance.strengths.join(", ")}
    
    Provide a helpful, encouraging response with specific advice tailored to this student's needs.`,
  })

  return text
}

// Function to analyze practice test results
export async function analyzePracticeTest(testResults: {
  overallScore: number
  sectionScores: { section: string; correct: number; total: number }[]
  questionResponses: { id: string; type: string; correct: boolean; timeSpent: number }[]
}) {
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Analyze the following LSAT practice test results and provide detailed feedback:
    
    Overall Score: ${testResults.overallScore}
    Section Scores: ${JSON.stringify(testResults.sectionScores)}
    Question Responses: ${JSON.stringify(testResults.questionResponses)}
    
    Please provide:
    1. A summary of performance
    2. Identified strengths
    3. Areas for improvement
    4. Specific recommendations for study focus
    5. Time management analysis
    
    Format the response as a structured JSON object that can be parsed and displayed in a user interface.`,
  })

  return JSON.parse(text)
}

