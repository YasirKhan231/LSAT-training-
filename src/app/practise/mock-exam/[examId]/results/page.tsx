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

// This would come from your API in a real implementation
const mockResults = {
  "prep-test-71": {
    score: 157,
    percentile: 68,
    timestamp: new Date().toISOString(),
    sections: [
      {
        id: "lr-1",
        title: "Logical Reasoning I",
        score: 18, // out of 25
        timeSpent: 33, // minutes
        correct: 18,
        incorrect: 7,
        skipped: 0,
        averageTimePerQuestion: 79, // seconds
      },
      {
        id: "rc",
        title: "Reading Comprehension",
        score: 21, // out of 27
        timeSpent: 35, // minutes
        correct: 21,
        incorrect: 6,
        skipped: 0,
        averageTimePerQuestion: 77, // seconds
      },
      {
        id: "ar",
        title: "Analytical Reasoning",
        score: 16, // out of 23
        timeSpent: 35, // minutes
        correct: 16,
        incorrect: 7,
        skipped: 0,
        averageTimePerQuestion: 91, // seconds
      },
      {
        id: "lr-2",
        title: "Logical Reasoning II",
        score: 19, // out of 25
        timeSpent: 34, // minutes
        correct: 19,
        incorrect: 6,
        skipped: 0,
        averageTimePerQuestion: 81, // seconds
      },
    ],
    aiInsights: [
      {
        title: "Timing Analysis",
        content:
          "You spent more time than average on analytical reasoning questions, particularly those involving grouping rules. Consider practicing more logic games to improve your speed in this area.",
      },
      {
        title: "Error Patterns",
        content:
          "In logical reasoning sections, you frequently missed questions involving necessary vs. sufficient conditions. This is a pattern worth addressing through targeted practice.",
      },
      {
        title: "Reading Speed",
        content:
          "Your reading speed was consistent across passages, but you could improve comprehension of science-related topics, where you had lower accuracy.",
      },
      {
        title: "Improvement Plan",
        content:
          "Based on your performance, I recommend focusing on analytical reasoning games with grouping rules and logical reasoning questions that test conditional logic.",
      },
    ],
    weaknesses: [
      "Analytical Reasoning - Grouping Games",
      "Logical Reasoning - Conditional Logic",
      "Reading Comprehension - Science Passages",
    ],
    strengths: [
      "Logical Reasoning - Assumption Questions",
      "Reading Comprehension - Humanities Passages",
      "Pacing on Reading Comprehension",
    ],
  },
};

// Mock game data - in a real app, this would come from your database
const mockGames = {
  "office-assignment": {
    // Your existing game data...
  },

  // Add the "Race Lineup" game (Sequencing)
  "race-lineup": {
    title: "Race Lineup",
    type: "Sequencing",
    difficulty: "Easy",
    description:
      "Six runners (J, K, L, M, N, and P) must be arranged in six consecutive positions at the starting line of a race.",
    rules: [
      "J must be positioned somewhere ahead of K (not necessarily immediately ahead).",
      "L must be either in position 1 or position 6.",
      "M must be in a position immediately adjacent to N.",
      "P must be in position 3 or position 4.",
      "K cannot be in position 2.",
    ],
    elements: ["J", "K", "L", "M", "N", "P"],
    slots: [1, 2, 3, 4, 5, 6],
    questions: [
      {
        id: "q1",
        text: "Which one of the following could be the arrangement of runners, from position 1 to position 6?",
        choices: [
          { id: "A", text: "J, M, P, N, K, L" },
          { id: "B", text: "L, J, P, K, M, N" },
          { id: "C", text: "L, N, P, M, J, K" },
          { id: "D", text: "M, J, P, K, N, L" },
          { id: "E", text: "N, M, P, J, K, L" },
        ],
        correctAnswer: "A",
        explanation:
          "Option A satisfies all constraints: J (position 1) is ahead of K (position 5); L is in position 6 (either 1 or 6); M (position 2) is adjacent to N (position 4); P is in position 3; and K is not in position 2.",
      },
      // Additional questions...
    ],
  },

  // Add the "Committee Selection" game (Grouping)
  "committee-selection": {
    title: "Committee Selection",
    type: "Grouping",
    difficulty: "Medium",
    description:
      "Eight individuals (A through H) must be selected to form three different committees according to specific membership requirements.",
    rules: [
      "The planning committee must have exactly three members.",
      "The budget committee must have exactly two members.",
      "The outreach committee must have exactly three members.",
      "A and B cannot serve on the same committee.",
      "If C is on the planning committee, then D must be on the budget committee.",
      "E must be on either the planning committee or the outreach committee.",
      "F and G must serve on the same committee.",
      "H cannot serve on the budget committee.",
    ],
    elements: ["A", "B", "C", "D", "E", "F", "G", "H"],
    slots: ["Planning", "Budget", "Outreach"],
    questions: [
      {
        id: "q1",
        text: "Which of the following could be a valid committee assignment?",
        choices: [
          {
            id: "A",
            text: "Planning: A, C, E; Budget: D, H; Outreach: B, F, G",
          },
          {
            id: "B",
            text: "Planning: A, E, H; Budget: B, D; Outreach: C, F, G",
          },
          {
            id: "C",
            text: "Planning: C, F, G; Budget: A, D; Outreach: B, E, H",
          },
          {
            id: "D",
            text: "Planning: E, F, G; Budget: A, D; Outreach: B, C, H",
          },
          {
            id: "E",
            text: "Planning: B, E, H; Budget: C, D; Outreach: A, F, G",
          },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Planning has 3 members; Budget has 2 members; Outreach has 3 members; A and B are on different committees; C is not on planning so D doesn't need to be on budget (but D is on budget anyway); E is on planning; F and G are on the same committee (planning); H is not on budget.",
      },
      // Additional questions...
    ],
  },

  // Add the "Gift Selection" game (Selection)
  "gift-selection": {
    title: "Gift Selection",
    type: "Selection",
    difficulty: "Easy",
    description:
      "Four gifts must be selected from a collection of seven items (Q, R, S, T, U, V, and W) according to recipient preferences.",
    rules: [
      "If Q is selected, then R cannot be selected.",
      "If S is selected, then both T and U must be selected.",
      "Either V or W must be selected, but not both.",
      "If W is selected, then Q must be selected.",
    ],
    elements: ["Q", "R", "S", "T", "U", "V", "W"],
    slots: ["Selected", "Not Selected"],
    questions: [
      {
        id: "q1",
        text: "Which of the following could be a complete and accurate list of the selected gifts?",
        choices: [
          { id: "A", text: "Q, S, T, V" },
          { id: "B", text: "Q, T, U, W" },
          { id: "C", text: "Q, S, T, U" },
          { id: "D", text: "Q, T, U, V" },
          { id: "E", text: "R, S, T, U" },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Q is selected but R is not; S is not selected so T and U don't have to be selected together (though both are selected); V is selected and W is not selected; and since W is not selected, the rule about Q being selected if W is selected doesn't apply.",
      },
      // Additional questions...
    ],
  },

  // Add the "Job Assignments" game (Hybrid)
  "job-assignments": {
    title: "Job Assignments",
    type: "Hybrid (Sequencing & Selection)",
    difficulty: "Hard",
    description:
      "Six employees must be assigned to different projects and scheduled to work on specific days of the week.",
    rules: [
      "Each employee works on exactly one day from Monday to Friday.",
      "No more than two employees can work on the same day.",
      "Project A requires J and K to work on consecutive days.",
      "Project B requires L to work on Monday or Tuesday.",
      "Project C requires M to work on Wednesday if N works on Thursday.",
      "Project D requires P to work on the same day as another employee.",
    ],
    elements: ["J", "K", "L", "M", "N", "P"],
    slots: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    questions: [
      {
        id: "q1",
        text: "Which of the following is an acceptable schedule of workdays?",
        choices: [
          {
            id: "A",
            text: "J: Monday; K: Tuesday; L: Monday; M: Wednesday; N: Thursday; P: Friday",
          },
          {
            id: "B",
            text: "J: Monday; K: Wednesday; L: Monday; M: Tuesday; N: Thursday; P: Tuesday",
          },
          {
            id: "C",
            text: "J: Tuesday; K: Monday; L: Tuesday; M: Thursday; N: Wednesday; P: Thursday",
          },
          {
            id: "D",
            text: "J: Tuesday; K: Wednesday; L: Monday; M: Friday; N: Thursday; P: Monday",
          },
          {
            id: "E",
            text: "J: Wednesday; K: Thursday; L: Monday; M: Wednesday; N: Tuesday; P: Wednesday",
          },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Each employee works one day; No more than two employees work on any day (Monday has L and P, Tuesday has J, Wednesday has K, Thursday has N, Friday has M); J and K work on consecutive days (Tuesday and Wednesday); L works on Monday; Since N works on Thursday, M would need to work on Wednesday if the rule applied, but M works on Friday so the rule doesn't apply; P works on the same day as L (Monday).",
      },
      // Additional questions...
    ],
  },

  // Add the rest of your games with similar structure...
};

export default function ResultsPage() {
  const params = useParams();
  const examId = params.examId as string;

  const results = mockResults[examId as keyof typeof mockResults];

  if (!results) {
    return <div>Results not found</div>;
  }

  // const getTotalAnswered = () => {
  //   return results.sections.reduce(
  //     (acc, section) => acc + section.correct + section.incorrect,
  //     0
  //   );
  // };

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
            AI-powered analysis of your PrepTest 71 performance
          </p>
        </header>

        {/* Score Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                LSAT Score
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
            <TabsTrigger value="sections">
              <Clock className="h-4 w-4 mr-1" />
              Sections
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

          {/* Sections Tab */}
          <TabsContent value="sections">
            <div className="space-y-6">
              {results.sections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Performance
                        </h3>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">
                            {section.score}
                          </span>
                          <span className="ml-1 text-gray-500">
                            /{" "}
                            {section.correct +
                              section.incorrect +
                              section.skipped}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="inline-flex items-center text-green-600 mr-3">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            {section.correct} correct
                          </span>
                          <span className="inline-flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            {section.incorrect} incorrect
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Time
                        </h3>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">
                            {section.timeSpent}
                          </span>
                          <span className="ml-1 text-gray-500">minutes</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          ~{section.averageTimePerQuestion} seconds per question
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          AI Insight
                        </h3>
                        <p className="text-sm">
                          {section.id === "ar"
                            ? "You struggled most with grouping games. Focus on identifying rules more efficiently."
                            : section.id === "rc"
                            ? "Strong performance on humanities passages, but science content was challenging."
                            : "Pay attention to conditional statements and sufficient vs. necessary conditions."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
