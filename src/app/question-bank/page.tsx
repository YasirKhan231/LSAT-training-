import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Brain, FileText, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            AI-Enhanced LSAT Question Bank
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            practicewith adaptive questions and receive AI-powered explanations
            to improve your LSAT score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-blue-900" />
                Logical Reasoning
              </CardTitle>
              <CardDescription>Evaluate and analyze arguments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                practiceidentifying assumptions, flaws, and
                strengthening/weakening factors in arguments.
              </p>
              <Link href="/question-bank/logical-reasoning">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start practise
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-900" />
                Analytical Reasoning
              </CardTitle>
              <CardDescription>Solve complex logic games</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Master grouping, ordering, and assignment problems with visual
                aids and step-by-step solutions.
              </p>
              <Link href="/question-bank/analytical-reasoning">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start practise
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-900" />
                Reading Comprehension
              </CardTitle>
              <CardDescription>Analyze complex passages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Improve your ability to understand, interpret, and draw
                conclusions from dense academic texts.
              </p>
              <Link href="/question-bank/reading-compresion">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start practise
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12 border-2 border-blue-200 shadow-md rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Adaptive Learning System</CardTitle>
            <CardDescription>
              Our AI-powered system adjusts to your skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-blue-50/70 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="font-medium mb-2">Dynamic Difficulty</h3>
                <p className="text-sm text-muted-foreground">
                  Questions adapt based on your performance to maximize learning
                  efficiency.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-blue-50/70 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="font-medium mb-2">AI Explanations</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed, personalized explanations for each question
                  you answer.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-blue-50/70 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="font-medium mb-2">Smart Review</h3>
                <p className="text-sm text-muted-foreground">
                  Bookmark difficult questions and get AI-suggested review
                  sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/question-bank/mixed">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-950">
              Start Mixed practiceSession
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
