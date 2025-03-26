"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Brain,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Gavel,
} from "lucide-react";
import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Interactive Case Studies
      </h1>
      <p className="text-gray-400 mb-8">
        Master legal analysis with AI-driven case briefing, hypothetical
        questions, and personalized outlines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Case Briefing Card */}
        <Card className="hover:border-gray-600 transition-all bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Scale className="h-5 w-5 text-gray-400" />
              Case Briefing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Analyze landmark cases, write structured briefs, and get real-time
              AI feedback and model answers.
            </p>
            <Link href="/case-study/briefing">
              <Button className="w-full bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
                Start Briefing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Analysis Card */}
        <Card className="hover:border-gray-600 transition-all bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-gray-400" />
              Legal Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Apply legal reasoning to AI-generated hypotheticals with detailed
              feedback on your analysis.
            </p>
            <Link href="/case-study/analysis">
              <Button className="w-full bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Research Card */}
        <Card className="hover:border-gray-600 transition-all bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-gray-400" />
              Legal Research
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Practice finding relevant precedents and statutes for complex
              legal scenarios with AI guidance.
            </p>
            <Link href="/case-study/research">
              <Button className="w-full bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
                Start Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Moot Court Card */}
        <Card className="hover:border-gray-600 transition-all bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Gavel className="h-5 w-5 text-gray-400" />
              Moot Court
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Practice oral arguments and receive feedback on your persuasive
              legal reasoning skills.
            </p>
            <Link href="/case-study/moot-court">
              <Button className="w-full bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
                Start Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Writing Card */}
        <Card className="hover:border-gray-600 transition-all bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <GraduationCap className="h-5 w-5 text-gray-400" />
              Legal Writing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Improve your legal writing with guided exercises on memos, briefs,
              and other legal documents.
            </p>
            <Link href="/case-study/writing">
              <Button className="w-full bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
                Start Writing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
