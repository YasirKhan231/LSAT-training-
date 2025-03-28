"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Send, Brain, Scale } from "lucide-react";
import Link from "next/link";
import { sampleCases } from "@/lib/sampleCases";

interface CaseData {
  id: string;
  title: string;
  facts: string;
  issue: string;
  holding: string;
  reasoning: string;
}

interface Brief {
  facts: string;
  issue: string;
  rule: string;
  application: string;
  conclusion: string;
}

interface BriefFeedback {
  factsScore: number;
  issueScore: number;
  ruleScore: number;
  applicationScore: number;
  conclusionScore: number;
  factsFeedback: string;
  issueFeedback: string;
  ruleFeedback: string;
  applicationFeedback: string;
  conclusionFeedback: string;
  suggestions: string[];
  modelBrief: Brief;
}

interface OutlineData {
  outline: string;
  topics: string[];
  focusAreas: string[];
}

interface HypotheticalFeedback {
  issueSpottingScore: number;
  reasoningScore: number;
  precedentScore: number;
  clarityScore: number;
  issueSpottingFeedback: string;
  reasoningFeedback: string;
  precedentFeedback: string;
  clarityFeedback: string;
  suggestions: string[];
  modelResponse: string;
}

export default function CaseBriefingPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [brief, setBrief] = useState<Brief>({
    facts: "",
    issue: "",
    rule: "",
    application: "",
    conclusion: "",
  });
  const [briefFeedback, setBriefFeedback] = useState<BriefFeedback | null>(
    null
  );
  const [isSubmittingBrief, setIsSubmittingBrief] = useState(false);
  const [hypothetical, setHypothetical] = useState<string | null>(null);
  const [hypoResponse, setHypoResponse] = useState<string>("");
  const [hypoFeedback, setHypoFeedback] = useState<HypotheticalFeedback | null>(
    null
  );
  const [outlineData, setOutlineData] = useState<OutlineData | null>(null);
  const [isSubmittingHypo, setIsSubmittingHypo] = useState(false);
  const [isLoadingOutline, setIsLoadingOutline] = useState(false);

  const filteredCases = sampleCases.filter((caseItem) =>
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBriefChange = (field: keyof Brief, value: string) => {
    setBrief((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitBrief = async () => {
    if (!selectedCase) return;
    setIsSubmittingBrief(true);

    try {
      const response = await fetch("/api/case-briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData: sampleCases.find((c) => c.id === selectedCase),
          userBrief: brief,
        }),
      });

      if (!response.ok) throw new Error("Failed to analyze brief");
      const data = await response.json();
      setBriefFeedback(data);
    } catch (error) {
      console.error("Error submitting brief:", error);
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  const handleGenerateHypothetical = async () => {
    if (!selectedCase) return;
    try {
      const response = await fetch(
        "/api/case-study/case-briefing/hypothetical",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caseId: selectedCase }),
        }
      );
      const data = await response.json();
      setHypothetical(data.hypothetical);
      setHypoResponse("");
      setHypoFeedback(null);
    } catch (error) {
      console.error("Error generating hypothetical:", error);
    }
  };

  const handleSubmitHypo = async () => {
    if (!hypothetical || !hypoResponse.trim()) return;
    setIsSubmittingHypo(true);

    try {
      const response = await fetch("/api/case-briefing/hypothetical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hypothetical, userResponse: hypoResponse }),
      });
      const data = await response.json();
      setHypoFeedback(data);
    } catch (error) {
      console.error("Error submitting hypothetical response:", error);
    } finally {
      setIsSubmittingHypo(false);
    }
  };

  const handleGenerateOutline = async () => {
    setIsLoadingOutline(true);
    try {
      const response = await fetch("/api/case-briefing/outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123" }),
      });

      if (!response.ok) throw new Error("Failed to generate outline");

      const data = await response.json();

      if (!data.outline) {
        throw new Error("Received empty outline");
      }

      let cleanOutline = data.outline
        .replace(/^```markdown|```$/g, "")
        .replace(/\n\n+/g, "\n\n")
        .trim();

      if (!cleanOutline.endsWith(".")) {
        cleanOutline += "\n\n[Outline complete]";
      }

      setOutlineData({
        outline: cleanOutline,
        topics: data.metadata?.topics || [],
        focusAreas: data.metadata?.focusAreas || [],
      });
    } catch (error: any) {
      setOutlineData({
        outline: `Error generating outline: ${error.message}`,
        topics: [],
        focusAreas: [],
      });
    } finally {
      setIsLoadingOutline(false);
    }
  };

  const selectedCaseData = sampleCases.find((c) => c.id === selectedCase);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-black">
          Case Briefing Practice
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Selection */}
        <Card className="lg:col-span-1 bg-white">
          <CardHeader>
            <CardTitle className="text-black">Available Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* In the Case Selection card */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#2a2a2f] rounded-lg px-4 py-2.5 text-black placeholder-gray-500 focus:outline-none focus:border-[#3a3a3f] focus:ring-1 focus:ring-[#3a3a3f] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            {/* Updated responsive height version */}
            <div className="space-y-2 h-[40vh] md:h-[calc(100vh-300px)] overflow-y-auto pr-1">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <Button
                    key={caseItem.id}
                    variant={
                      selectedCase === caseItem.id ? "default" : "outline"
                    }
                    className={`w-full justify-start text-left truncate ${
                      selectedCase === caseItem.id
                        ? "bg-white hover:bg-[#2a2a2f] text-black"
                        : "bg-white border-[#2a2a2f] text-black hover:bg-[#2a2a2f]"
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <span className="truncate">{caseItem.title}</span>
                  </Button>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No cases found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Briefing, Hypothetical, and Outline */}
        <div className="lg:col-span-2">
          {selectedCaseData ? (
            <Tabs defaultValue="briefing" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white">
                <TabsTrigger
                  value="briefing"
                  className="data-[state=active]:bg-[#2a2a2f] data-[state=active]:text-gray-300"
                >
                  Case Briefing
                </TabsTrigger>
                <TabsTrigger
                  value="hypothetical"
                  className="data-[state=active]:bg-[#2a2a2f] data-[state=active]:text-gray-300"
                >
                  Hypothetical
                </TabsTrigger>
                <TabsTrigger
                  value="outline"
                  className="data-[state=active]:bg-[#2a2a2f] data-[state=active]:text-gray-300"
                >
                  Outline
                </TabsTrigger>
              </TabsList>

              {/* Case Briefing Tab */}
              <TabsContent value="briefing">
                <Card className="bg-white border-[#1a1a1f]">
                  <CardHeader>
                    <CardTitle className="text-black">
                      {selectedCaseData.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-black">Facts</h3>
                      <p className="text-gray-400">{selectedCaseData.facts}</p>
                      <Textarea
                        placeholder="Summarize the facts..."
                        value={brief.facts}
                        onChange={(e) =>
                          handleBriefChange("facts", e.target.value)
                        }
                        className="mt-2 bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Issue</h3>
                      <p className="text-gray-400">{selectedCaseData.issue}</p>
                      <Textarea
                        placeholder="State the legal issue..."
                        value={brief.issue}
                        onChange={(e) =>
                          handleBriefChange("issue", e.target.value)
                        }
                        className="mt-2 bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Rule</h3>
                      <Textarea
                        placeholder="Identify the applicable rule or precedent..."
                        value={brief.rule}
                        onChange={(e) =>
                          handleBriefChange("rule", e.target.value)
                        }
                        className="bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Application</h3>
                      <Textarea
                        placeholder="Explain how the rule applies to the facts..."
                        value={brief.application}
                        onChange={(e) =>
                          handleBriefChange("application", e.target.value)
                        }
                        className="bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-black">Conclusion</h3>
                      <Textarea
                        placeholder="State the court's conclusion..."
                        value={brief.conclusion}
                        onChange={(e) =>
                          handleBriefChange("conclusion", e.target.value)
                        }
                        className="bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitBrief}
                      disabled={
                        isSubmittingBrief ||
                        !Object.values(brief).every((v) => v.trim())
                      }
                      className="w-full bg-white hover:bg-[#2a2a2f] text-black disabled:bg-white disabled:text-gray-400"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmittingBrief ? "Analyzing..." : "Submit Brief"}
                    </Button>
                  </CardContent>
                </Card>
                {briefFeedback && (
                  <Card className="mt-6 bg-white border-[#1a1a1f]">
                    <CardHeader>
                      <CardTitle className="text-black">AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-black">
                          Facts ({(briefFeedback.factsScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.factsScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {briefFeedback.factsFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Issue ({(briefFeedback.issueScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.issueScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {briefFeedback.issueFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Rule ({(briefFeedback.ruleScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.ruleScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {briefFeedback.ruleFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Application (
                          {(briefFeedback.applicationScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.applicationScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {briefFeedback.applicationFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Conclusion (
                          {(briefFeedback.conclusionScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.conclusionScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {briefFeedback.conclusionFeedback}
                        </p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-lg border border-[#2a2a2f]">
                        <h3 className="font-medium text-gray-300">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-gray-400">
                          {briefFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">Model Brief</h3>
                        <p className="text-sm text-gray-400">
                          <strong className="text-gray-300">Facts:</strong>{" "}
                          {briefFeedback.modelBrief.facts}
                          <br />
                          <strong className="text-gray-300">Issue:</strong>{" "}
                          {briefFeedback.modelBrief.issue}
                          <br />
                          <strong className="text-gray-300">Rule:</strong>{" "}
                          {briefFeedback.modelBrief.rule}
                          <br />
                          <strong className="text-gray-300">
                            Application:
                          </strong>{" "}
                          {briefFeedback.modelBrief.application}
                          <br />
                          <strong className="text-gray-300">
                            Conclusion:
                          </strong>{" "}
                          {briefFeedback.modelBrief.conclusion}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Hypothetical Questions Tab */}
              <TabsContent value="hypothetical">
                <Card className="bg-white border-[#1a1a1f]">
                  <CardHeader>
                    <CardTitle className="text-black">
                      Legal Hypothetical
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!hypothetical ? (
                      <Button
                        onClick={handleGenerateHypothetical}
                        className="w-full bg-white hover:bg-[#2a2a2f] text-black"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Hypothetical
                      </Button>
                    ) : (
                      <>
                        <p className="text-gray-400">{hypothetical}</p>
                        <Textarea
                          placeholder="Write your legal analysis here..."
                          value={hypoResponse}
                          onChange={(e) => setHypoResponse(e.target.value)}
                          className="min-h-[200px] bg-white border-[#2a2a2f] text-black placeholder:text-gray-500"
                        />
                        <Button
                          onClick={handleSubmitHypo}
                          disabled={isSubmittingHypo || !hypoResponse.trim()}
                          className="w-full bg-white hover:bg-[#2a2a2f] text-black disabled:bg-white disabled:text-gray-400"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {isSubmittingHypo
                            ? "Analyzing..."
                            : "Submit Analysis"}
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
                {hypoFeedback && (
                  <Card className="mt-6 bg-white border-[#1a1a1f]">
                    <CardHeader>
                      <CardTitle className="text-black">AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-black">
                          Issue Spotting (
                          {(hypoFeedback.issueSpottingScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.issueSpottingScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {hypoFeedback.issueSpottingFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Reasoning (
                          {(hypoFeedback.reasoningScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.reasoningScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {hypoFeedback.reasoningFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Precedent (
                          {(hypoFeedback.precedentScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.precedentScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {hypoFeedback.precedentFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Clarity (
                          {(hypoFeedback.clarityScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.clarityScore * 100}
                          className="bg-white"
                        />
                        <p className="text-sm text-gray-400">
                          {hypoFeedback.clarityFeedback}
                        </p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-lg border border-[#2a2a2f]">
                        <h3 className="font-medium text-gray-300">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-gray-400">
                          {hypoFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-black">
                          Model Response
                        </h3>
                        <p className="text-sm text-gray-400">
                          {hypoFeedback.modelResponse}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Outline Tab */}
              <TabsContent value="outline">
                <Card className="bg-white border-[#1a1a1f]">
                  <CardHeader>
                    <CardTitle className="text-black">
                      Constitutional Law Outline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!outlineData ? (
                      <Button
                        onClick={handleGenerateOutline}
                        disabled={isLoadingOutline}
                        className="w-full bg-white hover:bg-[#2a2a2f] text-black"
                      >
                        <Scale className="mr-2 h-4 w-4" />
                        {isLoadingOutline
                          ? "Generating..."
                          : "Generate Outline"}
                      </Button>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative">
                          <Textarea
                            value={outlineData.outline}
                            readOnly
                            className="min-h-[400px] font-mono text-sm bg-white border-[#2a2a2f] text-gray-300"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 hover:text-black"
                            onClick={() =>
                              navigator.clipboard.writeText(outlineData.outline)
                            }
                          >
                            Copy
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-white border-[#2a2a2f]">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-gray-300">
                                Key Topics
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {outlineData.topics.map((topic, i) => (
                                  <li key={i} className="text-gray-400 text-sm">
                                    • {topic}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-[#2a2a2f]">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-gray-300">
                                Focus Areas
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {outlineData.focusAreas.map((area, i) => (
                                  <li key={i} className="text-gray-400 text-sm">
                                    • {area}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <Button
                          onClick={handleGenerateOutline}
                          variant="outline"
                          className="w-full border-[#2a2a2f] text-gray-300 hover:text-black"
                        >
                          Generate New Outline
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-white border-[#1a1a1f]">
              <CardContent className="p-6 text-center text-gray-400">
                Select a case from the list to begin
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
