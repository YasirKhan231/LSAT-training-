"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

export default function LegalAnalysisPage() {
  const [analysis, setAnalysis] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hypothetical = {
    title: "Contract Formation Scenario",
    facts: `A small business owner sends an email to a supplier requesting a quote for 100 units of a product. 
    The supplier responds with a detailed price quote. The business owner replies "Looks good, please proceed." 
    The supplier never ships the products, and prices have since increased significantly.`,
    question:
      "Analyze whether a valid contract was formed and what remedies might be available.",
  };

  const handleSubmitAnalysis = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseData: hypothetical,
          userAnalysis: analysis,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error("Error submitting analysis:", error);
      setFeedback({ error: "Failed to get feedback. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-950">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:bg-slate-800 hover:text-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-100">
          Legal Analysis Practice
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">
              {hypothetical.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-slate-100">Facts:</h3>
                <p className="text-slate-400">{hypothetical.facts}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-slate-100">Question:</h3>
                <p className="text-slate-400">{hypothetical.question}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Your Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="Enter your legal analysis here..."
                className="min-h-[200px] bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
              <Button
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleSubmitAnalysis}
                disabled={isLoading}
              >
                <Brain className="mr-2 h-4 w-4" />
                {isLoading ? "Analyzing..." : "Analyze Response"}
              </Button>
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100">AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 text-slate-100">
                        Score:
                      </h3>
                      <p className="text-slate-400">
                        {feedback.analysisScore * 100}%
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-slate-100">
                        Feedback:
                      </h3>
                      <p className="text-slate-400">
                        {feedback.analysisFeedback}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-slate-100">
                        Suggestions:
                      </h3>
                      <ul className="list-disc list-inside text-slate-400">
                        {feedback.suggestions.map(
                          (suggestion: string, index: number) => (
                            <li key={index}>{suggestion}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-slate-100">
                        Model Analysis:
                      </h3>
                      <div className="space-y-3 text-slate-400">
                        <div>
                          <h4 className="font-medium text-slate-300">Facts:</h4>
                          <ul className="list-disc list-inside pl-5">
                            {feedback.modelAnalysis.facts
                              .split(". ")
                              .filter((point: string) => point.trim() !== "")
                              .map((point: string, index: number) => (
                                <li key={index}>{point.trim()}</li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-300">Issue:</h4>
                          <ul className="list-disc list-inside pl-5">
                            {feedback.modelAnalysis.issue
                              .split(". ")
                              .filter((point: string) => point.trim() !== "")
                              .map((point: string, index: number) => (
                                <li key={index}>{point.trim()}</li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-300">Rule:</h4>
                          <ul className="list-disc list-inside pl-5">
                            {feedback.modelAnalysis.rule
                              .split(". ")
                              .filter((point: string) => point.trim() !== "")
                              .map((point: string, index: number) => (
                                <li key={index}>{point.trim()}</li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-300">
                            Application:
                          </h4>
                          <ul className="list-disc list-inside pl-5">
                            {feedback.modelAnalysis.application
                              .split(". ")
                              .filter((point: string) => point.trim() !== "")
                              .map((point: string, index: number) => (
                                <li key={index}>{point.trim()}</li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-300">
                            Conclusion:
                          </h4>
                          <ul className="list-disc list-inside pl-5">
                            {feedback.modelAnalysis.conclusion
                              .split(". ")
                              .filter((point: string) => point.trim() !== "")
                              .map((point: string, index: number) => (
                                <li key={index}>{point.trim()}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
