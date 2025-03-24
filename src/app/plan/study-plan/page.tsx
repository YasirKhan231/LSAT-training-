"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { ArrowLeft, BookOpen, Clock, Edit } from "lucide-react";
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
import { studyPlans, type StudyPlanKey } from "@/data/plan"; // Import studyPlans and StudyPlanKey

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
      const response = await fetch(`/api/user?uuid=${uid}`);
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
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
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
      <div className="container mx-auto p-6 text-white bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        No user data found.
      </div>
    );
  }

  // Get the study plan based on the planKey
  const studyPlan = studyPlans[planKey];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-white p-6">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/plan">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-[#1a1a1f]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">
              Bar Exam Study Plan
            </h1>
          </div>
          <Button
            onClick={() => setShowGenerator(true)}
            className="bg-gradient-to-r from-[#121218] to-[#1a1a1f] hover:from-[#1a1a1f] hover:to-[#1a1a1f] text-white border-none"
          >
            <Edit className="mr-2 h-4 w-4" />
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
            <div className="mb-6 rounded-lg border border-[#1a1a1f] bg-[#121218]/20 p-4 backdrop-blur-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-white">Your Bar Exam Date</h3>
                  <p className="text-sm text-white">
                    {formatBarExamDate(userData.barExamTestDate)} (
                    {calculateDaysRemaining(userData.barExamTestDate)} days
                    remaining)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    Target Score:{" "}
                    <span className="text-white">{userData.targetScore}</span>
                  </span>
                  <span className="text-sm font-medium text-slate-500">|</span>
                  <span className="text-sm font-medium text-white">
                    Current Score:{" "}
                    <span className="text-white">{userData.currentScore}</span>
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="weekly" className="space-y-6">
              <TabsList className="mb-6 grid w-full grid-cols-3 bg-[#121218] p-1">
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-[#1a1a1f] data-[state=active]:text-white"
                >
                  Daily View
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-[#1a1a1f] data-[state=active]:text-white"
                >
                  Weekly View
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-[#1a1a1f] data-[state=active]:text-white"
                >
                  Monthly View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-6">
                <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">
                          Today's Study Plan
                        </CardTitle>
                        <CardDescription className="text-white">
                          {getTodayDate()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Clock className="h-4 w-4" />
                        <span>3 hours total</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studyPlan.today.map((task: string, index: number) => (
                        <div
                          key={index}
                          className="rounded-lg border border-[#1a1a1f] p-4 bg-[#121218]/20"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-[#121218]/30 p-1.5 border border-[#1a1a1f]/30">
                                <BookOpen className="h-4 w-4 text-white" />
                              </div>
                              <h3 className="font-medium text-white">{task}</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white">
                              <Clock className="h-4 w-4" />
                              <span>30 minutes</span>
                            </div>
                          </div>
                          <p className="text-sm text-white">
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
                <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Weekly Study Plan
                    </CardTitle>
                    <CardDescription className="text-white">
                      {getCurrentWeekDates()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {studyPlan.weekly.map(
                        (tasks: string[], index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border border-[#1a1a1f] p-4 bg-[#121218]/20"
                          >
                            <h3 className="mb-3 font-medium text-white">
                              Week {index + 1}
                            </h3>
                            <ul className="ml-6 list-disc space-y-2">
                              {tasks.map((task, taskIndex) => (
                                <li
                                  key={taskIndex}
                                  className="text-sm text-white"
                                >
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly" className="space-y-6">
                <Card className="border-[#1a1a1f] shadow-xl bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Monthly Study Plan
                    </CardTitle>
                    <CardDescription className="text-white">
                      {getCurrentMonth()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {studyPlan.monthly.map(
                        (tasks: string[], index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border border-[#1a1a1f] p-4 bg-[#121218]/20"
                          >
                            <h3 className="mb-3 font-medium text-white">
                              Month {index + 1}
                            </h3>
                            <ul className="ml-6 list-disc space-y-2">
                              {tasks.map((task, taskIndex) => (
                                <li
                                  key={taskIndex}
                                  className="text-sm text-white"
                                >
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
