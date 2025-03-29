"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../../../../../components/ProtectRoute";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
} from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface ExamResult {
  examId: string;
  barScore: number;
  percentile: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  totalTimeMinutes: number;
  averageTimePerQuestion: number;
  strengths: string[];
  areasForImprovement: string[];
  timestamp: string;
}

interface UserData {
  examResult: ExamResult;
  totalMarks: number;
}

export default function ResultsPage() {
  const params = useParams();
  const examId = params.examId as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uuid) return;

      try {
        const response = await fetch(`/api/user?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError("Failed to load results. Please try again later.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uuid]);

  const handleExit = async () => {
    if (!uuid) {
      console.error("UUID is not set. User may not be authenticated.");
      return;
    }

    try {
      const response = await fetch(`/api/history?uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the backend");
      }
    } catch (err) {
      console.error("Error sending data to the backend:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-gray-900 bg-white">{error}</div>;
  }

  if (!userData || !userData.examResult) {
    return <div className="text-gray-900 bg-white">Results not found</div>;
  }

  const results = userData.examResult;

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Exam Results & Analysis
            </h1>
            <div className="flex space-x-3">
              <Link href="/practice/mock-exam">
                <Button
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-900"
                >
                  Take Another Exam
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-900"
              >
                Exit
              </Button>
            </div>
          </div>
          <p className="mt-2 text-lg text-gray-700">
            AI-powered analysis of your {results.examId} performance
          </p>
        </header>

        {/* Score Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                BAR Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">
                  {results.barScore}
                </span>
                <span className="ml-2 text-gray-700">
                  / {userData.totalMarks}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                {results.percentile}th percentile
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">
                  {results.correctAnswers}
                </span>
                <span className="ml-2 text-gray-700">
                  / {results.totalQuestions} correct
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                {Math.round(
                  (results.correctAnswers / results.totalQuestions) * 100
                )}
                % accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                Time Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">
                  {results.totalTimeMinutes}
                </span>
                <span className="ml-2 text-gray-700">minutes total</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                ~{results.averageTimePerQuestion} seconds per question
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Results Interface */}
        <Tabs defaultValue="overview" className="text-gray-900">
          <TabsList className="mb-6 bg-white border border-gray-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
            >
              <BarChart3 className="h-4 w-4 mr-1 text-gray-900" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="ai-analysis"
              className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
            >
              <BrainCircuit className="h-4 w-4 mr-1 text-gray-900" />
              AI Analysis
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Correct
                        </span>
                        <span className="text-sm text-gray-700">
                          {results.correctAnswers} questions
                        </span>
                      </div>
                      <Progress
                        value={
                          (results.correctAnswers / results.totalQuestions) *
                          100
                        }
                        className="h-2 bg-gray-100"
                        indicatorClassName="bg-gray-900"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Incorrect
                        </span>
                        <span className="text-sm text-gray-700">
                          {results.incorrectAnswers} questions
                        </span>
                      </div>
                      <Progress
                        value={
                          (results.incorrectAnswers / results.totalQuestions) *
                          100
                        }
                        className="h-2 bg-gray-100"
                        indicatorClassName="bg-gray-900"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Skipped
                        </span>
                        <span className="text-sm text-gray-700">
                          {results.skippedAnswers} questions
                        </span>
                      </div>
                      <Progress
                        value={
                          (results.skippedAnswers / results.totalQuestions) *
                          100
                        }
                        className="h-2 bg-gray-100"
                        indicatorClassName="bg-gray-900"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-gray-900 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-900">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-gray-900 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-900">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  AI-Generated Study Recommendation
                </h3>
                <p className="text-gray-700 mb-4">
                  Based on your performance, I recommend focusing on the
                  following areas:
                </p>
                <ul className="space-y-2 text-gray-900">
                  {results.areasForImprovement.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-900">
                    Create Personalized Study Plan
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
