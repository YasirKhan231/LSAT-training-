"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import app from "@/lib/firebase"; // Initialize Firebase app
import {
  ArrowRight,
  BookOpen,
  BarChart,
  Clock,
  Zap,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import hardcoded study plan data
import { studyPlans, type StudyPlanKey } from "@/data/plan";

export default function Dashboard() {
  const [uuid, setUuid] = useState<string | null>(null); // State to store UUID (Firebase UID)
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [tasks, setTasks] = useState<string[]>([]); // State to manage tasks
  const auth = getAuth(app); // Initialize Firebase Auth

  // Fetch the authenticated user's UID when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUuid(user.uid); // Set the UUID (Firebase UID)
        fetchUserData(user.uid); // Fetch user data
      } else {
        console.error("User not authenticated");
        setUuid(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Fetch user data from the backend API
  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data); // Set user data in state

      // Initialize tasks from the study plan
      const questionDataKey = data.questionDataKey as StudyPlanKey;
      const studyPlan = studyPlans[questionDataKey] || studyPlans["terrible"];
      setTasks(studyPlan.today); // Set tasks for the day
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Handle task completion
  const handleTaskCompletion = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index)); // Remove the task from the list
  };

  // Calculate days remaining until the Bar Exam
  const calculateDaysRemaining = (barExamTestDate: string) => {
    const today = new Date();
    const examDate = new Date(barExamTestDate);
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Loading UI with dark theme
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-400 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-6 text-gray-300 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        No data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-gray-300 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {userData.displayName}
          </h1>
          <p className="text-gray-400">
            Your Bar Exam is in{" "}
            {calculateDaysRemaining(userData.barExamTestDate)} days. Here's your
            progress so far.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-400">
                  {userData.StudyStreak} days
                </div>
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </CardContent>
          </Card>
          <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Practice Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-400">
                  {userData.PracticeQuestions}
                </div>
                <BookOpen className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">Completed this month</p>
            </CardContent>
          </Card>
          <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-400">
                  {userData.currentScore}
                </div>
                <BarChart className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                +3 from last practice test
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Target Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-400">
                  {userData.targetScore}
                </div>
                <Zap className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                {Number(userData.targetScore) - Number(userData.currentScore)}{" "}
                points to go
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Today's Study Plan</CardTitle>
              <CardDescription className="text-gray-400">
                Your personalized study schedule for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1f]/30 border border-[#2a2a2f]/30"
                  >
                    <p className="font-medium text-gray-300">{task}</p>
                    <button
                      onClick={() => handleTaskCompletion(index)}
                      className="p-1 rounded-full border border-[#2a2a2f] hover:bg-[#2a2a2f] transition-colors"
                    >
                      <div className="h-4 w-4 border border-gray-400 rounded-sm"></div>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/plan/study-plan">
                  <Button
                    variant="outline"
                    className="w-full border-[#2a2a2f] bg-[#1a1a1f]/50 hover:bg-[#2a2a2f] text-gray-300"
                  >
                    View Full Study Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
