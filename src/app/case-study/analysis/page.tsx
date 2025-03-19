"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

export default function LegalAnalysisPage() {
  const [analysis, setAnalysis] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const hypothetical = {
    title: "Contract Formation Scenario",
    facts: `A small business owner sends an email to a supplier requesting a quote for 100 units of a product. 
    The supplier responds with a detailed price quote. The business owner replies "Looks good, please proceed." 
    The supplier never ships the products, and prices have since increased significantly.`,
    question:
      "Analyze whether a valid contract was formed and what remedies might be available.",
  };

  const handleSubmitAnalysis = async () => {
    // Implement AI analysis logic here
    setFeedback(
      "Your analysis demonstrates good understanding of contract formation elements..."
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Legal Analysis Practice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{hypothetical.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Facts:</h3>
                <p className="text-gray-600">{hypothetical.facts}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Question:</h3>
                <p className="text-gray-600">{hypothetical.question}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="Enter your legal analysis here..."
                className="min-h-[200px]"
              />
              <Button className="w-full mt-4" onClick={handleSubmitAnalysis}>
                <Brain className="mr-2 h-4 w-4" />
                Analyze Response
              </Button>
            </CardContent>
          </Card>

          {feedback && (
            <Card>
              <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feedback}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
