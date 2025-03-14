import { QuestionPractice } from "@/components/question-practise";

export default function AnalyticalReasoningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Analytical Reasoning Practice
        </h1>
        <p className="text-muted-foreground mb-6">
          Master grouping, ordering, and assignment problems with visual aids
          and step-by-step solutions.
        </p>
        <QuestionPractice section="analytical-reasoning" />
      </div>
    </div>
  );
}
