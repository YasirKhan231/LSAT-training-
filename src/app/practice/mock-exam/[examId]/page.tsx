"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import ProtectedRoute from "../../../../../components/ProtectRoute";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Clock,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockExamData } from "@/lib/mockExamQuestion";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  questions: z.number().min(1).max(10),
});

interface MockExamProps {
  params: {
    examId: string;
  };
}

export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.examId as string;

  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [timeSpentPerSection, setTimeSpentPerSection] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  const examData = mockExamData[examId];
  const section = examData?.sections[currentSection];
  const question = section?.questions[currentQuestion];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Timer logic
  useEffect(() => {
    if (examStarted && section) {
      setTimeRemaining(section.duration * 60);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (currentSection < examData.sections.length - 1) {
              setCurrentSection(currentSection + 1);
              setCurrentQuestion(0);
              setShowHint(false);
            } else {
              handleExamCompletion();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    examStarted,
    currentSection,
    examData,
    examId,
    router,
    currentQuestion,
    section,
  ]);

  useEffect(() => {
    if (examStarted && section) {
      const sectionTime = section.duration * 60 - timeRemaining;
      setTimeSpentPerSection((prev) => {
        const updatedTimeSpent = [...prev];
        updatedTimeSpent[currentSection] = sectionTime;
        return updatedTimeSpent;
      });
    }
  }, [timeRemaining, examStarted, section, currentSection]);

  if (!examData) {
    return (
      <div className="text-white bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        Exam not found
      </div>
    );
  }

  const startExam = () => {
    setExamStarted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
    } else if (currentSection < examData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      setShowHint(false);
      setHintsUsed(0);
    } else {
      handleExamCompletion();
    }
  };

  const handleRequestHint = () => {
    if (hintsUsed < 3) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const handleExamCompletion = async () => {
    if (!uuid) {
      console.error("User not authenticated");
      return;
    }

    let totalCorrect = 0;
    for (const [questionId, selectedAnswerId] of Object.entries(
      selectedAnswers
    )) {
      const question = examData.sections
        .flatMap((section) => section.questions)
        .find((q) => q.id === questionId);

      if (question && question.correctAnswer === selectedAnswerId) {
        totalCorrect++;
      }
    }

    const totalTimeMinutes =
      timeSpentPerSection.reduce((acc, time) => acc + time, 0) / 60;
    const totalAttempted = Object.keys(selectedAnswers).length;

    const examResults = {
      examId,
      totalQuestions: totalAttempted,
      correctAnswers: totalCorrect,
      totalTimeMinutes: Math.round(totalTimeMinutes),
      totalAttempted,
    };

    try {
      const response = await fetch(`/api/exam-results?uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examResults),
      });

      if (!response.ok) {
        throw new Error("Failed to submit exam results");
      }

      router.push(`/practice/mock-exam/${examId}/results`);
    } catch (error) {
      console.log("Error submitting exam results:", error);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowHint(false);
  };

  const totalPages =
    Math.ceil(section?.questions.length / questionsPerPage) || 1;

  const getCurrentPageQuestions = () => {
    if (!section) return [];
    const startIdx = currentPage * questionsPerPage;
    const endIdx = Math.min(
      startIdx + questionsPerPage,
      section.questions.length
    );
    return Array.from({ length: endIdx - startIdx }, (_, i) => startIdx + i);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!examStarted) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-12 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
          <Card className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {examData.title}
              </CardTitle>
              <p className="text-white">
                You are about to start a full-length BAR practice exam.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold text-white">
                  This exam includes:
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  {examData.sections.map((section, index) => (
                    <li key={index}>
                      {section.title} - {section.duration} minutes
                    </li>
                  ))}
                </ul>

                <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-4 rounded-md border border-[#1a1a1f] mt-6">
                  <h3 className="font-semibold text-white">
                    Important Information:
                  </h3>
                  <ul className="text-white mt-2 space-y-1 text-sm">
                    <li>
                      • This is a timed exam. Each section has a strict time
                      limit.
                    </li>
                    <li>
                      • You can use up to 3 AI hints per section if needed.
                    </li>
                    <li>
                      • You cannot return to previous sections once completed.
                    </li>
                    <li>
                      • Ensure you're in a quiet environment with minimal
                      distractions.
                    </li>
                    <li>
                      • Consider using scratch paper for logic games and complex
                      reasoning.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-white hover:bg-white text-black border border-[#1a1a1f] px-24 py-1 box-content mx-auto"
                onClick={startExam}
              >
                Begin Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-6 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        {/* Header with timer and progress */}
        <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-4 rounded-md shadow-lg mb-6 sticky top-0 z-10 border border-[#1a1a1f]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-lg text-white">
                {section.title}
              </h1>
              <div className="text-sm text-white">
                Question {currentQuestion + 1} of {section.questions.length}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`flex items-center space-x-1 ${
                  timeRemaining < 300 ? "text-red-400" : "text-white"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="font-mono text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExamCompletion}
                className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f] px-3"
              >
                Exit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRequestHint}
                disabled={hintsUsed >= 3 || showHint}
                className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f] disabled:bg-[#121218]/50 disabled:text-slate-500 px-3"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Hint ({3 - hintsUsed} left)
              </Button>
            </div>
          </div>

          <Progress
            value={(currentQuestion / section.questions.length) * 100}
            className="mt-2 bg-[#1a1a1f] h-2"
            indicatorClassName="bg-gradient-to-r from-[#2a2a2f] via-[#3a3a3f] to-[#2a2a2f] shadow-sm shadow-white/20"
          />
        </div>

        {/* Question */}
        <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-6 rounded-md shadow-lg mb-6 border border-[#1a1a1f]">
          {/* Reading stimulus */}
          {question.stimulus && (
            <div className="mb-6 p-4 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] rounded-md border border-[#1a1a1f]">
              <p className="text-white leading-relaxed">{question.stimulus}</p>
            </div>
          )}

          {/* Question text */}
          <h2 className="text-lg font-medium mb-4 text-white">
            {question.text}
          </h2>

          {/* Answer choices */}
          <RadioGroup
            value={selectedAnswers[question.id] || ""}
            onValueChange={(value) => handleSelectAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.choices.map((choice) => (
              <div
                key={choice.id}
                className={cn(
                  "flex items-start space-x-2 p-3 rounded-md border transition-all",
                  selectedAnswers[question.id] === choice.id
                    ? "bg-[#121218] border-[#2a2a2f] shadow-md shadow-white/10"
                    : "bg-[#0a0a0f] border-[#1a1a1f] hover:border-[#2a2a2f]"
                )}
              >
                <RadioGroupItem
                  value={choice.id}
                  id={`choice-${choice.id}`}
                  className="
    border-[#1a1a1f] 
    text-white 
    data-[state=checked]:bg-[#121218]
    data-[state=checked]:border-[#2a2a2f]
    data-[state=checked]:text-white
  "
                />
                <Label
                  htmlFor={`choice-${choice.id}`}
                  className="cursor-pointer flex-1 leading-normal text-white"
                >
                  <span className="font-semibold">{choice.id}.</span>{" "}
                  {choice.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* AI Hint */}
          {showHint && (
            <div className="mt-6 p-4 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] rounded-md border border-[#1a1a1f]">
              <h3 className="font-medium text-white mb-2">AI Hint:</h3>
              <p className="text-white text-sm">
                Consider what the passage identifies as a "recent historical
                development" and which answer choice most directly addresses
                this central theme. Focus on the first sentence of the passage
                for the main point.
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="mb-4">
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:bg-[#1a1a1f] text-white border border-[#1a1a1f] py-3 shadow-sm hover:shadow-white/10 transition-all"
          >
            {currentQuestion < section.questions.length - 1
              ? "Next Question"
              : "Next Section"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Question Navigation Menu */}
        <div className="w-full border border-[#1a1a1f] rounded-md bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-slate-400 hover:text-slate-200 hover:bg-[#1a1a1f] p-2 h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-slate-400">
              Questions {currentPage * questionsPerPage + 1}-
              {Math.min(
                (currentPage + 1) * questionsPerPage,
                section.questions.length
              )}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="text-slate-400 hover:text-slate-200 hover:bg-[#1a1a1f] p-2 h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {getCurrentPageQuestions().map((idx) => (
              <button
                key={idx}
                onClick={() => goToQuestion(idx)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md text-sm border transition-all",
                  currentQuestion === idx
                    ? "bg-gradient-to-b from-[#1a1a1f] via-[#2a2a2f] to-[#1a1a1f] text-white border-[#3a3a3f] shadow-sm shadow-white/10"
                    : selectedAnswers[section.questions[idx]?.id]
                    ? "bg-[#1a1a1f] text-slate-200 border-[#1a1a1f]"
                    : "bg-[#0a0a0f] text-slate-300 border-[#1a1a1f] hover:bg-[#1a1a1f]"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
