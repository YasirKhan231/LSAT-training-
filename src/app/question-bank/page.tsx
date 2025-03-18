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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            AI-Enhanced Bar Exam Question Bank
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with adaptive questions and receive AI-powered explanations
            to improve your Bar Exam score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Constitutional Law */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Landmark className="mr-2 h-5 w-5 text-blue-900" />
                Constitutional Law
              </CardTitle>
              <CardDescription>
                Master constitutional principles and cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice analyzing constitutional issues, landmark cases, and
                judicial review.
              </p>
              <Link href="/question-bank/constitutional-law">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contracts */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-900" />
                Contracts
              </CardTitle>
              <CardDescription>
                Understand contract formation and enforcement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on offer, acceptance, consideration, and
                breach of contract.
              </p>
              <Link href="/question-bank/contracts">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Criminal Law & Procedure */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Gavel className="mr-2 h-5 w-5 text-blue-900" />
                Criminal Law & Procedure
              </CardTitle>
              <CardDescription>
                Learn criminal offenses and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on criminal liability, defenses, and
                constitutional protections.
              </p>
              <Link href="/question-bank/criminal-law">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Civil Procedure */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5 text-blue-900" />
                Civil Procedure
              </CardTitle>
              <CardDescription>
                Master the rules of civil litigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on jurisdiction, pleadings, discovery, and
                motions.
              </p>
              <Link href="/question-bank/civil-procedure">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-blue-900" />
                Evidence
              </CardTitle>
              <CardDescription>Understand rules of evidence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on relevance, hearsay, privileges, and
                objections.
              </p>
              <Link href="/question-bank/evidence">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Real Property */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Landmark className="mr-2 h-5 w-5 text-blue-900" />
                Real Property
              </CardTitle>
              <CardDescription>Learn property law concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on estates, easements, mortgages, and
                landlord-tenant law.
              </p>
              <Link href="/question-bank/real-property">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Torts */}
          <Card className="border-2 hover:border-blue-300 transition-all shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5 text-blue-900" />
                Torts
              </CardTitle>
              <CardDescription>
                Understand civil wrongs and liabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Practice questions on negligence, strict liability, and
                intentional torts.
              </p>
              <Link href="/question-bank/torts">
                <Button className="w-full bg-white text-blue-900 border border-blue-300 hover:bg-blue-100">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Adaptive Learning System Section */}
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

        {/* Start Mixed Practice Button */}
        <div className="text-center">
          <Link href="/question-bank/mixed">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-950">
              Start Mixed Practice Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
