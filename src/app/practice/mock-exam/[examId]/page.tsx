"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import Firebase auth
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
import { mockExamData } from "@/lib/mockExamQuestion"; // Import the mock exam data
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
  const [uuid, setUuid] = useState<string | null>(null); // Track user UUID
  const [timeSpentPerSection, setTimeSpentPerSection] = useState<number[]>([]); // Track time spent per section
  const [currentPage, setCurrentPage] = useState(0); // Track current page of question numbers
  const questionsPerPage = 10; // Number of question numbers to show per page

  const examData = mockExamData[examId]; // Use the imported mock exam data
  const section = examData?.sections[currentSection];
  const question = section?.questions[currentQuestion];

  // Set the UUID from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid); // Set the UUID
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
      // Set the timer for the current section
      setTimeRemaining(section.duration * 60); // Convert to seconds

      // Timer countdown logic
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Automatically move to next section or finish exam
            if (currentSection < examData.sections.length - 1) {
              setCurrentSection(currentSection + 1);
              setCurrentQuestion(0);
              setShowHint(false);
            } else {
              // End of exam
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

  // Track time spent per section
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
      // Move to next section
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      setShowHint(false);
      setHintsUsed(0);
    } else {
      // End of exam
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

    // Calculate total correct answers
    let totalCorrect = 0;

    // Iterate over selected answers
    for (const [questionId, selectedAnswerId] of Object.entries(
      selectedAnswers
    )) {
      // Find the question in the exam data
      const question = examData.sections
        .flatMap((section) => section.questions)
        .find((q) => q.id === questionId);

      // Check if the selected answer is correct
      if (question && question.correctAnswer === selectedAnswerId) {
        totalCorrect++;
      }
    }

    // Calculate total time spent
    const totalTimeMinutes =
      timeSpentPerSection.reduce((acc, time) => acc + time, 0) / 60;

    // Calculate total attempted questions
    const totalAttempted = Object.keys(selectedAnswers).length;

    // Prepare data to send to the backend
    const examResults = {
      examId,
      totalQuestions: totalAttempted, // Total questions attempted by the user
      correctAnswers: totalCorrect,
      totalTimeMinutes: Math.round(totalTimeMinutes),
      totalAttempted, // Add total attempted questions
    };
    console.log(examResults);

    // Send data to the backend
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

      // Redirect to results page
      router.push(`/practice/mock-exam/${examId}/results`);
    } catch (error) {
      console.log("Error submitting exam results:", error);
    }
  };

  // Function to navigate to a specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowHint(false);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(section.questions.length / questionsPerPage);

  // Get current page of question numbers
  const getCurrentPageQuestions = () => {
    const startIdx = currentPage * questionsPerPage;
    const endIdx = Math.min(
      startIdx + questionsPerPage,
      section.questions.length
    );
    return Array.from({ length: endIdx - startIdx }, (_, i) => startIdx + i);
  };

  // Handle pagination
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
          <Card className="bg-[#121218] border-[#1a1a1f]">
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

                <div className="bg-amber-900/20 p-4 rounded-md border border-amber-800 mt-6">
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
                className="w-full bg-white hover:bg-white text-black border border-[#1a1a1f]"
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
        <div className="bg-[#121218] p-4 rounded-md shadow mb-6 sticky top-0 z-10 border border-[#1a1a1f]">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-lg text-white">
                {section.title}
              </h1>
              <div className="text-sm text-white">
                Question {currentQuestion + 1} of {section.questions.length}
              </div>
            </div>

            <div className="flex items-center space-x-4">
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

              {/* Exit Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExamCompletion}
                className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f]"
              >
                Exit
              </Button>

              {/* Hint Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRequestHint}
                disabled={hintsUsed >= 3 || showHint}
                className="bg-[#121218] border-[#1a1a1f] text-white hover:bg-[#1a1a1f] disabled:bg-[#121218]/50 disabled:text-slate-500"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Hint ({3 - hintsUsed} left)
              </Button>
            </div>
          </div>

          <Progress
            value={(currentQuestion / section.questions.length) * 100}
            className="mt-2 bg-[#1a1a1f]"
          />
        </div>
        {/* Question */}
        <div className="bg-[#121218] p-6 rounded-md shadow mb-6 border border-[#1a1a1f]">
          {/* Reading stimulus */}
          {question.stimulus && (
            <div className="mb-6 p-4 bg-[#0a0a0f] rounded-md border border-[#1a1a1f]">
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
                className="flex items-start space-x-2 p-2 rounded-md hover:bg-[#1a1a1f] border border-[#1a1a1f] hover:border-[#2a2a2f]"
              >
                <RadioGroupItem
                  value={choice.id}
                  id={`choice-${choice.id}`}
                  className="border-[#1a1a1f]"
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
            <div className="mt-6 p-4 bg-[#121218]/20 rounded-md border border-[#1a1a1f]">
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
            className="w-full bg-[#121218] hover:bg-[#1a1a1f] text-white border border-[#1a1a1f]"
          >
            {currentQuestion < section.questions.length - 1
              ? "Next Question"
              : "Next Section"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Question Navigation Menu */}
        <div className="w-full border border-slate-700 rounded-md bg-slate-800 p-3 mb-6">
          <div className="flex justify-between items-center mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700 p-1 h-8"
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
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700 p-1 h-8"
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
                  "w-8 h-8 flex items-center justify-center rounded-md text-sm border",
                  currentQuestion === idx
                    ? "bg-indigo-600 text-white border-indigo-700"
                    : selectedAnswers[section.questions[idx]?.id]
                    ? "bg-slate-700 text-slate-200 border-slate-600"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
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
