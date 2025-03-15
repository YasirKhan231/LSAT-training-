"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LucideArrowLeft,
  LucideBookOpen,
  LucideBrain,
  LucideCalendar,
  LucideClock,
  LucideEdit,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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

interface Task {
  title: string;
  duration: string;
  description?: string;
}

interface Day {
  day: string;
  tasks: Task[];
}

interface Week {
  title: string;
  tasks: string[];
}

interface StudyPlan {
  lsatTestDate: string;
  targetScore: number;
  currentScore?: number;
  day1?: Task[];
  weekly?: Day[];
  monthly?: Week[];
}

export default function StudyPlan() {
  const { user } = useAuth();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchStudyPlan(user.uid);
    }
  }, [user]);

  const fetchStudyPlan = async (uid: string) => {
    try {
      const response = await fetch(`/api/plan/study-plan?uid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch study plan");
      }
      const data = await response.json();
      console.log("Fetched Study Plan:", data.studyPlan);
      setStudyPlan(data.studyPlan);
    } catch (error) {
      console.error("Error fetching study plan:", error);
      setError("Failed to fetch study plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("Rendering Study Plan:", studyPlan);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/plain">
            <Button variant="ghost" size="icon">
              <LucideArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Study Plan</h1>
        </div>
        <Button onClick={() => setShowGenerator(true)}>
          <LucideEdit className="mr-2 h-4 w-4" />
          Adjust Plan
        </Button>
      </div>

      {showGenerator ? (
        <StudyPlanGenerator onClose={() => setShowGenerator(false)} />
      ) : (
        <>
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">
                  Your LSAT Exam Date
                </h3>
                {studyPlan ? (
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    {new Date(studyPlan.lsatTestDate).toLocaleDateString()} (
                    {Math.ceil(
                      (new Date(studyPlan.lsatTestDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining)
                  </p>
                ) : (
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    No study plan available
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Target Score: {studyPlan?.targetScore ?? "N/A"}
                </span>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  |
                </span>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Current Score: {studyPlan?.currentScore ?? "N/A"}
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
                      <CardDescription>
                        {new Date().toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideClock className="h-4 w-4" />
                      <span>3 hours total</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyPlan?.day1?.map((task: Task, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900">
                              <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                            </div>
                            <h3 className="font-medium">{task.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <LucideClock className="h-4 w-4" />
                            <span>{task.duration}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <Button>Start Session</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Weekly Study Plan</CardTitle>
                      <CardDescription>
                        {new Date().toLocaleDateString()} -{" "}
                        {new Date(
                          new Date().getTime() + 6 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideCalendar className="h-4 w-4" />
                      <span>Week 1 of 12</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studyPlan?.weekly?.map((day: Day, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h3 className="mb-3 font-medium">{day.day}</h3>
                        <div className="space-y-3">
                          {day.tasks.map((task: Task, taskIndex: number) => (
                            <div
                              key={taskIndex}
                              className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900"
                            >
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                                  <LucideBookOpen className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                                </div>
                                <span className="text-sm">{task.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {task.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Monthly Study Plan</CardTitle>
                      <CardDescription>
                        {new Date().toLocaleDateString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideCalendar className="h-4 w-4" />
                      <span>Month 1 of 3</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studyPlan?.monthly?.map((week: Week, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h3 className="mb-3 font-medium">{week.title}</h3>
                        <ul className="ml-6 list-disc space-y-2 text-sm">
                          {week.tasks.map((task: string, taskIndex: number) => (
                            <li key={taskIndex}>{task}</li>
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
