"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, X } from "lucide-react";
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
  {
    id: "torts",
    title: "Torts Problem Question",
    prompt:
      "A grocery store fails to clean up a spilled liquid for over an hour despite multiple employees walking past it. A customer slips and suffers serious injuries. Analyze the potential tort claims against the grocery store and possible defenses.",
    category: "Torts",
    difficulty: "Intermediate",
    timeLimit: 45, // minutes
  },
  {
    id: "property-law",
    title: "Property Law Dispute",
    prompt:
      "Two neighbors dispute ownership of a strip of land between their properties. One neighbor has maintained the land (mowing grass, planting flowers) for 15 years but never had formal title. The other neighbor holds the deed to the property. Analyze the adverse possession claim.",
    category: "Property Law",
    difficulty: "Advanced",
    timeLimit: 55, // minutes
  },
  {
    id: "civil-procedure",
    title: "Civil Procedure Analysis",
    prompt:
      "A plaintiff files a lawsuit in federal court based on diversity jurisdiction. The defendant moves to dismiss for improper venue. The plaintiff argues the venue is proper because a substantial part of the events occurred there. Analyze the venue requirements and how the court should rule.",
    category: "Civil Procedure",
    difficulty: "Advanced",
    timeLimit: 50, // minutes
  },
  {
    id: "evidence",
    title: "Evidence Problem",
    prompt:
      "In a criminal trial, the prosecution wants to introduce the defendant's prior conviction for the same offense from 10 years ago. The defense objects. Analyze whether the evidence should be admitted under the Federal Rules of Evidence.",
    category: "Evidence",
    difficulty: "Intermediate",
    timeLimit: 40, // minutes
  },
  {
    id: "professional-responsibility",
    title: "Legal Ethics Scenario",
    prompt:
      "A lawyer discovers their client intends to commit perjury during an upcoming deposition. The client refuses to change their testimony. Analyze the lawyer's ethical obligations under the Model Rules of Professional Conduct.",
    category: "Professional Responsibility",
    difficulty: "Intermediate",
    timeLimit: 45, // minutes
  },
];

export default function EssayPracticeIndex() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
    setShowConfirmation(true);
  };

  const handleStartPractice = () => {
    if (selectedQuestion) {
      router.push(`/practice/writing/${selectedQuestion.id}`);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedQuestion(null);
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
              className={`bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f] cursor-pointer transition-all hover:border-[#2a2a3f]`}
              onClick={() => handleQuestionClick(question)}
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BookOpen className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border border-[#2a2a3f] rounded-lg p-6 max-w-md w-full shadow-xl">
              <div className="flex flex-col items-center text-center mb-4">
                {" "}
                {/* Changed to flex-col and center */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  Start Essay Practice
                </h3>
                <button
                  onClick={handleCloseConfirmation}
                  className="text-gray-400 hover:text-white absolute top-4 right-4"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-6 text-center">
                {" "}
                {/* Added text-center */}
                <h4 className="text-lg font-medium text-white mb-4">
                  {" "}
                  {/* Increased mb */}
                  {selectedQuestion.title}
                </h4>
                <p className="text-gray-400 mb-4 px-3 text-center">
                  {" "}
                  {/* Added px-4 and text-center */}
                  {selectedQuestion.prompt}
                </p>
                <div className="flex gap-1 mb-4 justify-center">
                  {" "}
                  {/* Added justify-center */}
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                    {selectedQuestion.category}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                    {selectedQuestion.difficulty}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-[#1a1a1f] text-gray-300">
                    {selectedQuestion.timeLimit} minutes
                  </span>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  {" "}
                  {/* Added text-center */}
                  You will have {selectedQuestion.timeLimit} minutes to complete
                  this essay.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                {" "}
                {/* Keep justify-center */}
                <Button
                  variant="outline"
                  onClick={handleCloseConfirmation}
                  className="border-[#2a2a3f] text-white hover:bg-[#1a1a1f]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStartPractice}
                  className="bg-gradient-to-r from-[#3a3a4f] to-[#2a2a3f] hover:from-[#4a4a5f] hover:to-[#3a3a4f] text-white"
                >
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
