import { QuestionPractice } from "@/components/question-practice";

export default function ConstitutionalLawPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-100">
          Constitutional Law Practice
        </h1>
        <p className="text-slate-400 mb-6">
          Master key Constitutional Law concepts with practice questions and
          detailed explanations tailored for the Bar Exam.
        </p>
        <QuestionPractice subject="Constitutional Law" />
      </div>
    </div>
  );
}
