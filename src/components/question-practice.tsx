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
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      // Update page if we cross the boundary
      const newPage = Math.floor(newIndex / questionsPerPage);
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }

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
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      // Update page if we cross the boundary
      const newPage = Math.floor(newIndex / questionsPerPage);
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }

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
    // Update page when jumping to a question
    const newPage = Math.floor(index / questionsPerPage);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
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
      // Jump to first question of new page
      setCurrentIndex(currentPage * questionsPerPage + questionsPerPage);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      // Jump to first question of new page
      setCurrentIndex((currentPage - 1) * questionsPerPage);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 bg-white">
        Loading questions...
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-full max-w-2xl border border-gray-200 shadow-lg rounded-xl overflow-hidden bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-gray-900 text-center">
              Congratulations!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg text-gray-700">
                You have successfully completed the question bank for{" "}
                <span className="font-bold text-gray-900">
                  {subject
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                .
              </p>
              <p className="text-sm text-gray-500 mt-2">
                You answered {responses.filter((r) => r.isCorrect).length} out
                of {questions.length} questions correctly.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-md"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => router.push("/question-bank")}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-md"
            >
              Take Another Practice
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white min-h-screen p-4 relative overflow-hidden">
      <div className="mb-6 bg-white p-4 rounded-lg shadow relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge
            variant="outline"
            className="bg-white text-gray-700 border-gray-300 shadow-sm"
          >
            {subject
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-gray-100"
          indicatorClassName="bg-gray-900"
        />
      </div>

      <Card className="mb-6 border border-gray-200 shadow rounded-xl overflow-hidden bg-white relative z-10">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle className="text-xl text-gray-900">
              Question {currentIndex + 1}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleBookmark}
                className={cn(
                  bookmarked[currentIndex] ? "text-gray-900" : "text-gray-500",
                  "hover:bg-gray-100 hover:text-gray-900"
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
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Exit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed text-gray-800">
              {currentQuestion.text}
            </p>

            <RadioGroup
              value={selectedAnswer || ""}
              onValueChange={setSelectedAnswer}
              className="mt-4"
              disabled={isAnswered}
            >
              {currentQuestion.options.map((option, index) => {
                const isCorrectAnswer =
                  option.id === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === option.id;
                const showFeedback =
                  isAnswered && (isCorrectAnswer || isSelected);

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-md border transition-all",
                      // Correct answer styling (shows when answered)
                      isAnswered &&
                        isCorrectAnswer &&
                        "bg-green-50 border-green-200",
                      // Selected but wrong answer styling
                      isAnswered &&
                        isSelected &&
                        !isCorrectAnswer &&
                        "bg-gray-50 border-gray-200",
                      // Not answered but selected styling
                      !isAnswered && isSelected && "bg-gray-50 border-gray-200",
                      // Default styling
                      !isAnswered &&
                        "bg-white border-gray-200 hover:bg-gray-50",
                      "my-2"
                    )}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className={cn(
                        isAnswered && isCorrectAnswer
                          ? "text-green-600"
                          : "text-gray-700",
                        isAnswered &&
                          isSelected &&
                          !isCorrectAnswer &&
                          "text-gray-500"
                      )}
                    />
                    <Label
                      htmlFor={option.id}
                      className={cn(
                        "flex-grow cursor-pointer text-gray-800", // Dark gray text for all options
                        isAnswered && isCorrectAnswer && "text-gray-800",
                        isAnswered &&
                          isSelected &&
                          !isCorrectAnswer &&
                          "text-gray-600"
                      )}
                    >
                      {option.text}
                    </Label>
                    {showFeedback && (
                      <>
                        {isCorrectAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center bg-white hover:text-black hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {!isAnswered ? (
              <Button
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Submit Answer
              </Button>
            ) : currentIndex === questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center bg-gray-900 hover:bg-gray-800 text-white"
              >
                Finish
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="flex items-center bg-gray-900 hover:bg-gray-800 text-white"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="w-full border border-gray-200 rounded-md bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1 h-8"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-600">
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
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1 h-8"
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
                      ? "bg-gray-900 text-white border-gray-700"
                      : responses.some(
                          (r) => r.questionId === questions[idx]?.id
                        )
                      ? "bg-gray-100 text-gray-700 border-gray-300"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
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
        <Card className="border-gray-200 bg-white shadow relative z-10">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div
                className={cn(
                  "p-4 rounded-lg",
                  feedback.isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                )}
              >
                <div className="flex items-start gap-2">
                  {feedback.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1 text-gray-900">
                      {feedback.isCorrect ? "Correct!" : "Incorrect"}
                    </h4>
                    <p className="text-sm text-gray-600">
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
                  className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
                {showExplanation && (
                  <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h4 className="font-medium mb-2 text-gray-900">
                      Explanation
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feedback.explanation}
                    </p>
                    {feedback.aiSuggestion && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-gray-900">
                          AI Suggestion
                        </h4>
                        <p className="text-sm text-gray-600">
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
