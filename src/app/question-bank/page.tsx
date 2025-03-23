import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  FileText,
  BarChart,
  Gavel,
  Landmark,
  Scale,
  ClipboardList,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-100">
            AI-Enhanced bar exam question bank
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Practice with adaptive questions and receive AI-powered explanations
            to improve your Bar Exam score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Constitutional Law */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <Landmark className="mr-2 h-5 w-5 text-indigo-400" />
                Constitutional Law
              </CardTitle>
              <CardDescription className="text-slate-400">
                Master constitutional principles and cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice analyzing constitutional issues, landmark cases, and
                judicial review.
              </p>
              <Link href="/question-bank/constitutional-law">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contracts */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <FileText className="mr-2 h-5 w-5 text-indigo-400" />
                Contracts
              </CardTitle>
              <CardDescription className="text-slate-400">
                Understand contract formation and enforcement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on offer, acceptance, consideration, and
                breach of contract.
              </p>
              <Link href="/question-bank/contracts">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Criminal Law & Procedure */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <Gavel className="mr-2 h-5 w-5 text-indigo-400" />
                Criminal Law & Procedure
              </CardTitle>
              <CardDescription className="text-slate-400">
                Learn criminal offenses and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on criminal liability, defenses, and
                constitutional protections.
              </p>
              <Link href="/question-bank/criminal-law">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Civil Procedure */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <Scale className="mr-2 h-5 w-5 text-indigo-400" />
                Civil Procedure
              </CardTitle>
              <CardDescription className="text-slate-400">
                Master the rules of civil litigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on jurisdiction, pleadings, discovery, and
                motions.
              </p>
              <Link href="/question-bank/civil-procedure">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <ClipboardList className="mr-2 h-5 w-5 text-indigo-400" />
                Evidence
              </CardTitle>
              <CardDescription className="text-slate-400">
                Understand rules of evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on relevance, hearsay, privileges, and
                objections.
              </p>
              <Link href="/question-bank/evidence">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Real Property */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <Landmark className="mr-2 h-5 w-5 text-indigo-400" />
                Real Property
              </CardTitle>
              <CardDescription className="text-slate-400">
                Learn property law concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on estates, easements, mortgages, and
                landlord-tenant law.
              </p>
              <Link href="/question-bank/real-property">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Torts */}
          <Card className="border-2 border-slate-800 hover:border-indigo-600 transition-all shadow-md rounded-xl overflow-hidden bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-slate-100">
                <Scale className="mr-2 h-5 w-5 text-indigo-400" />
                Torts
              </CardTitle>
              <CardDescription className="text-slate-400">
                Understand civil wrongs and liabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-slate-300">
                Practice questions on negligence, strict liability, and
                intentional torts.
              </p>
              <Link href="/question-bank/torts">
                <Button className="w-full bg-slate-800 text-indigo-400 border border-slate-700 hover:bg-slate-700">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Adaptive Learning System Section */}
        <Card className="mb-12 border-2 border-slate-800 shadow-md rounded-xl overflow-hidden bg-slate-900">
          <CardHeader>
            <CardTitle className="text-slate-100">
              Adaptive Learning System
            </CardTitle>
            <CardDescription className="text-slate-400">
              Our AI-powered system adjusts to your skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="font-medium mb-2 text-slate-100">
                  Dynamic Difficulty
                </h3>
                <p className="text-sm text-slate-400">
                  Questions adapt based on your performance to maximize learning
                  efficiency.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="font-medium mb-2 text-slate-100">
                  AI Explanations
                </h3>
                <p className="text-sm text-slate-400">
                  Receive detailed, personalized explanations for each question
                  you answer.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="font-medium mb-2 text-slate-100">
                  Smart Review
                </h3>
                <p className="text-sm text-slate-400">
                  Bookmark difficult questions and get AI-suggested review
                  sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Mixed Practice Button */}
        <div className="text-center">
          <Link href="/question-bank/mixed">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Start Mixed Practice Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
