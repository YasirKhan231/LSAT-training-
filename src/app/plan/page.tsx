"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import app from "@/lib/firebase"; // Initialize Firebase app
import {
  LucideArrowRight,
  LucideBookOpen,
  LucideBarChart,
  LucideClock,
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
import { studyPlans, StudyPlanKey } from "@/data/plan";

export default function Dashboard() {
  const [uuid, setUuid] = useState<string | null>(null); // State to store UUID (Firebase UID)
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const [planKey, setPlanKey] = useState<StudyPlanKey>("terrible"); // State to store plan key
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors
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
      const response = await fetch(`/api/plan/generate-plan?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data); // Set user data in state

      // Determine planKey based on currentScore
      const currentScore = Number(data.currentScore);
      if (currentScore >= 170) {
        setPlanKey("amazing");
      } else if (currentScore >= 160) {
        setPlanKey("good");
      } else if (currentScore >= 150) {
        setPlanKey("decent");
      } else if (currentScore >= 140) {
        setPlanKey("bad");
      } else {
        setPlanKey("terrible");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Calculate days remaining until the LSAT exam
  const calculateDaysRemaining = (lsatTestDate: string) => {
    const today = new Date();
    const examDate = new Date(lsatTestDate);
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Loading UI
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        {/* Header Skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Today's Study Plan Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  if (!userData) {
    return <div className="container mx-auto p-6">No data found.</div>;
  }

  // Get the study plan based on the planKey
  const studyPlan = studyPlans[planKey];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {userData.displayName}
        </h1>
        <p className="text-muted-foreground">
          Your LSAT exam is in {calculateDaysRemaining(userData.lsatTestDate)}{" "}
          days. Here's your progress so far.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {userData.StudyStreak} days
              </div>
              <LucideClock className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Practice Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {userData.PracticeQuestions}
              </div>
              <LucideBookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Completed this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{userData.currentScore}</div>
              <LucideBarChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              +3 from last practice test
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Target Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{userData.targetScore}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">
              {Number(userData.targetScore) - Number(userData.currentScore)}{" "}
              points to go
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Today's Study Plan</CardTitle>
            <CardDescription>
              Your personalized study schedule for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyPlan.today.map((task: string, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                    <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{task}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/plan/study-plan">
                <Button variant="outline" className="w-full">
                  View Full Study Plan
                  <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
