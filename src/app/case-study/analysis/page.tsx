"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, PlayCircle } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  // Sample legal analysis problems - expanded list
  const legalProblems = [
    {
      id: "contract-formation",
      title: "Contract Formation Scenario",
      summary:
        "Analyze whether a valid contract was formed between a business owner and supplier.",
    },
    {
      id: "negligence-case",
      title: "Negligence Case Study",
      summary:
        "Evaluate the elements of negligence in a personal injury scenario.",
    },
    {
      id: "property-dispute",
      title: "Property Boundary Dispute",
      summary:
        "Analyze legal rights in a property boundary disagreement between neighbors.",
    },
    {
      id: "intellectual-property",
      title: "Copyright Infringement Analysis",
      summary: "Determine if a creative work violates copyright protection.",
    },
    {
      id: "employment-law",
      title: "Wrongful Termination Case",
      summary:
        "Analyze whether an employee was wrongfully terminated under employment law.",
    },
    {
      id: "family-law",
      title: "Child Custody Dispute",
      summary:
        "Evaluate factors in determining the best interests of the child in a custody case.",
    },
    {
      id: "criminal-law",
      title: "Self-Defense Claim",
      summary:
        "Analyze whether a defendant's actions qualify as self-defense in a criminal case.",
    },
    {
      id: "environmental-law",
      title: "Corporate Pollution Liability",
      summary:
        "Evaluate a corporation's liability for environmental damage under regulatory law.",
    },
    {
      id: "constitutional-law",
      title: "First Amendment Analysis",
      summary:
        "Analyze whether a government action violates free speech protections.",
    },
  ];

  const handleSelectProblem = (id: string) => {
    setSelectedProblem(id === selectedProblem ? null : id);
  };

  const handleStartAnalysis = () => {
    if (selectedProblem) {
      router.push(`/case-study/analysis/${selectedProblem}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <Scale className="h-12 w-12 text-black" />
        </div>
        <h1 className="text-4xl font-bold text-black mb-4">
          Legal Analysis Practice
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Improve your legal reasoning skills by analyzing hypothetical
          scenarios and receiving AI-powered feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalProblems.map((problem) => (
          <Card
            key={problem.id}
            className={`bg-white border-[#1a1a1f] hover:bg-gray-100 transition-colors cursor-pointer h-full ${
              selectedProblem === problem.id
                ? "ring-2 ring-[#2a2a32] dark:ring-[#3a3a42]"
                : ""
            }`}
            onClick={() => handleSelectProblem(problem.id)}
          >
            <CardHeader>
              <CardTitle className="text-black">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{problem.summary}</p>
              <div className="flex justify-end mt-4">
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProblem && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleStartAnalysis}
            className="bg-[#1a1a1f] hover:bg-[#2a2a2f] text-black border border-[#2a2a32] px-8 py-6 text-lg transition-colors duration-300"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Analysis
          </Button>
        </div>
      )}
    </div>
  );
}
