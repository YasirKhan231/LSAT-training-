"use client"; // Ensure this is a Client Component

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
import { getQuestions } from "@/lib/questionsBankData"; // Import the getQuestions function
import type { Question, QuestionFeedback } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QuestionFeedbackComponent } from "@/components/question-feedback";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation"; // For navigation
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import app from "@/lib/firebase"; // Import Firebase app

interface QuestionPracticeProps {
  subject: string; // Prop to specify the subject
}

export function QuestionPractice({ subject }: QuestionPracticeProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [bookmarked, setBookmarked] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0); // Track practice count
  const [responses, setResponses] = useState<
    { questionId: string; selectedOption: string; isCorrect: boolean }[]
  >([]); // Track user responses
  const [practicedQuestionIds, setPracticedQuestionIds] = useState<string[]>(
    []
  ); // Track practiced question IDs
  const [startTime, setStartTime] = useState<number>(Date.now()); // Track session start time
  const [timeTaken, setTimeTaken] = useState<number>(0); // Track time taken in seconds
  const [uuid, setUuid] = useState<string | null>(null); // Track user UUID
  const router = useRouter(); // For navigation

  // Fetch the authenticated user's UID when the component mounts
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid); // Set the UUID from Firebase Auth
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Fetch questions based on the subject
  useEffect(() => {
    const loadedQuestions = getQuestions(subject); // Fetch questions for the subject
    setQuestions(loadedQuestions);
    setBookmarked(new Array(loadedQuestions.length).fill(false));
    setStartTime(Date.now()); // Start the timer when questions are loaded
  }, [subject]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    setIsAnswered(true);

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Add the response to the responses array
    setResponses((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: selectedAnswer,
        isCorrect,
      },
    ]);

    // Generate feedback based on the answer
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
    if (currentIndex < questions.length - 1) {
      // Add the current question ID to the practicedQuestionIds list
      setPracticedQuestionIds((prev) => [...prev, currentQuestion.id]);

      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setFeedback(null);
      setShowExplanation(false);
      setPracticeCount((prev) => prev + 1); // Increment practice count
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

    // Calculate the time taken in seconds
    const endTime = Date.now();
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(timeTakenInSeconds);

    // Calculate the score based on practiced questions
    const score = responses.filter((response) => response.isCorrect).length;

    // Get the list of bookmarked question IDs
    const bookmarkedQuestionIds = questions
      .filter((_, index) => bookmarked[index])
      .map((q) => q.id);

    // Prepare the data to send to the backend
    const sessionData = {
      sessionId: `sess-${Date.now()}`, // Generate a unique session ID
      timestamp: new Date().toISOString(), // Current timestamp in ISO format
      section: subject, // Use "section" instead of "subject" to match backend expectations
      questionIds: practicedQuestionIds, // Send only practiced question IDs
      responses: responses.filter((response) =>
        practicedQuestionIds.includes(response.questionId)
      ), // Send only responses for practiced questions
      score,
      totalQuestions: practicedQuestionIds.length, // Total questions practiced
      timeTaken: timeTakenInSeconds,
      bookmarkedQuestionIds, // Include bookmarked question IDs
      uuid, // Include the user's UUID
    };

    // Send the data to the backend
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
    } catch (error) {
      console.error("Error saving session data:", error);
    }

    // Redirect to the question bank or home page
    router.push("/question-bank");
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
            {subject
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
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
            <div className="flex items-center gap-2">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExit}
                className="text-muted-foreground"
              >
                Exit
              </Button>
            </div>
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
          ) : currentIndex === questions.length - 1 ? (
            <Button
              onClick={handleExit}
              className="flex items-center bg-green-900 hover:bg-green-950"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
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
          aiResponse={currentQuestion.aiResponse} // Pass the AI response here
        />
      )}
    </div>
  );
}
