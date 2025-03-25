"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Sample essay questions data
const essayQuestions = [
  {
    id: "constitutional-law",
    title: "Constitutional Law Analysis",
    prompt:
      "Analyze the following constitutional law issue: The state of Jefferson has passed a law requiring all social media companies to verify the age of their users and prohibit access to anyone under 18. Discuss the constitutional implications of this law.",
    category: "Constitutional Law",
    difficulty: "Advanced",
    timeLimit: 60, // minutes
  },
  {
    id: "contract-law",
    title: "Contract Law Scenario",
    prompt:
      "A software company offers a 'free trial' of their product but requires users to provide credit card information. The terms state that users will be automatically charged after 30 days unless they cancel. Many users report they were unaware of the automatic renewal. Analyze the contract law issues presented.",
    category: "Contract Law",
    difficulty: "Intermediate",
    timeLimit: 45, // minutes
  },
  {
    id: "criminal-law",
    title: "Criminal Law Case Study",
    prompt:
      "A defendant is charged with burglary after entering an unlocked garage and taking a bicycle. The defendant claims they believed the bicycle was abandoned property. Analyze the elements of burglary and whether the prosecution can prove their case.",
    category: "Criminal Law",
    difficulty: "Intermediate",
    timeLimit: 50, // minutes
  },
  {
    id: "international-law",
    title: "International Law Dispute",
    prompt:
      "Two neighboring countries dispute ownership of an island that emerged in a river that forms their border due to geological activity. Analyze this territorial dispute under international law principles.",
    category: "International Law",
    difficulty: "Advanced",
    timeLimit: 60, // minutes
  },
];

export default function EssayPracticeIndex() {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleStartPractice = () => {
    if (selectedQuestion) {
      router.push(`/practice/writing/${selectedQuestion}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Essay Practice</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select an essay question below to practice your legal writing
            skills. Each question has a time limit to simulate exam conditions.
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {essayQuestions.map((question) => (
            <Card
              key={question.id}
              className={`bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f] cursor-pointer transition-all ${
                selectedQuestion === question.id
                  ? "ring-2 ring-[#3a3a4f] border-[#3a3a4f]"
                  : "hover:border-[#2a2a3f]"
              }`}
              onClick={() => setSelectedQuestion(question.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {question.title}
                    </h2>
                    <div className="flex gap-3 mb-3">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                        {question.category}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                        {question.difficulty}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                        {question.timeLimit} minutes
                      </span>
                    </div>
                    <p className="text-gray-400 line-clamp-2">
                      {question.prompt}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Link
                      href={`/essay-practice/${question.id}`}
                      className="text-[#7a7a9f] hover:text-[#9a9abf]"
                    >
                      <BookOpen className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStartPractice}
            disabled={!selectedQuestion}
            className="flex items-center bg-gradient-to-r from-[#3a3a4f] to-[#2a2a3f] hover:from-[#4a4a5f] hover:to-[#3a3a4f] text-white px-6 py-2"
            size="lg"
          >
            Start Practice
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
