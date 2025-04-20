"use client";

import { useState, useEffect, useRef } from "react";
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
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studyPlans, type StudyPlanKey } from "@/data/plan";

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
  examResult?: {
    passed: boolean | null;
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
  const router = useRouter();
  const [examPassed, setExamPassed] = useState(false);
  const [showExamResultDialog, setShowExamResultDialog] = useState(false);
  const [examResult, setExamResult] = useState<
    "pass" | "fail" | "prefer-not" | ""
  >("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newCurrentScore, setNewCurrentScore] = useState("");
  const [newTargetScore, setNewTargetScore] = useState("");
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
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const dialogShownRef = useRef(false);

  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);

      const questionDataKey = data.questionDataKey as StudyPlanKey;
      const studyPlan = studyPlans[questionDataKey] || studyPlans["terrible"];
      setTasks(studyPlan.today);

      setNewCurrentScore(data.currentScore || "");
      setNewTargetScore(data.targetScore || "");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (uuid) fetchUserData(uuid);
  }, [uuid]);

  useEffect(() => {
    if (!userData?.barExamTestDate || dialogShownRef.current) return;

    const examDate = new Date(userData.barExamTestDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = examDate - now;

      if (distance < 0) {
        setExamPassed(true);
        if (!userData.examResult && !dialogShownRef.current) {
          setShowExamResultDialog(true);
          dialogShownRef.current = true;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
      setExamPassed(false);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [userData?.barExamTestDate, userData?.examResult]);

  const handleSubmitExamResult = async () => {
    try {
      const current = parseInt(newCurrentScore);
      const target = parseInt(newTargetScore);

      if (current < 260 || current > 400) {
        alert("Current score must be between 260 and 400");
        return;
      }

      if (target < 260 || target > 400) {
        alert("Target score must be between 260 and 400");
        return;
      }

      if (target < current) {
        alert("Target score must be greater than or equal to current score");
        return;
      }

      const response = await fetch(`/api/updateuserdata?uuid=${uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examResult:
            examResult === "pass" ? true : examResult === "fail" ? false : null,
          barExamTestDate: newExamDate,
          currentScore: newCurrentScore,
          targetScore: newTargetScore,
        }),
      });

      if (!response.ok) throw new Error("Failed to update exam result");

      // Reset dialog state and mark as shown
      setShowExamResultDialog(false);
      dialogShownRef.current = true;
      
      // Reset form fields
      setExamResult("");
      setNewExamDate("");
      setNewCurrentScore("");
      setNewTargetScore("");

      // Refresh data
      if (uuid) fetchUserData(uuid);
    } catch (err) {
      console.error("Error submitting exam result:", err);
    }
  };

  const handleTaskCompletion = (index: number) => {
    setCompletedTasks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error)
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;

  if (!userData)
    return (
      <div className="text-center p-4 text-black">No user data found.</div>
    );

  const {
    practiceHistory = [],
    currentScore = "0",
    StudyStreak = 0,
    performanceInsights = [],
    PracticeQuestions = 0,
    targetScore = "0",
  } = userData;

  const formatBarExamTestDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getExamResultText = () => {
    if (!userData.examResult) return "Exam Date Passed";
    if (userData.examResult.passed === true) return "Exam Passed!";
    if (userData.examResult.passed === false) return "Exam Failed";
    return "Exam Completed";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
        {/* Exam Result Dialog */}
        <Dialog
          open={showExamResultDialog}
          onOpenChange={(open) => {
            if (!open || !userData?.examResult) {
              setShowExamResultDialog(open);
            }
          }}
        >
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Exam Results
              </DialogTitle>
              <DialogDescription>
                Update your exam status and progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Exam Result</Label>
                <Select
                  value={examResult}
                  onValueChange={(value: "pass" | "fail" | "prefer-not") =>
                    setExamResult(value)
                  }
                >
                  <SelectTrigger className="border-black">
                    <SelectValue placeholder="Select your result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Passed</SelectItem>
                    <SelectItem value="fail">Failed</SelectItem>
                    <SelectItem value="prefer-not">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>New Exam Date</Label>
                <Input
                  type="date"
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  className="mt-1 border-black"
                />
              </div>

              <div>
                <Label>Current Score</Label>
                <Select
                  value={newCurrentScore}
                  onValueChange={(value) => {
                    setNewCurrentScore(value);
                    if (parseInt(newTargetScore) < parseInt(value)) {
                      setNewTargetScore(value);
                    }
                  }}
                >
                  <SelectTrigger className="border-black">
                    <SelectValue placeholder="Select current score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 141 }, (_, i) => 260 + i).map(
                      (score) => (
                        <SelectItem
                          key={`current-${score}`}
                          value={score.toString()}
                        >
                          {score}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Target Score</Label>
                <Select
                  value={newTargetScore}
                  onValueChange={(value) => setNewTargetScore(value)}
                  disabled={!newCurrentScore}
                >
                  <SelectTrigger className="border-black">
                    <SelectValue placeholder="Select target score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      {
                        length:
                          401 -
                          Math.max(260, parseInt(newCurrentScore || "260")),
                      },
                      (_, i) =>
                        Math.max(260, parseInt(newCurrentScore || "260")) + i
                    ).map((score) => (
                      <SelectItem
                        key={`target-${score}`}
                        value={score.toString()}
                      >
                        {score}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowExamResultDialog(false)}
                  className="border-black text-black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitExamResult}
                  disabled={
                    !newExamDate ||
                    !newCurrentScore ||
                    !newTargetScore ||
                    !examResult
                  }
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <header className="py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl sm:text-3xl font-extrabold text-black">
                Welcome back, {userName}!
              </h1>
              <p className="mt-2 text-base sm:text-lg text-gray-600">
                Track your progress and continue your Bar Exam prep
              </p>
            </div>
            <Card className="w-full sm:w-64 border-black shadow-lg bg-white">
              <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-xs sm:text-sm text-black font-medium">
                  Bar Exam: {formatBarExamTestDate(userData.barExamTestDate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                {examPassed ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="text-base sm:text-lg font-bold text-black">
                      {getExamResultText()}
                    </div>
                    <Button
                      onClick={() => setShowExamResultDialog(true)}
                      className="bg-black hover:bg-gray-800 text-white"
                      variant="default"
                    >
                      Update Exam Info
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-1 text-center">
                    {["days", "hours", "minutes", "seconds"].map(
                      (unit, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-1 sm:p-2 rounded-md shadow-sm border border-black"
                        >
                          <div className="text-base sm:text-lg font-bold text-black">
                            {timeRemaining[unit as keyof typeof timeRemaining]}
                          </div>
                          <div className="text-xs text-gray-600">
                            {unit.slice(0, 3)}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-black">
                {PracticeQuestions}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-black">
                {currentScore}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Target Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-black">
                {targetScore}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {Number(targetScore) - Number(currentScore)} points to go
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-semibold text-black">
                {StudyStreak} days
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg font-medium text-black">
                Today's Study Plan
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-600">
                Your personalized study schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-md text-black border border-gray-300 transition-all duration-300 ${
                      completedTasks.includes(index)
                        ? "opacity-50 border-dashed"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        completedTasks.includes(index) ? "line-through" : ""
                      }`}
                    >
                      {task}
                    </p>
                    <button
                      onClick={() => handleTaskCompletion(index)}
                      className={`p-1 rounded-full border border-gray-300 transition-colors ${
                        completedTasks.includes(index)
                          ? "bg-black"
                          : "hover:bg-black"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 border border-gray-300 rounded-sm flex items-center justify-center ${
                          completedTasks.includes(index) ? "bg-black" : ""
                        }`}
                      >
                        {completedTasks.includes(index) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/plan/study-plan">
                  <Button
                    variant="outline"
                    className="w-full border border-gray-300 bg-black hover:bg-gray-800 text-white"
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
          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-black">
                  Performance Insights
                </CardTitle>
                <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              </div>
              <CardDescription className="text-xs sm:text-sm text-gray-600">
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
                        <span className="text-gray-600">{insight.examId}</span>
                        <span className="font-medium text-black">
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
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-black"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-600">
                  No performance data available.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-sm bg-white rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-medium text-black">
                  Practice History
                </CardTitle>
                <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              </div>
              <CardDescription className="text-xs sm:text-sm text-gray-600">
                Your progress over the last {practiceHistory.length} sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {practiceHistory.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-300 pb-2 text-xs sm:text-sm"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-12 sm:w-10 text-gray-600">
                        {new Date(session.timestamp).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="font-medium text-gray-600">
                        {session.section}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">
              Suggested Practice Areas
            </h2>
            <p className="text-gray-600 mb-6">
              Focus on these key subjects to strengthen your weak areas
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Constitutional Law",
                  description: "Master fundamental rights and judicial review",
                  link: "/question-bank/constitutional-law",
                },
                {
                  title: "Contracts",
                  description: "Understand formation, breach, and remedies",
                  link: "/question-bank/contracts",
                },
                {
                  title: "Criminal Law",
                  description: "Learn elements of crimes and defenses",
                  link: "/question-bank/criminal-law-and-procedure",
                },
              ].map((item, index) => (
                <Link href={item.link} key={index} className="block">
                  <Card className="h-full border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-black">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        20+ practice sets
                      </span>
                      <ChevronRight className="w-5 h-5 text-black" />
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-4 mt-3">
              Continue Your Preparation
            </h2>
            <p className="text-gray-600 mb-6">
              Advanced tools to take your studies to the next level
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Tutor",
                  description: "Get personalized feedback on your answers",
                  link: "/plan/ai-coach",
                  badge: "New",
                },
                {
                  title: "Question Bank",
                  description: "500+ practice questions with explanations",
                  link: "/question-bank",
                  badge: "Popular",
                },
                {
                  title: "Mock Exams",
                  description: "Simulate real exam conditions",
                  link: "/practice/mock-exam",
                  badge: "Pro Feature",
                },
              ].map((item, index) => (
                <Link href={item.link} key={index} className="block">
                  <div className="h-full border border-gray-300 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                    {item.badge && (
                      <span className="inline-block mb-3 text-xs font-medium px-2 py-1 rounded-full border border-black text-black">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {item.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Start practicing →
                      </span>
                      <ChevronRight className="w-5 h-5 text-black" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
