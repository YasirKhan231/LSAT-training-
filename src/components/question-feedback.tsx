"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionFeedback {
  isCorrect: boolean;
  correctAnswer: string;
  aiSuggestion: string;
  explanation: string;
}

interface QuestionFeedbackComponentProps {
  feedback: QuestionFeedback;
  showExplanation: boolean;
  onToggleExplanation: () => void;
  aiResponse?: string; // Add this prop
}

export function QuestionFeedbackComponent({
  feedback,
  showExplanation,
  onToggleExplanation,
  aiResponse,
}: QuestionFeedbackComponentProps) {
  const [showAIResponse, setShowAIResponse] = useState(false);

  return (
    <div>
      <Card
        className={cn(
          "border-2 shadow-md rounded-xl overflow-hidden bg-slate-900",
          feedback.isCorrect ? "border-green-800" : "border-red-800"
        )}
      >
        <CardHeader
          className={cn(
            "pb-2",
            feedback.isCorrect ? "bg-green-900/20" : "bg-red-900/20"
          )}
        >
          <CardTitle className="flex items-center text-lg text-slate-100">
            {feedback.isCorrect ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span>Correct Answer</span>
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-5 w-5 text-red-500" />
                <span>Incorrect Answer</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-sm text-slate-400">{feedback.aiSuggestion}</p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleExplanation}
                className="flex items-center bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                {showExplanation ? "Hide Explanation" : "Show Explanation"}
              </Button>

              {!feedback.isCorrect && aiResponse && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIResponse(!showAIResponse)}
                  className="flex items-center bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {showAIResponse ? "Hide AI Response" : "Ask AI for Help"}
                </Button>
              )}
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-indigo-900/20 rounded-md shadow-sm border border-indigo-800">
                <h4 className="font-medium mb-2 text-slate-100">Explanation</h4>
                <p className="text-sm text-slate-300">{feedback.explanation}</p>
              </div>
            )}

            {showAIResponse && aiResponse && (
              <div className="mt-4 p-4 bg-indigo-900/20 rounded-md shadow-sm border border-indigo-800">
                <h4 className="font-medium mb-2 flex items-center text-slate-100">
                  <MessageSquare className="mr-2 h-4 w-4 text-indigo-400" />
                  AI Assistance
                </h4>
                <p className="text-sm text-slate-300">{aiResponse}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
