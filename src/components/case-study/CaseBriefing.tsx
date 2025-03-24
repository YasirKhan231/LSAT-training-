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
      <Card className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="h-5 w-5 text-white" />
            {caseData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-white">Case Facts</h3>
              <p className="text-white">{caseData.facts}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2 text-white">
                  Issue
                </label>
                <Textarea
                  placeholder="What is the legal question presented?"
                  value={userBrief.issue}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, issue: e.target.value })
                  }
                  className="h-24 bg-[#121218] border-[#1a1a1f] text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-white">
                  Rule
                </label>
                <Textarea
                  placeholder="What legal rules or principles apply?"
                  value={userBrief.rule}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, rule: e.target.value })
                  }
                  className="h-24 bg-[#121218] border-[#1a1a1f] text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-white">
                  Analysis
                </label>
                <Textarea
                  placeholder="How do the rules apply to these facts?"
                  value={userBrief.analysis}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, analysis: e.target.value })
                  }
                  className="h-32 bg-[#121218] border-[#1a1a1f] text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-white">
                  Conclusion
                </label>
                <Textarea
                  placeholder="What is the outcome based on your analysis?"
                  value={userBrief.conclusion}
                  onChange={(e) =>
                    setUserBrief({ ...userBrief, conclusion: e.target.value })
                  }
                  className="h-24 bg-[#121218] border-[#1a1a1f] text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-[#121218] hover:bg-[#1a1a1f] text-white border border-[#1a1a1f]"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Brief"}
            </Button>

            {feedback && (
              <div
                className={`p-4 rounded-lg ${
                  feedback.includes("Excellent")
                    ? "bg-green-900/20 border border-green-800"
                    : "bg-amber-900/20 border border-amber-800"
                }`}
              >
                <div className="flex items-start gap-2">
                  {feedback.includes("Excellent") ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                  )}
                  <div>
                    <h4 className="font-medium mb-1 text-white">AI Feedback</h4>
                    <p className="text-sm text-white">{feedback}</p>
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
