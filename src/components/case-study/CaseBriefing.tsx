"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, CheckCircle, AlertCircle } from "lucide-react";

interface CaseBriefingProps {
  caseData: {
    title: string;
    facts: string;
    issue: string;
    holding: string;
    reasoning: string;
  };
}

export default function CaseBriefing({ caseData }: CaseBriefingProps) {
  const [userBrief, setUserBrief] = useState({
    issue: "",
    rule: "",
    analysis: "",
    conclusion: "",
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userBrief, caseData }),
      });
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error("Error analyzing brief:", error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            {caseData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Case Facts</h3>
              <p className="text-gray-600">{caseData.facts}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Issue</label>
                <Textarea
                  placeholder="What is the legal question presented?"
                  value={userBrief.issue}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, issue: e.target.value })
                  }
                  className="h-24"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Rule</label>
                <Textarea
                  placeholder="What legal rules or principles apply?"
                  value={userBrief.rule}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, rule: e.target.value })
                  }
                  className="h-24"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Analysis</label>
                <Textarea
                  placeholder="How do the rules apply to these facts?"
                  value={userBrief.analysis}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, analysis: e.target.value })
                  }
                  className="h-32"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Conclusion</label>
                <Textarea
                  placeholder="What is the outcome based on your analysis?"
                  value={userBrief.conclusion}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, conclusion: e.target.value })
                  }
                  className="h-24"
                />
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Brief"}
            </Button>

            {feedback && (
              <div
                className={`p-4 rounded-lg ${
                  feedback.includes("Excellent")
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  {feedback.includes("Excellent") ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1">AI Feedback</h4>
                    <p className="text-sm">{feedback}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
