import { QuestionPractice } from "@/components/question-practise";

export default function ReadingComprehensionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Reading Comprehension Practice
        </h1>
        <p className="text-muted-foreground mb-6">
          Improve your ability to understand, interpret, and draw conclusions
          from dense academic texts.
        </p>
        <QuestionPractice section="reading-comprehension" />
      </div>
    </div>
  );
}
