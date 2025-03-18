"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import {
  LucideArrowLeft,
  LucideBookOpen,
  LucideBrain,
  LucideCalendar,
  LucideClock,
  LucideEdit,
} from "lucide-react";
import { usePathname } from "next/navigation"; // Use `usePathname` from `next/navigation`
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudyPlanGenerator } from "@/components/study-plan-generator";
import { studyPlans, StudyPlanKey } from "@/data/plan"; // Import studyPlans and StudyPlanKey

export default function StudyPlan() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [planKey, setPlanKey] = useState<StudyPlanKey>("terrible"); // State to store plan key
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const pathname = usePathname(); // Use `usePathname` to detect route changes

  // Fetch the authenticated user's UID when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUuid(user.uid);
        fetchUserData(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Re-fetch data when the route changes or UUID changes
  useEffect(() => {
    if (uuid) {
      fetchUserData(uuid);
    }
  }, [pathname, uuid]); // Use `pathname` instead of `router.pathname`

  // Fetch user data from the backend API
  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/plan/generate-plan?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);

      // Set planKey based on questionDataKey from the database
      setPlanKey(data.questionDataKey || "terrible");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate days remaining until the Bar Exam
  const calculateDaysRemaining = (barExamTestDate: string) => {
    const today = new Date();
    const examDate = new Date(barExamTestDate);
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Format the Bar Exam date
  const formatBarExamDate = (barExamTestDate: string) => {
    const date = new Date(barExamTestDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get today's date in a readable format
  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get the current week's date range (from today to 7 days later)
  const getCurrentWeekDates = () => {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 6); // Add 6 days to get the end of the week

    const startDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const endDate = endOfWeek.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${startDate} - ${endDate}`;
  };

  // Get the current month and year
  const getCurrentMonth = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-600">{error}</div>;
  }

  if (!userData) {
    return <div className="container mx-auto p-6">No user data found.</div>;
  }

  // Get the study plan based on the planKey
  const studyPlan = studyPlans[planKey];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/plan">
            <Button variant="ghost" size="icon">
              <LucideArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Bar Exam Study Plan</h1>
        </div>
        <Button onClick={() => setShowGenerator(true)}>
          <LucideEdit className="mr-2 h-4 w-4" />
          Adjust Plan
        </Button>
      </div>

      {showGenerator && uuid ? ( // Only show StudyPlanGenerator if UUID (UID) is available
        <StudyPlanGenerator
          onClose={() => setShowGenerator(false)}
          uuid={uuid} // Pass the UID as the UUID to the StudyPlanGenerator
        />
      ) : (
        <>
          {/* Bar Exam Date and Scores */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">
                  Your Bar Exam Date
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  {formatBarExamDate(userData.barExamTestDate)} (
                  {calculateDaysRemaining(userData.barExamTestDate)} days
                  remaining)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Target Score: {userData.targetScore}
                </span>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  |
                </span>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Current Score: {userData.currentScore}
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="weekly">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily View</TabsTrigger>
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Today's Study Plan</CardTitle>
                      <CardDescription>{getTodayDate()}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideClock className="h-4 w-4" />
                      <span>3 hours total</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyPlan.today.map((task: string, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900">
                              <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                            </div>
                            <h3 className="font-medium">{task}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <LucideClock className="h-4 w-4" />
                            <span>30 minutes</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Complete 15 practice questions focusing on{" "}
                          {task.toLowerCase()}.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Study Plan</CardTitle>
                  <CardDescription>{getCurrentWeekDates()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studyPlan.weekly.map((tasks: string[], index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h3 className="mb-3 font-medium">Week {index + 1}</h3>
                        <ul className="ml-6 list-disc space-y-2">
                          {tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm">
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Study Plan</CardTitle>
                  <CardDescription>{getCurrentMonth()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studyPlan.monthly.map((tasks: string[], index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h3 className="mb-3 font-medium">Month {index + 1}</h3>
                        <ul className="ml-6 list-disc space-y-2">
                          {tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm">
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
