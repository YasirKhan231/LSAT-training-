// /data/plan.ts

export type StudyPlanKey = "terrible" | "bad" | "decent" | "good" | "amazing";

export const studyPlans: Record<StudyPlanKey, { today: string[]; weekly: string[]; monthly: string[] }> = {
  terrible: {
    today: [
      "Review LSAT basics and question types",
      "Practice 5 easy logical reasoning questions",
      "Read one analytical reasoning guide",
    ],
    weekly: [
      "Complete 10 logical reasoning questions",
      "Study 1 analytical reasoning section",
      "Take one untimed practice test",
    ],
    monthly: [
      "Complete 50 logical reasoning questions",
      "Master 3 analytical reasoning games",
      "Take 2 full-length practice tests",
    ],
  },
  bad: {
    today: [
      "Review logical reasoning basics",
      "Practice 10 medium logical reasoning questions",
      "Solve one analytical reasoning game",
    ],
    weekly: [
      "Complete 20 logical reasoning questions",
      "Study 2 analytical reasoning sections",
      "Take one timed practice test",
    ],
    monthly: [
      "Complete 100 logical reasoning questions",
      "Master 5 analytical reasoning games",
      "Take 3 full-length practice tests",
    ],
  },
  decent: {
    today: [
      "Review logical reasoning intermediate concepts",
      "Practice 15 medium logical reasoning questions",
      "Solve two analytical reasoning games",
    ],
    weekly: [
      "Complete 40 logical reasoning questions",
      "Study 4 analytical reasoning sections",
      "Take two timed practice tests",
    ],
    monthly: [
      "Complete 200 logical reasoning questions",
      "Master 10 analytical reasoning games",
      "Take 5 full-length practice tests",
    ],
  },
  good: {
    today: [
      "Review logical reasoning advanced concepts",
      "Practice 20 hard logical reasoning questions",
      "Solve three analytical reasoning games",
    ],
    weekly: [
      "Complete 60 logical reasoning questions",
      "Study 6 analytical reasoning sections",
      "Take three timed practice tests",
    ],
    monthly: [
      "Complete 300 logical reasoning questions",
      "Master 15 analytical reasoning games",
      "Take 7 full-length practice tests",
    ],
  },
  amazing: {
    today: [
      "Review advanced logical reasoning strategies",
      "Practice 25 hard logical reasoning questions",
      "Solve four analytical reasoning games",
    ],
    weekly: [
      "Complete 80 logical reasoning questions",
      "Study 8 analytical reasoning sections",
      "Take four timed practice tests",
    ],
    monthly: [
      "Complete 400 logical reasoning questions",
      "Master 20 analytical reasoning games",
      "Take 10 full-length practice tests",
    ],
  },
};