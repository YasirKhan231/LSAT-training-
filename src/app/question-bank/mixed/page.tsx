// app/mixed-practice/page.tsx
import { QuestionPractice } from "@/components/question-practice";

export default function MixedPracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mixed Practice Session</h1>
        <p className="text-muted-foreground mb-6">
          This session includes questions from all Bar Exam subjects to help you
          prepare for the full exam experience.
        </p>
        <QuestionPractice subject="mixed" />
      </div>
    </div>
  );
}
