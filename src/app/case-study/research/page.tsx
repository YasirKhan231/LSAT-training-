"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Send } from "lucide-react";
import Link from "next/link";

interface ResearchFeedback {
  score: number;
  feedback: string;
  sourcesAnalysis: string;
  missingPrecedents: string[];
  suggestedResearch: string;
  modelSources: string[];
  error?: string;
}

export default function LegalResearchPage() {
  const [researchQuery, setResearchQuery] = useState("");
  const [userSources, setUserSources] = useState("");
  const [feedback, setFeedback] = useState<ResearchFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const researchTopics = [
    {
      id: "fourth-amendment",
      title: "Fourth Amendment Search and Seizure",
      description:
        "Research relevant cases on what constitutes a 'reasonable search' under the Fourth Amendment in digital contexts.",
    },
    {
      id: "copyright-fair-use",
      title: "Copyright Fair Use Doctrine",
      description:
        "Find precedents that establish the boundaries of fair use in educational contexts.",
    },
    {
      id: "corporate-veil",
      title: "Piercing the Corporate Veil",
      description:
        "Research cases where courts have disregarded the corporate entity to hold shareholders personally liable.",
    },
    {
      id: "free-speech-social",
      title: "Free Speech on Social Media",
      description:
        "Research cases and statutes addressing free speech protections on private social media platforms.",
    },
  ];

  const handleSelectTopic = (description: string) => {
    setResearchQuery(description);
    setUserSources("");
    setFeedback(null);
  };

  const handleSubmitResearch = async () => {
    if (!researchQuery.trim() || !userSources.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/case-study/case-research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          researchQuery,
          userSources,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze research");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error: any) {
      console.error("Error submitting research:", error);
      setFeedback({
        error: "Failed to get feedback. Please try again.",
        score: 0,
        feedback: "",
        sourcesAnalysis: "",
        missingPrecedents: [],
        suggestedResearch: "",
        modelSources: [],
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
            className="text-gray-600 hover:bg-gray-100 hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-black">
          Legal Research Practice
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Research Topics */}
        <Card className="lg:col-span-1 bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <BookOpen className="h-5 w-5 text-gray-600" />
              Research Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {researchTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleSelectTopic(topic.description)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-black mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </CardContent>
                </Card>
              ))}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Or enter your own research query:
                </p>
                <Input
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  placeholder="Enter research question..."
                  className="bg-white border-gray-300 text-black placeholder:text-gray-400 w-full px-3 py-2 overflow-x-auto whitespace-nowrap"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Submission */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Submit Your Research</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-black">Research Query:</h3>
                <p className="text-gray-700 mb-4">
                  {researchQuery || "Select a topic or enter your own query"}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-black">Your Sources:</h3>
                <p className="text-sm text-gray-600 mb-2">
                  List the cases, statutes, regulations, or other legal sources
                  you've found relevant to this query. Include brief
                  explanations of why each source is relevant.
                </p>
                <Textarea
                  value={userSources}
                  onChange={(e) => setUserSources(e.target.value)}
                  placeholder="Example: Carpenter v. United States (2018) - Established that the government needs a warrant to access cell phone location data, relevant because..."
                  className="min-h-[200px] bg-white border-gray-300 text-black placeholder:text-gray-400"
                />
                <Button
                  className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                  onClick={handleSubmitResearch}
                  disabled={
                    isLoading || !researchQuery.trim() || !userSources.trim()
                  }
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isLoading ? "Analyzing..." : "Submit Research"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {feedback && (
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Research Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.error ? (
                  <p className="text-red-500">{feedback.error}</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 text-black">Score:</h3>
                      <p className="text-gray-700">{feedback.score * 100}%</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-black">Feedback:</h3>
                      <p className="text-gray-700">{feedback.feedback}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-black">
                        Source Analysis:
                      </h3>
                      <p className="text-gray-700">
                        {feedback.sourcesAnalysis}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-black">
                        Missing Precedents:
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {feedback.missingPrecedents.map((precedent, index) => (
                          <li key={index}>{precedent}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-black">
                        Suggested Research:
                      </h3>
                      <p className="text-gray-700">
                        {feedback.suggestedResearch}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-black">
                        Model Sources:
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {feedback.modelSources.map((source, index) => (
                          <li key={index}>{source}</li>
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
