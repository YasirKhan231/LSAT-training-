"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectRoute";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

// Define the type for user data
interface UserData {
  bookmarkedQuestions: any[];
  payments: any[];
  userId: string;
  email: string;
  name: string;
  authProvider: string;
  subscription: string;
  createdAt: string;
  preferredSchedule: string | null;
  barExamPreparationMaterial: string;
  onboarded: boolean;
  additionalInformation: string;
  weeklyHours: string;
  currentScore: string;
  simulatedExams: any[];
  questionDataKey: string;
  targetScore: string;
  StudyStreak: number;
  specificAreas: string[];
  challengingAreas: string[];
  essays: any[];
  barExamTestDate: string;
  lastStudyDate: string;
  PracticeQuestions: number;
  practiceHistory: {
    sessionId: string;
    timestamp: string;
    section: string;
    questionIds: string[];
    responses: {
      questionId: string;
      selectedOption: string;
      isCorrect: boolean;
    }[];
    score: number;
    totalQuestions: number;
    timeTaken: number;
  }[];
  progress: {
    constitutionalLaw: number;
    contracts: number;
    criminalLaw: number;
    lastUpdated: string | null;
    readingComprehension: number;
    logicalReasoning: number;
    analyticalReasoning: number;
    testAttempts: number;
    totalTimeSpent: number;
  };
  updatedAt: string;
  studyStreak: number;
  totalMarks: number;
  examResult: {
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
  };
  performanceInsights: {
    examId: string;
    totalQuestions: number;
    correctAnswers: number;
    totalTimeMinutes: number;
    timestamp: string;
  }[];
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string | null>(null);

  // Fetch user data from the backend
  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Set the username and UUID from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid);
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
        fetchUserData(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Re-fetch data when UUID changes
  useEffect(() => {
    if (uuid) fetchUserData(uuid);
  }, [uuid]);

  // Countdown timer for Bar Exam date
  useEffect(() => {
    if (!userData?.barExamTestDate) return;
    const examDate = new Date(userData.barExamTestDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = examDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [userData?.barExamTestDate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;

  if (!userData)
    return <div className="text-center p-4">No user data found.</div>;

  const {
    practiceHistory = [],
    currentScore = "0",
    StudyStreak = 0,
    performanceInsights = [],
    PracticeQuestions = 0,
    barExamPreparationMaterial,
    targetScore,
  } = userData;

  const practiceCompleted = practiceHistory.length;

  const formatBarExamTestDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-3xl font-extrabold text-gray-900">
                Welcome back, {userName}!
              </h1>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                Track your progress and continue your Bar Exam prep
              </p>
            </div>
            <Card className="w-full sm:w-64 border-blue-100 shadow-md bg-gradient-to-r from-blue-50 to-white">
              <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-xs sm:text-sm text-blue-700">
                  Bar Exam: {formatBarExamTestDate(userData.barExamTestDate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-4 gap-1 text-center">
                  {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-1 sm:p-2 rounded-md shadow-sm border border-blue-100"
                    >
                      <div className="text-base sm:text-lg font-bold text-blue-600">
                        {timeRemaining[unit as keyof typeof timeRemaining]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {unit.slice(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-blue-600">
                {PracticeQuestions}
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-blue-600">
                {currentScore}
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-blue-600">
                {StudyStreak} days
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-gray-900">
                  Performance Insights
                </CardTitle>
                <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
              <CardDescription className="text-xs sm:text-sm">
                {performanceInsights.length > 0
                  ? "Your performance across different exams"
                  : "No performance data available."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {performanceInsights.length > 0 ? (
                <div className="space-y-3">
                  {performanceInsights.map((insight, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>{insight.examId}</span>
                        <span className="font-medium">
                          {Math.round(
                            (insight.correctAnswers / insight.totalQuestions) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (insight.correctAnswers / insight.totalQuestions) *
                          100
                        }
                        className="h-2 bg-blue-100"
                        indicatorClassName="bg-blue-600"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-500">
                  No performance data available.
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-gray-900">
                  Practice History
                </CardTitle>
                <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Your progress over the last {practiceHistory.length} sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {practiceHistory.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-blue-50 pb-2 text-xs sm:text-sm"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-12 sm:w-10 text-gray-500">
                        {new Date(session.timestamp).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="font-medium">{session.section}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            Suggested Practice
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Constitutional Law",
                description: "Focus on constitutional principles",
                link: "/question-bank/constitutional-law",
              },
              {
                title: "Contracts",
                description: "Practice contract formation",
                link: "/question-bank/contracts",
              },
              {
                title: "Criminal Law",
                description: "Improve criminal law understanding",
                link: "/question-bank/criminal-law",
              },
            ].map((item, index) => (
              <Link href={item.link} key={index} className="block">
                <Card className="h-full border-blue-100 shadow-md transition transform hover:scale-105 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg font-medium text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-blue-50 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-8">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">
            Continue Your Preparation
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Practice with AI Tutor",
                description: "Personalized feedback from AI",
                link: "/plan/ai-coach",
              },
              {
                title: "Question Bank",
                description: "Extensive Bar Exam questions",
                link: "/question-bank",
              },
              {
                title: "Mock Exams",
                description: "Timed practice exams",
                link: "/practice/mock-exam",
              },
            ].map((item, index) => (
              <Link href={item.link} key={index} className="block">
                <div className="bg-white shadow rounded-lg border border-blue-100 transition transform hover:scale-105 hover:shadow-md">
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
