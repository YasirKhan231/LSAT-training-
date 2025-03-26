"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getQuestions } from "@/lib/questionsBankData";
import type { Question, QuestionFeedback } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";

interface QuestionPracticeProps {
  subject: string;
}

export function QuestionPractice({ subject }: QuestionPracticeProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [bookmarked, setBookmarked] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0);
  const [responses, setResponses] = useState<
    { questionId: string; selectedOption: string; isCorrect: boolean }[]
  >([]);
  const [practicedQuestionIds, setPracticedQuestionIds] = useState<string[]>(
    []
  );
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [uuid, setUuid] = useState<string | null>(null);
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  useEffect(() => {
    const auth = getAuth(app);
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

  useEffect(() => {
    const loadedQuestions = getQuestions(subject);
    setQuestions(loadedQuestions);
    setBookmarked(new Array(loadedQuestions.length).fill(false));
    setStartTime(Date.now());
  }, [subject]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    setIsAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setResponses((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: selectedAnswer,
        isCorrect,
      },
    ]);

    setFeedback({
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      aiSuggestion: isCorrect
        ? "Great job! You've mastered this concept."
        : "Consider reviewing the relevant legal principles.",
    });
  };

  const handleNextQuestion = () => {
    if (!practicedQuestionIds.includes(currentQuestion.id)) {
      setPracticedQuestionIds((prev) => [...prev, currentQuestion.id]);

      if (selectedAnswer) {
        setResponses((prev) => [
          ...prev,
          {
            questionId: currentQuestion.id,
            selectedOption: selectedAnswer,
            isCorrect: selectedAnswer === currentQuestion.correctAnswer,
          },
        ]);
      }
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
      setPracticeCount((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
    }
  };

  const toggleBookmark = () => {
    const newBookmarked = [...bookmarked];
    newBookmarked[currentIndex] = !newBookmarked[currentIndex];
    setBookmarked(newBookmarked);
  };

  const handleExit = async () => {
    if (!uuid) {
      console.error("UUID is not set. User may not be authenticated.");
      return;
    }

    const endTime = Date.now();
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(timeTakenInSeconds);

    const allPracticedIds = [
      ...practicedQuestionIds,
      ...(practicedQuestionIds.includes(currentQuestion.id)
        ? []
        : [currentQuestion.id]),
    ];

    const allResponses = [
      ...responses,
      ...(responses.some((r) => r.questionId === currentQuestion.id)
        ? []
        : selectedAnswer
        ? [
            {
              questionId: currentQuestion.id,
              selectedOption: selectedAnswer,
              isCorrect: selectedAnswer === currentQuestion.correctAnswer,
            },
          ]
        : []),
    ];

    const score = allResponses.filter((response) => response.isCorrect).length;

    const bookmarkedQuestionIds = questions
      .filter((_, index) => bookmarked[index])
      .map((q) => q.id);

    const sessionData = {
      sessionId: `sess-${Date.now()}`,
      timestamp: new Date().toISOString(),
      section: subject,
      questionIds: allPracticedIds,
      responses: allResponses,
      score,
      totalQuestions: allPracticedIds.length,
      timeTaken: timeTakenInSeconds,
      bookmarkedQuestionIds,
    };

    try {
      const response = await fetch(`/api/history?uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error("Failed to save session data");
      }

      console.log("Session data saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving session data:", error);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback(null);
    setShowExplanation(false);
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const getCurrentPageQuestions = () => {
    const startIdx = currentPage * questionsPerPage;
    const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
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

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-300 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        Loading questions...
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
        <Card className="w-full max-w-2xl border-2 border-[#121218] shadow-lg shadow-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-slate-100 text-center">
              Congratulations!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg text-slate-200">
                You have successfully completed the question bank for{" "}
                <span className="font-bold text-white">
                  {subject
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                .
              </p>
              <p className="text-sm text-slate-300 mt-2">
                You answered {responses.filter((r) => r.isCorrect).length} out
                of {questions.length} questions correctly.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-white border border-[#24242e] shadow-md shadow-white/5"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => router.push("/question-bank")}
              className="bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-white border border-[#24242e] shadow-md shadow-white/5"
            >
              Take Another Practice
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmZmZmYwMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-10 pointer-events-none"></div>

      <div className="mb-6 bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-4 rounded-lg shadow-lg shadow-white/5 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-300">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-slate-200 border-[#24242e] shadow-sm"
          >
            {subject
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-[#0a0a0f] shadow-inner"
          indicatorClassName="bg-gradient-to-r from-white/80 via-white/60 to-white/80 shadow-lg shadow-white/30"
        />
      </div>

      <Card className="mb-6 border-2 border-[#121218] shadow-lg shadow-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] relative z-10">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle className="text-xl text-slate-100">
              Question {currentIndex + 1}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleBookmark}
                className={cn(
                  bookmarked[currentIndex] ? "text-white" : "text-slate-500",
                  "hover:bg-[#121218] hover:text-white shadow-sm"
                )}
              >
                {bookmarked[currentIndex] ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExit}
                className="text-slate-300 hover:text-white hover:bg-[#121218] shadow-sm"
              >
                Exit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed text-slate-200">
              {currentQuestion.text}
            </p>

            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="mt-4"
              disabled={isAnswered}
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-md border transition-all",
                    isAnswered &&
                      option.id === currentQuestion.correctAnswer &&
                      "border-green-600 bg-green-900/20 shadow-lg shadow-green-900/30",
                    isAnswered &&
                      selectedAnswer === option.id &&
                      option.id !== currentQuestion.correctAnswer &&
                      "border-red-600 bg-red-900/20 shadow-lg shadow-red-900/30",
                    !isAnswered &&
                      selectedAnswer === option.id &&
                      "border-white/30 bg-[#121218] shadow-lg shadow-white/10",
                    !isAnswered &&
                      "hover:border-white/30 hover:shadow-md hover:shadow-white/5 border-[#24242e]",
                    "my-2 bg-[#121218] text-slate-200"
                  )}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="border-[#24242e] text-white"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-grow cursor-pointer"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-slate-200 border-[#24242e] shadow-md shadow-white/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {!isAnswered ? (
              <Button
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-white shadow-lg shadow-white/10"
              >
                Submit Answer
              </Button>
            ) : currentIndex === questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-white shadow-lg shadow-white/10"
              >
                Finish
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#121218] hover:via-[#1a1a23] hover:to-[#121218] text-white shadow-lg shadow-white/10"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="w-full border border-[#24242e] rounded-md bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-3 shadow-lg shadow-white/5">
            <div className="flex justify-between items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="text-slate-300 hover:text-white hover:bg-[#1a1a23] p-1 h-8 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-slate-300">
                Questions {currentPage * questionsPerPage + 1}-
                {Math.min(
                  (currentPage + 1) * questionsPerPage,
                  questions.length
                )}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="text-slate-300 hover:text-white hover:bg-[#1a1a23] p-1 h-8 shadow-sm"
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
                    "w-8 h-8 flex items-center justify-center rounded-md text-sm border shadow-sm transition-all",
                    currentIndex === idx
                      ? "bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-white border-white/30 shadow-lg shadow-white/20"
                      : responses.some(
                          (r) => r.questionId === questions[idx]?.id
                        )
                      ? "bg-[#1a1a23] text-slate-200 border-[#24242e] shadow-md shadow-white/10"
                      : "bg-[#121218] text-slate-300 border-[#24242e] hover:bg-[#1a1a23] hover:shadow-md hover:shadow-white/5"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

      {feedback && (
        <Card className="border-[#121218] bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] shadow-lg shadow-white/5 relative z-10">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div
                className={cn(
                  "p-4 rounded-lg",
                  feedback.isCorrect
                    ? "bg-green-900/20 border border-green-800 shadow-lg shadow-green-900/30"
                    : "bg-amber-900/20 border border-amber-800 shadow-lg shadow-amber-900/30"
                )}
              >
                <div className="flex items-start gap-2">
                  {feedback.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1 text-slate-100">
                      {feedback.isCorrect ? "Correct!" : "Incorrect"}
                    </h4>
                    <p className="text-sm text-slate-300">
                      {feedback.isCorrect
                        ? "Great job! You selected the right answer."
                        : `The correct answer was: ${feedback.correctAnswer}`}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  onClick={() => setShowExplanation(!showExplanation)}
                  variant="outline"
                  className="w-full bg-[#121218] border-[#24242e] text-slate-200 hover:bg-[#1a1a23] hover:text-white shadow-md"
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
                {showExplanation && (
                  <div className="mt-4 p-4 rounded-lg bg-[#121218] border border-[#24242e] shadow-sm">
                    <h4 className="font-medium mb-2 text-slate-100">
                      Explanation
                    </h4>
                    <p className="text-sm text-slate-300">
                      {feedback.explanation}
                    </p>
                    {feedback.aiSuggestion && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-slate-100">
                          AI Suggestion
                        </h4>
                        <p className="text-sm text-slate-300">
                          {feedback.aiSuggestion}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
