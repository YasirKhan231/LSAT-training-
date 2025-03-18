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

