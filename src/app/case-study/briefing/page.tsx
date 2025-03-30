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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const feedback: BriefFeedback = {
        factsScore: 0.85,
        issueScore: 0.9,
        ruleScore: 0.75,
        applicationScore: 0.8,
        conclusionScore: 0.95,
        factsFeedback:
          "Good summary of key facts, but could include more context about the political climate.",
        issueFeedback:
          "Excellent identification of the constitutional issue at stake.",
        ruleFeedback:
          "Correct rule identified but could cite more supporting precedent.",
        applicationFeedback:
          "Solid application of law to facts, though could explore counterarguments.",
        conclusionFeedback:
          "Very clear and accurate conclusion that follows from your analysis.",
        suggestions: [
          "Include more historical context about judicial review",
          "Discuss potential counterarguments to your position",
          "Cite at least one additional supporting case",
        ],
        modelBrief: {
          facts:
            "The case arose when William Marbury petitioned the Supreme Court to force Secretary of State James Madison to deliver his judicial commission.",
          issue:
            "Whether the Supreme Court has the authority to issue writs of mandamus under the Judiciary Act of 1789 and declare acts of Congress unconstitutional.",
          rule: "The Constitution establishes the Supreme Court's original jurisdiction, which Congress cannot expand through legislation.",
          application:
            "While the Judiciary Act authorized such writs, this conflicted with the Constitution's explicit enumeration of original jurisdiction cases.",
          conclusion:
            "The Court ruled the relevant section of the Judiciary Act unconstitutional, establishing judicial review.",
        },
      };
      setBriefFeedback(feedback);
    } catch (error) {
      console.error("Error submitting brief:", error);
    } finally {
      setIsSubmittingBrief(false);
    }
  };

  const handleGenerateHypothetical = async () => {
    if (!selectedCase) return;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const hypo =
        "Suppose Congress passes a law stripping the Supreme Court of jurisdiction over cases involving abortion rights. How would you analyze the constitutionality of this law under Marbury v. Madison?";
      setHypothetical(hypo);
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const feedback: HypotheticalFeedback = {
        issueSpottingScore: 0.88,
        reasoningScore: 0.82,
        precedentScore: 0.9,
        clarityScore: 0.85,
        issueSpottingFeedback:
          "You correctly identified the key constitutional issue about jurisdiction stripping.",
        reasoningFeedback:
          "Logical progression but could strengthen the federalism analysis.",
        precedentFeedback:
          "Excellent use of Marbury and related cases about judicial power.",
        clarityFeedback:
          "Clear writing though some sentences could be more concise.",
        suggestions: [
          "Discuss the Exceptions Clause in Article III",
          "Consider separation of powers implications",
          "Reference more recent cases about jurisdiction stripping",
        ],
        modelResponse:
          "Under Marbury, Congress cannot remove the Court's constitutional authority to interpret laws. While Article III gives Congress some control over jurisdiction, complete removal of judicial review for entire categories of cases would violate separation of powers. The Court has upheld limited jurisdiction stripping but never complete removal of judicial review for constitutional questions.",
      };
      setHypoFeedback(feedback);
    } catch (error) {
      console.error("Error submitting hypothetical response:", error);
    } finally {
      setIsSubmittingHypo(false);
    }
  };

  const handleGenerateOutline = async () => {
    setIsLoadingOutline(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const outline = `# Constitutional Law Outline\n\n## I. Judicial Review\n   A. Marbury v. Madison (1803)\n      1. Established judicial review\n      2. Constitution is supreme law\n   B. Limits on Judicial Review\n      1. Political question doctrine\n      2. Standing requirements\n\n## II. Federalism\n   A. McCulloch v. Maryland (1819)\n      1. Necessary and Proper Clause\n      2. Supremacy Clause\n   B. Commerce Clause\n      1. Gibbons v. Ogden\n      2. Modern applications\n\n## III. Individual Rights\n   A. Equal Protection\n      1. Brown v. Board\n      2. Strict scrutiny\n   B. Due Process\n      1. Substantive due process\n      2. Roe v. Wade`;

      setOutlineData({
        outline,
        topics: ["Judicial Review", "Federalism", "Individual Rights"],
        focusAreas: ["Marbury analysis", "Commerce Clause", "Equal Protection"],
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
            className="text-gray-600 hover:bg-gray-100 hover:text-black"
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
        <Card className="lg:col-span-1 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-black">Available Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-black placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
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
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-white border-gray-300 text-black "
                    }`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <span className="truncate">{caseItem.title}</span>
                  </Button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No cases found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Briefing, Hypothetical, and Outline */}
        <div className="lg:col-span-2">
          {selectedCaseData ? (
            <Tabs defaultValue="briefing" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger
                  value="briefing"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Case Briefing
                </TabsTrigger>
                <TabsTrigger
                  value="hypothetical"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Hypothetical
                </TabsTrigger>
                <TabsTrigger
                  value="outline"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Outline
                </TabsTrigger>
              </TabsList>

              {/* Case Briefing Tab */}
              <TabsContent value="briefing">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-black">
                      {selectedCaseData.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Facts</h3>
                      <p className="text-gray-700 mb-2">
                        {selectedCaseData.facts}
                      </p>
                      <Textarea
                        placeholder="Summarize the facts..."
                        value={brief.facts}
                        onChange={(e) =>
                          handleBriefChange("facts", e.target.value)
                        }
                        className="mt-2 bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Issue</h3>
                      <p className="text-gray-700 mb-2">
                        {selectedCaseData.issue}
                      </p>
                      <Textarea
                        placeholder="State the legal issue..."
                        value={brief.issue}
                        onChange={(e) =>
                          handleBriefChange("issue", e.target.value)
                        }
                        className="mt-2 bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Rule</h3>
                      <Textarea
                        placeholder="Identify the applicable rule or precedent..."
                        value={brief.rule}
                        onChange={(e) =>
                          handleBriefChange("rule", e.target.value)
                        }
                        className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Application</h3>
                      <Textarea
                        placeholder="Explain how the rule applies to the facts..."
                        value={brief.application}
                        onChange={(e) =>
                          handleBriefChange("application", e.target.value)
                        }
                        className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Conclusion</h3>
                      <Textarea
                        placeholder="State the court's conclusion..."
                        value={brief.conclusion}
                        onChange={(e) =>
                          handleBriefChange("conclusion", e.target.value)
                        }
                        className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitBrief}
                      disabled={
                        isSubmittingBrief ||
                        !Object.values(brief).every((v) => v.trim())
                      }
                      className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmittingBrief ? "Analyzing..." : "Submit Brief"}
                    </Button>
                  </CardContent>
                </Card>

                {briefFeedback && (
                  <Card className="mt-6 bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-black">AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Facts ({(briefFeedback.factsScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.factsScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {briefFeedback.factsFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Issue ({(briefFeedback.issueScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.issueScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {briefFeedback.issueFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Rule ({(briefFeedback.ruleScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.ruleScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {briefFeedback.ruleFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Application (
                          {(briefFeedback.applicationScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.applicationScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {briefFeedback.applicationFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Conclusion (
                          {(briefFeedback.conclusionScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={briefFeedback.conclusionScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {briefFeedback.conclusionFeedback}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-800">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                          {briefFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Model Brief
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
                          <p className="text-sm text-gray-700">
                            <strong className="text-gray-800">Facts:</strong>{" "}
                            {briefFeedback.modelBrief.facts}
                            <br />
                            <br />
                            <strong className="text-gray-800">
                              Issue:
                            </strong>{" "}
                            {briefFeedback.modelBrief.issue}
                            <br />
                            <br />
                            <strong className="text-gray-800">
                              Rule:
                            </strong>{" "}
                            {briefFeedback.modelBrief.rule}
                            <br />
                            <br />
                            <strong className="text-gray-800">
                              Application:
                            </strong>{" "}
                            {briefFeedback.modelBrief.application}
                            <br />
                            <br />
                            <strong className="text-gray-800">
                              Conclusion:
                            </strong>{" "}
                            {briefFeedback.modelBrief.conclusion}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Hypothetical Questions Tab */}
              <TabsContent value="hypothetical">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-black">
                      Legal Hypothetical
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!hypothetical ? (
                      <Button
                        onClick={handleGenerateHypothetical}
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Hypothetical
                      </Button>
                    ) : (
                      <>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700">{hypothetical}</p>
                        </div>
                        <Textarea
                          placeholder="Write your legal analysis here..."
                          value={hypoResponse}
                          onChange={(e) => setHypoResponse(e.target.value)}
                          className="min-h-[200px] bg-white border-gray-300 text-black placeholder:text-gray-500"
                        />
                        <Button
                          onClick={handleSubmitHypo}
                          disabled={isSubmittingHypo || !hypoResponse.trim()}
                          className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
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
                  <Card className="mt-6 bg-white border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-black">AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Issue Spotting (
                          {(hypoFeedback.issueSpottingScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.issueSpottingScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {hypoFeedback.issueSpottingFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Reasoning (
                          {(hypoFeedback.reasoningScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.reasoningScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {hypoFeedback.reasoningFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Precedent (
                          {(hypoFeedback.precedentScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.precedentScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {hypoFeedback.precedentFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Clarity (
                          {(hypoFeedback.clarityScore * 100).toFixed(0)}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.clarityScore * 100}
                          className="bg-gray-200 h-2"
                          indicatorClassName="bg-gray-700"
                        />
                        <p className="text-sm text-gray-700 mt-2">
                          {hypoFeedback.clarityFeedback}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-800">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                          {hypoFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Model Response
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
                          <p className="text-sm text-gray-700">
                            {hypoFeedback.modelResponse}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Outline Tab */}
              <TabsContent value="outline">
                <Card className="bg-white border-gray-200 shadow-sm">
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
                        className="w-full bg-black text-white hover:bg-gray-800"
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
                            className="min-h-[400px] font-mono text-sm bg-gray-50 border-gray-300 text-gray-800"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 bg-white border-gray-300 text-gray-700 hover:text-black hover:bg-gray-100"
                            onClick={() =>
                              navigator.clipboard.writeText(outlineData.outline)
                            }
                          >
                            Copy
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-white border-gray-200">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-gray-800">
                                Key Topics
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {outlineData.topics.map((topic, i) => (
                                  <li key={i} className="text-gray-700 text-sm">
                                    • {topic}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-gray-200">
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-gray-800">
                                Focus Areas
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {outlineData.focusAreas.map((area, i) => (
                                  <li key={i} className="text-gray-700 text-sm">
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
                          className="w-full border-gray-300 text-gray-700 hover:text-black hover:bg-gray-100"
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
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6 text-center text-gray-600">
                Select a case from the list to begin
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
