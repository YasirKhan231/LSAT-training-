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
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <div className="max-w-5xl mx-auto">
        {/* Heading Section - Updated alignment */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4 text-black">
            AI-Enhanced bar exam question bank
          </h1>
          <p className="text-lg text-black max-w-2xl">
            Practice with adaptive questions and receive AI-powered explanations
            to improve your Bar Exam score.
          </p>
        </div>

        {/* Rest of the code remains unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Constitutional Law */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <Landmark className="mr-2 h-5 w-5 text-black" />
                Constitutional Law
              </CardTitle>
              <CardDescription className="text-black">
                Master constitutional principles and cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice analyzing constitutional issues, landmark cases, and
                judicial review.
              </p>
              <Link href="/question-bank/constitutional-law">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contracts */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <FileText className="mr-2 h-5 w-5 text-black" />
                Contracts
              </CardTitle>
              <CardDescription className="text-black">
                Understand contract formation and enforcement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on offer, acceptance, consideration, and
                breach of contract.
              </p>
              <Link href="/question-bank/contracts">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Criminal Law & Procedure */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <Gavel className="mr-2 h-5 w-5 text-black" />
                Criminal Law & Procedure
              </CardTitle>
              <CardDescription className="text-black">
                Learn criminal offenses and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on criminal liability, defenses, and
                constitutional protections.
              </p>
              <Link href="/question-bank/criminal-law">
                <Button className="w-full bg-[#1a1a1f] text-white border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Civil Procedure */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <Scale className="mr-2 h-5 w-5 text-black" />
                Civil Procedure
              </CardTitle>
              <CardDescription className="text-black">
                Master the rules of civil litigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on jurisdiction, pleadings, discovery, and
                motions.
              </p>
              <Link href="/question-bank/civil-procedure">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <ClipboardList className="mr-2 h-5 w-5 text-black" />
                Evidence
              </CardTitle>
              <CardDescription className="text-black">
                Understand rules of evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on relevance, hearsay, privileges, and
                objections.
              </p>
              <Link href="/question-bank/evidence">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Real Property */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <Landmark className="mr-2 h-5 w-5 text-black" />
                Real Property
              </CardTitle>
              <CardDescription className="text-black">
                Learn property law concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on estates, easements, mortgages, and
                landlord-tenant law.
              </p>
              <Link href="/question-bank/real-property">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Torts */}
          <Card className="border-2 border-[#1a1a1f] hover:border-gray-600 transition-all shadow-md rounded-xl overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-black">
                <Scale className="mr-2 h-5 w-5 text-black" />
                Torts
              </CardTitle>
              <CardDescription className="text-black">
                Understand civil wrongs and liabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Practice questions on negligence, strict liability, and
                intentional torts.
              </p>
              <Link href="/question-bank/torts">
                <Button className="w-full bg-[#1a1a1f] text-white border border-[#2a2a2f] hover:bg-[#2a2a2f]">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Adaptive Learning System Section */}
        <Card className="mb-12 border-2 border-[#1a1a1f] shadow-md rounded-xl overflow-hidden bg-white">
          <CardHeader>
            <CardTitle className="text-black">
              Adaptive Learning System
            </CardTitle>
            <CardDescription className="text-black">
              Our AI-powered system adjusts to your skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-[#1a1a1f] flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-black">
                  Dynamic Difficulty
                </h3>
                <p className="text-sm text-black">
                  Questions adapt based on your performance to maximize learning
                  efficiency.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-[#1a1a1f] flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-black">AI Explanations</h3>
                <p className="text-sm text-black">
                  Receive detailed, personalized explanations for each question
                  you answer.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-12 w-12 rounded-full bg-[#1a1a1f] flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium mb-2 text-black">Smart Review</h3>
                <p className="text-sm text-black">
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
              className="bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
            >
              Start Mixed Practice Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
