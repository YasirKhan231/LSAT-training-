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
import { ArrowLeft, GraduationCap, Send } from "lucide-react";
import Link from "next/link";

interface WritingFeedback {
  clarity: number;
  organization: number;
  legalAnalysis: number;
  citation: number;
  grammar: number;
  overallFeedback: string;
  strengthPoints: string[];
  improvementAreas: string[];
  suggestedRevisions: string[];
  modelExample: string;
  error?: string;
}

export default function LegalWritingPage() {
  const [documentType, setDocumentType] = useState("");
  const [assignment, setAssignment] = useState("");
  const [userWriting, setUserWriting] = useState("");
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const writingAssignments = [
    {
      id: "memo-negligence",
      title: "Office Memo: Negligence Case",
      description:
        "Write an office memorandum analyzing whether our client has a viable negligence claim against a property owner after slipping on an unmarked wet floor.",
      type: "memo",
    },
    {
      id: "brief-motion",
      title: "Motion to Dismiss Brief",
      description:
        "Draft a brief in support of a motion to dismiss a complaint for failure to state a claim upon which relief can be granted.",
      type: "brief",
    },
    {
      id: "contract-clause",
      title: "Contract Clause Drafting",
      description:
        "Draft a non-compete clause for an employment contract that would be enforceable in California.",
      type: "contract",
    },
    {
      id: "case-comment",
      title: "Case Comment",
      description:
        "Write a case comment analyzing the Supreme Court's recent decision in Google LLC v. Oracle America, Inc. regarding copyright protection for computer code.",
      type: "comment",
    },
  ];

  const handleSelectAssignment = (description: string, type: string) => {
    setAssignment(description);
    setDocumentType(type);
    setUserWriting("");
    setFeedback(null);
  };

  const handleSubmitWriting = async () => {
    if (!documentType || !assignment.trim() || !userWriting.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/case-study/legal-writing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentType,
          assignment,
          userWriting,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze writing");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error: any) {
      console.error("Error submitting writing:", error);
      setFeedback({
        error: "Failed to get feedback. Please try again.",
        clarity: 0,
        organization: 0,
        legalAnalysis: 0,
        citation: 0,
        grammar: 0,
        overallFeedback: "",
        strengthPoints: [],
        improvementAreas: [],
        suggestedRevisions: [],
        modelExample: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Legal Writing Practice
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment Selection */}
        <Card className="lg:col-span-1 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <GraduationCap className="h-5 w-5 text-gray-600" />
              Writing Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {writingAssignments.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    handleSelectAssignment(item.description, item.type)
                  }
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">{item.description}</p>
                    <span className="mt-2 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">
                  Or create your own assignment:
                </p>
                <Select onValueChange={setDocumentType} value={documentType}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900 mb-2">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-900">
                    <SelectItem value="memo">Office Memo</SelectItem>
                    <SelectItem value="brief">Legal Brief</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="opinion">Judicial Opinion</SelectItem>
                    <SelectItem value="comment">Case Comment</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  placeholder="Describe the writing assignment..."
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Writing Submission */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Your Legal Writing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignment ? (
                <>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">
                      Assignment:
                    </h3>
                    <p className="text-gray-700 mb-4">{assignment}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Document Type:{" "}
                      <span className="text-gray-800">
                        {documentType.charAt(0).toUpperCase() +
                          documentType.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">
                      Your Writing:
                    </h3>
                    <Textarea
                      value={userWriting}
                      onChange={(e) => setUserWriting(e.target.value)}
                      placeholder="Enter your legal writing here..."
                      className="min-h-[300px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                    <Button
                      className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={handleSubmitWriting}
                      disabled={
                        isLoading ||
                        !documentType ||
                        !assignment.trim() ||
                        !userWriting.trim()
                      }
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Analyzing..." : "Submit Writing"}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-700">
                  Select an assignment from the list or create your own to begin
                </p>
              )}
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">
                  Writing Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Clarity:
                        </h3>
                        <Progress
                          value={feedback.clarity * 100}
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-700 mt-1">
                          {(feedback.clarity * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Organization:
                        </h3>
                        <Progress
                          value={feedback.organization * 100}
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-700 mt-1">
                          {(feedback.organization * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Legal Analysis:
                        </h3>
                        <Progress
                          value={feedback.legalAnalysis * 100}
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-700 mt-1">
                          {(feedback.legalAnalysis * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Citation:
                        </h3>
                        <Progress
                          value={feedback.citation * 100}
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-700 mt-1">
                          {(feedback.citation * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Grammar:
                        </h3>
                        <Progress
                          value={feedback.grammar * 100}
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-700 mt-1">
                          {(feedback.grammar * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">
                        Overall Feedback:
                      </h3>
                      <p className="text-gray-700">
                        {feedback.overallFeedback}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Strengths:
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                          {feedback.strengthPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 text-gray-900">
                          Areas for Improvement:
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                          {feedback.improvementAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">
                        Suggested Revisions:
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {feedback.suggestedRevisions.map((revision, index) => (
                          <li key={index}>{revision}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">
                        Model Example:
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
                        {feedback.modelExample}
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
