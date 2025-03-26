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
import { ArrowLeft, Gavel, Send } from "lucide-react";
import Link from "next/link";

interface MootCourtFeedback {
  persuasiveness: number;
  legalReasoning: number;
  caseUsage: number;
  delivery: number;
  overallFeedback: string;
  strengthPoints: string[];
  improvementAreas: string[];
  counterArguments: string[];
  benchQuestions: string[];
  error?: string;
}

export default function MootCourtPage() {
  const [caseScenario, setCaseScenario] = useState("");
  const [userArgument, setUserArgument] = useState("");
  const [side, setSide] = useState<string>("");
  const [feedback, setFeedback] = useState<MootCourtFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mootCourtCases = [
    {
      id: "first-amendment",
      title: "First Amendment Campus Speech",
      scenario:
        "A public university has implemented a policy prohibiting 'offensive speech' on campus, including in dormitories and online forums affiliated with the university. A student group challenges this policy after being sanctioned for hosting a controversial speaker.",
      sides: ["Student Group", "University"],
    },
    {
      id: "fourth-amendment",
      title: "Fourth Amendment Digital Privacy",
      scenario:
        "Police officers accessed a suspect's cloud storage account without a warrant after obtaining the password from the suspect's roommate. They discovered evidence of criminal activity. The defendant moves to suppress this evidence.",
      sides: ["Defendant", "Prosecution"],
    },
    {
      id: "contract-dispute",
      title: "Force Majeure Contract Dispute",
      scenario:
        "A concert venue invoked the force majeure clause in its contract with a touring band due to a government-mandated shutdown during a public health emergency. The band argues that virtual performances were still possible and seeks damages for breach of contract.",
      sides: ["Band", "Venue"],
    },
    {
      id: "trademark-infringement",
      title: "Trademark Infringement Case",
      scenario:
        "A small coffee shop named 'Moonbucks Coffee' with a similar logo to a major coffee chain has been sued for trademark infringement. The small business argues their branding is parody and protected under fair use.",
      sides: ["Major Chain", "Small Coffee Shop"],
    },
  ];

  const handleSelectCase = (scenario: string) => {
    setCaseScenario(scenario);
    setUserArgument("");
    setSide("");
    setFeedback(null);
  };

  const handleSubmitArgument = async () => {
    if (!caseScenario.trim() || !userArgument.trim() || !side) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/case-study/moot-court", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseScenario,
          userArgument,
          side,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze argument");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error: any) {
      console.error("Error submitting argument:", error);
      setFeedback({
        error: "Failed to get feedback. Please try again.",
        persuasiveness: 0,
        legalReasoning: 0,
        caseUsage: 0,
        delivery: 0,
        overallFeedback: "",
        strengthPoints: [],
        improvementAreas: [],
        counterArguments: [],
        benchQuestions: [],
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
        <h1 className="text-3xl font-bold text-white">Moot Court Practice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Selection */}
        <Card className="lg:col-span-1 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Gavel className="h-5 w-5 text-gray-400" />
              Moot Court Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mootCourtCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="bg-[#121218] border-[#1a1a1f] hover:bg-[#1a1a1f] transition-colors cursor-pointer"
                  onClick={() => handleSelectCase(caseItem.scenario)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-white mb-1">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {caseItem.scenario.substring(0, 100)}...
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {caseItem.sides.map((sideName, index) => (
                        <span
                          key={index}
                          className="text-xs bg-[#2a2a2f] text-gray-300 px-2 py-1 rounded"
                        >
                          {sideName}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Or enter your own case scenario:
                </p>
                <Textarea
                  value={caseScenario}
                  onChange={(e) => setCaseScenario(e.target.value)}
                  placeholder="Describe the legal scenario..."
                  className="bg-[#1a1a1f] border-[#2a2a2f] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Argument Submission */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#121218] border-[#1a1a1f]">
            <CardHeader>
              <CardTitle className="text-white">Oral Argument</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseScenario ? (
                <>
                  <div>
                    <h3 className="font-medium mb-2 text-white">
                      Case Scenario:
                    </h3>
                    <p className="text-gray-400 mb-4">{caseScenario}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2 text-white">
                      Select Your Side:
                    </h3>
                    <Select onValueChange={setSide} value={side}>
                      <SelectTrigger className="bg-[#1a1a1f] border-[#2a2a2f] text-white">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1f] border-[#2a2a2f] text-white">
                        <SelectItem value="plaintiff">
                          Plaintiff/Petitioner
                        </SelectItem>
                        <SelectItem value="defendant">
                          Defendant/Respondent
                        </SelectItem>
                        <SelectItem value="appellant">Appellant</SelectItem>
                        <SelectItem value="appellee">Appellee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-white">
                      Your Argument:
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Present your oral argument as if you were speaking to a
                      panel of judges. Include your legal reasoning, relevant
                      precedents, and address potential counterarguments.
                    </p>
                    <Textarea
                      value={userArgument}
                      onChange={(e) => setUserArgument(e.target.value)}
                      placeholder="May it please the court, I represent the [side] in this case. The issue before the court today is..."
                      className="min-h-[200px] bg-[#0a0a0f] border-[#1a1a1f] text-white placeholder:text-gray-500"
                    />
                    <Button
                      className="w-full mt-4 bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
                      onClick={handleSubmitArgument}
                      disabled={
                        isLoading ||
                        !caseScenario.trim() ||
                        !userArgument.trim() ||
                        !side
                      }
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Analyzing..." : "Submit Argument"}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-400">
                  Select a case scenario from the list or enter your own to
                  begin
                </p>
              )}
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-[#121218] border-[#1a1a1f]">
              <CardHeader>
                <CardTitle className="text-white">Bench Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Persuasiveness:
                        </h3>
                        <Progress
                          value={feedback.persuasiveness * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.persuasiveness * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Legal Reasoning:
                        </h3>
                        <Progress
                          value={feedback.legalReasoning * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.legalReasoning * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Case Usage:
                        </h3>
                        <Progress
                          value={feedback.caseUsage * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.caseUsage * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Delivery:
                        </h3>
                        <Progress
                          value={feedback.delivery * 100}
                          className="bg-[#1a1a1f]"
                        />
                        <p className="text-sm text-gray-400 mt-1">
                          {(feedback.delivery * 100).toFixed(0)}%
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Strengths:
                        </h3>
                        <ul className="list-disc list-inside text-gray-400">
                          {feedback.strengthPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-white">
                          Areas for Improvement:
                        </h3>
                        <ul className="list-disc list-inside text-gray-400">
                          {feedback.improvementAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Potential Counter-Arguments:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.counterArguments.map((argument, index) => (
                          <li key={index}>{argument}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Bench Questions:
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Practice responding to these questions a judge might
                        ask:
                      </p>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.benchQuestions.map((question, index) => (
                          <li key={index}>{question}</li>
                        ))}
                      </ul>
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
