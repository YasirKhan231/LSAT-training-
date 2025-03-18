import type { Question } from "./types";

export function getQuestions(section: string): Question[] {
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
        "Option C weakens the argument by providing an alternative explanation for the correlation between coffee drinking and longevity.",
      difficulty: "medium",
      tags: ["causal reasoning", "correlation vs causation"],
      aiResponse:
        "Option C introduces a confounding variable (higher incomes and better access to healthcare) that could explain the observed correlation.",
    },
    {
      id: "lr-2",
      text: "All cats have fur. Some animals with fur are dogs. Therefore, some cats are dogs. This argument is:",
      options: [
        { id: "A", text: "Valid, because the conclusion follows logically from the premises." },
        { id: "B", text: "Invalid, because it commits the fallacy of the undistributed middle term." },
        { id: "C", text: "Valid, but unsound because the first premise is false." },
        { id: "D", text: "Invalid, because it confuses necessary and sufficient conditions." },
        { id: "E", text: "Valid, because some furry animals are both cats and dogs." },
      ],
      correctAnswer: "B",
      explanation: "This argument is invalid because it commits the fallacy of the undistributed middle term.",
      difficulty: "hard",
      tags: ["formal logic", "syllogisms"],
      aiResponse:
        "Option B is correct because the middle term 'animals with fur' does not establish a direct link between cats and dogs.",
    },
    {
      id: "lr-3",
      text: "If a person exercises regularly, they are likely to stay healthy. John does not exercise regularly. Which of the following conclusions follows logically?",
      options: [
        { id: "A", text: "John is unhealthy." },
        { id: "B", text: "John may or may not be healthy." },
        { id: "C", text: "People who exercise are always healthy." },
        { id: "D", text: "Not exercising guarantees poor health." },
        { id: "E", text: "John will definitely become unhealthy." },
      ],
      correctAnswer: "B",
      explanation: "The premise states that exercise increases the likelihood of good health but does not establish it as the only factor.",
      difficulty: "medium",
      tags: ["conditional reasoning", "logic"],
      aiResponse:
        "Option B is correct because the argument does not say that not exercising always leads to poor health, just that exercise increases the chances of good health.",
    },
    {
      id: "lr-4",
      text: "If it rains, the streets get wet. The streets are wet. Therefore, it rained. This argument is an example of:",
      options: [
        { id: "A", text: "Valid reasoning." },
        { id: "B", text: "The fallacy of affirming the consequent." },
        { id: "C", text: "Sound reasoning." },
        { id: "D", text: "A deductively valid argument." },
        { id: "E", text: "A tautology." },
      ],
      correctAnswer: "B",
      explanation: "The argument commits the fallacy of affirming the consequent by assuming that rain is the only possible cause of wet streets.",
      difficulty: "medium",
      tags: ["logical fallacies", "causal reasoning"],
      aiResponse:
        "Option B is correct because just because the streets are wet, it does not mean that rain is the only possible cause.",
    },
    {
      id: "lr-5",
      text: "Either the company will increase salaries, or employees will go on strike. Employees did not go on strike. What can be inferred?",
      options: [
        { id: "A", text: "The company increased salaries." },
        { id: "B", text: "The employees are satisfied with current salaries." },
        { id: "C", text: "The company might not have increased salaries, but employees decided not to strike." },
        { id: "D", text: "Nothing can be inferred." },
        { id: "E", text: "The employees changed their demands." },
      ],
      correctAnswer: "A",
      explanation: "Since the statement presents a strict either-or scenario, if one condition is false, the other must be true.",
      difficulty: "medium",
      tags: ["logical reasoning", "deductive logic"],
      aiResponse:
        "Option A is correct because the argument presents a binary scenario, and if one condition is false, the other must be true.",
    },
    {
      id: "lr-6",
      text: "No fish can live without water. Goldfish are a type of fish. Therefore, goldfish cannot live without water. This argument is:",
      options: [
        { id: "A", text: "Valid and sound." },
        { id: "B", text: "Invalid because of an undistributed middle term." },
        { id: "C", text: "Invalid because it assumes the premise is true." },
        { id: "D", text: "Valid but unsound." },
        { id: "E", text: "An example of circular reasoning." },
      ],
      correctAnswer: "A",
      explanation: "The argument is both valid and sound, as its premises are true and its logic is correct.",
      difficulty: "easy",
      tags: ["formal logic", "deductive reasoning"],
      aiResponse:
        "Option A is correct because the premises correctly lead to the conclusion using valid deductive reasoning.",
    },
    {
      id: "lr-7",
      text: "If a car is red, it is fast. John's car is fast. What can be inferred?",
      options: [
        { id: "A", text: "John's car is red." },
        { id: "B", text: "Not all fast cars are red." },
        { id: "C", text: "John's car is fast for another reason." },
        { id: "D", text: "Nothing can be inferred." },
        { id: "E", text: "The premise is incorrect." },
      ],
      correctAnswer: "D",
      explanation: "The argument commits the fallacy of affirming the consequent; just because red cars are fast does not mean all fast cars are red.",
      difficulty: "medium",
      tags: ["logical fallacies"],
      aiResponse:
        "Option D is correct because the statement does not establish that fast cars must be red.",
    },
    {
      id: "lr-8",
      text: "If a person studies hard, they will pass the exam. Sara passed the exam. What can be inferred?",
      options: [
        { id: "A", text: "Sara studied hard." },
        { id: "B", text: "Sara might have studied hard or found another way to pass." },
        { id: "C", text: "Sara passed only because she studied." },
        { id: "D", text: "Nothing can be inferred." },
        { id: "E", text: "Sara cheated." },
      ],
      correctAnswer: "B",
      explanation: "Passing the exam does not necessarily mean Sara studied hard; she could have passed through other means.",
      difficulty: "easy",
      tags: ["causal reasoning"],
      aiResponse:
        "Option B is correct because studying hard is a sufficient condition for passing but not a necessary one.",
    }
  ];


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
      aiResponse:
        "Option E is correct because it satisfies all the given constraints. J and K are in Classroom 1, L and M are in different classrooms, and no classroom exceeds the maximum capacity of three students.",
    },
    {
      id: "ar-2",
      text: "A company is assigning four projects – A, B, C, and D – to three teams – X, Y, and Z. Each team must be assigned at least one project, and no team can be assigned more than two projects. If Project A and Project B cannot be assigned to the same team, which of the following could be true?",
      options: [
        { id: "A", text: "Team X has A and C; Team Y has B; Team Z has D." },
        { id: "B", text: "Team X has A and B; Team Y has C; Team Z has D." },
        { id: "C", text: "Team X has A; Team Y has B and C; Team Z has D." },
        { id: "D", text: "Team X has A and D; Team Y has B; Team Z has C." },
        { id: "E", text: "Team X has A; Team Y has B and D; Team Z has C." },
      ],
      correctAnswer: "A",
      explanation:
        "Option A satisfies all the constraints: Project A and B are not on the same team, each team has at least one project, and no team has more than two projects.",
      difficulty: "medium",
      tags: ["grouping", "distribution"],
      aiResponse:
        "Option A is correct because it ensures Project A and B are on different teams, and all teams have at least one project without exceeding the maximum limit.",
    },
    {
      id: "ar-3",
      text: "Five friends – Alice, Bob, Carol, Dave, and Eve – are sitting in a row. Alice cannot sit next to Bob, and Carol must sit next to Dave. Which of the following seating arrangements is possible?",
      options: [
        { id: "A", text: "Alice, Carol, Dave, Bob, Eve." },
        { id: "B", text: "Alice, Bob, Carol, Dave, Eve." },
        { id: "C", text: "Carol, Dave, Alice, Eve, Bob." },
        { id: "D", text: "Alice, Eve, Carol, Dave, Bob." },
        { id: "E", text: "Alice, Carol, Dave, Eve, Bob." },
      ],
      correctAnswer: "C",
      explanation:
        "Option C satisfies all the constraints: Alice is not next to Bob, and Carol is next to Dave.",
      difficulty: "easy",
      tags: ["seating arrangement"],
      aiResponse:
        "Option C is correct because it ensures Alice and Bob are not adjacent, and Carol and Dave are seated together.",
    },
    {
      id: "ar-4",
      text: "A library has five books – W, X, Y, Z, and A – to be placed on a shelf. Book W cannot be placed next to Book X, and Book Y must be placed next to Book Z. Which of the following arrangements is valid?",
      options: [
        { id: "A", text: "W, Y, Z, X, A." },
        { id: "B", text: "Y, Z, W, X, A." },
        { id: "C", text: "W, X, Y, Z, A." },
        { id: "D", text: "A, Y, Z, W, X." },
        { id: "E", text: "Y, Z, A, W, X." },
      ],
      correctAnswer: "A",
      explanation:
        "Option A satisfies all the constraints: W is not next to X, and Y is next to Z.",
      difficulty: "easy",
      tags: ["arrangement"],
      aiResponse:
        "Option A is correct because it ensures W and X are not adjacent, and Y and Z are placed together.",
    },
    {
      id: "ar-5",
      text: "Six people – P, Q, R, S, T, and U – are to be seated around a circular table. P cannot sit next to Q, and R must sit next to S. Which of the following seating arrangements is possible?",
      options: [
        { id: "A", text: "P, R, S, T, U, Q." },
        { id: "B", text: "P, T, R, S, U, Q." },
        { id: "C", text: "P, U, R, S, T, Q." },
        { id: "D", text: "P, R, S, Q, T, U." },
        { id: "E", text: "P, T, U, R, S, Q." },
      ],
      correctAnswer: "B",
      explanation:
        "Option B satisfies all the constraints: P is not next to Q, and R is next to S.",
      difficulty: "medium",
      tags: ["circular arrangement"],
      aiResponse:
        "Option B is correct because it ensures P and Q are not adjacent, and R and S are seated together.",
    },
    {
      id: "ar-6",
      text: "Four teams – Red, Blue, Green, and Yellow – are competing in a tournament. Each team plays every other team exactly once. If Red cannot play Blue in the first round, which of the following schedules is possible?",
      options: [
        { id: "A", text: "Round 1: Red vs Green, Blue vs Yellow." },
        { id: "B", text: "Round 1: Red vs Blue, Green vs Yellow." },
        { id: "C", text: "Round 1: Red vs Yellow, Blue vs Green." },
        { id: "D", text: "Round 1: Red vs Green, Blue vs Yellow; Round 2: Red vs Blue, Green vs Yellow." },
        { id: "E", text: "Round 1: Red vs Yellow, Blue vs Green; Round 2: Red vs Blue, Green vs Yellow." },
      ],
      correctAnswer: "A",
      explanation:
        "Option A satisfies the constraint: Red does not play Blue in the first round.",
      difficulty: "easy",
      tags: ["scheduling"],
      aiResponse:
        "Option A is correct because it ensures Red and Blue do not play each other in the first round.",
    },
    {
      id: "ar-7",
      text: "Five tasks – A, B, C, D, and E – must be completed in a specific order. Task A must be completed before Task B, and Task C must be completed before Task D. Which of the following sequences is valid?",
      options: [
        { id: "A", text: "A, C, B, D, E." },
        { id: "B", text: "C, A, D, B, E." },
        { id: "C", text: "A, B, C, D, E." },
        { id: "D", text: "C, D, A, B, E." },
        { id: "E", text: "A, C, D, B, E." },
      ],
      correctAnswer: "E",
      explanation:
        "Option E satisfies all the constraints: A is before B, and C is before D.",
      difficulty: "medium",
      tags: ["sequencing"],
      aiResponse:
        "Option E is correct because it ensures A is completed before B, and C is completed before D.",
    },
    {
      id: "ar-8",
      text: "Six people – F, G, H, I, J, and K – are standing in a line. F cannot stand next to G, and H must stand next to I. Which of the following arrangements is valid?",
      options: [
        { id: "A", text: "F, H, I, G, J, K." },
        { id: "B", text: "H, I, F, G, J, K." },
        { id: "C", text: "F, J, H, I, G, K." },
        { id: "D", text: "F, G, H, I, J, K." },
        { id: "E", text: "H, I, J, F, G, K." },
      ],
      correctAnswer: "C",
      explanation:
        "Option C satisfies all the constraints: F is not next to G, and H is next to I.",
      difficulty: "easy",
      tags: ["linear arrangement"],
      aiResponse:
        "Option C is correct because it ensures F and G are not adjacent, and H and I are standing together.",
    },
    {
      id: "ar-9",
      text: "A committee of four members – W, X, Y, and Z – must be formed. W and X cannot be on the committee together, and Y must be included. Which of the following committees is valid?",
      options: [
        { id: "A", text: "W, Y, Z." },
        { id: "B", text: "X, Y, Z." },
        { id: "C", text: "W, X, Y." },
        { id: "D", text: "W, X, Z." },
        { id: "E", text: "X, Y, Z, W." },
      ],
      correctAnswer: "B",
      explanation:
        "Option B satisfies all the constraints: W and X are not together, and Y is included.",
      difficulty: "medium",
      tags: ["committee formation"],
      aiResponse:
        "Option B is correct because it ensures W and X are not on the committee together, and Y is included.",
    },
    {
      id: "ar-10",
      text: "Five cars – A, B, C, D, and E – are parked in a row. Car A cannot be next to Car B, and Car C must be next to Car D. Which of the following arrangements is valid?",
      options: [
        { id: "A", text: "A, C, D, B, E." },
        { id: "B", text: "C, D, A, E, B." },
        { id: "C", text: "A, E, C, D, B." },
        { id: "D", text: "A, B, C, D, E." },
        { id: "E", text: "C, D, E, A, B." },
      ],
      correctAnswer: "C",
      explanation:
        "Option C satisfies all the constraints: A is not next to B, and C is next to D.",
      difficulty: "easy",
      tags: ["linear arrangement"],
      aiResponse:
        "Option C is correct because it ensures A and B are not adjacent, and C and D are parked together.",
    },
  ];
  

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
      aiResponse:
        "Option B is correct because the passage emphasizes the importance of balancing climate change legislation with economic considerations. The author supports legislation but acknowledges the need for a balanced approach.",
    },
    {
      id: "rc-2",
      text: "What is the primary purpose of the passage?",
      options: [
        { id: "A", text: "To argue against the use of fossil fuels." },
        { id: "B", text: "To explain the benefits of renewable energy sources." },
        { id: "C", text: "To discuss the challenges of transitioning to a green economy." },
        { id: "D", text: "To criticize government policies on energy production." },
        { id: "E", text: "To advocate for increased investment in nuclear energy." },
      ],
      correctAnswer: "C",
      explanation:
        "The passage primarily focuses on the challenges and complexities of transitioning to a green economy, including economic, technological, and social factors.",
      difficulty: "medium",
      tags: ["purpose", "main idea"],
      aiResponse:
        "Option C is correct because the passage discusses the various challenges involved in transitioning to a green economy, such as economic costs, technological limitations, and social resistance.",
    },
    {
      id: "rc-3",
      text: "Which of the following statements would the author most likely agree with?",
      options: [
        { id: "A", text: "Technological innovation alone can solve climate change." },
        { id: "B", text: "Public awareness is more important than government action." },
        { id: "C", text: "A combination of policy, technology, and public participation is necessary to address climate change." },
        { id: "D", text: "Climate change is a problem that will resolve itself over time." },
        { id: "E", text: "Developing countries should bear the primary responsibility for reducing emissions." },
      ],
      correctAnswer: "C",
      explanation:
        "The author emphasizes the need for a multifaceted approach, including policy, technology, and public participation, to effectively address climate change.",
      difficulty: "medium",
      tags: ["inference", "author's perspective"],
      aiResponse:
        "Option C is correct because the author highlights the importance of combining policy, technology, and public participation to tackle climate change effectively.",
    },
    {
      id: "rc-4",
      text: "According to the passage, what is the most significant barrier to adopting renewable energy?",
      options: [
        { id: "A", text: "Lack of public interest." },
        { id: "B", text: "High initial costs and infrastructure challenges." },
        { id: "C", text: "Insufficient technological advancements." },
        { id: "D", text: "Government regulations." },
        { id: "E", text: "Limited availability of renewable resources." },
      ],
      correctAnswer: "B",
      explanation:
        "The passage identifies high initial costs and infrastructure challenges as the most significant barriers to adopting renewable energy.",
      difficulty: "easy",
      tags: ["detail", "barriers"],
      aiResponse:
        "Option B is correct because the passage explicitly mentions high initial costs and infrastructure challenges as the primary barriers to renewable energy adoption.",
    },
    {
      id: "rc-5",
      text: "What is the author's tone in the passage?",
      options: [
        { id: "A", text: "Optimistic and enthusiastic." },
        { id: "B", text: "Neutral and analytical." },
        { id: "C", text: "Pessimistic and critical." },
        { id: "D", text: "Sarcastic and dismissive." },
        { id: "E", text: "Emotional and urgent." },
      ],
      correctAnswer: "B",
      explanation:
        "The author maintains a neutral and analytical tone throughout the passage, presenting facts and arguments without excessive emotion or bias.",
      difficulty: "easy",
      tags: ["tone", "author's perspective"],
      aiResponse:
        "Option B is correct because the author's tone is neutral and analytical, focusing on presenting information and arguments objectively.",
    },
    {
      id: "rc-6",
      text: "Which of the following is NOT mentioned in the passage as a benefit of renewable energy?",
      options: [
        { id: "A", text: "Reduction in greenhouse gas emissions." },
        { id: "B", text: "Job creation in new industries." },
        { id: "C", text: "Energy independence for nations." },
        { id: "D", text: "Lower long-term energy costs." },
        { id: "E", text: "Immediate replacement of all fossil fuel infrastructure." },
      ],
      correctAnswer: "E",
      explanation:
        "The passage discusses the benefits of renewable energy, such as emission reduction, job creation, energy independence, and lower long-term costs, but it does not claim that renewable energy can immediately replace all fossil fuel infrastructure.",
      difficulty: "medium",
      tags: ["detail", "benefits"],
      aiResponse:
        "Option E is correct because the passage does not mention the immediate replacement of all fossil fuel infrastructure as a benefit of renewable energy.",
    },
    {
      id: "rc-7",
      text: "What does the author suggest about the role of governments in addressing climate change?",
      options: [
        { id: "A", text: "Governments should take a hands-off approach." },
        { id: "B", text: "Governments should prioritize economic growth over environmental concerns." },
        { id: "C", text: "Governments should implement policies that encourage sustainable practices." },
        { id: "D", text: "Governments should rely solely on private sector initiatives." },
        { id: "E", text: "Governments should focus on short-term solutions rather than long-term planning." },
      ],
      correctAnswer: "C",
      explanation:
        "The author suggests that governments should play an active role in implementing policies that encourage sustainable practices and address climate change.",
      difficulty: "medium",
      tags: ["inference", "government role"],
      aiResponse:
        "Option C is correct because the author emphasizes the importance of government policies in promoting sustainability and addressing climate change.",
    },
    {
      id: "rc-8",
      text: "According to the passage, what is the main challenge of transitioning to renewable energy?",
      options: [
        { id: "A", text: "Public opposition to new technologies." },
        { id: "B", text: "Lack of scientific research." },
        { id: "C", text: "High upfront costs and infrastructure requirements." },
        { id: "D", text: "Insufficient natural resources." },
        { id: "E", text: "Government bureaucracy." },
      ],
      correctAnswer: "C",
      explanation:
        "The passage identifies high upfront costs and infrastructure requirements as the main challenges of transitioning to renewable energy.",
      difficulty: "easy",
      tags: ["detail", "challenges"],
      aiResponse:
        "Option C is correct because the passage highlights high upfront costs and infrastructure requirements as the primary challenges of transitioning to renewable energy.",
    },
    {
      id: "rc-9",
      text: "What is the author's view on the role of individuals in combating climate change?",
      options: [
        { id: "A", text: "Individuals have no significant role to play." },
        { id: "B", text: "Individuals should focus on reducing their carbon footprint." },
        { id: "C", text: "Individuals should rely on governments to take action." },
        { id: "D", text: "Individuals should prioritize economic growth over environmental concerns." },
        { id: "E", text: "Individuals should avoid using technology to reduce emissions." },
      ],
      correctAnswer: "B",
      explanation:
        "The author suggests that individuals can contribute to combating climate change by reducing their carbon footprint and adopting sustainable practices.",
      difficulty: "medium",
      tags: ["inference", "individual role"],
      aiResponse:
        "Option B is correct because the author emphasizes the importance of individual actions, such as reducing carbon footprints, in addressing climate change.",
    },
    {
      id: "rc-10",
      text: "Which of the following best summarizes the main idea of the passage?",
      options: [
        { id: "A", text: "Climate change is an unsolvable problem." },
        { id: "B", text: "Renewable energy is the only solution to climate change." },
        { id: "C", text: "Addressing climate change requires a multifaceted approach involving policy, technology, and public participation." },
        { id: "D", text: "Governments should prioritize economic growth over environmental concerns." },
        { id: "E", text: "Individuals alone can solve climate change." },
      ],
      correctAnswer: "C",
      explanation:
        "The passage emphasizes that addressing climate change requires a combination of policy, technology, and public participation, rather than relying on a single solution.",
      difficulty: "medium",
      tags: ["main idea", "summary"],
      aiResponse:
        "Option C is correct because the passage highlights the need for a multifaceted approach to effectively address climate change.",
    },
  ];
  

  // Return questions based on section
  switch (section) {
    case "logical-reasoning":
      return logicalReasoningQuestions;
    case "analytical-reasoning":
      return analyticalReasoningQuestions;
    case "reading-comprehension":
      return readingComprehensionQuestions;
    case "mixed":
      return [
        ...logicalReasoningQuestions.slice(0, 1),
        ...analyticalReasoningQuestions.slice(0, 1),
        ...readingComprehensionQuestions.slice(0, 1),
      ];
    default:
      return [];
  }
}