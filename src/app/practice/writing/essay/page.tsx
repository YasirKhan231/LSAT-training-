"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, Send } from "lucide-react";
import ProtectedRoute from "../../../../../components/ProtectRoute";

export default function EssayPracticePage() {
  const [essay, setEssay] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/essay", {
        // Updated endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: essay, // Simplified payload
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Essay Practice</h1>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-mono">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analyze the following constitutional law issue: The state of
              Jefferson has passed a law requiring all social media companies to
              verify the age of their users and prohibit access to anyone under
              18. Discuss the constitutional implications of this law.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-4">
            <Textarea
              placeholder="Write your essay here..."
              className="min-h-[400px] p-4"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !essay.trim()}
            className="flex items-center"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Analyzing..." : "Submit for Analysis"}
          </Button>
        </div>

        {feedback && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Structure</h3>
                  <Progress value={feedback.structure * 100} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {feedback.structureFeedback}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Legal Analysis</h3>
                  <Progress
                    value={feedback.legalAnalysis * 100}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {feedback.legalAnalysisFeedback}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Writing Quality</h3>
                  <Progress
                    value={feedback.writingQuality * 100}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {feedback.writingQualityFeedback}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-blue-800">
                    Improvement Suggestions
                  </h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
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
