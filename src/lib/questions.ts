import type { Question } from "./types"

// This would typically come from an API or database
export function getQuestions(section: string): Question[] {
  // Sample questions for demonstration
  const logicalReasoningQuestions: Question[] = [
    {
      id: "lr-1",
      text: "A study found that people who drink coffee live longer than those who don't. Therefore, drinking coffee causes people to live longer. Which of the following, if true, most weakens the argument?",
      options: [
        { id: "A", text: "The study controlled for other factors like diet and exercise." },
        { id: "B", text: "Coffee contains antioxidants that are known to have health benefits." },
        { id: "C", text: "People who drink coffee tend to have higher incomes and better access to healthcare." },
        { id: "D", text: "The study was funded by a coffee industry association." },
        { id: "E", text: "The study found that moderate coffee drinkers live longer than heavy coffee drinkers." },
      ],
      correctAnswer: "C",
      explanation:
        "Option C weakens the argument by providing an alternative explanation for the correlation between coffee drinking and longevity. It suggests that the relationship might be due to socioeconomic factors rather than coffee consumption itself.",
      difficulty: "medium",
      tags: ["causal reasoning", "correlation vs causation"],
    },
    {
      id: "lr-2",
      text: "All lawyers are eloquent speakers. Some eloquent speakers are politicians. Therefore, some lawyers are politicians. This argument is:",
      options: [
        { id: "A", text: "Valid, because the conclusion follows logically from the premises." },
        { id: "B", text: "Invalid, because it commits the fallacy of the undistributed middle term." },
        { id: "C", text: "Valid, but unsound because the first premise is false." },
        { id: "D", text: "Invalid, because it confuses necessary and sufficient conditions." },
        { id: "E", text: "Valid, because some eloquent speakers are both lawyers and politicians." },
      ],
      correctAnswer: "B",
      explanation:
        "The argument is invalid because it commits the fallacy of the undistributed middle term. The middle term 'eloquent speakers' is not distributed in either premise, which means we cannot draw a valid conclusion about the relationship between lawyers and politicians.",
      difficulty: "hard",
      tags: ["formal logic", "syllogisms"],
    },
  ]

  const analyticalReasoningQuestions: Question[] = [
    {
      id: "ar-1",
      text: "Seven students – J, K, L, M, N, O, and P – are to be assigned to three different classrooms – 1, 2, and 3. Each classroom must have at least one student, and no classroom can have more than three students. If J and K must be assigned to the same classroom, and L and M cannot be assigned to the same classroom, which of the following could be true?",
      options: [
        { id: "A", text: "Classroom 1 has J, K, and L; classroom 2 has M and N; classroom 3 has O and P." },
        { id: "B", text: "Classroom 1 has J, K, and M; classroom 2 has L and N; classroom 3 has O and P." },
        { id: "C", text: "Classroom 1 has L, M, and N; classroom 2 has J and K; classroom 3 has O and P." },
        { id: "D", text: "Classroom 1 has J, K, L, and M; classroom 2 has N; classroom 3 has O and P." },
        { id: "E", text: "Classroom 1 has J and K; classroom 2 has L, O, and P; classroom 3 has M and N." },
      ],
      correctAnswer: "E",
      explanation:
        "Option E satisfies all the constraints: J and K are in the same classroom (1), L and M are in different classrooms (2 and 3), each classroom has at least one student, and no classroom has more than three students.",
      difficulty: "medium",
      tags: ["grouping", "distribution"],
    },
  ]

  const readingComprehensionQuestions: Question[] = [
    {
      id: "rc-1",
      text: "According to the passage, which of the following best describes the author's view on climate change legislation?",
      options: [
        { id: "A", text: "It is unnecessary because climate change is a natural phenomenon." },
        { id: "B", text: "It is essential but should be balanced with economic considerations." },
        { id: "C", text: "It should be the top priority regardless of economic impact." },
        { id: "D", text: "It should be determined by international consensus rather than individual nations." },
        { id: "E", text: "It is ineffective because corporations will find ways to circumvent regulations." },
      ],
      correctAnswer: "B",
      explanation:
        "The passage indicates that the author believes climate change legislation is important but should be implemented in a way that considers economic impacts and provides a balanced approach.",
      difficulty: "medium",
      tags: ["main idea", "author's perspective"],
    },
  ]

  // Return questions based on section
  switch (section) {
    case "logical-reasoning":
      return logicalReasoningQuestions
    case "analytical-reasoning":
      return analyticalReasoningQuestions
    case "reading-comprehension":
      return readingComprehensionQuestions
    case "mixed":
      return [
        ...logicalReasoningQuestions.slice(0, 1),
        ...analyticalReasoningQuestions.slice(0, 1),
        ...readingComprehensionQuestions.slice(0, 1),
      ]
    default:
      return []
  }
}

