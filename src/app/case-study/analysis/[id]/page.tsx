"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";

// Define types for our data
interface LegalProblem {
  id: string;
  title: string;
  facts: string;
  question: string;
}

interface FeedbackData {
  analysisScore: number;
  analysisFeedback: string;
  suggestions: string[];
  modelAnalysis: {
    facts: string;
    issue: string;
    rule: string;
    application: string;
    conclusion: string;
  };
  error?: string;
}

export default function LegalAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [problem, setProblem] = useState<LegalProblem | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProblem, setIsLoadingProblem] = useState(true);

  // Fetch the problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use a mock data set
        const problems: Record<string, LegalProblem> = {
          "contract-formation": {
            id: "contract-formation",
            title: "Contract Formation Scenario",
            facts: `A small business owner sends an email to a supplier requesting a quote for 100 units of a product. 
          The supplier responds with a detailed price quote. The business owner replies "Looks good, please proceed." 
          The supplier never ships the products, and prices have since increased significantly.`,
            question:
              "Analyze whether a valid contract was formed and what remedies might be available.",
          },
          "negligence-case": {
            id: "negligence-case",
            title: "Negligence Case Study",
            facts: `A restaurant customer slipped and fell on a wet floor. There was a "Caution: Wet Floor" sign placed nearby, 
          but it was partially obscured by a plant. The customer suffered a broken wrist requiring surgery.`,
            question:
              "Analyze the elements of negligence and potential defenses in this scenario.",
          },
          "property-dispute": {
            id: "property-dispute",
            title: "Property Boundary Dispute",
            facts: `Two neighbors disagree about the boundary line between their properties. One neighbor built a fence 
          that the other claims encroaches 3 feet onto their property. The fence has been in place for 15 years.`,
            question:
              "Analyze the legal issues related to property boundaries, adverse possession, and potential remedies.",
          },
          "intellectual-property": {
            id: "intellectual-property",
            title: "Copyright Infringement Analysis",
            facts: `An artist created a painting inspired by a famous photograph. The painting uses the same composition 
          but changes the color scheme and adds several new elements not present in the original photograph.`,
            question:
              "Analyze whether this constitutes copyright infringement or fair use.",
          },
          "employment-law": {
            id: "employment-law",
            title: "Wrongful Termination Case",
            facts: `An employee was terminated after 5 years of employment with consistently positive performance reviews. 
          Two weeks before termination, the employee filed a complaint about unsafe working conditions. The employer claims 
          the termination was due to company restructuring.`,
            question:
              "Analyze whether this could constitute wrongful termination and what legal claims the employee might have.",
          },
          "family-law": {
            id: "family-law",
            title: "Child Custody Dispute",
            facts: `Parents are divorcing after 8 years of marriage. They have two children, ages 6 and 4. One parent works full-time 
          with a demanding schedule but higher income. The other parent works part-time and has been the primary caregiver. Both parents 
          seek primary physical custody.`,
            question:
              "Analyze how a court might determine custody arrangements based on the best interests of the children.",
          },
          "criminal-law": {
            id: "criminal-law",
            title: "Self-Defense Claim",
            facts: `During an argument at a bar, Person A shoved Person B. Person B then punched Person A, causing Person A to fall 
          and suffer a serious head injury. Person B claims they felt threatened and acted in self-defense.`,
            question:
              "Analyze whether Person B's actions would likely qualify as self-defense under criminal law.",
          },
          "environmental-law": {
            id: "environmental-law",
            title: "Corporate Pollution Liability",
            facts: `A manufacturing company disposed of chemical waste in a manner that complied with regulations at the time. 
          Twenty years later, these chemicals were found to have contaminated local groundwater, affecting nearby residents' health. 
          Current regulations prohibit this disposal method.`,
            question:
              "Analyze the company's potential liability under environmental law and possible defenses.",
          },
          "constitutional-law": {
            id: "constitutional-law",
            title: "First Amendment Analysis",
            facts: `A city passes an ordinance prohibiting protests in the downtown area without a permit. The permit process 
          requires 30 days' notice and payment of a $5,000 fee for security. A group wants to organize a protest about a 
          recently announced policy within one week.`,
            question:
              "Analyze whether this ordinance violates First Amendment protections for free speech and assembly.",
          },
        };

        const selectedProblem = problems[id];
        if (selectedProblem) {
          setProblem(selectedProblem);
        } else {
          // Handle case where problem doesn't exist
          router.push("/case-study/analysis");
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setIsLoadingProblem(false);
      }
    };

    fetchProblem();
  }, [id, router]);

  const handleSubmitAnalysis = async () => {
    if (!problem) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseData: problem,
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
      setFeedback({
        error: "Failed to get feedback. Please try again.",
        analysisScore: 0,
        analysisFeedback: "",
        suggestions: [],
        modelAnalysis: {
          facts: "",
          issue: "",
          rule: "",
          application: "",
          conclusion: "",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProblem) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen flex items-center justify-center">
        <p className="text-white">Loading problem...</p>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen flex items-center justify-center">
        <p className="text-white">Problem not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:bg-[#1a1a1f] hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">
          Legal Analysis Practice
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#121218] border-[#1a1a1f]">
          <CardHeader>
            <CardTitle className="text-white">{problem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-white">Facts:</h3>
                <p className="text-gray-400">{problem.facts}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-white">Question:</h3>
                <p className="text-gray-400">{problem.question}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-[#121218] border-[#1a1a1f]">
            <CardHeader>
              <CardTitle className="text-white">Your Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="Enter your legal analysis here..."
                className="min-h-[200px] bg-[#0a0a0f] border-[#1a1a1f] text-white placeholder:text-gray-500"
              />
              <Button
                className="w-full mt-4 bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white"
                onClick={handleSubmitAnalysis}
                disabled={isLoading}
              >
                <Brain className="mr-2 h-4 w-4" />
                {isLoading ? "Analyzing..." : "Analyze Response"}
              </Button>
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-[#121218] border-[#1a1a1f]">
              <CardHeader>
                <CardTitle className="text-white">AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 text-white">Score:</h3>
                      <p className="text-gray-400">
                        {feedback.analysisScore * 100}%
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-white">Feedback:</h3>
                      <p className="text-gray-400">
                        {feedback.analysisFeedback}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Suggestions:
                      </h3>
                      <ul className="list-disc list-inside text-gray-400">
                        {feedback.suggestions.map(
                          (suggestion: string, index: number) => (
                            <li key={index}>{suggestion}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-white">
                        Model Analysis:
                      </h3>
                      <div className="space-y-3 text-gray-400">
                        <div>
                          <h4 className="font-medium text-gray-300">Facts:</h4>
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
                          <h4 className="font-medium text-gray-300">Issue:</h4>
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
                          <h4 className="font-medium text-gray-300">Rule:</h4>
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
                          <h4 className="font-medium text-gray-300">
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
                          <h4 className="font-medium text-gray-300">
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
