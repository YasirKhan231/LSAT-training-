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
import { Bookmark, BookmarkCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { getQuestions } from "@/lib/questions";
import type { Question, QuestionFeedback } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QuestionFeedbackComponent } from "@/components/question-feedback";
import { Progress } from "@/components/ui/progress";

interface QuestionPracticeProps {
  section: string;
}

export function QuestionPractice({ section }: QuestionPracticeProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [bookmarked, setBookmarked] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const loadedQuestions = getQuestions(section);
    setQuestions(loadedQuestions);
    setBookmarked(new Array(loadedQuestions.length).fill(false));
  }, [section]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    setIsAnswered(true);

    // Generate feedback based on the answer
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setFeedback({
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer, // Add this line
      explanation: currentQuestion.explanation,
      aiSuggestion: isCorrect
        ? "Great job! You've mastered this concept."
        : "Consider reviewing the logical structure of conditional statements.",
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
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

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading questions...
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge variant="outline" className="bg-blue-50">
            {section.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6 border-2 shadow-md rounded-xl overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle className="text-xl">
              Question {currentIndex + 1}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={cn(
                bookmarked[currentIndex]
                  ? "text-blue-600"
                  : "text-muted-foreground"
              )}
            >
              {bookmarked[currentIndex] ? (
                <BookmarkCheck className="h-5 w-5" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed">
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
                      "border-green-500 bg-green-50",
                    isAnswered &&
                      selectedAnswer === option.id &&
                      option.id !== currentQuestion.correctAnswer &&
                      "border-red-500 bg-red-50",
                    !isAnswered && "hover:border-blue-300 hover:shadow-sm",
                    "my-2"
                  )}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
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
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {!isAnswered ? (
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="bg-blue-900 hover:bg-blue-950"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center bg-blue-900 hover:bg-blue-950"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {feedback && (
        <QuestionFeedbackComponent
          feedback={feedback}
          showExplanation={showExplanation}
          onToggleExplanation={() => setShowExplanation(!showExplanation)}
        />
      )}
    </div>
  );
}
