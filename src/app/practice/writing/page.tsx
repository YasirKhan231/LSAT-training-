"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import Link from "next/link";

export default function WritingPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-100">
          Writing Practice
        </h1>
        <p className="text-slate-400 mb-8">
          Improve your legal writing skills with AI-powered feedback and
          analysis.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Essay Practice Card */}
          <Card className="hover:border-indigo-600 transition-all bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-100">
                <PenTool className="mr-2 h-5 w-5 text-indigo-400" />
                Essay Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-slate-400">
                Practice writing bar exam essays with real-time AI feedback on
                structure, analysis, and legal reasoning.
              </p>
              <Link href="/practice/writing/essay">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Start Essay Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Performance Test Card */}
        </div>
      </div>
    </div>
  );
}
