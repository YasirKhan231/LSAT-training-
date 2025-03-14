import Link from "next/link";
import {
  LucideArrowRight,
  LucideBarChart,
  LucideBookOpen,
  LucideBrain,
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
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, John</h1>
        <p className="text-muted-foreground">
          Your LSAT exam is in 45 days. Here's your progress so far.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7 days</div>
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
              <div className="text-2xl font-bold">245</div>
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
              <div className="text-2xl font-bold">162</div>
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
              <div className="text-2xl font-bold">170</div>
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
            <p className="text-xs text-muted-foreground">8 points to go</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Study Plan</CardTitle>
            <CardDescription>
              Your personalized study schedule for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                  <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">
                    Logical Reasoning - Assumption Questions
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Complete 15 practice questions (30 minutes)
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                  <LucideBookOpen className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">
                    Reading Comprehension - Science Passage
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Read and answer questions (45 minutes)
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-0.5 rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <LucideBrain className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">
                    Review Session with AI Coach
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Analyze yesterday's performance (15 minutes)
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/plain/study-plan">
                <Button variant="outline" className="w-full">
                  View Full Study Plan
                  <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance by Section</CardTitle>
            <CardDescription>
              Your strengths and areas for improvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Logical Reasoning</p>
                  <p className="text-sm font-medium">75%</p>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Analytical Reasoning</p>
                  <p className="text-sm font-medium">68%</p>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Reading Comprehension</p>
                  <p className="text-sm font-medium">82%</p>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
              <h4 className="mb-2 font-medium text-amber-800 dark:text-amber-300">
                AI Recommendation
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Focus on improving your Analytical Reasoning skills. I've added
                extra logic games practice to your study plan.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/plain/ai-coach">
                <Button variant="outline" className="w-full">
                  Talk to AI Coach
                  <LucideBrain className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
