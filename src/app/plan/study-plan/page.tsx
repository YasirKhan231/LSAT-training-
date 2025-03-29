"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { ArrowLeft, BookOpen, Clock, Edit } from "lucide-react";
import { usePathname } from "next/navigation";
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
import { studyPlans, type StudyPlanKey } from "@/data/plan";

export default function StudyPlan() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [planKey, setPlanKey] = useState<StudyPlanKey>("terrible");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const pathname = usePathname();

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

  useEffect(() => {
    if (uuid) {
      fetchUserData(uuid);
    }
  }, [pathname, uuid]);

  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
      setPlanKey(data.questionDataKey || "terrible");
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysRemaining = (barExamTestDate: string) => {
    const today = new Date();
    const examDate = new Date(barExamTestDate);
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const formatBarExamDate = (barExamTestDate: string) => {
    const date = new Date(barExamTestDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 6);
    return `${today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })} - ${endOfWeek.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const getCurrentMonth = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 text-red-600 bg-white">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-6 text-gray-900 bg-white">
        No user data found.
      </div>
    );
  }

  const studyPlan = studyPlans[planKey];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-900 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Bar Exam Study Plan
            </h1>
          </div>
          <Button
            onClick={() => setShowGenerator(true)}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            <Edit className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Adjust Plan</span>
            <span className="sm:hidden">Adjust</span>
          </Button>
        </div>

        {showGenerator && uuid ? (
          <StudyPlanGenerator
            onClose={() => setShowGenerator(false)}
            uuid={uuid}
          />
        ) : (
          <>
            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Your Bar Exam Date
                  </h3>
                  <p className="text-sm text-gray-700">
                    {formatBarExamDate(userData.barExamTestDate)} (
                    {calculateDaysRemaining(userData.barExamTestDate)} days
                    remaining)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    Target:{" "}
                    <span className="text-gray-900">
                      {userData.targetScore}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-400">|</span>
                  <span className="text-sm font-medium text-gray-900">
                    Current:{" "}
                    <span className="text-gray-900">
                      {userData.currentScore}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="weekly" className="space-y-6">
              <TabsList className="mb-6 grid w-full grid-cols-3 bg-gray-100 p-1">
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-xs sm:text-sm"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-xs sm:text-sm"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-xs sm:text-sm"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-6">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-gray-900">
                          Today's Study Plan
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {getTodayDate()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
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
                          className="rounded-lg border border-gray-200 p-4 bg-white"
                        >
                          <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-gray-100 p-1.5 border border-gray-200">
                                <BookOpen className="h-4 w-4 text-gray-900" />
                              </div>
                              <h3 className="font-medium text-gray-900">
                                {task}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Clock className="h-4 w-4" />
                              <span>30 minutes</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">
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
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Weekly Study Plan
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {getCurrentWeekDates()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {studyPlan.weekly.map(
                        (tasks: string[], index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border border-gray-200 p-4 bg-white"
                          >
                            <h3 className="mb-3 font-medium text-gray-900">
                              Week {index + 1}
                            </h3>
                            <ul className="ml-4 sm:ml-6 list-disc space-y-2 text-gray-700">
                              {tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm">
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
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">
                      Monthly Study Plan
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {getCurrentMonth()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {studyPlan.monthly.map(
                        (tasks: string[], index: number) => (
                          <div
                            key={index}
                            className="rounded-lg border border-gray-200 p-4 bg-white"
                          >
                            <h3 className="mb-3 font-medium text-gray-900">
                              Month {index + 1}
                            </h3>
                            <ul className="ml-4 sm:ml-6 list-disc space-y-2 text-gray-700">
                              {tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="text-sm">
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
