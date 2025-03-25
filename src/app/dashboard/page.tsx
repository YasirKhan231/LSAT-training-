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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart, ChevronRight, ArrowRight } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

// Import hardcoded study plan data
import { studyPlans, type StudyPlanKey } from "@/data/plan";

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
  const [tasks, setTasks] = useState<string[]>([]);

  // Fetch user data from the backend
  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);

      // Initialize tasks from the study plan
      const questionDataKey = data.questionDataKey as StudyPlanKey;
      const studyPlan = studyPlans[questionDataKey] || studyPlans["terrible"];
      setTasks(studyPlan.today);
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

  // Handle task completion
  const handleTaskCompletion = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center p-4 text-red-400 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        Error: {error}
      </div>
    );

  if (!userData)
    return (
      <div className="text-center p-4 text-gray-300 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        No user data found.
      </div>
    );

  const {
    practiceHistory = [],
    currentScore = "0",
    StudyStreak = 0,
    performanceInsights = [],
    PracticeQuestions = 0,
    barExamPreparationMaterial,
    targetScore = "0",
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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] px-4 py-6 sm:px-6 lg:px-8 text-gray-300">
        <header className="py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-3xl font-extrabold text-white">
                Welcome back, {userName}!
              </h1>
              <p className="mt-2 text-base sm:text-lg text-gray-400">
                Track your progress and continue your Bar Exam prep
              </p>
            </div>
            <Card className="w-full sm:w-64 border-[#1E293B] shadow-xl bg-gradient-to-r from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
              <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-xs sm:text-sm text-white">
                  Bar Exam: {formatBarExamTestDate(userData.barExamTestDate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-4 gap-1 text-center">
                  {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1E293B] p-1 sm:p-2 rounded-md shadow-sm border border-[#334155]"
                    >
                      <div className="text-base sm:text-lg font-bold text-white">
                        {timeRemaining[unit as keyof typeof timeRemaining]}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {unit.slice(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-[#64748B]">
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                {PracticeQuestions}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-[#64748B]">
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                {currentScore}
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-[#64748B]">
                Target Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                {targetScore}
              </div>
              <div className="text-xs text-[#64748B] mt-1">
                {Number(targetScore) - Number(currentScore)} points to go
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-[#64748B]">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-white">
                {StudyStreak} days
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-medium text-white">
                Today's Study Plan
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#64748B]">
                Your personalized study schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md bg-[#1E293B]/30 border border-[#334155]/30"
                  >
                    <p className="text-sm font-medium text-gray-300">{task}</p>
                    <button
                      onClick={() => handleTaskCompletion(index)}
                      className="p-1 rounded-full border border-[#334155] hover:bg-[#334155] transition-colors"
                    >
                      <div className="h-4 w-4 border border-gray-400 rounded-sm"></div>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/plan/study-plan">
                  <Button
                    variant="outline"
                    className="w-full border-[#334155] bg-[#1E293B]/50 hover:bg-[#334155] text-gray-300"
                  >
                    View Full Study Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-white">
                  Performance Insights
                </CardTitle>
                <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <CardDescription className="text-xs sm:text-sm text-[#64748B]">
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
                        <span className="text-gray-300">{insight.examId}</span>
                        <span className="font-medium text-white">
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
                        className="h-2 bg-[#1E293B]"
                        indicatorClassName="bg-gradient-to-r from-white to-[#FFFFFF]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#64748B]">
                  No performance data available.
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-white">
                  Practice History
                </CardTitle>
                <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <CardDescription className="text-xs sm:text-sm text-[#64748B]">
                Your progress over the last {practiceHistory.length} sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {practiceHistory.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-[#1E293B] pb-2 text-xs sm:text-sm"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-12 sm:w-10 text-[#64748B]">
                        {new Date(session.timestamp).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="font-medium text-gray-300">
                        {session.section}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h2 className="text-base sm:text-lg font-medium text-white">
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
                link: "/question-bank/criminal-law-and-procedure",
              },
            ].map((item, index) => (
              <Link href={item.link} key={index} className="block">
                <Card className="h-full border-[#1E293B] shadow-xl bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm transition transform hover:scale-105 hover:shadow-lg hover:border-white/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg font-medium text-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-[#64748B]">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-[#1E293B]/30 flex justify-end">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 mb-8">
          <h2 className="text-base sm:text-lg font-medium text-white">
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
                <div className="bg-gradient-to-b from-[#0a0a0f] to-[#121218] backdrop-blur-sm shadow-xl rounded-lg border border-[#1E293B] transition transform hover:scale-105 hover:shadow-md hover:border-white/50">
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    <h3 className="text-base sm:text-lg font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-[#1E293B]/30 px-4 py-3 sm:px-6 flex justify-end">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
