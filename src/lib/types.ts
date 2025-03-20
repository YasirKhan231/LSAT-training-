export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  aiResponse :string
}

export interface QuestionFeedback {
  isCorrect: boolean;
  correctAnswer: string; // Add this property
  explanation: string;
  aiSuggestion: string;
}

export interface Section {
  slug: string
  title: string
  description: string
}


// types.ts
export type SectionResult = {
  id: string;
  title: string;
  score: number;
  timeSpent: number;
  correct: number;
  incorrect: number;
  skipped: number;
  averageTimePerQuestion: number;
};

export type AIInsight = {
  title: string;
  content: string;
};

export type ExamResults = {
  title: string; // Add the title property
  score: number;
  percentile: number;
  timestamp: string;
  sections: SectionResult[];
  aiInsights: AIInsight[];
  weaknesses: string[];
  strengths: string[];
};