"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-950">
      <h1 className="text-3xl font-bold mb-6 text-slate-100">
        Interactive Case Studies
      </h1>
      <p className="text-slate-400 mb-8">
        Master legal analysis with AI-driven case briefing, hypothetical
        questions, and personalized outlines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Case Briefing Card */}
        <Card className="hover:border-indigo-600 transition-all bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Scale className="h-5 w-5 text-indigo-400" />
              Case Briefing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 mb-4">
              Analyze landmark cases, write structured briefs, and get real-time
              AI feedback and model answers.
            </p>
            <Link href="/case-study/briefing">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Start Briefing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Analysis Card */}
        <Card className="hover:border-indigo-600 transition-all bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Brain className="h-5 w-5 text-indigo-400" />
              Legal Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 mb-4">
              Apply legal reasoning to AI-generated hypotheticals with detailed
              feedback on your analysis.
            </p>
            <Link href="/case-study/analysis">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Case Library Card */}
        {/* <Card className="hover:border-indigo-600 transition-all bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              Case Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 mb-4">
              Explore landmark cases and get AI-generated outlines tailored to
              your study needs.
            </p>
            <Link href="/case-study/library">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Browse Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
