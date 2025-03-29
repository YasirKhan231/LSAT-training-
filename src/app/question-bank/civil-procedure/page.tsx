import { QuestionPractice } from "@/components/question-practice";

export default function CivilProcedurePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Civil Procedure Practice
        </h1>
        <p className="text-gray-700 mb-6">
          Master key Civil Procedure concepts with practice questions and
          detailed explanations tailored for the Bar Exam.
        </p>
        <QuestionPractice subject="Civil Procedure" />
      </div>
    </div>
  );
}
