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
  practiceHistory: {
    timestamp: string;
    section: string;
    score: number;
    totalQuestions: number;
    timeTaken: number;
  }[];
  currentScore: string;
  StudyStreak: number;
  performanceInsights: {
    section: string;
    score: number;
  }[];
  lsatTestDate: string;
  PracticeQuestions: number;
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
      const response = await fetch(`/api/dashboard?uuid=${uid}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

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
        setUuid(user.uid); // Set the UUID
        setUserName(user.displayName || user.email?.split("@")[0] || "User"); // Set the username
        fetchUserData(user.uid); // Fetch user data
      } else {
        console.error("User not authenticated");
        setUuid(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Re-fetch data when the route changes or UUID changes
  useEffect(() => {
    if (uuid) {
      fetchUserData(uuid);
    }
  }, [uuid]);

  // Countdown timer for LSAT exam date (dynamic from user data)
  useEffect(() => {
    if (!userData?.lsatTestDate) return;

    const examDate = new Date(userData.lsatTestDate).getTime();

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
  }, [userData?.lsatTestDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  // Extract data from the response
  const {
    practiceHistory = [],
    currentScore = "0",
    StudyStreak = 0,
    performanceInsights = [],
    PracticeQuestions = 0,
  } = userData;

  // Calculate the number of practice sessions completed
  const practiceCompleted = practiceHistory.length;

  // Format the LSAT exam date to display the month name
  const formatLsatTestDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <header className="py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Welcome back, {userName}!
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Track your progress and continue your LSAT preparation
              </p>
            </div>

            {/* Smaller Countdown Timer */}
            <Card className="w-64 border-blue-100 shadow-md bg-gradient-to-r from-blue-50 to-white">
              <CardHeader className="pb-1 pt-3">
                <CardTitle className="text-sm text-blue-700">
                  LSAT Exam: {formatLsatTestDate(userData.lsatTestDate)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-4 gap-1 text-center">
                  <div className="bg-white p-2 rounded-md shadow-sm border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">
                      {timeRemaining.days}
                    </div>
                    <div className="text-xs text-gray-500">Days</div>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-sm border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">
                      {timeRemaining.hours}
                    </div>
                    <div className="text-xs text-gray-500">Hrs</div>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-sm border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">
                      {timeRemaining.minutes}
                    </div>
                    <div className="text-xs text-gray-500">Min</div>
                  </div>
                  <div className="bg-white p-2 rounded-md shadow-sm border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">
                      {timeRemaining.seconds}
                    </div>
                    <div className="text-xs text-gray-500">Sec</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Stats Overview */}
          {/* <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Practice Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-blue-600">
                {practiceCompleted}
              </div>
            </CardContent>
          </Card> */}
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-blue-600">
                {PracticeQuestions}
              </div>
            </CardContent>
          </Card>

          {/* Current Score */}
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-blue-600">
                {currentScore}
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-blue-600">
                {StudyStreak} days
              </div>
            </CardContent>
          </Card>

          {/* Practice Questions */}
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Section Performance
                </CardTitle>
                <BarChart className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>
                {performanceInsights.length > 0
                  ? "Your performance across different LSAT sections"
                  : "We can't fetch your performance. Please practice more."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {performanceInsights.length > 0 ? (
                <div className="space-y-4">
                  {performanceInsights.map((insight, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{insight.section}</span>
                        <span className="font-medium">{insight.score}%</span>
                      </div>
                      <Progress
                        value={insight.score}
                        className="h-2 bg-blue-100"
                        indicatorClassName="bg-blue-600"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No performance data available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Practice History */}
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Practice History
                </CardTitle>
                <LineChart className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>
                Your progress over the last {practiceHistory.length} practice
                sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {practiceHistory.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-blue-50 pb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 text-xs text-gray-500">
                        {new Date(session.timestamp).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        {session.section}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Practice */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">
            Suggested Practice (Based on your performance)
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                title: "Analytical Reasoning",
                description:
                  "Focus on logic games to improve your weakest section",
                link: "/practice/analytical-reasoning",
              },
              {
                title: "Logical Reasoning - Assumption Questions",
                description: "Practice identifying assumptions in arguments",
                link: "/practice/logical-reasoning/assumptions",
              },
              {
                title: "Reading Comprehension - Science Passages",
                description:
                  "Improve your comprehension of scientific material",
                link: "/practice/reading-comprehension/science",
              },
            ].map((item, index) => (
              <Link href={item.link} key={index} className="block">
                <Card className="h-full border-blue-100 shadow-md transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </CardContent>
                  <CardFooter className="bg-blue-50 flex justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-500"
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

        <div className="mt-8 mb-8">
          <h2 className="text-lg font-medium text-gray-900">
            Continue your preparation
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link href="/practice/ai-tutor" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg border border-blue-100 transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Practice with AI Tutor
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Get personalized feedback and guidance from an AI tutor
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
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

            <Link href="/practice/question-bank" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg border border-blue-100 transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Question Bank
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Practice with our extensive library of LSAT questions
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
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

            <Link href="/practice/mock-exam" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg border border-blue-100 transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mock Exams
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Test your skills with timed practice exams
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
