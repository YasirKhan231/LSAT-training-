import { QuestionPractice } from "@/components/question-practice";

export default function CriminalLawPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Criminal Law & Procedure Practice
        </h1>
        <p className="text-white mb-6">
          Master key Criminal Law & Procedure concepts with practice questions
          and detailed explanations tailored for the Bar Exam.
        </p>
        <QuestionPractice subject="Criminal Law & Procedure" />
      </div>
    </div>
  );
}
