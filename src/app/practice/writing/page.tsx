"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, Send } from "lucide-react";

export default function EssayPracticePage() {
  const [essay, setEssay] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/essay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: essay,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze essay");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error("Error submitting essay:", error);
    }
    setIsSubmitting(false);
  };

  // Start the timer when the user starts typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
    if (!isTimerRunning) {
      setIsTimerRunning(true); // Start the timer only once
    }
  };

  // Automatically submit the essay when the timer reaches zero
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [isTimerRunning, timeRemaining]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Essay Practice</h1>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="font-mono text-white">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="text-white">Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Analyze the following constitutional law issue: The state of
              Jefferson has passed a law requiring all social media companies to
              verify the age of their users and prohibit access to anyone under
              18. Discuss the constitutional implications of this law.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardContent className="p-4">
            <Textarea
              placeholder="Write your essay here..."
              className="min-h-[400px] p-4 bg-[#1a1a1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
              value={essay}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !essay.trim()}
            className="flex items-center bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Analyzing..." : "Submit for Analysis"}
          </Button>
        </div>

        {feedback && (
          <Card className="mt-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
            <CardHeader>
              <CardTitle className="text-white">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 text-white">Structure</h3>
                  <Progress
                    value={feedback.structure * 100}
                    className="mb-2 bg-[#1a1a1f]"
                  />
                  <p className="text-sm text-gray-400">
                    {feedback.structureFeedback}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-white">
                    Legal Analysis
                  </h3>
                  <Progress
                    value={feedback.legalAnalysis * 100}
                    className="mb-2 bg-[#1a1a1f]"
                  />
                  <p className="text-sm text-gray-400">
                    {feedback.legalAnalysisFeedback}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-white">
                    Writing Quality
                  </h3>
                  <Progress
                    value={feedback.writingQuality * 100}
                    className="mb-2 bg-[#1a1a1f]"
                  />
                  <p className="text-sm text-gray-400">
                    {feedback.writingQualityFeedback}
                  </p>
                </div>

                <div className="bg-[#1a1a1f]/50 p-4 rounded-lg border border-[#2a2a2f]">
                  <h3 className="font-medium mb-2 text-white">
                    Improvement Suggestions
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {feedback.suggestions.map(
                      (suggestion: string, index: number) => (
                        <li key={index}>{suggestion}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
