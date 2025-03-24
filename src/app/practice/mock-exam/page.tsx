"use client";

import { useState } from "react";
import ProtectedRoute from "../../../../components/ProtectRoute";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/lib/context/UserContext";
import PremiumFeature from "@/components/PremiumFeature";
import { Crown } from "lucide-react";
import { mockExamData } from "@/lib/mockExamQuestion"; // Import mock exam data

// Define the type for an exam
type Exam = {
  id: string;
  title: string;
  difficulty: string;
  sections: string[];
  duration: number; // in minutes
  questions: number;
  aiAssisted: boolean;
  isCustomizable?: boolean; // Optional property
};

// Generate available exams dynamically from mockExamData
const availableExams: Exam[] = Object.entries(mockExamData).map(
  ([id, examData]) => {
    // Calculate total questions and duration
    const totalQuestions = examData.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const duration = totalQuestions * 2; // 2 minutes per question

    return {
      id,
      title: examData.title,
      difficulty: "Medium", // Default difficulty, can be customized
      sections: examData.sections.map((section) => section.title),
      duration,
      questions: totalQuestions,
      aiAssisted: true, // All exams are AI-assisted
    };
  }
);

export default function MockExamPage() {
  const { isSubscriptionActive } = useUser();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  // Free users get access to all exams
  const availableExamsForUser: Exam[] = isSubscriptionActive
    ? availableExams
    : availableExams;

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        <header className="py-8">
          <h1 className="text-3xl font-extrabold text-white">
            Full-Length BAR simulated exams
          </h1>
          <p className="mt-2 text-lg text-white">
            Take realistic timed BAR practice tests with AI-powered analysis and
            feedback
          </p>

          {!isSubscriptionActive && (
            <div className="mt-4 bg-amber-900/20 border border-amber-800 rounded-md p-4">
              <div className="flex">
                <Crown className="h-5 w-5 text-white mr-2" />
                <p className="text-white">
                  Free users get access to all practice exams.
                  <Link
                    href="/subscription"
                    className="ml-1 font-medium underline"
                  >
                    Upgrade to Premium
                  </Link>
                  for additional features like AI-powered analysis.
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Available Practice Tests
            </h2>
            <div className="space-y-4">
              {availableExamsForUser.map((exam) => (
                <Card
                  key={exam.id}
                  className={`transition-all cursor-pointer bg-[#121218] border-[#1a1a1f] ${
                    selectedExam === exam.id ? "ring-2 ring-[#1a1a1f]" : ""
                  }`}
                  onClick={() => setSelectedExam(exam.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">{exam.title}</CardTitle>
                      <Badge
                        variant={
                          exam.difficulty === "Hard" ? "destructive" : "default"
                        }
                        className="bg-[#121218] text-white border-[#1a1a1f]"
                      >
                        {exam.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-white">
                      <p>
                        {exam.questions} questions •{" "}
                        {Math.floor(exam.duration / 60)}h {exam.duration % 60}m
                      </p>
                      <p className="mt-1">
                        Sections: {exam.sections.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex space-x-2">
                      {exam.aiAssisted && (
                        <Badge
                          variant="outline"
                          className="text-white border-[#1a1a1f] bg-[#121218]/20"
                        >
                          AI-Assisted
                        </Badge>
                      )}
                      {exam.isCustomizable && (
                        <Badge
                          variant="outline"
                          className="text-white border-[#1a1a1f] bg-[#121218]/20"
                        >
                          Customizable
                        </Badge>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Exam Details</h2>
            {selectedExam ? (
              <div className="bg-[#121218] p-6 rounded-lg shadow-md border border-[#1a1a1f]">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {
                    availableExamsForUser.find((e) => e.id === selectedExam)
                      ?.title
                  }
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-white">Features</h4>
                    <ul className="mt-1 list-disc list-inside text-white">
                      <li>Realistic exam conditions with timed sections</li>
                      <li>AI-powered performance analysis</li>
                      <li>Instant scoring and feedback</li>
                      <li>Section-by-section breakdown</li>
                      <li>Optional AI hints during the exam</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white">Settings</h4>
                    <div className="mt-2 space-y-2">
                      {/* These could be real controls in the full implementation */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="timing"
                          className="mr-2 bg-[#121218] border-[#1a1a1f]"
                          defaultChecked
                        />
                        <label htmlFor="timing" className="text-sm text-white">
                          Enable strict timing
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ai-hints"
                          className="mr-2 bg-[#121218] border-[#1a1a1f]"
                          defaultChecked
                        />
                        <label
                          htmlFor="ai-hints"
                          className="text-sm text-white"
                        >
                          Enable AI hints (limited to 3 per section)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href={`/practice/mock-exam/${selectedExam}`}>
                    <Button className="w-full  hover:bg-[#1a1a1f] bg-white text-black  border border-[#1a1a1f]">
                      Start Exam
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-[#121218] p-6 rounded-lg border border-dashed border-[#1a1a1f] text-center">
                <p className="text-white">
                  Select an exam to view details and start
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Premium feature: Custom Exam Creation */}
        <PremiumFeature
          fallback={
            <div className="mt-12 bg-[#121218] rounded-lg p-6 border border-[#1a1a1f]">
              <h2 className="text-xl font-bold text-white mb-2">
                AI-Powered Exam Creation
              </h2>
              <p className="text-white mb-4">
                Upgrade to premium to create custom exams tailored to your
                specific needs and weaknesses
              </p>
              <Link href="/subscription">
                <Button
                  variant="outline"
                  className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f]"
                >
                  Upgrade to Premium
                </Button>
              </Link>
            </div>
          }
        >
          <div className="mt-12 bg-[#121218]/20 rounded-lg p-6 border border-[#1a1a1f]">
            <h2 className="text-xl font-bold text-white mb-2">
              AI-Powered Exam Creation
            </h2>
            <p className="text-white mb-4">
              Create a custom exam tailored to your specific needs and
              weaknesses
            </p>
            <Button
              variant="outline"
              className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f]"
            >
              Create Custom Exam
            </Button>
          </div>
        </PremiumFeature>
      </div>
    </ProtectedRoute>
  );
}
