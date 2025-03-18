// app/criminal-law-and-procedure/page.tsx
import { QuestionPractice } from "@/components/question-practise";

export default function CriminalLawPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Criminal Law & Procedure Practice
        </h1>
        <p className="text-muted-foreground mb-6">
          Master key Criminal Law & Procedure concepts with practice questions
          and detailed explanations tailored for the Bar Exam.
        </p>
        <QuestionPractice subject="Criminal Law & Procedure" />
      </div>
    </div>
  );
}
