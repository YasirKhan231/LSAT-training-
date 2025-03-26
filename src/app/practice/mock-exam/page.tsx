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
import { Crown, X } from "lucide-react";
import { mockExamData } from "@/lib/mockExamQuestion";

type Exam = {
  id: string;
  title: string;
  difficulty: string;
  sections: string[];
  duration: number;
  questions: number;
  aiAssisted: boolean;
  isCustomizable?: boolean;
};

const availableExams: Exam[] = Object.entries(mockExamData).map(
  ([id, examData]) => {
    const totalQuestions = examData.sections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const duration = totalQuestions * 2;

    return {
      id,
      title: examData.title,
      difficulty: "Medium",
      sections: examData.sections.map((section) => section.title),
      duration,
      questions: totalQuestions,
      aiAssisted: true,
    };
  }
);

export default function MockExamPage() {
  const { isSubscriptionActive } = useUser();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const availableExamsForUser: Exam[] = isSubscriptionActive
    ? availableExams
    : availableExams;

  const handleExamClick = (exam: Exam) => {
    setSelectedExam(exam);
    setShowPopup(true);
  };

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
            <div className="mt-4 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border border-[#1a1a1f] rounded-md p-4 shadow-lg">
              <div className="flex items-start">
                <div className="bg-[#1a1a1f] p-2 rounded-full border border-[#2a2a3f] mr-3">
                  <Crown className="h-5 w-5 text-amber-400" />
                </div>
                <p className="text-white flex-1">
                  Free users get access to all practice exams.{" "}
                  <Link
                    href="/subscription"
                    className="ml-1 font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
                  >
                    Upgrade to Premium
                  </Link>{" "}
                  for additional features like AI-powered analysis.
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Exam List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">
              Available Practice Tests
            </h2>
            <div className="space-y-4">
              {availableExamsForUser.map((exam) => (
                <Card
                  key={exam.id}
                  className={`transition-all cursor-pointer bg-[#121218] border-[#1a1a1f] hover:border-[#2a2a2f] ${
                    selectedExam?.id === exam.id ? "ring-2 ring-[#3a3a4f]" : ""
                  }`}
                  onClick={() => handleExamClick(exam)}
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

          {/* Right Column - Placeholder Content */}
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-white mb-4">
              Exam Preparation Tips
            </h2>
            <Card className="bg-[#121218] border-[#1a1a1f]">
              <CardContent className="p-6">
                <div className="space-y-4 text-white">
                  <div>
                    <h3 className="font-medium mb-2">Time Management</h3>
                    <p className="text-sm">
                      Allocate time based on question weight. Spend about 1.8
                      minutes per multiple-choice question.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Answer Strategies</h3>
                    <p className="text-sm">
                      Read questions carefully and eliminate obviously wrong
                      answers first.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Practice Techniques</h3>
                    <p className="text-sm">
                      Simulate exam conditions with timed practice sessions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Exam Details Popup */}
        {showPopup && selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border border-[#2a2a3f] rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {selectedExam.title}
                </h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Questions
                    </h3>
                    <p className="text-white">{selectedExam.questions}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Duration
                    </h3>
                    <p className="text-white">
                      {Math.floor(selectedExam.duration / 60)}h{" "}
                      {selectedExam.duration % 60}m
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Difficulty
                    </h3>
                    <p className="text-white">{selectedExam.difficulty}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Sections
                    </h3>
                    <p className="text-white">
                      {selectedExam.sections.length} sections
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Features
                  </h3>
                  <ul className="list-disc list-inside text-white space-y-1">
                    <li>Realistic exam conditions with timed sections</li>
                    <li>AI-powered performance analysis</li>
                    <li>Instant scoring and feedback</li>
                    <li>Section-by-section breakdown</li>
                    <li>Optional AI hints during the exam</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Settings
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="timing"
                        className="mr-2"
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
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="ai-hints" className="text-sm text-white">
                        Enable AI hints (limited to 3 per section)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={`/practice/mock-exam/${selectedExam.id}`}>
                    <Button className="w-full bg-white hover:bg-[#1a1a1f] hover:text-white text-black border border-[#1a1a1f]">
                      Start Exam
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium feature: Custom Exam Creation */}
        <div className="mt-12 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] rounded-lg p-6 border border-[#1a1a1f]">
          <h2 className="text-xl font-bold text-white mb-2">
            AI-Powered Exam Creation
          </h2>
          <p className="text-white mb-4">
            {isSubscriptionActive
              ? "Create a custom exam tailored to your specific needs and weaknesses"
              : "Upgrade to premium to create custom exams tailored to your specific needs and weaknesses"}
          </p>
          <Link href={isSubscriptionActive ? "#" : "/subscription"}>
            <Button
              variant="outline"
              className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f]"
            >
              {isSubscriptionActive
                ? "Create Custom Exam"
                : "Upgrade to Premium"}
            </Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
