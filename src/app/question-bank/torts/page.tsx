// app/torts/page.tsx
import { QuestionPractice } from "@/components/question-practise";

export default function TortsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Torts Practice</h1>
        <p className="text-muted-foreground mb-6">
          Master key Torts concepts with practice questions and detailed
          explanations tailored for the Bar Exam.
        </p>
        <QuestionPractice subject="Torts" />
      </div>
    </div>
  );
}
