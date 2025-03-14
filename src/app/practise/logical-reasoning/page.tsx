import { QuestionPractice } from "@/components/question-practise";

export default function LogicalReasoningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Logical Reasoning Practice</h1>
        <p className="text-muted-foreground mb-6">
          Practice identifying assumptions, flaws, and strengthening/weakening
          factors in arguments.
        </p>
        <QuestionPractice section="logical-reasoning" />
      </div>
    </div>
  );
}
