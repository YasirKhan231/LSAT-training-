"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the QuestionFeedback type
interface QuestionFeedback {
  isCorrect: boolean;
  correctAnswer: string;
  aiSuggestion: string;
  explanation: string;
}

// Define the component props
interface QuestionFeedbackComponentProps {
  feedback: QuestionFeedback;
  showExplanation: boolean;
  onToggleExplanation: () => void;
  chosenOption?: string; // User's chosen option
  question?: string; // The question text
}

export function QuestionFeedbackComponent({
  feedback,
  showExplanation,
  onToggleExplanation,
  chosenOption,
  question,
}: QuestionFeedbackComponentProps) {
  const [askingAI, setAskingAI] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // State to store error messages

  // Function to call OpenAI API
  const handleAskAI = async () => {
    setAskingAI(true);
    setError(null); // Clear any previous errors

    try {
      // Construct the prompt for OpenAI
      const prompt = `A student preparing for the LSAT chose the following option: "${chosenOption}". The correct answer is: "${feedback.correctAnswer}". The question was: "${question}". Provide a short explanation of why the chosen option is incorrect and why the correct answer is right.`;

      // Call OpenAI API directly (using fetch)
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Use your OpenAI API key
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview", // Use the appropriate model
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful LSAT tutor. Provide a concise explanation of why the chosen answer is incorrect and why the correct answer is right.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 150, // Limit the response length
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();
      setAiResponse(data.choices[0].message.content); // Extract the AI response
    } catch (error) {
      console.error("Error calling OpenAI:", error); // Log the error to the console
      setError("Failed to generate AI response. Please try again."); // Set the error message
    } finally {
      setAskingAI(false);
    }
  };

  return (
    <div>
      {/* Notification for errors */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <Card
        className={cn(
          "border-2 shadow-md rounded-xl overflow-hidden",
          feedback.isCorrect ? "border-green-100" : "border-red-100"
        )}
      >
        <CardHeader
          className={cn(
            "pb-2",
            feedback.isCorrect ? "bg-green-50" : "bg-red-50"
          )}
        >
          <CardTitle className="flex items-center text-lg">
            {feedback.isCorrect ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Correct Answer</span>
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-5 w-5 text-red-600" />
                <span>Incorrect Answer</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {feedback.aiSuggestion}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleExplanation}
                className="flex items-center"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </Button>

              {!feedback.isCorrect && !aiResponse && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAskAI}
                  disabled={askingAI}
                  className="flex items-center"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {askingAI ? "Generating..." : "Ask AI for Help"}
                </Button>
              )}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-blue-50/70 rounded-md shadow-sm">
                <h4 className="font-medium mb-2">Explanation</h4>
                <p className="text-sm">{feedback.explanation}</p>
              </div>
            )}

            {aiResponse && (
              <div className="mt-4 p-4 bg-blue-50/70 rounded-md shadow-sm">
                <h4 className="font-medium mb-2 flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-blue-900" />
                  AI Assistance
                </h4>
                <p className="text-sm">{aiResponse}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
