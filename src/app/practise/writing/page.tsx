"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PenTool } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "../../../../components/ProtectRoute";

export default function WritingPracticePage() {
  return (
   
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Writing Practice</h1>
          <p className="text-muted-foreground mb-8">
            Improve your legal writing skills with AI-powered feedback and analysis.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Essay Practice Card */}
            <Card className="hover:border-blue-300 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenTool className="mr-2 h-5 w-5 text-blue-600" />
                  Essay Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">
                  Practice writing bar exam essays with real-time AI feedback on
                  structure, analysis, and legal reasoning.
                </p>
                <Link href="/practise/writing/essay">
                  <Button className="w-full">Start Essay Practice</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Performance Test Card */}
            <Card className="hover:border-blue-300 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Performance Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">
                  Complete simulated performance tests with comprehensive AI
                  evaluation of your legal writing and analysis.
                </p>
                <Link href="/practise/writing/performance-test">
                  <Button className="w-full">Start Performance Test</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
   
  );
}