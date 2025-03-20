"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Send, Brain, Scale } from "lucide-react";
import Link from "next/link";

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
  const [isSubmittingHypo, setIsSubmittingHypo] = useState(false);
  const [outline, setOutline] = useState<string | null>(null);
  const [isLoadingOutline, setIsLoadingOutline] = useState(false);

const sampleCases: CaseData[] = [
  {
    id: "case1",
    title: "Brown v. Board of Education (1954)",
    facts:
      "In the early 1950s, African American students in Topeka, Kansas, were forced to attend segregated schools under a state law permitting 'separate but equal' facilities. Oliver Brown, a parent, sued the Topeka Board of Education, arguing that the segregated schools were inherently unequal and denied his daughter equal educational opportunities. The case consolidated several similar lawsuits from other states challenging racial segregation in public schools.",
    issue:
      "Does the racial segregation of children in public schools, under the doctrine of 'separate but equal,' violate the Equal Protection Clause of the Fourteenth Amendment?",
    holding:
      "Yes, the Supreme Court unanimously ruled that segregated public schools are inherently unequal and thus violate the Equal Protection Clause.",
    reasoning:
      "The Court, led by Chief Justice Earl Warren, reasoned that segregation in education generated a feeling of inferiority among African American children that undermined their educational opportunities. Relying on psychological evidence, the Court overturned Plessy v. Ferguson (1896), which had upheld 'separate but equal,' declaring that separate educational facilities could never be equal due to the psychological and social harm caused by segregation.",
  },
  {
    id: "case2",
    title: "Marbury v. Madison (1803)",
    facts:
      "In the final days of President John Adams’ administration, William Marbury was appointed as a justice of the peace but did not receive his commission due to a clerical oversight by the outgoing Secretary of State. Under the new administration of Thomas Jefferson, Secretary of State James Madison refused to deliver the commission. Marbury sued, asking the Supreme Court to issue a writ of mandamus to compel Madison to act.",
    issue:
      "Does the Supreme Court have the authority to review acts of Congress and declare them unconstitutional, and can it issue a writ of mandamus under the Judiciary Act of 1789?",
    holding:
      "Yes, the Supreme Court has the power of judicial review, but it cannot issue the writ because the relevant section of the Judiciary Act of 1789 is unconstitutional.",
    reasoning:
      "Chief Justice John Marshall held that the Constitution is the supreme law of the land and that the judiciary must enforce it over conflicting statutes. The Court found that the Judiciary Act’s expansion of original jurisdiction exceeded Congress’s authority under Article III, establishing judicial review while denying Marbury’s request due to lack of jurisdiction.",
  },
  {
    id: "case3",
    title: "Gideon v. Wainwright (1963)",
    facts:
      "Clarence Earl Gideon was charged with felony breaking and entering in Florida. Unable to afford an attorney, he requested a court-appointed lawyer, but the state court denied his request, citing that free counsel was only provided in capital cases. Gideon represented himself, was convicted, and later appealed to the Supreme Court from prison, arguing his right to counsel was violated.",
    issue:
      "Does the Sixth Amendment’s right to counsel, incorporated through the Fourteenth Amendment, require states to provide free legal counsel to indigent defendants in felony cases?",
    holding:
      "Yes, the Supreme Court unanimously ruled that states must provide counsel to indigent defendants in felony cases.",
    reasoning:
      "Justice Hugo Black wrote that the right to counsel is fundamental to a fair trial, and its denial violates due process under the Fourteenth Amendment. The Court overruled Betts v. Brady (1942), holding that the Sixth Amendment’s guarantee of counsel applies to the states, ensuring equal justice regardless of financial status.",
  },
  {
    id: "case4",
    title: "Roe v. Wade (1973)",
    facts:
      "Norma McCorvey (under the pseudonym Jane Roe) challenged a Texas law prohibiting abortion except to save the mother’s life. Pregnant and unable to obtain a legal abortion, she sued Henry Wade, the Dallas County District Attorney, arguing that the law violated her constitutional rights. The case escalated to the Supreme Court as a test of abortion restrictions nationwide.",
    issue:
      "Does a state law banning abortion except to save the mother’s life violate a woman’s constitutional right to privacy under the Fourteenth Amendment?",
    holding:
      "Yes, the Supreme Court ruled 7-2 that the right to privacy includes a woman’s decision to have an abortion, but this right is not absolute and must be balanced against state interests.",
    reasoning:
      "Justice Harry Blackmun’s majority opinion held that the right to privacy, derived from the Due Process Clause, encompasses a woman’s choice to terminate a pregnancy. The Court established a trimester framework: during the first trimester, the decision is left to the woman and her doctor; in the second, states may regulate to protect maternal health; in the third, states may ban abortion to protect fetal life, except when the mother’s life or health is at risk.",
  },
  {
    id: "case5",
    title: "Miranda v. Arizona (1966)",
    facts:
      "Ernesto Miranda was arrested in Phoenix, Arizona, for kidnapping and rape. During a prolonged interrogation without being informed of his rights, he confessed to the crimes. His confession was used against him at trial, leading to a conviction. Miranda appealed, arguing that his confession was coerced and that he was not informed of his right to remain silent or to have an attorney present.",
    issue:
      "Does the Fifth Amendment’s protection against self-incrimination require law enforcement to inform suspects of their rights to remain silent and to an attorney before interrogation?",
    holding:
      "Yes, the Supreme Court ruled 5-4 that suspects must be informed of their rights before custodial interrogation.",
    reasoning:
      "Chief Justice Earl Warren wrote the majority opinion, emphasizing that the coercive nature of custodial interrogation requires safeguards to protect against self-incrimination. The Court established the 'Miranda rights,' requiring police to inform suspects of their right to silence, that anything they say can be used against them, and their right to an attorney. Without these warnings, confessions obtained are inadmissible in court.",
  },
];
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
      const response = await fetch("/api/case-briefing/hypothetical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId: selectedCase }),
      });
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
        body: JSON.stringify({ userId: "user123" }), // Replace with actual user ID from auth
      });
      const data = await response.json();
      setOutline(data.outline);
    } catch (error) {
      console.error("Error generating outline:", error);
    } finally {
      setIsLoadingOutline(false);
    }
  };

  const selectedCaseData = sampleCases.find((c) => c.id === selectedCase);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Case Briefing Practice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Available Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleCases.map((caseItem) => (
                <Button
                  key={caseItem.id}
                  variant={selectedCase === caseItem.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCase(caseItem.id)}
                >
                  {caseItem.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Briefing, Hypothetical, and Outline */}
        <div className="lg:col-span-2">
          {selectedCaseData ? (
            <Tabs defaultValue="briefing" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="briefing">Case Briefing</TabsTrigger>
                <TabsTrigger value="hypothetical">Hypothetical</TabsTrigger>
                <TabsTrigger value="outline">Outline</TabsTrigger>
              </TabsList>

              {/* Case Briefing Tab */}
              <TabsContent value="briefing">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedCaseData.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Facts</h3>
                      <p className="text-gray-600">{selectedCaseData.facts}</p>
                      <Textarea
                        placeholder="Summarize the facts..."
                        value={brief.facts}
                        onChange={(e) =>
                          handleBriefChange("facts", e.target.value)
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Issue</h3>
                      <p className="text-gray-600">{selectedCaseData.issue}</p>
                      <Textarea
                        placeholder="State the legal issue..."
                        value={brief.issue}
                        onChange={(e) =>
                          handleBriefChange("issue", e.target.value)
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Rule</h3>
                      <Textarea
                        placeholder="Identify the applicable rule or precedent..."
                        value={brief.rule}
                        onChange={(e) =>
                          handleBriefChange("rule", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Application</h3>
                      <Textarea
                        placeholder="Explain how the rule applies to the facts..."
                        value={brief.application}
                        onChange={(e) =>
                          handleBriefChange("application", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Conclusion</h3>
                      <Textarea
                        placeholder="State the court's conclusion..."
                        value={brief.conclusion}
                        onChange={(e) =>
                          handleBriefChange("conclusion", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      onClick={handleSubmitBrief}
                      disabled={
                        isSubmittingBrief ||
                        !Object.values(brief).every((v) => v.trim())
                      }
                      className="w-full"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isSubmittingBrief ? "Analyzing..." : "Submit Brief"}
                    </Button>
                  </CardContent>
                </Card>
                {briefFeedback && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">
                          Facts ({briefFeedback.factsScore * 100}%)
                        </h3>
                        <Progress value={briefFeedback.factsScore * 100} />
                        <p className="text-sm text-gray-600">
                          {briefFeedback.factsFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Issue ({briefFeedback.issueScore * 100}%)
                        </h3>
                        <Progress value={briefFeedback.issueScore * 100} />
                        <p className="text-sm text-gray-600">
                          {briefFeedback.issueFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Rule ({briefFeedback.ruleScore * 100}%)
                        </h3>
                        <Progress value={briefFeedback.ruleScore * 100} />
                        <p className="text-sm text-gray-600">
                          {briefFeedback.ruleFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Application ({briefFeedback.applicationScore * 100}%)
                        </h3>
                        <Progress
                          value={briefFeedback.applicationScore * 100}
                        />
                        <p className="text-sm text-gray-600">
                          {briefFeedback.applicationFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Conclusion ({briefFeedback.conclusionScore * 100}%)
                        </h3>
                        <Progress value={briefFeedback.conclusionScore * 100} />
                        <p className="text-sm text-gray-600">
                          {briefFeedback.conclusionFeedback}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-blue-700">
                          {briefFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">Model Brief</h3>
                        <p className="text-sm text-gray-600">
                          <strong>Facts:</strong>{" "}
                          {briefFeedback.modelBrief.facts}
                          <br />
                          <strong>Issue:</strong>{" "}
                          {briefFeedback.modelBrief.issue}
                          <br />
                          <strong>Rule:</strong> {briefFeedback.modelBrief.rule}
                          <br />
                          <strong>Application:</strong>{" "}
                          {briefFeedback.modelBrief.application}
                          <br />
                          <strong>Conclusion:</strong>{" "}
                          {briefFeedback.modelBrief.conclusion}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Hypothetical Questions Tab */}
              <TabsContent value="hypothetical">
                <Card>
                  <CardHeader>
                    <CardTitle>Legal Hypothetical</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!hypothetical ? (
                      <Button
                        onClick={handleGenerateHypothetical}
                        className="w-full"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Generate Hypothetical
                      </Button>
                    ) : (
                      <>
                        <p className="text-gray-600">{hypothetical}</p>
                        <Textarea
                          placeholder="Write your legal analysis here..."
                          value={hypoResponse}
                          onChange={(e) => setHypoResponse(e.target.value)}
                          className="min-h-[200px]"
                        />
                        <Button
                          onClick={handleSubmitHypo}
                          disabled={isSubmittingHypo || !hypoResponse.trim()}
                          className="w-full"
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
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>AI Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">
                          Issue Spotting (
                          {hypoFeedback.issueSpottingScore * 100}%)
                        </h3>
                        <Progress
                          value={hypoFeedback.issueSpottingScore * 100}
                        />
                        <p className="text-sm text-gray-600">
                          {hypoFeedback.issueSpottingFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Reasoning ({hypoFeedback.reasoningScore * 100}%)
                        </h3>
                        <Progress value={hypoFeedback.reasoningScore * 100} />
                        <p className="text-sm text-gray-600">
                          {hypoFeedback.reasoningFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Precedent ({hypoFeedback.precedentScore * 100}%)
                        </h3>
                        <Progress value={hypoFeedback.precedentScore * 100} />
                        <p className="text-sm text-gray-600">
                          {hypoFeedback.precedentFeedback}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Clarity ({hypoFeedback.clarityScore * 100}%)
                        </h3>
                        <Progress value={hypoFeedback.clarityScore * 100} />
                        <p className="text-sm text-gray-600">
                          {hypoFeedback.clarityFeedback}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800">
                          Suggestions
                        </h3>
                        <ul className="list-disc list-inside text-blue-700">
                          {hypoFeedback.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">Model Response</h3>
                        <p className="text-sm text-gray-600">
                          {hypoFeedback.modelResponse}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Outline Tab */}
              <TabsContent value="outline">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Outline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!outline ? (
                      <Button
                        onClick={handleGenerateOutline}
                        disabled={isLoadingOutline}
                        className="w-full"
                      >
                        <Scale className="mr-2 h-4 w-4" />
                        {isLoadingOutline
                          ? "Generating..."
                          : "Generate Outline"}
                      </Button>
                    ) : (
                      <Textarea
                        value={outline}
                        onChange={(e) => setOutline(e.target.value)}
                        className="min-h-[300px]"
                        placeholder="Your personalized outline will appear here..."
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Select a case from the list to begin
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
