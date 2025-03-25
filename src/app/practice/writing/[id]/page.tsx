"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Clock,
  Send,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// Sample essay questions data (same as in index page)
const essayQuestions = [
  {
    id: "constitutional-law",
    title: "Constitutional Law Analysis",
    prompt:
      "Analyze the following constitutional law issue: The state of Jefferson has passed a law requiring all social media companies to verify the age of their users and prohibit access to anyone under 18. Discuss the constitutional implications of this law.",
    category: "Constitutional Law",
    difficulty: "Advanced",
    timeLimit: 60, // minutes
  },
  {
    id: "contract-law",
    title: "Contract Law Scenario",
    prompt:
      "A software company offers a 'free trial' of their product but requires users to provide credit card information. The terms state that users will be automatically charged after 30 days unless they cancel. Many users report they were unaware of the automatic renewal. Analyze the contract law issues presented.",
    category: "Contract Law",
    difficulty: "Intermediate",
    timeLimit: 45, // minutes
  },
  {
    id: "criminal-law",
    title: "Criminal Law Case Study",
    prompt:
      "A defendant is charged with burglary after entering an unlocked garage and taking a bicycle. The defendant claims they believed the bicycle was abandoned property. Analyze the elements of burglary and whether the prosecution can prove their case.",
    category: "Criminal Law",
    difficulty: "Intermediate",
    timeLimit: 50, // minutes
  },
  {
    id: "international-law",
    title: "International Law Dispute",
    prompt:
      "Two neighboring countries dispute ownership of an island that emerged in a river that forms their border due to geological activity. Analyze this territorial dispute under international law principles.",
    category: "International Law",
    difficulty: "Advanced",
    timeLimit: 60, // minutes
  },
];

export default function EssayPracticePage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id as string;

  const question = essayQuestions.find((q) => q.id === questionId);

  const [essay, setEssay] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  useEffect(() => {
    // Set the time limit based on the selected question
    if (question) {
      setTimeRemaining(question.timeLimit * 60); // Convert minutes to seconds
    }
  }, [question]);

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
          questionId: questionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze essay");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error("Error submitting essay:", error);
      // Mock feedback for demonstration purposes
      setFeedback({
        structure: 0.75,
        structureFeedback:
          "Good organization with clear introduction, body paragraphs, and conclusion.",
        legalAnalysis: 0.68,
        legalAnalysisFeedback:
          "Solid analysis of First Amendment issues, but could expand on Commerce Clause implications.",
        writingQuality: 0.82,
        writingQualityFeedback:
          "Clear writing style with good use of legal terminology and minimal grammatical errors.",
        suggestions: [
          "Consider discussing relevant case law such as Packingham v. North Carolina.",
          "Expand on the state's interest in protecting minors versus First Amendment rights.",
          "Address potential technological challenges in age verification.",
          "Consider the impact on interstate commerce more thoroughly.",
        ],
      });
    }
    setIsSubmitting(false);
    setIsTimerRunning(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const startSession = () => {
    setSessionStarted(true);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
  };

  const resetSession = () => {
    setSessionStarted(false);
    setIsTimerRunning(false);
    setEssay("");
    setFeedback(null);
    if (question) {
      setTimeRemaining(question.timeLimit * 60);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && isTimerRunning) {
      handleSubmit();
    }
  }, [isTimerRunning, timeRemaining]);

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Question Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The essay question you're looking for doesn't exist.
          </p>
          <Link href="/practice/writing">
            <Button className="bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/practice/writing">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white ml-2">
              {question.title}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span
              className={`font-mono ${
                timeRemaining < 300 && isTimerRunning
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
            {question.category}
          </span>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
            {question.difficulty}
          </span>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
            {question.timeLimit} minutes
          </span>
        </div>

        <Card className="mb-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="text-white">Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{question.prompt}</p>
          </CardContent>
        </Card>

        {!sessionStarted && !feedback ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-400 mb-6 text-center max-w-lg">
              You will have {question.timeLimit} minutes to complete this essay.
              The timer will start when you click the button below.
            </p>
            <Button
              onClick={startSession}
              className="flex items-center bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white px-6 py-2"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Essay
            </Button>
          </div>
        ) : (
          <>
            <Card className="mb-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
              <CardContent className="p-4">
                <Textarea
                  placeholder="Write your essay here..."
                  className="min-h-[400px] p-4 bg-[#1a1a1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
                  value={essay}
                  onChange={handleInputChange}
                  disabled={!!feedback || !isTimerRunning}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                {!feedback && (
                  <>
                    {isTimerRunning ? (
                      <Button
                        onClick={pauseTimer}
                        variant="outline"
                        className="flex items-center border-[#2a2a2f] text-white"
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        onClick={resumeTimer}
                        variant="outline"
                        className="flex items-center border-[#2a2a2f] text-white"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </Button>
                    )}
                  </>
                )}
                <Button
                  onClick={resetSession}
                  variant="outline"
                  className="flex items-center border-[#2a2a2f] text-white"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>

              {!feedback && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !essay.trim() || !sessionStarted}
                  className="flex items-center bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Analyzing..." : "Submit for Analysis"}
                </Button>
              )}
            </div>
          </>
        )}

        {feedback && (
          <Card className="mt-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="text-white">AI Analysis</CardTitle>
              <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
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
