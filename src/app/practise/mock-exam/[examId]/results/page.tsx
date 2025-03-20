"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "../../../../../../components/ProtectRoute";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BrainCircuit,
  Download,
} from "lucide-react";

import { ExamResults } from "@/lib/types";

// Mock results data
const mockResults: Record<string, ExamResults> = {
  "constitutional-law": {
    title: "Constitutional Law",
    score: 157,
    percentile: 68,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "cl-1",
        title: "Constitutional Law I",
        score: 74,
        timeSpent: 30,
        correct: 74,
        incorrect: 26,
        skipped: 0,
        averageTimePerQuestion: 72,
      },
      {
        id: "cl-2",
        title: "Constitutional Law II",
        score: 83,
        timeSpent: 28,
        correct: 83,
        incorrect: 17,
        skipped: 0,
        averageTimePerQuestion: 68,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving the First Amendment. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving the Equal Protection Clause. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["First Amendment - Free Speech", "Equal Protection Clause"],
    strengths: ["Due Process Clause", "Commerce Clause"],
  },
  contracts: {
    title: "Contracts",
    score: 162,
    percentile: 72,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "ct-1",
        title: "Contracts I",
        score: 78,
        timeSpent: 32,
        correct: 78,
        incorrect: 22,
        skipped: 0,
        averageTimePerQuestion: 75,
      },
      {
        id: "ct-2",
        title: "Contracts II",
        score: 84,
        timeSpent: 30,
        correct: 84,
        incorrect: 16,
        skipped: 0,
        averageTimePerQuestion: 70,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You maintained a good pace across all sections, with slightly more time spent on questions involving consideration.",
      },
      {
        title: "Error Patterns",
        content:
          "You missed a few questions involving the Statute of Frauds. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["Statute of Frauds", "Consideration"],
    strengths: ["Offer and Acceptance", "Remedies for Breach"],
  },
  "criminal-law-procedure": {
    title: "Criminal Law & Procedure",
    score: 155,
    percentile: 65,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "cr-1",
        title: "Criminal Law I",
        score: 72,
        timeSpent: 31,
        correct: 72,
        incorrect: 28,
        skipped: 0,
        averageTimePerQuestion: 74,
      },
      {
        id: "cr-2",
        title: "Criminal Procedure I",
        score: 83,
        timeSpent: 29,
        correct: 83,
        incorrect: 17,
        skipped: 0,
        averageTimePerQuestion: 69,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving the Fourth Amendment. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving the Fifth Amendment. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: [
      "Fourth Amendment - Search and Seizure",
      "Fifth Amendment - Self-Incrimination",
    ],
    strengths: ["Sixth Amendment - Right to Counsel", "Elements of Crimes"],
  },
  "civil-procedure": {
    title: "Civil Procedure",
    score: 160,
    percentile: 70,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "cp-1",
        title: "Civil Procedure I",
        score: 76,
        timeSpent: 33,
        correct: 76,
        incorrect: 24,
        skipped: 0,
        averageTimePerQuestion: 76,
      },
      {
        id: "cp-2",
        title: "Civil Procedure II",
        score: 84,
        timeSpent: 30,
        correct: 84,
        incorrect: 16,
        skipped: 0,
        averageTimePerQuestion: 71,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving jurisdiction. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving the Erie Doctrine. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["Jurisdiction", "Erie Doctrine"],
    strengths: ["Pleadings", "Discovery"],
  },
  evidence: {
    title: "Evidence",
    score: 158,
    percentile: 69,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "ev-1",
        title: "Evidence I",
        score: 75,
        timeSpent: 32,
        correct: 75,
        incorrect: 25,
        skipped: 0,
        averageTimePerQuestion: 73,
      },
      {
        id: "ev-2",
        title: "Evidence II",
        score: 83,
        timeSpent: 30,
        correct: 83,
        incorrect: 17,
        skipped: 0,
        averageTimePerQuestion: 70,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving hearsay. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving the Best Evidence Rule. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["Hearsay", "Best Evidence Rule"],
    strengths: ["Relevance", "Privileges"],
  },
  "real-property": {
    title: "Real Property",
    score: 164,
    percentile: 74,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "rp-1",
        title: "Real Property I",
        score: 80,
        timeSpent: 31,
        correct: 80,
        incorrect: 20,
        skipped: 0,
        averageTimePerQuestion: 72,
      },
      {
        id: "rp-2",
        title: "Real Property II",
        score: 84,
        timeSpent: 29,
        correct: 84,
        incorrect: 16,
        skipped: 0,
        averageTimePerQuestion: 68,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving easements. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving the Rule Against Perpetuities. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["Easements", "Rule Against Perpetuities"],
    strengths: ["Landlord-Tenant Law", "Deeds and Titles"],
  },
  torts: {
    title: "Torts",
    score: 159,
    percentile: 71,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "to-1",
        title: "Torts I",
        score: 77,
        timeSpent: 32,
        correct: 77,
        incorrect: 23,
        skipped: 0,
        averageTimePerQuestion: 74,
      },
      {
        id: "to-2",
        title: "Torts II",
        score: 82,
        timeSpent: 30,
        correct: 82,
        incorrect: 18,
        skipped: 0,
        averageTimePerQuestion: 70,
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on questions involving negligence. Consider practicing more questions in this area to improve your speed.",
      },
      {
        title: "Error Patterns",
        content:
          "You frequently missed questions involving strict liability. This is a pattern worth addressing through targeted practice.",
      },
    ],
    weaknesses: ["Negligence", "Strict Liability"],
    strengths: ["Intentional Torts", "Defenses to Torts"],
  },
};

export default function ResultsPage() {
  const params = useParams();
  const examId = params.examId as string;

  const results = mockResults[examId as keyof typeof mockResults];

  if (!results) {
    return <div>Results not found</div>;
  }

  const getTotalQuestions = () => {
    return results.sections.reduce(
      (acc, section) =>
        acc + section.correct + section.incorrect + section.skipped,
      0
    );
  };

  const getTotalCorrect = () => {
    return results.sections.reduce((acc, section) => acc + section.correct, 0);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Exam Results & Analysis
            </h1>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Results
              </Button>
              <Link href="/practise/mock-exam">
                <Button size="sm">Take Another Exam</Button>
              </Link>
            </div>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            AI-powered analysis of your {results.title} performance
          </p>
        </header>

        {/* Score Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                BAR Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-blue-600">
                  {results.score}
                </span>
                <span className="ml-2 text-gray-500">/ 180</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {results.percentile}th percentile
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-green-600">
                  {getTotalCorrect()}
                </span>
                <span className="ml-2 text-gray-500">
                  / {getTotalQuestions()} correct
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((getTotalCorrect() / getTotalQuestions()) * 100)}%
                accuracy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                Time Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-purple-600">
                  {results.sections.reduce(
                    (acc, section) => acc + section.timeSpent,
                    0
                  )}
                </span>
                <span className="ml-2 text-gray-500">minutes total</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                ~
                {Math.round(
                  results.sections.reduce(
                    (acc, section) => acc + section.averageTimePerQuestion,
                    0
                  ) / results.sections.length
                )}{" "}
                seconds per question
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Results Interface */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-analysis">
              <BrainCircuit className="h-4 w-4 mr-1" />
              AI Analysis
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Correct</span>
                        <span className="text-sm text-gray-500">
                          {getTotalCorrect()} questions
                        </span>
                      </div>
                      <Progress
                        value={(getTotalCorrect() / getTotalQuestions()) * 100}
                        className="h-2 bg-gray-100"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Incorrect</span>
                        <span className="text-sm text-gray-500">
                          {results.sections.reduce(
                            (acc, section) => acc + section.incorrect,
                            0
                          )}{" "}
                          questions
                        </span>
                      </div>
                      <Progress
                        value={
                          (results.sections.reduce(
                            (acc, section) => acc + section.incorrect,
                            0
                          ) /
                            getTotalQuestions()) *
                          100
                        }
                        className="h-2 bg-gray-100"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Skipped</span>
                        <span className="text-sm text-gray-500">
                          {results.sections.reduce(
                            (acc, section) => acc + section.skipped,
                            0
                          )}{" "}
                          questions
                        </span>
                      </div>
                      <Progress
                        value={
                          (results.sections.reduce(
                            (acc, section) => acc + section.skipped,
                            0
                          ) /
                            getTotalQuestions()) *
                          100
                        }
                        className="h-2 bg-gray-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis">
            <div className="space-y-6">
              {results.aiInsights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center">
                      <BrainCircuit className="h-5 w-5 text-blue-500 mr-2" />
                      <CardTitle>{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{insight.content}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  AI-Generated Study Recommendation
                </h3>
                <p className="text-blue-700 mb-4">
                  Based on your performance, I recommend focusing on the
                  following areas:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>
                      Practice analytical reasoning games with grouping rules
                      (3-4 sessions per week)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>
                      Review conditional logic in logical reasoning questions
                      (focus on necessary vs. sufficient conditions)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>
                      Work on science-focused reading comprehension passages to
                      improve comprehension and speed
                    </span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Personalized Study Plan
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
