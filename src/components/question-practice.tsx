"use client" // Ensure this is a Client Component

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { getQuestions } from "@/lib/questionsBankData" // Import the getQuestions function
import type { Question, QuestionFeedback } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation" // For navigation
import { getAuth, onAuthStateChanged } from "firebase/auth" // Import Firebase Auth
import app from "@/lib/firebase" // Import Firebase app

interface QuestionPracticeProps {
  subject: string // Prop to specify the subject
}

export function QuestionPractice({ subject }: QuestionPracticeProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [bookmarked, setBookmarked] = useState<boolean[]>([])
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [practiceCount, setPracticeCount] = useState(0) // Track practice count
  const [responses, setResponses] = useState<{ questionId: string; selectedOption: string; isCorrect: boolean }[]>([]) // Track user responses
  const [practicedQuestionIds, setPracticedQuestionIds] = useState<string[]>([]) // Track practiced question IDs
  const [startTime, setStartTime] = useState<number>(Date.now()) // Track session start time
  const [timeTaken, setTimeTaken] = useState<number>(0) // Track time taken in seconds
  const [uuid, setUuid] = useState<string | null>(null) // Track user UUID
  const router = useRouter() // For navigation

  // Fetch the authenticated user's UID when the component mounts
  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid) // Set the UUID from Firebase Auth
      } else {
        console.error("User not authenticated")
        setUuid(null)
      }
    })

    return () => unsubscribe() // Cleanup subscription
  }, [])

  // Fetch questions based on the subject
  useEffect(() => {
    const loadedQuestions = getQuestions(subject) // Fetch questions for the subject
    setQuestions(loadedQuestions)
    setBookmarked(new Array(loadedQuestions.length).fill(false))
    setStartTime(Date.now()) // Start the timer when questions are loaded
  }, [subject])

  const currentQuestion = questions[currentIndex]

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return

    setIsAnswered(true)

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    // Add the response to the responses array
    setResponses((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: selectedAnswer,
        isCorrect,
      },
    ])

    // Generate feedback based on the answer
    setFeedback({
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: currentQuestion.explanation,
      aiSuggestion: isCorrect
        ? "Great job! You've mastered this concept."
        : "Consider reviewing the relevant legal principles.",
    })
  }

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      // Add the current question ID to the practicedQuestionIds list
      setPracticedQuestionIds((prev) => [...prev, currentQuestion.id])

      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setFeedback(null)
      setShowExplanation(false)
      setPracticeCount((prev) => prev + 1) // Increment practice count
    }
  }

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setFeedback(null)
      setShowExplanation(false)
    }
  }

  const toggleBookmark = () => {
    const newBookmarked = [...bookmarked]
    newBookmarked[currentIndex] = !newBookmarked[currentIndex]
    setBookmarked(newBookmarked)
  }

  const handleExit = async () => {
    if (!uuid) {
      console.error("UUID is not set. User may not be authenticated.")
      return
    }

    // Calculate the time taken in seconds
    const endTime = Date.now()
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000)
    setTimeTaken(timeTakenInSeconds)

    // Calculate the score based on practiced questions
    const score = responses.filter((response) => response.isCorrect).length

    // Get the list of bookmarked question IDs
    const bookmarkedQuestionIds = questions.filter((_, index) => bookmarked[index]).map((q) => q.id)

    // Prepare the data to send to the backend
    const sessionData = {
      sessionId: `sess-${Date.now()}`, // Generate a unique session ID
      timestamp: new Date().toISOString(), // Current timestamp in ISO format
      section: subject, // Use "section" instead of "subject" to match backend expectations
      questionIds: practicedQuestionIds, // Send only practiced question IDs
      responses: responses.filter((response) => practicedQuestionIds.includes(response.questionId)), // Send only responses for practiced questions
      score,
      totalQuestions: practicedQuestionIds.length, // Total questions practiced
      timeTaken: timeTakenInSeconds,
      bookmarkedQuestionIds, // Include bookmarked question IDs
      uuid, // Include the user's UUID
    }

    // Send the data to the backend
    try {
      const response = await fetch(`/api/history?uuid=${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      })

      if (!response.ok) {
        throw new Error("Failed to save session data")
      }

      console.log("Session data saved successfully!")
    } catch (error) {
      console.error("Error saving session data:", error)
    }

    // Redirect to the question bank or home page
    router.push("/question-bank")
  }

  if (!currentQuestion) {
    return <div className="flex justify-center items-center h-64 text-slate-300">Loading questions...</div>
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <Badge variant="outline" className="bg-slate-800 text-slate-200 border-slate-700">
            {subject.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 bg-slate-800" />
      </div>

      <Card className="mb-6 border-2 border-slate-800 shadow-md rounded-xl overflow-hidden bg-slate-900">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle className="text-xl text-slate-100">Question {currentIndex + 1}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleBookmark}
                className={cn(bookmarked[currentIndex] ? "text-indigo-400" : "text-slate-500")}
              >
                {bookmarked[currentIndex] ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExit}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                Exit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed text-slate-200">{currentQuestion.text}</p>

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
                    isAnswered && option.id === currentQuestion.correctAnswer && "border-green-600 bg-green-900/20",
                    isAnswered &&
                      selectedAnswer === option.id &&
                      option.id !== currentQuestion.correctAnswer &&
                      "border-red-600 bg-red-900/20",
                    !isAnswered && "hover:border-indigo-600 hover:shadow-sm border-slate-700",
                    "my-2 bg-slate-800 text-slate-200",
                  )}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="border-slate-600" />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
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
            className="flex items-center bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {!isAnswered ? (
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Submit Answer
            </Button>
          ) : currentIndex === questions.length - 1 ? (
            <Button onClick={handleExit} className="flex items-center bg-green-600 hover:bg-green-700 text-white">
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      {feedback && (
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div
                className={cn(
                  "p-4 rounded-lg",
                  feedback.isCorrect
                    ? "bg-green-900/20 border border-green-800"
                    : "bg-amber-900/20 border border-amber-800",
                )}
              >
                <div className="flex items-start gap-2">
                  {feedback.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1 text-slate-100">{feedback.isCorrect ? "Correct!" : "Incorrect"}</h4>
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
                  className="w-full bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </Button>
                {showExplanation && (
                  <div className="mt-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
                    <h4 className="font-medium mb-2 text-slate-100">Explanation</h4>
                    <p className="text-sm text-slate-300">{feedback.explanation}</p>
                    {feedback.aiSuggestion && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-slate-100">AI Suggestion</h4>
                        <p className="text-sm text-slate-300">{feedback.aiSuggestion}</p>
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
  )
}

