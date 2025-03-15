"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "../../../../../../components/ProtectRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  Clock,
  BrainCircuit,
  Trophy,
  ArrowRight,
  Lightbulb,
  BarChart4,
  Repeat,
  Share2,
} from "lucide-react";

interface GameResult {
  gameId: string;
  title: string;
  type: string;
  score: number;
  total: number;
  timeSpent: number;
  hintsUsed: number;
  timestamp: string;
}

// Define a type for the feedback state
interface Feedback {
  strengths: string[];
  weaknesses: string[];
  recommendedPractice: string[];
}

// AI-generated feedback based on performance
const generateAIFeedback = (result: GameResult): Feedback => {
  const scorePercentage = (result.score / result.total) * 100;
  const timeFactor = result.timeSpent / (60 * result.total); // Time per question in minutes

  let strengths: string[] = [];
  let weaknesses: string[] = [];
  let recommendedPractice: string[] = [];

  // Analyze score
  if (scorePercentage >= 80) {
    strengths.push("Strong accuracy in answering questions");
  } else if (scorePercentage <= 50) {
    weaknesses.push("Difficulty identifying correct answers");
  }

  // Analyze time
  if (timeFactor < 1) {
    strengths.push("Efficient time management");
  } else if (timeFactor > 2) {
    weaknesses.push("Time management needs improvement");
  }

  // Analyze hints
  if (result.hintsUsed === 0) {
    strengths.push("Solved problems independently without hints");
  } else if (result.hintsUsed >= result.total) {
    weaknesses.push("Heavy reliance on hints");
  }

  // Generate game-type specific feedback
  if (result.type.includes("Sequencing")) {
    if (scorePercentage < 70) {
      weaknesses.push("Difficulty with sequencing constraints");
      recommendedPractice.push("Practice basic ordering games");
      recommendedPractice.push(
        "Focus on games with 'before/after' relationships"
      );
    }
  } else if (result.type.includes("Grouping")) {
    if (scorePercentage < 70) {
      weaknesses.push("Challenges with group assignments");
      recommendedPractice.push("Practice basic distribution games");
      recommendedPractice.push(
        "Focus on 'must be together' and 'cannot be together' rules"
      );
    }
  } else if (result.type.includes("Selection")) {
    if (scorePercentage < 70) {
      weaknesses.push("Difficulty with selection constraints");
      recommendedPractice.push("Practice in/out games");
      recommendedPractice.push("Review conditional logic (if X then Y)");
    }
  } else if (result.type.includes("Hybrid")) {
    if (scorePercentage < 70) {
      weaknesses.push("Challenges with complex integrated rule systems");
      recommendedPractice.push(
        "Start with simpler, single-type games before returning to hybrid games"
      );
      recommendedPractice.push("Practice diagramming complex scenarios");
    }
  }

  // Ensure we have at least some recommendations
  if (recommendedPractice.length === 0) {
    if (scorePercentage >= 80) {
      recommendedPractice.push(
        "Try more challenging games to further develop your skills"
      );

      if (result.type.includes("Sequencing")) {
        recommendedPractice.push(
          "Practice sequencing games with numerical distributions"
        );
      } else if (result.type.includes("Grouping")) {
        recommendedPractice.push(
          "Try grouping games with sub-groups or overlapping constraints"
        );
      } else if (result.type.includes("Selection")) {
        recommendedPractice.push(
          "Challenge yourself with selection games that have complex conditional rules"
        );
      } else {
        recommendedPractice.push(
          "Explore more hybrid games that combine multiple rule systems"
        );
      }
    } else {
      recommendedPractice.push(
        "Review the game's rules and practice similar games"
      );
      recommendedPractice.push("Focus on creating comprehensive diagrams");
    }
  }

  // If no specific strengths identified, add a generic one
  if (strengths.length === 0) {
    strengths.push("Completed the entire game");
  }

  return {
    strengths,
    weaknesses,
    recommendedPractice,
  };
};

// Default mock result to avoid null issues
const defaultResult: GameResult = {
  gameId: "unknown",
  title: "Unknown Game",
  type: "Logic Game",
  score: 0,
  total: 1,
  timeSpent: 0,
  hintsUsed: 0,
  timestamp: new Date().toISOString(),
};

export default function LogicGameResultsPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;

  const [result, setResult] = useState<GameResult>(defaultResult);
  const [feedback, setFeedback] = useState<Feedback>({
    strengths: ["Completed the game"],
    weaknesses: [], // Explicitly typed as string[]
    recommendedPractice: ["Practice more logic games"],
  });

  const [loading, setLoading] = useState(true);
  const [resultFound, setResultFound] = useState(false);

  // Safe localStorage access (client-side only)
  useEffect(() => {
    try {
      const storedResult = localStorage.getItem(`logic_game_result_${gameId}`);

      if (storedResult) {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
        setFeedback(generateAIFeedback(parsedResult));
        setResultFound(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Show loading state while we check for results
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Loading Results...
              </h1>
            </div>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  // If no result is found, display a fallback
  if (!resultFound) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                No Results Found
              </h1>
              <p className="text-gray-600">
                We couldn't find results for this game. You may need to complete
                the game first.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/practise/logic-games">
                <Button>Go to Logic Games</Button>
              </Link>
            </div>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Game Results
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Performance analysis for {result.title}
              </p>
            </div>
            <div>
              <Link href="/practise/logic-games">
                <Button variant="outline" size="sm">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Score
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  {result.score}
                </span>
                <span className="ml-2 text-gray-500">/ {result.total}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((result.score / result.total) * 100)}% Correct
              </p>
              <Progress
                value={(result.score / result.total) * 100}
                className="h-2 mt-3"
              />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  Time
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  {formatTime(result.timeSpent)}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                ~{Math.round(result.timeSpent / result.total)} seconds per
                question
              </p>
              <div className="h-2 mt-3">
                {/* Time-based progress visualization could go here */}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                  Hints Used
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">
                  {result.hintsUsed}
                </span>
                <span className="ml-2 text-gray-500">/ {result.total * 3}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {result.hintsUsed > 0
                  ? `Averaged ${(result.hintsUsed / result.total).toFixed(
                      1
                    )} hints per question`
                  : "No hints were used"}
              </p>
              <Progress
                value={(result.hintsUsed / (result.total * 3)) * 100}
                className="h-2 mt-3"
              />
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 text-blue-500 mr-2" />
                  AI Analysis
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Strengths
                </h3>
                <ul className="space-y-1">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Areas for Improvement
                </h3>
                <ul className="space-y-1">
                  {feedback.weaknesses.length > 0 ? (
                    feedback.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        No significant weaknesses identified
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center">
                  <BarChart4 className="h-5 w-5 text-purple-500 mr-2" />
                  Game Performance
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Accuracy</span>
                    <span className="text-gray-500">
                      {Math.round((result.score / result.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(result.score / result.total) * 100}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Speed</span>
                    <span className="text-gray-500">
                      {result.timeSpent < 60 * result.total
                        ? "Good"
                        : result.timeSpent < 90 * result.total
                        ? "Average"
                        : "Needs Improvement"}
                    </span>
                  </div>
                  <Progress
                    value={
                      100 -
                      Math.min(
                        100,
                        (result.timeSpent / (60 * result.total)) * 50
                      )
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">
                      Independence
                    </span>
                    <span className="text-gray-500">
                      {result.hintsUsed === 0
                        ? "Excellent"
                        : result.hintsUsed <= result.total
                        ? "Good"
                        : "Needs Practice"}
                    </span>
                  </div>
                  <Progress
                    value={
                      100 -
                      Math.min(100, (result.hintsUsed / result.total) * 33.3)
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">
                      Overall Performance
                    </span>
                    <span className="text-gray-500">
                      {(() => {
                        const score = (result.score / result.total) * 100;
                        if (score >= 90) return "Excellent";
                        if (score >= 80) return "Very Good";
                        if (score >= 70) return "Good";
                        if (score >= 60) return "Satisfactory";
                        return "Needs Improvement";
                      })()}
                    </span>
                  </div>
                  <Progress
                    value={(result.score / result.total) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Recommended Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {feedback.recommendedPractice.map((recommendation, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-3 rounded-md border border-blue-100"
                >
                  <div className="flex">
                    <Lightbulb className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-blue-700">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={`/practise/logic-games/play/${gameId}`}>
            <Button className="flex items-center">
              <Repeat className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </Link>

          <Link href="/practise/logic-games">
            <Button variant="outline" className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2" />
              Try Another Game
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="flex items-center"
            onClick={() => {
              // Share functionality (just placeholder, would implement actual sharing)
              alert("Sharing not implemented in this demo");
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
