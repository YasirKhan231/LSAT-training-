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

export default function StudyPlan() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
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
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate days remaining until the LSAT exam
  const calculateDaysRemaining = (lsatTestDate: string) => {
    const today = new Date();
    const examDate = new Date(lsatTestDate);
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Format the LSAT exam date
  const formatLSATDate = (lsatTestDate: string) => {
    const date = new Date(lsatTestDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/plan">
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

      {showGenerator && uuid ? ( // Only show StudyPlanGenerator if UUID (UID) is available
        <StudyPlanGenerator
          onClose={() => setShowGenerator(false)}
          uuid={uuid} // Pass the UID as the UUID to the StudyPlanGenerator
        />
      ) : (
        <>
          {/* LSAT Exam Date and Scores */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">
                  Your LSAT Exam Date
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  {formatLSATDate(userData.lsatTestDate)} (
                  {calculateDaysRemaining(userData.lsatTestDate)} days
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
                      <CardDescription>Monday, May 12, 2025</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideClock className="h-4 w-4" />
                      <span>3 hours total</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900">
                            <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                          </div>
                          <h3 className="font-medium">
                            Logical Reasoning - Assumption Questions
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideClock className="h-4 w-4" />
                          <span>30 minutes</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Complete 15 practice questions focusing on identifying
                        and evaluating assumptions in arguments.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button>Start Session</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-100 p-1.5 dark:bg-purple-900">
                            <LucideBookOpen className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                          </div>
                          <h3 className="font-medium">
                            Reading Comprehension - Science Passage
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideClock className="h-4 w-4" />
                          <span>45 minutes</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Read a complex science passage and answer 6-8 questions
                        to test your comprehension and analysis skills.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button>Start Session</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                            <LucideBrain className="h-4 w-4 text-green-700 dark:text-green-300" />
                          </div>
                          <h3 className="font-medium">
                            Review Session with AI Coach
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideClock className="h-4 w-4" />
                          <span>15 minutes</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyze yesterday's performance and receive personalized
                        feedback and tips from your AI coach.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button>Start Session</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-amber-100 p-1.5 dark:bg-amber-900">
                            <LucideBookOpen className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                          </div>
                          <h3 className="font-medium">
                            Analytical Reasoning - Logic Games
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideClock className="h-4 w-4" />
                          <span>1 hour</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Practice 2 logic games focusing on grouping and
                        sequencing rules. This is a focus area based on your
                        recent performance.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button>Start Session</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900">
                            <LucideBookOpen className="h-4 w-4 text-red-700 dark:text-red-300" />
                          </div>
                          <h3 className="font-medium">
                            Timed Mini-Section - Logical Reasoning
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideClock className="h-4 w-4" />
                          <span>30 minutes</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Complete a timed section of 12 logical reasoning
                        questions to build your speed and accuracy under test
                        conditions.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button>Start Session</Button>
                      </div>
                    </div>
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
                      <CardDescription>May 12 - May 18, 2025</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideCalendar className="h-4 w-4" />
                      <span>Week 6 of 12</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <div key={day} className="rounded-lg border p-4">
                        <h3 className="mb-3 font-medium">{day}</h3>
                        <div className="space-y-3">
                          {index === 0 ? (
                            <>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                                    <LucideBookOpen className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                                  </div>
                                  <span className="text-sm">
                                    Logical Reasoning - Assumption Questions
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  30 min
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                                    <LucideBookOpen className="h-3 w-3 text-purple-700 dark:text-purple-300" />
                                  </div>
                                  <span className="text-sm">
                                    Reading Comprehension - Science Passage
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  45 min
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                    <LucideBrain className="h-3 w-3 text-green-700 dark:text-green-300" />
                                  </div>
                                  <span className="text-sm">
                                    Review Session with AI Coach
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  15 min
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                                    <LucideBookOpen className="h-3 w-3 text-amber-700 dark:text-amber-300" />
                                  </div>
                                  <span className="text-sm">
                                    Analytical Reasoning - Logic Games
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  1 hr
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
                                    <LucideBookOpen className="h-3 w-3 text-red-700 dark:text-red-300" />
                                  </div>
                                  <span className="text-sm">
                                    Timed Mini-Section - Logical Reasoning
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  30 min
                                </span>
                              </div>
                            </>
                          ) : index === 5 ? (
                            <>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-indigo-100 p-1 dark:bg-indigo-900">
                                    <LucideBookOpen className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />
                                  </div>
                                  <span className="text-sm">
                                    Full Practice Test
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  3 hrs
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                    <LucideBrain className="h-3 w-3 text-green-700 dark:text-green-300" />
                                  </div>
                                  <span className="text-sm">
                                    Test Review with AI Coach
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  1 hr
                                </span>
                              </div>
                            </>
                          ) : index === 6 ? (
                            <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Rest Day</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                0 min
                              </span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                                    <LucideBookOpen className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                                  </div>
                                  <span className="text-sm">
                                    Logical Reasoning Practice
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  1 hr
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                                    <LucideBookOpen className="h-3 w-3 text-amber-700 dark:text-amber-300" />
                                  </div>
                                  <span className="text-sm">
                                    Analytical Reasoning Practice
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  1 hr
                                </span>
                              </div>
                              <div className="flex items-center justify-between rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                                    <LucideBrain className="h-3 w-3 text-green-700 dark:text-green-300" />
                                  </div>
                                  <span className="text-sm">
                                    Review Session
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  30 min
                                </span>
                              </div>
                            </>
                          )}
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
                      <CardDescription>May 2025</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LucideCalendar className="h-4 w-4" />
                      <span>Month 2 of 3</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-3 font-medium">
                        Week 1-2: Focus on Logical Reasoning
                      </h3>
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>Master assumption and inference questions</li>
                        <li>Practice identifying argument structure</li>
                        <li>Complete 200 practice questions</li>
                        <li>Take 2 timed sections</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-3 font-medium">
                        Week 3-4: Focus on Analytical Reasoning
                      </h3>
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>Master complex grouping games</li>
                        <li>Practice hybrid games with multiple rule types</li>
                        <li>Complete 15 full logic game sets</li>
                        <li>Take 2 timed sections</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="mb-3 font-medium">Throughout the Month</h3>
                      <ul className="ml-6 list-disc space-y-2 text-sm">
                        <li>Complete 2 full practice tests</li>
                        <li>Daily review sessions with AI coach</li>
                        <li>Weekly progress assessments</li>
                        <li>Targeted practice on weak areas</li>
                      </ul>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
                      <h3 className="mb-3 font-medium text-green-800 dark:text-green-300">
                        Expected Progress
                      </h3>
                      <p className="text-sm text-green-800 dark:text-green-300">
                        By the end of May, you should see a 3-5 point
                        improvement in your practice test scores, with
                        particular gains in Analytical Reasoning.
                      </p>
                    </div>
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
