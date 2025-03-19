"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Scale, BookOpen, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interactive Case Studies</h1>
      <p className="text-gray-600 mb-8">
        Master legal analysis through real case studies with AI-powered feedback
        and guidance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Case Briefing Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Case Briefing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Practice analyzing legal cases and writing comprehensive case
              briefs with AI feedback.
            </p>
            <Link href="/case-study/briefing">
              <Button className="w-full">
                Start Briefing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Analysis Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Legal Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Develop your legal reasoning skills with interactive hypotheticals
              and AI guidance.
            </p>
            <Link href="/case-study/analysis">
              <Button className="w-full">
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Case Library Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Case Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Access a comprehensive library of landmark cases with detailed
              explanations.
            </p>
            <Link href="/case-study/library">
              <Button className="w-full">
                Browse Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
