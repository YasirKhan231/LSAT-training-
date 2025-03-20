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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, HelpCircle, ArrowRight } from "lucide-react";
import { mockExamData } from "@/lib/mockExamQuestion"; // Import the mock exam data

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
    return <div>Exam not found</div>;
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
    const totalCorrect = Object.values(selectedAnswers).reduce(
      (acc, answerId) => {
        const question = examData.sections
          .flatMap((section) => section.questions)
          .find((q) => q.id === answerId);
        return acc + (question?.correctAnswer === answerId ? 1 : 0);
      },
      0
    );

    // Calculate total time spent
    const totalTimeMinutes =
      timeSpentPerSection.reduce((acc, time) => acc + time, 0) / 60;

    // Calculate total attempted questions
    const totalAttempted = Object.keys(selectedAnswers).length;

    // Prepare data to send to the backend
    const examResults = {
      examId,
      totalQuestions: examData.sections.flatMap((section) => section.questions)
        .length,
      correctAnswers: totalCorrect,
      totalTimeMinutes: Math.round(totalTimeMinutes),
      sections: examData.sections.map((section, index) => ({
        id: section.id,
        title: section.title,
        timeSpent: timeSpentPerSection[index] || 0,
      })),
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
      router.push(`/practise/mock-exam/${examId}/results`);
    } catch (error) {
      console.log("Error submitting exam results:", error);
    }
  };

  if (!examStarted) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{examData.title}</CardTitle>
              <p className="text-gray-600">
                You are about to start a full-length BAR practice exam.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">This exam includes:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {examData.sections.map((section, index) => (
                    <li key={index}>
                      {section.title} - {section.duration} minutes
                    </li>
                  ))}
                </ul>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
                  <h3 className="font-semibold text-amber-800">
                    Important Information:
                  </h3>
                  <ul className="text-amber-700 mt-2 space-y-1 text-sm">
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
              <Button className="w-full" onClick={startExam}>
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
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with timer and progress */}
        <div className="bg-white p-4 rounded-md shadow mb-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-lg">{section.title}</h1>
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {section.questions.length}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-1 ${
                  timeRemaining < 300 ? "text-red-600" : "text-gray-700"
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
                className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
              >
                Exit
              </Button>

              {/* Hint Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRequestHint}
                disabled={hintsUsed >= 3 || showHint}
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Hint ({3 - hintsUsed} left)
              </Button>
            </div>
          </div>

          <Progress
            value={(currentQuestion / section.questions.length) * 100}
            className="mt-2"
          />
        </div>

        {/* Question */}
        <div className="bg-white p-6 rounded-md shadow mb-6">
          {/* Reading stimulus */}
          {question.stimulus && (
            <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-800 leading-relaxed">
                {question.stimulus}
              </p>
            </div>
          )}

          {/* Question text */}
          <h2 className="text-lg font-medium mb-4">{question.text}</h2>

          {/* Answer choices */}
          <RadioGroup
            value={selectedAnswers[question.id] || ""}
            onValueChange={(value) => handleSelectAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.choices.map((choice) => (
              <div
                key={choice.id}
                className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50"
              >
                <RadioGroupItem value={choice.id} id={`choice-${choice.id}`} />
                <Label
                  htmlFor={`choice-${choice.id}`}
                  className="cursor-pointer flex-1 leading-normal"
                >
                  <span className="font-semibold">{choice.id}.</span>{" "}
                  {choice.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* AI Hint */}
          {showHint && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">AI Hint:</h3>
              <p className="text-blue-700 text-sm">
                Consider what the passage identifies as a "recent historical
                development" and which answer choice most directly addresses
                this central theme. Focus on the first sentence of the passage
                for the main point.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <div>{/* Instructions/Help could go here */}</div>
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[question.id]}
          >
            {currentQuestion < section.questions.length - 1
              ? "Next Question"
              : "Next Section"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
