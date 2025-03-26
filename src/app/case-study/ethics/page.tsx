"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, Send } from "lucide-react";
import Link from "next/link";

interface EthicsFeedback {
  ethicalAnalysis: number;
  ruleIdentification: number;
  conflictResolution: number;
  professionalJudgment: number;
  overallFeedback: string;
  relevantRules: string[];
  ethicalConsiderations: string[];
  alternativeApproaches: string[];
  potentialConsequences: string[];
  modelResponse: string;
  error?: string;
}

export default function LegalEthicsPage() {
  const [scenario, setScenario] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [jurisdiction, setJurisdiction] = useState("model");
  const [feedback, setFeedback] = useState<EthicsFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const ethicsScenarios = [
    {
      id: "confidentiality",
      title: "Client Confidentiality Dilemma",
      scenario:
        "Your client has disclosed to you that they intend to commit perjury in an upcoming trial. They plan to testify that they were not at the scene of the crime, but they previously told you they were present but did not commit the crime. How do you handle this ethical dilemma while maintaining your duties to your client and to the court?",
    },
    {
      id: "conflict-interest",
      title: "Conflict of Interest",
      scenario:
        "Your law firm has been representing Corporation A for several years. A new client, Corporation B, approaches your firm seeking representation in a contract negotiation with Corporation A. The matter is unrelated to your firm's work for Corporation A. Can your firm represent Corporation B? What ethical considerations are involved?",
    },
    {
      id: "fee-dispute",
      title: "Fee Arrangement Ethics",
      scenario:
        "You're representing a client in a personal injury case on a contingency fee basis. After significant work on the case, the client wants to settle for an amount you believe is far below the case's value. The client is in financial distress and needs immediate funds. How do you balance your financial interest in the case with your duty to respect your client's wishes?",
    },
    {
      id: "social-media",
      title: "Social Media Ethics",
      scenario:
        "You're representing a client in a contentious divorce case. While preparing, you discover that the opposing party has a public social media account with potentially damaging information. You also notice that a juror in the case has been posting opinions about divorce cases online. What are the ethical boundaries for viewing and using this social media information?",
    },
    {
      id: "whistleblower",
      title: "Corporate Whistleblower",
      scenario:
        "You're in-house counsel for a corporation. You discover evidence suggesting the company is engaging in fraudulent accounting practices. The CEO tells you to ignore it and reminds you of your duty of confidentiality to the company. What are your ethical obligations in this situation?",
    },
  ];

  const handleSelectScenario = (scenarioText: string) => {
    setScenario(scenarioText);
    setUserResponse("");
    setFeedback(null);
  };

  const handleSubmitResponse = async () => {
    if (!scenario.trim() || !userResponse.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/case-study/legal-ethics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario,
          userResponse,
          jurisdiction:
            jurisdiction === "model"
              ? "Model Rules of Professional Conduct"
              : jurisdiction,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze ethics response");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error: any) {
      console.error("Error submitting ethics response:", error);
      setFeedback({
        error: "Failed to get feedback. Please try again.",
        ethicalAnalysis: 0,
        ruleIdentification: 0,
        conflictResolution: 0,
        professionalJudgment: 0,
        overallFeedback: "",
        relevantRules: [],
        ethicalConsiderations: [],
        alternativeApproaches: [],
        potentialConsequences: [],
        modelResponse: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:bg-[#1a1a1f] hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Legal Ethics Practice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <Card className="lg:col-span-1 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-gray-400" />
              Ethical Dilemmas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ethicsScenarios.map((item) => (
                <Card
                  key={item.id}
                  className="bg-[#121218] border-[#1a1a1f] hover:bg-[#1a1a1f] transition-colors cursor-pointer"
                  onClick={() => handleSelectScenario(item.scenario)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {item.scenario.substring(0, 100)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Or enter your own ethical scenario:
                </p>
                <Textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Describe the ethical dilemma..."
                  className="bg-[#1a1a1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Submission */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#121218] border-[#1a1a1f]">
            <CardHeader>
              <CardTitle className="text-white">Ethical Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scenario ? (
                <>
                  <div>
                    <h3 className="font-medium mb-2 text-white">
                      Ethical Scenario:
                    </h3>
                    <p className="text-gray-400 mb-4">{scenario}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2 text-white">
                      Jurisdiction:
                    </h3>
                    <Select
                      onValueChange={setJurisdiction}
                      value={jurisdiction}
                    >
                      <SelectTrigger className="bg-[#1a1a1f] border-[#2a2a2f] text-white">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1f] border-[#2a2a2f] text-white">
                        <SelectItem value="model">
                          Model Rules of Professional Conduct
                        </SelectItem>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="new-york">New York</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-white">
                      Your Response:
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Analyze the ethical issues, identify relevant rules, and
                      explain how you would resolve this dilemma.
                    </p>
                    <Textarea
                      value={userResponse}
                      onChange={(e) => setUserResponse(e.target.value)}
                      placeholder="This ethical situation involves several considerations. First, I would identify the applicable rules of professional conduct..."
                      className="min-h-[200px] bg-[#0a0a0f] border-[#1a1a1f] text-white placeholder:text-gray-500"
                    />
                    <Button
                      className="w-full mt-4 bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
                      onClick={handleSubmitResponse}
                      disabled={
                        isLoading || !scenario.trim() || !userResponse.trim()
                      }
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Analyzing..." : "Submit Analysis"}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-400">
                  Select an ethical scenario from the list or enter your own to
                  begin
                </p>
              )}
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-[#121218] border-[#1a1a1f]">
              <CardHeader>
                <CardTitle className="text-white">Ethics Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Ethical Analysis:
                        </h3>
                        <Progress
                          value={feedback.ethicalAnalysis * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.ethicalAnalysis * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Rule Identification:
                        </h3>
                        <Progress
                          value={feedback.ruleIdentification * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.ruleIdentification * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Conflict Resolution:
                        </h3>
                        <Progress
                          value={feedback.conflictResolution * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.conflictResolution * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Professional Judgment:
                        </h3>
                        <Progress
                          value={feedback.professionalJudgment * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.professionalJudgment * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Overall Feedback:
                      </h3>
                      <p className="text-gray-400">
                        {feedback.overallFeedback}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Relevant Rules:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.relevantRules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Ethical Considerations:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.ethicalConsiderations.map(
                          (consideration, index) => (
                            <li key={index}>{consideration}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Alternative Approaches:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.alternativeApproaches.map(
                          (approach, index) => (
                            <li key={index}>{approach}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Potential Consequences:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.potentialConsequences.map(
                          (consequence, index) => (
                            <li key={index}>{consequence}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Model Response:
                      </h3>
                      <div className="bg-[#1a1a1f]/20 p-4 rounded-lg border border-[#2a2a2f] text-gray-400">
                        {feedback.modelResponse}
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
