import type { Question } from "./types";

export function getQuestions(subject: string): Question[] {
  const constitutionalLawQuestions: Question[] = [
    {
      id: "cl-1",
      text: "Which of the following powers is NOT explicitly granted to Congress under the U.S. Constitution?",
      options: [
        { id: "A", text: "The power to regulate interstate commerce." },
        { id: "B", text: "The power to establish a national bank." },
        { id: "C", text: "The power to declare war." },
        { id: "D", text: "The power to tax and spend for the general welfare." },
        { id: "E", text: "The power to coin money." },
      ],
      correctAnswer: "B",
      explanation:
        "The power to establish a national bank is not explicitly stated in the Constitution but was upheld as an implied power in McCulloch v. Maryland.",
      difficulty: "medium",
      tags: ["separation of powers", "Congress"],
      aiResponse:
        "Option B is correct because the Constitution does not explicitly grant Congress the power to establish a national bank, but the Supreme Court ruled that it is an implied power under the Necessary and Proper Clause.",
    },
    {
      id: "cl-2",
      text: "Which amendment to the U.S. Constitution guarantees the right to a speedy and public trial?",
      options: [
        { id: "A", text: "First Amendment" },
        { id: "B", text: "Fourth Amendment" },
        { id: "C", text: "Sixth Amendment" },
        { id: "D", text: "Eighth Amendment" },
        { id: "E", text: "Tenth Amendment" },
      ],
      correctAnswer: "C",
      explanation:
        "The Sixth Amendment guarantees the right to a speedy and public trial.",
      difficulty: "easy",
      tags: ["amendments", "rights"],
      aiResponse:
        "Option C is correct because the Sixth Amendment explicitly guarantees the right to a speedy and public trial.",
    },
    {
      id: "cl-3",
      text: "What is the primary purpose of the Supremacy Clause in the U.S. Constitution?",
      options: [
        { id: "A", text: "To establish the federal government's authority over state governments." },
        { id: "B", text: "To ensure states have equal representation in Congress." },
        { id: "C", text: "To protect individual rights from government infringement." },
        { id: "D", text: "To grant the President veto power over state laws." },
        { id: "E", text: "To limit the power of the judiciary." },
      ],
      correctAnswer: "A",
      explanation:
        "The Supremacy Clause establishes that federal law takes precedence over state laws and constitutions.",
      difficulty: "medium",
      tags: ["federalism", "Supremacy Clause"],
      aiResponse:
        "Option A is correct because the Supremacy Clause ensures that federal law is the supreme law of the land, overriding conflicting state laws.",
    },
    {
      id: "cl-4",
      text: "Which clause in the U.S. Constitution prohibits states from discriminating against citizens of other states?",
      options: [
        { id: "A", text: "Commerce Clause" },
        { id: "B", text: "Privileges and Immunities Clause" },
        { id: "C", text: "Equal Protection Clause" },
        { id: "D", text: "Due Process Clause" },
        { id: "E", text: "Full Faith and Credit Clause" },
      ],
      correctAnswer: "B",
      explanation:
        "The Privileges and Immunities Clause prohibits states from discriminating against citizens of other states.",
      difficulty: "medium",
      tags: ["federalism", "Privileges and Immunities Clause"],
      aiResponse:
        "Option B is correct because the Privileges and Immunities Clause ensures that states cannot discriminate against citizens of other states.",
    },
    {
      id: "cl-5",
      text: "What is the significance of the Equal Protection Clause in the Fourteenth Amendment?",
      options: [
        { id: "A", text: "It guarantees the right to bear arms." },
        { id: "B", text: "It ensures equal treatment under the law for all citizens." },
        { id: "C", text: "It grants states the power to regulate commerce." },
        { id: "D", text: "It limits the power of the federal government." },
        { id: "E", text: "It establishes the separation of church and state." },
      ],
      correctAnswer: "B",
      explanation:
        "The Equal Protection Clause ensures that no state shall deny any person within its jurisdiction the equal protection of the laws.",
      difficulty: "medium",
      tags: ["amendments", "Equal Protection Clause"],
      aiResponse:
        "Option B is correct because the Equal Protection Clause guarantees that all citizens are treated equally under the law.",
    },
    {
      id: "cl-6",
      text: "Which of the following is a power reserved to the states under the Tenth Amendment?",
      options: [
        { id: "A", text: "Regulating interstate commerce." },
        { id: "B", text: "Coining money." },
        { id: "C", text: "Conducting elections." },
        { id: "D", text: "Declaring war." },
        { id: "E", text: "Establishing post offices." },
      ],
      correctAnswer: "C",
      explanation:
        "The Tenth Amendment reserves powers not delegated to the federal government to the states, including conducting elections.",
      difficulty: "medium",
      tags: ["Tenth Amendment", "federalism"],
      aiResponse:
        "Option C is correct because the Tenth Amendment reserves powers like conducting elections to the states.",
    },
    {
      id: "cl-7",
      text: "What does the Establishment Clause of the First Amendment prohibit?",
      options: [
        { id: "A", text: "The government from establishing an official religion." },
        { id: "B", text: "Individuals from practicing their religion freely." },
        { id: "C", text: "States from regulating religious institutions." },
        { id: "D", text: "The federal government from taxing churches." },
        { id: "E", text: "Religious groups from participating in politics." },
      ],
      correctAnswer: "A",
      explanation:
        "The Establishment Clause prohibits the government from establishing an official religion or favoring one religion over another.",
      difficulty: "medium",
      tags: ["First Amendment", "Establishment Clause"],
      aiResponse:
        "Option A is correct because the Establishment Clause prevents the government from establishing an official religion.",
    },
    {
      id: "cl-8",
      text: "Which case established the principle of judicial review in the United States?",
      options: [
        { id: "A", text: "Marbury v. Madison" },
        { id: "B", text: "McCulloch v. Maryland" },
        { id: "C", text: "Brown v. Board of Education" },
        { id: "D", text: "Roe v. Wade" },
        { id: "E", text: "Plessy v. Ferguson" },
      ],
      correctAnswer: "A",
      explanation:
        "Marbury v. Madison (1803) established the principle of judicial review, allowing courts to strike down laws that violate the Constitution.",
      difficulty: "medium",
      tags: ["judicial review", "landmark cases"],
      aiResponse:
        "Option A is correct because Marbury v. Madison established the principle of judicial review.",
    },
    {
      id: "cl-9",
      text: "What is the main purpose of the Due Process Clause in the Fifth and Fourteenth Amendments?",
      options: [
        { id: "A", text: "To ensure fair treatment by the government." },
        { id: "B", text: "To protect freedom of speech." },
        { id: "C", text: "To limit the power of the judiciary." },
        { id: "D", text: "To grant states more power over the federal government." },
        { id: "E", text: "To establish the right to bear arms." },
      ],
      correctAnswer: "A",
      explanation:
        "The Due Process Clause ensures that individuals are treated fairly by the government and protects against arbitrary denial of life, liberty, or property.",
      difficulty: "medium",
      tags: ["Due Process Clause", "amendments"],
      aiResponse:
        "Option A is correct because the Due Process Clause guarantees fair treatment by the government.",
    },
    {
      id: "cl-10",
      text: "Which clause in the Constitution allows Congress to pass laws that are 'necessary and proper' to carry out its enumerated powers?",
      options: [
        { id: "A", text: "Commerce Clause" },
        { id: "B", text: "Supremacy Clause" },
        { id: "C", text: "Elastic Clause" },
        { id: "D", text: "Equal Protection Clause" },
        { id: "E", text: "Privileges and Immunities Clause" },
      ],
      correctAnswer: "C",
      explanation:
        "The Elastic Clause, also known as the Necessary and Proper Clause, allows Congress to pass laws necessary to execute its enumerated powers.",
      difficulty: "medium",
      tags: ["Elastic Clause", "Congress"],
      aiResponse:
        "Option C is correct because the Elastic Clause grants Congress the authority to pass laws necessary and proper for executing its powers.",
    },
    {
      id: "cl-11",
      text: "Which amendment abolished slavery in the United States?",
      options: [
        { id: "A", text: "Thirteenth Amendment" },
        { id: "B", text: "Fourteenth Amendment" },
        { id: "C", text: "Fifteenth Amendment" },
        { id: "D", text: "Sixteenth Amendment" },
        { id: "E", text: "Seventeenth Amendment" },
      ],
      correctAnswer: "A",
      explanation:
        "The Thirteenth Amendment abolished slavery and involuntary servitude, except as punishment for a crime.",
      difficulty: "easy",
      tags: ["amendments", "slavery"],
      aiResponse:
        "Option A is correct because the Thirteenth Amendment abolished slavery in the United States.",
    },
    {
      id: "cl-12",
      text: "What is the primary function of the Electoral College?",
      options: [
        { id: "A", text: "To elect the President of the United States." },
        { id: "B", text: "To propose amendments to the Constitution." },
        { id: "C", text: "To oversee federal elections." },
        { id: "D", text: "To interpret the Constitution." },
        { id: "E", text: "To regulate interstate commerce." },
      ],
      correctAnswer: "A",
      explanation:
        "The Electoral College is responsible for electing the President and Vice President of the United States.",
      difficulty: "medium",
      tags: ["Electoral College", "elections"],
      aiResponse:
        "Option A is correct because the Electoral College's primary function is to elect the President.",
    },
    {
      id: "cl-13",
      text: "Which amendment guarantees the right to bear arms?",
      options: [
        { id: "A", text: "First Amendment" },
        { id: "B", text: "Second Amendment" },
        { id: "C", text: "Fourth Amendment" },
        { id: "D", text: "Fifth Amendment" },
        { id: "E", text: "Tenth Amendment" },
      ],
      correctAnswer: "B",
      explanation:
        "The Second Amendment guarantees the right to keep and bear arms.",
      difficulty: "easy",
      tags: ["amendments", "Second Amendment"],
      aiResponse:
        "Option B is correct because the Second Amendment guarantees the right to bear arms.",
    },
    {
      id: "cl-14",
      text: "What is the significance of the Full Faith and Credit Clause?",
      options: [
        { id: "A", text: "It requires states to recognize the public acts, records, and judicial proceedings of other states." },
        { id: "B", text: "It ensures equal protection under the law." },
        { id: "C", text: "It grants Congress the power to regulate commerce." },
        { id: "D", text: "It limits the power of the federal government." },
        { id: "E", text: "It establishes the separation of powers." },
      ],
      correctAnswer: "A",
      explanation:
        "The Full Faith and Credit Clause ensures that states respect the laws and judicial decisions of other states.",
      difficulty: "medium",
      tags: ["Full Faith and Credit Clause", "federalism"],
      aiResponse:
        "Option A is correct because the Full Faith and Credit Clause requires states to recognize the public acts and judicial proceedings of other states.",
    },
  ];

  const contractsQuestions: Question[] = [
    {
      id: "co-1",
      text: "Which of the following is required for a legally enforceable contract?",
      options: [
        { id: "A", text: "A written agreement." },
        { id: "B", text: "Consideration." },
        { id: "C", text: "A notary public's signature." },
        { id: "D", text: "A witness to the agreement." },
        { id: "E", text: "A seal on the contract." },
      ],
      correctAnswer: "B",
      explanation:
        "Consideration, or a bargained-for exchange, is required for a contract to be legally enforceable.",
      difficulty: "easy",
      tags: ["contract law", "formation"],
      aiResponse:
        "Option B is correct because consideration is an essential element of contract formation, meaning both parties must give something of value in exchange.",
    },
    {
      id: "co-2",
      text: "What is the legal effect of a unilateral mistake in contract formation?",
      options: [
        { id: "A", text: "The contract is void." },
        { id: "B", text: "The contract is voidable by the mistaken party." },
        { id: "C", text: "The contract is enforceable unless the other party knew of the mistake." },
        { id: "D", text: "The contract is automatically rescinded." },
        { id: "E", text: "The contract is unenforceable." },
      ],
      correctAnswer: "C",
      explanation:
        "A unilateral mistake does not automatically void a contract unless the other party knew or should have known of the mistake.",
      difficulty: "medium",
      tags: ["contract law", "mistakes"],
      aiResponse:
        "Option C is correct because a unilateral mistake does not invalidate a contract unless the other party was aware of the mistake.",
    },
    {
      id: "co-3",
      text: "Which of the following is an example of an implied contract?",
      options: [
        { id: "A", text: "A written lease agreement." },
        { id: "B", text: "A verbal agreement to sell a car." },
        { id: "C", text: "A handshake deal between two parties." },
        { id: "D", text: "A contract inferred from the conduct of the parties." },
        { id: "E", text: "A contract signed under duress." },
      ],
      correctAnswer: "D",
      explanation:
        "An implied contract is inferred from the conduct of the parties rather than explicit words.",
      difficulty: "medium",
      tags: ["contract law", "implied contracts"],
      aiResponse:
        "Option D is correct because an implied contract is created based on the actions or conduct of the parties rather than explicit terms.",
    },
    {
      id: "co-4",
      text: "What is the primary purpose of the statute of frauds?",
      options: [
        { id: "A", text: "To prevent fraudulent contracts." },
        { id: "B", text: "To require certain contracts to be in writing." },
        { id: "C", text: "To enforce oral agreements." },
        { id: "D", text: "To limit the duration of contracts." },
        { id: "E", text: "To provide remedies for breach of contract." },
      ],
      correctAnswer: "B",
      explanation:
        "The statute of frauds requires certain types of contracts to be in writing to be enforceable.",
      difficulty: "medium",
      tags: ["contract law", "statute of frauds"],
      aiResponse:
        "Option B is correct because the statute of frauds mandates that certain contracts must be in writing to be enforceable.",
    },
    {
      id: "co-5",
      text: "Which of the following is a valid defense to a breach of contract claim?",
      options: [
        { id: "A", text: "The contract was oral." },
        { id: "B", text: "The contract was unfair." },
        { id: "C", text: "The contract was impossible to perform." },
        { id: "D", text: "The contract was not notarized." },
        { id: "E", text: "The contract was signed under duress." },
      ],
      correctAnswer: "C",
      explanation:
        "Impossibility of performance is a valid defense to a breach of contract claim.",
      difficulty: "medium",
      tags: ["contract law", "defenses"],
      aiResponse:
        "Option C is correct because if a contract becomes impossible to perform, it may be a valid defense to a breach of contract claim.",
    },
    {
      id: "co-6",
      text: "What is the legal term for a promise exchanged for a promise in a contract?",
      options: [
        { id: "A", text: "Unilateral contract." },
        { id: "B", text: "Bilateral contract." },
        { id: "C", text: "Executed contract." },
        { id: "D", text: "Voidable contract." },
        { id: "E", text: "Quasi-contract." },
      ],
      correctAnswer: "B",
      explanation:
        "A bilateral contract involves a promise exchanged for a promise, whereas a unilateral contract involves a promise exchanged for an act.",
      difficulty: "easy",
      tags: ["contract law", "bilateral contracts"],
      aiResponse:
        "Option B is correct because a bilateral contract is formed by an exchange of promises between two parties.",
    },
    {
      id: "co-7",
      text: "Which of the following is NOT a required element for a valid contract?",
      options: [
        { id: "A", text: "Offer." },
        { id: "B", text: "Acceptance." },
        { id: "C", text: "Consideration." },
        { id: "D", text: "Mutual intent to be bound." },
        { id: "E", text: "A written document." },
      ],
      correctAnswer: "E",
      explanation:
        "A written document is not always required for a valid contract, as oral contracts can also be enforceable.",
      difficulty: "easy",
      tags: ["contract law", "formation"],
      aiResponse:
        "Option E is correct because a written document is not a required element for a valid contract; oral contracts can also be enforceable.",
    },
    {
      id: "co-8",
      text: "What is the legal effect of a contract entered into under duress?",
      options: [
        { id: "A", text: "The contract is void." },
        { id: "B", text: "The contract is voidable by the aggrieved party." },
        { id: "C", text: "The contract is enforceable." },
        { id: "D", text: "The contract is automatically rescinded." },
        { id: "E", text: "The contract is unenforceable." },
      ],
      correctAnswer: "B",
      explanation:
        "A contract entered into under duress is voidable by the party who was coerced.",
      difficulty: "medium",
      tags: ["contract law", "duress"],
      aiResponse:
        "Option B is correct because a contract signed under duress is voidable by the aggrieved party.",
    },
    {
      id: "co-9",
      text: "What is the primary purpose of the parol evidence rule?",
      options: [
        { id: "A", text: "To exclude oral agreements that contradict a written contract." },
        { id: "B", text: "To enforce oral agreements." },
        { id: "C", text: "To allow parties to modify written contracts orally." },
        { id: "D", text: "To require all contracts to be in writing." },
        { id: "E", text: "To provide remedies for breach of contract." },
      ],
      correctAnswer: "A",
      explanation:
        "The parol evidence rule prevents parties from introducing oral or written evidence that contradicts the terms of a written contract.",
      difficulty: "medium",
      tags: ["contract law", "parol evidence rule"],
      aiResponse:
        "Option A is correct because the parol evidence rule excludes evidence that contradicts the terms of a written contract.",
    },
    {
      id: "co-10",
      text: "Which of the following is an example of a unilateral contract?",
      options: [
        { id: "A", text: "A promise to pay for services rendered." },
        { id: "B", text: "A promise to deliver goods in exchange for payment." },
        { id: "C", text: "A reward offer for finding a lost item." },
        { id: "D", text: "A lease agreement." },
        { id: "E", text: "A partnership agreement." },
      ],
      correctAnswer: "C",
      explanation:
        "A unilateral contract involves a promise in exchange for an act, such as a reward offer.",
      difficulty: "medium",
      tags: ["contract law", "unilateral contracts"],
      aiResponse:
        "Option C is correct because a reward offer is a classic example of a unilateral contract, where the promise is fulfilled by performing the act.",
    },
    {
      id: "co-11",
      text: "What is the legal term for a contract that is no longer enforceable?",
      options: [
        { id: "A", text: "Void contract." },
        { id: "B", text: "Voidable contract." },
        { id: "C", text: "Executed contract." },
        { id: "D", text: "Unenforceable contract." },
        { id: "E", text: "Quasi-contract." },
      ],
      correctAnswer: "D",
      explanation:
        "An unenforceable contract is one that cannot be enforced by a court, often due to a legal defect.",
      difficulty: "medium",
      tags: ["contract law", "unenforceable contracts"],
      aiResponse:
        "Option D is correct because an unenforceable contract cannot be enforced by a court, even though it may appear valid.",
    },
    {
      id: "co-12",
      text: "Which of the following is true about a void contract?",
      options: [
        { id: "A", text: "It is enforceable if both parties agree." },
        { id: "B", text: "It is valid but can be canceled by one party." },
        { id: "C", text: "It is treated as if it never existed." },
        { id: "D", text: "It is enforceable in certain circumstances." },
        { id: "E", text: "It is binding on both parties." },
      ],
      correctAnswer: "C",
      explanation:
        "A void contract is treated as if it never existed and has no legal effect.",
      difficulty: "medium",
      tags: ["contract law", "void contracts"],
      aiResponse:
        "Option C is correct because a void contract is considered invalid from the outset and has no legal effect.",
    },
    {
      id: "co-13",
      text: "What is the legal term for a contract that is binding but can be canceled by one party?",
      options: [
        { id: "A", text: "Void contract." },
        { id: "B", text: "Voidable contract." },
        { id: "C", text: "Executed contract." },
        { id: "D", text: "Unenforceable contract." },
        { id: "E", text: "Quasi-contract." },
      ],
      correctAnswer: "B",
      explanation:
        "A voidable contract is binding but can be canceled by one party due to a legal defect, such as fraud or duress.",
      difficulty: "medium",
      tags: ["contract law", "voidable contracts"],
      aiResponse:
        "Option B is correct because a voidable contract is binding but can be canceled by one party under certain circumstances.",
    },
    {
      id: "co-14",
      text: "What is the legal term for a contract that is fully performed by both parties?",
      options: [
        { id: "A", text: "Executed contract." },
        { id: "B", text: "Executory contract." },
        { id: "C", text: "Void contract." },
        { id: "D", text: "Voidable contract." },
        { id: "E", text: "Unenforceable contract." },
      ],
      correctAnswer: "A",
      explanation:
        "An executed contract is one where both parties have fully performed their obligations.",
      difficulty: "easy",
      tags: ["contract law", "executed contracts"],
      aiResponse:
        "Option A is correct because an executed contract is one where all parties have fulfilled their obligations.",
    },
    {
      id: "co-15",
      text: "What is the legal term for a contract that is not yet fully performed by one or both parties?",
      options: [
        { id: "A", text: "Executed contract." },
        { id: "B", text: "Executory contract." },
        { id: "C", text: "Void contract." },
        { id: "D", text: "Voidable contract." },
        { id: "E", text: "Unenforceable contract." },
      ],
      correctAnswer: "B",
      explanation:
        "An executory contract is one where one or both parties have yet to fulfill their obligations.",
      difficulty: "easy",
      tags: ["contract law", "executory contracts"],
      aiResponse:
        "Option B is correct because an executory contract is one where performance is still pending from one or both parties.",
    },
  ];

  const criminalLawQuestions: Question[] = [
    {
      id: "cr-1",
      text: "Which of the following is an example of an inchoate crime?",
      options: [
        { id: "A", text: "Murder." },
        { id: "B", text: "Robbery." },
        { id: "C", text: "Attempted burglary." },
        { id: "D", text: "Arson." },
        { id: "E", text: "Embezzlement." },
      ],
      correctAnswer: "C",
      explanation:
        "An inchoate crime is an incomplete or preparatory crime, such as attempt, conspiracy, or solicitation.",
      difficulty: "medium",
      tags: ["criminal law", "inchoate crimes"],
      aiResponse:
        "Option C is correct because attempted burglary is an example of an inchoate crime, which refers to an offense that is committed in preparation for another crime.",
    },
    {
      id: "cr-2",
      text: "What is the primary purpose of the exclusionary rule in criminal law?",
      options: [
        { id: "A", text: "To exclude evidence obtained illegally." },
        { id: "B", text: "To exclude hearsay evidence." },
        { id: "C", text: "To exclude evidence that is irrelevant." },
        { id: "D", text: "To exclude evidence that is prejudicial." },
        { id: "E", text: "To exclude evidence that is unreliable." },
      ],
      correctAnswer: "A",
      explanation:
        "The exclusionary rule prevents evidence obtained in violation of a defendant's constitutional rights from being used in court.",
      difficulty: "medium",
      tags: ["criminal law", "exclusionary rule"],
      aiResponse:
        "Option A is correct because the exclusionary rule is designed to deter law enforcement from violating constitutional rights by excluding illegally obtained evidence.",
    },
    {
      id: "cr-3",
      text: "Which of the following is a necessary element of a crime?",
      options: [
        { id: "A", text: "Motive." },
        { id: "B", text: "Intent." },
        { id: "C", text: "Opportunity." },
        { id: "D", text: "Weapon." },
        { id: "E", text: "Witnesses." },
      ],
      correctAnswer: "B",
      explanation:
        "Intent, or mens rea, is a necessary element of a crime.",
      difficulty: "easy",
      tags: ["criminal law", "elements of a crime"],
      aiResponse:
        "Option B is correct because intent (mens rea) is a required element for most crimes.",
    },
    {
      id: "cr-4",
      text: "What is the difference between murder and manslaughter?",
      options: [
        { id: "A", text: "Murder requires intent, while manslaughter does not." },
        { id: "B", text: "Murder is premeditated, while manslaughter is not." },
        { id: "C", text: "Murder is a felony, while manslaughter is a misdemeanor." },
        { id: "D", text: "Murder involves a weapon, while manslaughter does not." },
        { id: "E", text: "Murder is punishable by death, while manslaughter is not." },
      ],
      correctAnswer: "A",
      explanation:
        "Murder requires malice aforethought (intent), while manslaughter does not.",
      difficulty: "medium",
      tags: ["criminal law", "homicide"],
      aiResponse:
        "Option A is correct because murder requires intent, whereas manslaughter does not.",
    },
    {
      id: "cr-5",
      text: "Which of the following is an example of a strict liability crime?",
      options: [
        { id: "A", text: "Murder." },
        { id: "B", text: "Robbery." },
        { id: "C", text: "Traffic violations." },
        { id: "D", text: "Burglary." },
        { id: "E", text: "Assault." },
      ],
      correctAnswer: "C",
      explanation:
        "Traffic violations are strict liability crimes, meaning intent is not required.",
      difficulty: "medium",
      tags: ["criminal law", "strict liability"],
      aiResponse:
        "Option C is correct because traffic violations are strict liability crimes, where intent is not a necessary element.",
    },
    {
      id: "cr-6",
      text: "What is the legal term for the physical act of committing a crime?",
      options: [
        { id: "A", text: "Mens rea." },
        { id: "B", text: "Actus reus." },
        { id: "C", text: "Strict liability." },
        { id: "D", text: "Inchoate offense." },
        { id: "E", text: "Criminal negligence." },
      ],
      correctAnswer: "B",
      explanation:
        "Actus reus refers to the physical act or conduct that constitutes a crime.",
      difficulty: "easy",
      tags: ["criminal law", "actus reus"],
      aiResponse:
        "Option B is correct because actus reus is the physical act of committing a crime, which is a necessary element alongside mens rea.",
    },
    {
      id: "cr-7",
      text: "Which of the following is a defense to a criminal charge?",
      options: [
        { id: "A", text: "Motive." },
        { id: "B", text: "Intent." },
        { id: "C", text: "Insanity." },
        { id: "D", text: "Opportunity." },
        { id: "E", text: "Weapon possession." },
      ],
      correctAnswer: "C",
      explanation:
        "Insanity is a defense to a criminal charge if the defendant was unable to understand the nature of their actions or distinguish right from wrong.",
      difficulty: "medium",
      tags: ["criminal law", "defenses"],
      aiResponse:
        "Option C is correct because insanity is a valid defense if the defendant lacked the mental capacity to understand their actions.",
    },
    {
      id: "cr-8",
      text: "What is the legal term for a crime punishable by more than one year in prison?",
      options: [
        { id: "A", text: "Misdemeanor." },
        { id: "B", text: "Felony." },
        { id: "C", text: "Infraction." },
        { id: "D", text: "Violation." },
        { id: "E", text: "Strict liability offense." },
      ],
      correctAnswer: "B",
      explanation:
        "A felony is a serious crime punishable by more than one year in prison.",
      difficulty: "easy",
      tags: ["criminal law", "felony"],
      aiResponse:
        "Option B is correct because a felony is a serious crime that carries a sentence of more than one year in prison.",
    },
    {
      id: "cr-9",
      text: "Which of the following is an example of a white-collar crime?",
      options: [
        { id: "A", text: "Assault." },
        { id: "B", text: "Burglary." },
        { id: "C", text: "Embezzlement." },
        { id: "D", text: "Robbery." },
        { id: "E", text: "Arson." },
      ],
      correctAnswer: "C",
      explanation:
        "White-collar crimes are non-violent crimes typically committed for financial gain, such as embezzlement.",
      difficulty: "medium",
      tags: ["criminal law", "white-collar crime"],
      aiResponse:
        "Option C is correct because embezzlement is a white-collar crime involving financial fraud or theft.",
    },
    {
      id: "cr-10",
      text: "What is the legal term for a crime that is punishable by less than one year in jail?",
      options: [
        { id: "A", text: "Felony." },
        { id: "B", text: "Misdemeanor." },
        { id: "C", text: "Infraction." },
        { id: "D", text: "Violation." },
        { id: "E", text: "Strict liability offense." },
      ],
      correctAnswer: "B",
      explanation:
        "A misdemeanor is a less serious crime punishable by less than one year in jail.",
      difficulty: "easy",
      tags: ["criminal law", "misdemeanor"],
      aiResponse:
        "Option B is correct because a misdemeanor is a crime punishable by less than one year in jail.",
    },
    {
      id: "cr-11",
      text: "Which of the following is an example of a victimless crime?",
      options: [
        { id: "A", text: "Robbery." },
        { id: "B", text: "Drug possession." },
        { id: "C", text: "Assault." },
        { id: "D", text: "Burglary." },
        { id: "E", text: "Fraud." },
      ],
      correctAnswer: "B",
      explanation:
        "A victimless crime is one where there is no direct victim, such as drug possession.",
      difficulty: "medium",
      tags: ["criminal law", "victimless crimes"],
      aiResponse:
        "Option B is correct because drug possession is considered a victimless crime, as it does not directly harm another individual.",
    },
    {
      id: "cr-12",
      text: "What is the legal term for a crime committed by a person of high social status in the course of their occupation?",
      options: [
        { id: "A", text: "Organized crime." },
        { id: "B", text: "White-collar crime." },
        { id: "C", text: "Blue-collar crime." },
        { id: "D", text: "Victimless crime." },
        { id: "E", text: "Hate crime." },
      ],
      correctAnswer: "B",
      explanation:
        "White-collar crimes are typically committed by individuals in professional or business settings.",
      difficulty: "medium",
      tags: ["criminal law", "white-collar crime"],
      aiResponse:
        "Option B is correct because white-collar crimes are committed by individuals in professional or business roles.",
    },
    {
      id: "cr-13",
      text: "Which of the following is a necessary element of self-defense?",
      options: [
        { id: "A", text: "Premeditation." },
        { id: "B", text: "Proportionality." },
        { id: "C", text: "Retaliation." },
        { id: "D", text: "Weapon possession." },
        { id: "E", text: "Intent to harm." },
      ],
      correctAnswer: "B",
      explanation:
        "Self-defense requires that the force used is proportional to the threat faced.",
      difficulty: "medium",
      tags: ["criminal law", "self-defense"],
      aiResponse:
        "Option B is correct because self-defense requires that the response is proportional to the threat.",
    },
    {
      id: "cr-14",
      text: "What is the legal term for a crime that involves the use of force or threat of force?",
      options: [
        { id: "A", text: "Property crime." },
        { id: "B", text: "Violent crime." },
        { id: "C", text: "White-collar crime." },
        { id: "D", text: "Victimless crime." },
        { id: "E", text: "Organized crime." },
      ],
      correctAnswer: "B",
      explanation:
        "Violent crimes involve the use of force or threat of force against a victim.",
      difficulty: "easy",
      tags: ["criminal law", "violent crimes"],
      aiResponse:
        "Option B is correct because violent crimes involve the use of force or threat of force.",
    },
    {
      id: "cr-15",
      text: "Which of the following is an example of a property crime?",
      options: [
        { id: "A", text: "Assault." },
        { id: "B", text: "Burglary." },
        { id: "C", text: "Robbery." },
        { id: "D", text: "Murder." },
        { id: "E", text: "Drug possession." },
      ],
      correctAnswer: "B",
      explanation:
        "Property crimes involve the theft or destruction of property, such as burglary.",
      difficulty: "easy",
      tags: ["criminal law", "property crimes"],
      aiResponse:
        "Option B is correct because burglary is a property crime involving unlawful entry to commit theft.",
    },
  ];

  const civilProcedureQuestions: Question[] = [
    {
      id: "cp-1",
      text: "Which of the following is a requirement for a federal court to hear a case based on diversity jurisdiction?",
      options: [
        { id: "A", text: "The parties must be from the same state." },
        { id: "B", text: "The case must involve a constitutional issue." },
        { id: "C", text: "The amount in controversy must exceed $75,000." },
        { id: "D", text: "The plaintiff must be a government entity." },
        { id: "E", text: "The defendant must consent to federal jurisdiction." },
      ],
      correctAnswer: "C",
      explanation:
        "Diversity jurisdiction requires that the parties be from different states and that the amount in controversy exceeds $75,000.",
      difficulty: "medium",
      tags: ["civil procedure", "jurisdiction"],
      aiResponse:
        "Option C is correct because federal courts have diversity jurisdiction when the amount in controversy exceeds $75,000 and the parties are from different states.",
    },
    {
      id: "cp-2",
      text: "What is the purpose of a motion to dismiss in civil procedure?",
      options: [
        { id: "A", text: "To request a change of venue." },
        { id: "B", text: "To challenge the legal sufficiency of the complaint." },
        { id: "C", text: "To request a jury trial." },
        { id: "D", text: "To settle the case out of court." },
        { id: "E", text: "To request additional discovery." },
      ],
      correctAnswer: "B",
      explanation:
        "A motion to dismiss challenges the legal sufficiency of the plaintiff's complaint.",
      difficulty: "medium",
      tags: ["civil procedure", "motions"],
      aiResponse:
        "Option B is correct because a motion to dismiss is used to argue that the complaint fails to state a valid legal claim.",
    },
    {
      id: "cp-3",
      text: "Which of the following is a requirement for personal jurisdiction?",
      options: [
        { id: "A", text: "The defendant must be a resident of the state." },
        { id: "B", text: "The defendant must have minimum contacts with the forum state." },
        { id: "C", text: "The plaintiff must be a resident of the state." },
        { id: "D", text: "The case must involve a federal question." },
        { id: "E", text: "The defendant must consent to jurisdiction." },
      ],
      correctAnswer: "B",
      explanation:
        "Personal jurisdiction requires that the defendant have minimum contacts with the forum state.",
      difficulty: "medium",
      tags: ["civil procedure", "jurisdiction"],
      aiResponse:
        "Option B is correct because personal jurisdiction is established when the defendant has minimum contacts with the forum state.",
    },
    {
      id: "cp-4",
      text: "What is the purpose of discovery in civil procedure?",
      options: [
        { id: "A", text: "To determine the jurisdiction of the court." },
        { id: "B", text: "To gather evidence and information relevant to the case." },
        { id: "C", text: "To settle the case out of court." },
        { id: "D", text: "To challenge the legal sufficiency of the complaint." },
        { id: "E", text: "To request a jury trial." },
      ],
      correctAnswer: "B",
      explanation:
        "Discovery is the process of gathering evidence and information relevant to the case.",
      difficulty: "easy",
      tags: ["civil procedure", "discovery"],
      aiResponse:
        "Option B is correct because discovery allows parties to obtain evidence and information relevant to the case.",
    },
    {
      id: "cp-5",
      text: "Which of the following is an example of a pretrial motion?",
      options: [
        { id: "A", text: "Motion for summary judgment." },
        { id: "B", text: "Motion for a new trial." },
        { id: "C", text: "Motion for judgment notwithstanding the verdict." },
        { id: "D", text: "Motion for a directed verdict." },
        { id: "E", text: "Motion to dismiss." },
      ],
      correctAnswer: "A",
      explanation:
        "A motion for summary judgment is a pretrial motion that asks the court to decide the case based on the evidence without a trial.",
      difficulty: "medium",
      tags: ["civil procedure", "pretrial motions"],
      aiResponse:
        "Option A is correct because a motion for summary judgment is a pretrial motion that seeks to resolve the case without a trial.",
    },
    {
      id: "cp-6",
      text: "What is the purpose of a motion for summary judgment?",
      options: [
        { id: "A", text: "To request a jury trial." },
        { id: "B", text: "To challenge the legal sufficiency of the complaint." },
        { id: "C", text: "To resolve the case without a trial if there are no material facts in dispute." },
        { id: "D", text: "To request additional discovery." },
        { id: "E", text: "To settle the case out of court." },
      ],
      correctAnswer: "C",
      explanation:
        "A motion for summary judgment is used to resolve the case without a trial if there are no genuine issues of material fact.",
      difficulty: "medium",
      tags: ["civil procedure", "pretrial motions"],
      aiResponse:
        "Option C is correct because a motion for summary judgment seeks to resolve the case without a trial when there are no material facts in dispute.",
    },
    {
      id: "cp-7",
      text: "Which of the following is a requirement for subject matter jurisdiction in federal court?",
      options: [
        { id: "A", text: "The defendant must be a resident of the state." },
        { id: "B", text: "The case must involve a federal question or diversity of citizenship." },
        { id: "C", text: "The plaintiff must be a government entity." },
        { id: "D", text: "The defendant must consent to jurisdiction." },
        { id: "E", text: "The case must involve a constitutional issue." },
      ],
      correctAnswer: "B",
      explanation:
        "Subject matter jurisdiction in federal court requires either a federal question or diversity of citizenship.",
      difficulty: "medium",
      tags: ["civil procedure", "jurisdiction"],
      aiResponse:
        "Option B is correct because federal courts have subject matter jurisdiction over cases involving federal questions or diversity of citizenship.",
    },
    {
      id: "cp-8",
      text: "What is the purpose of a motion for a directed verdict?",
      options: [
        { id: "A", text: "To request a jury trial." },
        { id: "B", text: "To challenge the legal sufficiency of the evidence presented at trial." },
        { id: "C", text: "To settle the case out of court." },
        { id: "D", text: "To request additional discovery." },
        { id: "E", text: "To dismiss the case before trial." },
      ],
      correctAnswer: "B",
      explanation:
        "A motion for a directed verdict challenges the sufficiency of the evidence presented at trial and asks the court to rule in favor of the moving party.",
      difficulty: "medium",
      tags: ["civil procedure", "trial motions"],
      aiResponse:
        "Option B is correct because a motion for a directed verdict argues that the evidence presented at trial is insufficient to support a verdict for the opposing party.",
    },
    {
      id: "cp-9",
      text: "Which of the following is an example of a post-trial motion?",
      options: [
        { id: "A", text: "Motion for summary judgment." },
        { id: "B", text: "Motion for a new trial." },
        { id: "C", text: "Motion to dismiss." },
        { id: "D", text: "Motion for a directed verdict." },
        { id: "E", text: "Motion to compel discovery." },
      ],
      correctAnswer: "B",
      explanation:
        "A motion for a new trial is a post-trial motion that asks the court to set aside the verdict and hold a new trial.",
      difficulty: "medium",
      tags: ["civil procedure", "post-trial motions"],
      aiResponse:
        "Option B is correct because a motion for a new trial is a post-trial motion that seeks to overturn the verdict and hold a new trial.",
    },
    {
      id: "cp-10",
      text: "What is the purpose of a motion to compel discovery?",
      options: [
        { id: "A", text: "To request a jury trial." },
        { id: "B", text: "To challenge the legal sufficiency of the complaint." },
        { id: "C", text: "To force the opposing party to provide requested discovery materials." },
        { id: "D", text: "To settle the case out of court." },
        { id: "E", text: "To dismiss the case before trial." },
      ],
      correctAnswer: "C",
      explanation:
        "A motion to compel discovery is used to force the opposing party to provide requested discovery materials.",
      difficulty: "medium",
      tags: ["civil procedure", "discovery"],
      aiResponse:
        "Option C is correct because a motion to compel discovery seeks to enforce the production of requested discovery materials.",
    },
    {
      id: "cp-11",
      text: "Which of the following is a requirement for venue in a civil case?",
      options: [
        { id: "A", text: "The defendant must be a resident of the state." },
        { id: "B", text: "The case must involve a federal question." },
        { id: "C", text: "The court must have personal jurisdiction over the defendant." },
        { id: "D", text: "The case must be filed in a location where the events occurred or where the defendant resides." },
        { id: "E", text: "The plaintiff must be a government entity." },
      ],
      correctAnswer: "D",
      explanation:
        "Venue is proper in a location where the events giving rise to the case occurred or where the defendant resides.",
      difficulty: "medium",
      tags: ["civil procedure", "venue"],
      aiResponse:
        "Option D is correct because venue is determined by where the events occurred or where the defendant resides.",
    },
    {
      id: "cp-12",
      text: "What is the purpose of a motion for judgment notwithstanding the verdict (JNOV)?",
      options: [
        { id: "A", text: "To request a jury trial." },
        { id: "B", text: "To challenge the legal sufficiency of the evidence presented at trial." },
        { id: "C", text: "To settle the case out of court." },
        { id: "D", text: "To request additional discovery." },
        { id: "E", text: "To dismiss the case before trial." },
      ],
      correctAnswer: "B",
      explanation:
        "A motion for JNOV challenges the sufficiency of the evidence presented at trial and asks the court to overturn the jury's verdict.",
      difficulty: "medium",
      tags: ["civil procedure", "post-trial motions"],
      aiResponse:
        "Option B is correct because a motion for JNOV argues that the evidence presented at trial was insufficient to support the jury's verdict.",
    },
    {
      id: "cp-13",
      text: "Which of the following is an example of a discovery tool?",
      options: [
        { id: "A", text: "Motion to dismiss." },
        { id: "B", text: "Interrogatories." },
        { id: "C", text: "Motion for summary judgment." },
        { id: "D", text: "Motion for a directed verdict." },
        { id: "E", text: "Motion for a new trial." },
      ],
      correctAnswer: "B",
      explanation:
        "Interrogatories are written questions used in discovery to obtain information from the opposing party.",
      difficulty: "easy",
      tags: ["civil procedure", "discovery"],
      aiResponse:
        "Option B is correct because interrogatories are a discovery tool used to obtain information from the opposing party.",
    },
    {
      id: "cp-14",
      text: "What is the purpose of a motion for a change of venue?",
      options: [
        { id: "A", text: "To request a jury trial." },
        { id: "B", text: "To challenge the legal sufficiency of the complaint." },
        { id: "C", text: "To move the case to a different court location." },
        { id: "D", text: "To settle the case out of court." },
        { id: "E", text: "To dismiss the case before trial." },
      ],
      correctAnswer: "C",
      explanation:
        "A motion for a change of venue seeks to move the case to a different court location, often due to concerns about fairness or convenience.",
      difficulty: "medium",
      tags: ["civil procedure", "venue"],
      aiResponse:
        "Option C is correct because a motion for a change of venue requests that the case be moved to a different court location.",
    },
    {
      id: "cp-15",
      text: "Which of the following is a requirement for a valid service of process?",
      options: [
        { id: "A", text: "The defendant must consent to jurisdiction." },
        { id: "B", text: "The plaintiff must be a resident of the state." },
        { id: "C", text: "The defendant must be personally served with the complaint and summons." },
        { id: "D", text: "The case must involve a federal question." },
        { id: "E", text: "The defendant must have minimum contacts with the forum state." },
      ],
      correctAnswer: "C",
      explanation:
        "Service of process requires that the defendant be personally served with the complaint and summons to provide notice of the lawsuit.",
      difficulty: "medium",
      tags: ["civil procedure", "service of process"],
      aiResponse:
        "Option C is correct because service of process requires that the defendant be personally served with the complaint and summons.",
    },
  ];

  const evidenceQuestions: Question[] = [
    {
      id: "ev-1",
      text: "Which of the following statements about hearsay is TRUE?",
      options: [
        { id: "A", text: "Hearsay is always inadmissible in court." },
        { id: "B", text: "Hearsay is an out-of-court statement offered for its truth." },
        { id: "C", text: "Hearsay includes statements made by a party-opponent." },
        { id: "D", text: "Hearsay is admissible if it is made under oath." },
        { id: "E", text: "Hearsay applies only in criminal cases." },
      ],
      correctAnswer: "B",
      explanation: "Hearsay is defined as an out-of-court statement offered to prove the truth of the matter asserted.",
      difficulty: "easy",
      tags: ["evidence", "hearsay"],
      aiResponse: "Option B is correct because the legal definition of hearsay is an out-of-court statement introduced to prove the truth of the assertion made.",
    },
    {
      id: "ev-2",
      text: "Which of the following is an exception to the hearsay rule?",
      options: [
        { id: "A", text: "Business records." },
        { id: "B", text: "Statements made under duress." },
        { id: "C", text: "Opinion testimony." },
        { id: "D", text: "Character evidence." },
        { id: "E", text: "Prior convictions." },
      ],
      correctAnswer: "A",
      explanation: "Business records are an exception to the hearsay rule if they are kept in the regular course of business.",
      difficulty: "medium",
      tags: ["evidence", "hearsay exceptions"],
      aiResponse: "Option A is correct because business records are admissible as an exception to the hearsay rule if they meet certain requirements.",
    },
    {
      id: "ev-3",
      text: "What is the purpose of the best evidence rule?",
      options: [
        { id: "A", text: "To exclude hearsay evidence." },
        { id: "B", text: "To require the original document to prove its contents." },
        { id: "C", text: "To allow opinion testimony." },
        { id: "D", text: "To exclude character evidence." },
        { id: "E", text: "To allow prior convictions as evidence." },
      ],
      correctAnswer: "B",
      explanation: "The best evidence rule requires the original document to prove its contents.",
      difficulty: "medium",
      tags: ["evidence", "best evidence rule"],
      aiResponse: "Option B is correct because the best evidence rule requires the original document to prove its contents.",
    },
    {
      id: "ev-4",
      text: "Which of the following is an example of character evidence?",
      options: [
        { id: "A", text: "A witness's testimony about the defendant's reputation." },
        { id: "B", text: "A business record." },
        { id: "C", text: "A prior conviction." },
        { id: "D", text: "An expert opinion." },
        { id: "E", text: "A hearsay statement." },
      ],
      correctAnswer: "A",
      explanation: "Character evidence refers to evidence of a person's character or reputation.",
      difficulty: "medium",
      tags: ["evidence", "character evidence"],
      aiResponse: "Option A is correct because character evidence includes testimony about a person's reputation.",
    },
    {
      id: "ev-5",
      text: "What is the purpose of the exclusionary rule in evidence law?",
      options: [
        { id: "A", text: "To exclude evidence obtained illegally." },
        { id: "B", text: "To exclude hearsay evidence." },
        { id: "C", text: "To exclude opinion testimony." },
        { id: "D", text: "To exclude character evidence." },
        { id: "E", text: "To exclude prior convictions." },
      ],
      correctAnswer: "A",
      explanation: "The exclusionary rule prevents evidence obtained in violation of a defendant's constitutional rights from being used in court.",
      difficulty: "medium",
      tags: ["evidence", "exclusionary rule"],
      aiResponse: "Option A is correct because the exclusionary rule excludes evidence obtained illegally.",
    },
    {
      id: "ev-6",
      text: "Which of the following is NOT a requirement for evidence to be admissible?",
      options: [
        { id: "A", text: "Relevance." },
        { id: "B", text: "Materiality." },
        { id: "C", text: "Competence." },
        { id: "D", text: "Prejudice." },
        { id: "E", text: "Reliability." },
      ],
      correctAnswer: "D",
      explanation: "Evidence must be relevant, material, competent, and reliable, but it does not need to be prejudicial.",
      difficulty: "medium",
      tags: ["evidence", "admissibility"],
      aiResponse: "Option D is correct because evidence does not need to be prejudicial to be admissible.",
    },
    {
      id: "ev-7",
      text: "What is the primary purpose of the chain of custody in evidence handling?",
      options: [
        { id: "A", text: "To ensure the evidence is relevant." },
        { id: "B", text: "To document the evidence's handling and prevent tampering." },
        { id: "C", text: "To establish the credibility of witnesses." },
        { id: "D", text: "To determine the materiality of the evidence." },
        { id: "E", text: "To exclude hearsay evidence." },
      ],
      correctAnswer: "B",
      explanation: "The chain of custody ensures that evidence is properly documented and handled to prevent tampering or contamination.",
      difficulty: "medium",
      tags: ["evidence", "chain of custody"],
      aiResponse: "Option B is correct because the chain of custody documents the handling of evidence to ensure its integrity.",
    },
    {
      id: "ev-8",
      text: "Which of the following is an example of demonstrative evidence?",
      options: [
        { id: "A", text: "A witness's testimony." },
        { id: "B", text: "A photograph of the crime scene." },
        { id: "C", text: "A business record." },
        { id: "D", text: "A prior conviction." },
        { id: "E", text: "A hearsay statement." },
      ],
      correctAnswer: "B",
      explanation: "Demonstrative evidence includes visual aids like photographs, diagrams, or models that help illustrate facts.",
      difficulty: "easy",
      tags: ["evidence", "demonstrative evidence"],
      aiResponse: "Option B is correct because photographs are a common form of demonstrative evidence.",
    },
    {
      id: "ev-9",
      text: "What is the role of a subpoena in evidence collection?",
      options: [
        { id: "A", text: "To exclude evidence obtained illegally." },
        { id: "B", text: "To compel a witness to testify or produce documents." },
        { id: "C", text: "To establish the chain of custody." },
        { id: "D", text: "To authenticate evidence." },
        { id: "E", text: "To determine the relevance of evidence." },
      ],
      correctAnswer: "B",
      explanation: "A subpoena is a legal order requiring a person to testify or produce documents.",
      difficulty: "medium",
      tags: ["evidence", "subpoena"],
      aiResponse: "Option B is correct because a subpoena compels a witness to testify or produce evidence.",
    },
    {
      id: "ev-10",
      text: "Which of the following is an example of circumstantial evidence?",
      options: [
        { id: "A", text: "A witness's direct testimony about seeing the crime." },
        { id: "B", text: "A fingerprint found at the crime scene." },
        { id: "C", text: "A confession by the defendant." },
        { id: "D", text: "A video recording of the crime." },
        { id: "E", text: "A business record." },
      ],
      correctAnswer: "B",
      explanation: "Circumstantial evidence indirectly proves a fact, such as a fingerprint suggesting the defendant was present.",
      difficulty: "medium",
      tags: ["evidence", "circumstantial evidence"],
      aiResponse: "Option B is correct because a fingerprint is circumstantial evidence that indirectly proves a fact.",
    },
    {
      id: "ev-11",
      text: "What is the purpose of the parol evidence rule?",
      options: [
        { id: "A", text: "To exclude hearsay evidence." },
        { id: "B", text: "To prevent oral modifications of written contracts." },
        { id: "C", text: "To authenticate evidence." },
        { id: "D", text: "To establish the chain of custody." },
        { id: "E", text: "To determine the relevance of evidence." },
      ],
      correctAnswer: "B",
      explanation: "The parol evidence rule prevents parties from using oral statements to contradict or modify the terms of a written contract.",
      difficulty: "medium",
      tags: ["evidence", "parol evidence rule"],
      aiResponse: "Option B is correct because the parol evidence rule limits the use of oral evidence to alter written contracts.",
    },
    {
      id: "ev-12",
      text: "Which of the following is an example of privileged communication?",
      options: [
        { id: "A", text: "A conversation between a lawyer and their client." },
        { id: "B", text: "A statement made in a public forum." },
        { id: "C", text: "A business record." },
        { id: "D", text: "A prior conviction." },
        { id: "E", text: "A hearsay statement." },
      ],
      correctAnswer: "A",
      explanation: "Privileged communication includes confidential conversations, such as those between a lawyer and client.",
      difficulty: "medium",
      tags: ["evidence", "privileged communication"],
      aiResponse: "Option A is correct because lawyer-client communications are protected by privilege.",
    },
    {
      id: "ev-13",
      text: "What is the purpose of the Frye standard in evidence law?",
      options: [
        { id: "A", text: "To determine the relevance of evidence." },
        { id: "B", text: "To assess the admissibility of scientific evidence." },
        { id: "C", text: "To authenticate evidence." },
        { id: "D", text: "To establish the chain of custody." },
        { id: "E", text: "To exclude hearsay evidence." },
      ],
      correctAnswer: "B",
      explanation: "The Frye standard evaluates whether scientific evidence is generally accepted in the relevant scientific community.",
      difficulty: "hard",
      tags: ["evidence", "Frye standard"],
      aiResponse: "Option B is correct because the Frye standard assesses the admissibility of scientific evidence.",
    },
    {
      id: "ev-14",
      text: "Which of the following is an example of real evidence?",
      options: [
        { id: "A", text: "A witness's testimony." },
        { id: "B", text: "A photograph of the crime scene." },
        { id: "C", text: "The murder weapon." },
        { id: "D", text: "A business record." },
        { id: "E", text: "A hearsay statement." },
      ],
      correctAnswer: "C",
      explanation: "Real evidence includes physical objects, such as the murder weapon, that are directly related to the case.",
      difficulty: "medium",
      tags: ["evidence", "real evidence"],
      aiResponse: "Option C is correct because the murder weapon is a physical object and thus real evidence.",
    },
    {
      id: "ev-15",
      text: "What is the purpose of the Daubert standard in evidence law?",
      options: [
        { id: "A", text: "To determine the relevance of evidence." },
        { id: "B", text: "To assess the reliability and relevance of expert testimony." },
        { id: "C", text: "To authenticate evidence." },
        { id: "D", text: "To establish the chain of custody." },
        { id: "E", text: "To exclude hearsay evidence." },
      ],
      correctAnswer: "B",
      explanation: "The Daubert standard evaluates the reliability and relevance of expert testimony before it is admitted into evidence.",
      difficulty: "hard",
      tags: ["evidence", "Daubert standard"],
      aiResponse: "Option B is correct because the Daubert standard assesses the reliability and relevance of expert testimony.",
    },
  ];

  const realPropertyQuestions: Question[] = [
    {
      id: "rp-1",
      text: "Which of the following is a characteristic of a fee simple estate?",
      options: [
        { id: "A", text: "It has a limited duration." },
        { id: "B", text: "It is subject to conditions imposed by the original grantor." },
        { id: "C", text: "It grants the holder the maximum ownership rights allowed by law." },
        { id: "D", text: "It automatically reverts to the state upon the owner's death." },
        { id: "E", text: "It must be renewed every 99 years." },
      ],
      correctAnswer: "C",
      explanation: "A fee simple estate is the highest form of land ownership and grants the holder the maximum rights allowed under the law.",
      difficulty: "medium",
      tags: ["real property", "ownership"],
      aiResponse: "Option C is correct because a fee simple estate represents absolute ownership of property with the right to use, transfer, or bequeath it without restrictions.",
    },
    {
      id: "rp-2",
      text: "What is the purpose of a deed in real property law?",
      options: [
        { id: "A", text: "To establish a lease agreement." },
        { id: "B", text: "To transfer ownership of real property." },
        { id: "C", text: "To establish an easement." },
        { id: "D", text: "To create a mortgage." },
        { id: "E", text: "To establish a lien on the property." },
      ],
      correctAnswer: "B",
      explanation: "A deed is used to transfer ownership of real property from one party to another.",
      difficulty: "easy",
      tags: ["real property", "deeds"],
      aiResponse: "Option B is correct because a deed is a legal document used to transfer ownership of real property.",
    },
    {
      id: "rp-3",
      text: "Which of the following is an example of an easement?",
      options: [
        { id: "A", text: "A right to use a neighbor's driveway." },
        { id: "B", text: "A lease agreement for a commercial property." },
        { id: "C", text: "A mortgage on a residential property." },
        { id: "D", text: "A lien on a property for unpaid taxes." },
        { id: "E", text: "A deed transferring ownership of a property." },
      ],
      correctAnswer: "A",
      explanation: "An easement is a right to use another person's land for a specific purpose, such as a driveway.",
      difficulty: "medium",
      tags: ["real property", "easements"],
      aiResponse: "Option A is correct because an easement grants the right to use another person's land for a specific purpose.",
    },
    {
      id: "rp-4",
      text: "What is the purpose of a title search in real property transactions?",
      options: [
        { id: "A", text: "To determine the market value of the property." },
        { id: "B", text: "To identify any liens or encumbrances on the property." },
        { id: "C", text: "To establish the boundaries of the property." },
        { id: "D", text: "To create a mortgage agreement." },
        { id: "E", text: "To establish an easement." },
      ],
      correctAnswer: "B",
      explanation: "A title search is conducted to identify any liens, encumbrances, or other issues with the property's title.",
      difficulty: "medium",
      tags: ["real property", "title search"],
      aiResponse: "Option B is correct because a title search is used to identify any liens or encumbrances on the property.",
    },
    {
      id: "rp-5",
      text: "Which of the following is an example of a freehold estate?",
      options: [
        { id: "A", text: "A leasehold estate." },
        { id: "B", text: "A fee simple estate." },
        { id: "C", text: "A tenancy at will." },
        { id: "D", text: "A tenancy for years." },
        { id: "E", text: "A periodic tenancy." },
      ],
      correctAnswer: "B",
      explanation: "A fee simple estate is an example of a freehold estate, which grants the holder ownership of the property.",
      difficulty: "medium",
      tags: ["real property", "freehold estates"],
      aiResponse: "Option B is correct because a fee simple estate is a type of freehold estate that grants full ownership rights.",
    },
    {
      id: "rp-6",
      text: "What is the primary purpose of a mortgage in real property law?",
      options: [
        { id: "A", text: "To transfer ownership of the property." },
        { id: "B", text: "To secure a loan with the property as collateral." },
        { id: "C", text: "To establish an easement." },
        { id: "D", text: "To create a lease agreement." },
        { id: "E", text: "To establish a lien on the property." },
      ],
      correctAnswer: "B",
      explanation: "A mortgage is used to secure a loan by using the property as collateral.",
      difficulty: "medium",
      tags: ["real property", "mortgages"],
      aiResponse: "Option B is correct because a mortgage secures a loan with the property as collateral.",
    },
    {
      id: "rp-7",
      text: "Which of the following is an example of a leasehold estate?",
      options: [
        { id: "A", text: "A fee simple estate." },
        { id: "B", text: "A tenancy for years." },
        { id: "C", text: "A life estate." },
        { id: "D", text: "A fee tail estate." },
        { id: "E", text: "A freehold estate." },
      ],
      correctAnswer: "B",
      explanation: "A tenancy for years is a type of leasehold estate with a fixed duration.",
      difficulty: "medium",
      tags: ["real property", "leasehold estates"],
      aiResponse: "Option B is correct because a tenancy for years is a leasehold estate with a specific term.",
    },
    {
      id: "rp-8",
      text: "What is the purpose of a quitclaim deed?",
      options: [
        { id: "A", text: "To transfer ownership with warranties of title." },
        { id: "B", text: "To transfer ownership without warranties of title." },
        { id: "C", text: "To establish an easement." },
        { id: "D", text: "To create a mortgage." },
        { id: "E", text: "To establish a lien on the property." },
      ],
      correctAnswer: "B",
      explanation: "A quitclaim deed transfers ownership without any warranties of title.",
      difficulty: "medium",
      tags: ["real property", "quitclaim deeds"],
      aiResponse: "Option B is correct because a quitclaim deed transfers ownership without warranties.",
    },
    {
      id: "rp-9",
      text: "Which of the following is an example of a covenant in real property law?",
      options: [
        { id: "A", text: "A promise to maintain a fence on the property." },
        { id: "B", text: "A right to use a neighbor's driveway." },
        { id: "C", text: "A mortgage agreement." },
        { id: "D", text: "A lease agreement." },
        { id: "E", text: "A lien on the property." },
      ],
      correctAnswer: "A",
      explanation: "A covenant is a promise or agreement related to the use of the property, such as maintaining a fence.",
      difficulty: "medium",
      tags: ["real property", "covenants"],
      aiResponse: "Option A is correct because a covenant involves a promise related to the property.",
    },
    {
      id: "rp-10",
      text: "What is the purpose of a zoning ordinance in real property law?",
      options: [
        { id: "A", text: "To regulate the use of land within a jurisdiction." },
        { id: "B", text: "To establish property boundaries." },
        { id: "C", text: "To create easements." },
        { id: "D", text: "To transfer ownership of property." },
        { id: "E", text: "To establish liens on property." },
      ],
      correctAnswer: "A",
      explanation: "Zoning ordinances regulate how land can be used within a specific area.",
      difficulty: "medium",
      tags: ["real property", "zoning"],
      aiResponse: "Option A is correct because zoning ordinances regulate land use.",
    },
    {
      id: "rp-11",
      text: "Which of the following is an example of a life estate?",
      options: [
        { id: "A", text: "A tenancy for years." },
        { id: "B", text: "A fee simple estate." },
        { id: "C", text: "An estate that lasts for the lifetime of a person." },
        { id: "D", text: "A leasehold estate." },
        { id: "E", text: "A periodic tenancy." },
      ],
      correctAnswer: "C",
      explanation: "A life estate lasts for the lifetime of a specific person.",
      difficulty: "medium",
      tags: ["real property", "life estates"],
      aiResponse: "Option C is correct because a life estate is tied to the lifetime of a person.",
    },
    {
      id: "rp-12",
      text: "What is the purpose of a warranty deed?",
      options: [
        { id: "A", text: "To transfer ownership without warranties of title." },
        { id: "B", text: "To transfer ownership with warranties of title." },
        { id: "C", text: "To establish an easement." },
        { id: "D", text: "To create a mortgage." },
        { id: "E", text: "To establish a lien on the property." },
      ],
      correctAnswer: "B",
      explanation: "A warranty deed transfers ownership with guarantees about the title.",
      difficulty: "medium",
      tags: ["real property", "warranty deeds"],
      aiResponse: "Option B is correct because a warranty deed includes warranties of title.",
    },
    {
      id: "rp-13",
      text: "Which of the following is an example of a lien on real property?",
      options: [
        { id: "A", text: "A mortgage." },
        { id: "B", text: "An easement." },
        { id: "C", text: "A lease agreement." },
        { id: "D", text: "A deed." },
        { id: "E", text: "A covenant." },
      ],
      correctAnswer: "A",
      explanation: "A mortgage is a type of lien that secures a loan with the property.",
      difficulty: "medium",
      tags: ["real property", "liens"],
      aiResponse: "Option A is correct because a mortgage is a lien on the property.",
    },
    {
      id: "rp-14",
      text: "What is the purpose of adverse possession in real property law?",
      options: [
        { id: "A", text: "To transfer ownership through continuous and open use of the property." },
        { id: "B", text: "To establish an easement." },
        { id: "C", text: "To create a mortgage." },
        { id: "D", text: "To establish a lien on the property." },
        { id: "E", text: "To transfer ownership through a deed." },
      ],
      correctAnswer: "A",
      explanation: "Adverse possession allows a person to gain ownership of property through continuous and open use over a period of time.",
      difficulty: "hard",
      tags: ["real property", "adverse possession"],
      aiResponse: "Option A is correct because adverse possession transfers ownership through continuous use.",
    },
    {
      id: "rp-15",
      text: "Which of the following is an example of a defeasible estate?",
      options: [
        { id: "A", text: "A fee simple absolute." },
        { id: "B", text: "A fee simple determinable." },
        { id: "C", text: "A leasehold estate." },
        { id: "D", text: "A periodic tenancy." },
        { id: "E", text: "A tenancy at will." },
      ],
      correctAnswer: "B",
      explanation: "A fee simple determinable is a type of defeasible estate that can end upon the occurrence of a specific event.",
      difficulty: "hard",
      tags: ["real property", "defeasible estates"],
      aiResponse: "Option B is correct because a fee simple determinable is a defeasible estate.",
    },
  ];

  const tortsQuestions: Question[] = [
    {
      id: "to-1",
      text: "Which of the following is an example of a strict liability tort?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A business owner failing to warn customers of a wet floor." },
        { id: "C", text: "A manufacturer selling a defective product that injures a customer." },
        { id: "D", text: "A person accidentally hitting another with a golf ball at a driving range." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "C",
      explanation: "Strict liability applies in cases where a party is held responsible for damages regardless of intent or negligence, such as product liability.",
      difficulty: "medium",
      tags: ["torts", "strict liability"],
      aiResponse: "Option C is correct because strict liability applies when a manufacturer produces a defective product that causes harm, regardless of fault.",
    },
    {
      id: "to-2",
      text: "What is the primary purpose of compensatory damages in tort law?",
      options: [
        { id: "A", text: "To punish the defendant." },
        { id: "B", text: "To compensate the plaintiff for their losses." },
        { id: "C", text: "To deter future wrongdoing." },
        { id: "D", text: "To establish liability." },
        { id: "E", text: "To set a legal precedent." },
      ],
      correctAnswer: "B",
      explanation: "Compensatory damages are intended to compensate the plaintiff for their losses.",
      difficulty: "easy",
      tags: ["torts", "damages"],
      aiResponse: "Option B is correct because compensatory damages are designed to compensate the plaintiff for their losses.",
    },
    {
      id: "to-3",
      text: "Which of the following is an example of negligence?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A manufacturer selling a defective product." },
        { id: "C", text: "A person intentionally hitting another." },
        { id: "D", text: "A newspaper publishing false statements about a public official." },
        { id: "E", text: "A business owner failing to warn customers of a wet floor." },
      ],
      correctAnswer: "A",
      explanation: "Negligence occurs when a person fails to exercise reasonable care, resulting in harm to another.",
      difficulty: "medium",
      tags: ["torts", "negligence"],
      aiResponse: "Option A is correct because running a red light is an example of failing to exercise reasonable care, which constitutes negligence.",
    },
    {
      id: "to-4",
      text: "What is the purpose of punitive damages in tort law?",
      options: [
        { id: "A", text: "To compensate the plaintiff for their losses." },
        { id: "B", text: "To punish the defendant and deter future wrongdoing." },
        { id: "C", text: "To establish liability." },
        { id: "D", text: "To set a legal precedent." },
        { id: "E", text: "To cover the plaintiff's legal fees." },
      ],
      correctAnswer: "B",
      explanation: "Punitive damages are intended to punish the defendant and deter future wrongdoing.",
      difficulty: "medium",
      tags: ["torts", "damages"],
      aiResponse: "Option B is correct because punitive damages are designed to punish the defendant and deter future misconduct.",
    },
    {
      id: "to-5",
      text: "Which of the following is an example of an intentional tort?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A manufacturer selling a defective product." },
        { id: "C", text: "A person intentionally hitting another." },
        { id: "D", text: "A business owner failing to warn customers of a wet floor." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "C",
      explanation: "An intentional tort involves intentional harm, such as battery.",
      difficulty: "medium",
      tags: ["torts", "intentional torts"],
      aiResponse: "Option C is correct because intentionally hitting another person is an example of an intentional tort.",
    },
    {
      id: "to-6",
      text: "Which of the following is an example of a tort involving defamation?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A newspaper publishing false statements about a public official." },
        { id: "C", text: "A manufacturer selling a defective product." },
        { id: "D", text: "A business owner failing to warn customers of a wet floor." },
        { id: "E", text: "A person intentionally hitting another." },
      ],
      correctAnswer: "B",
      explanation: "Defamation involves making false statements that harm someone's reputation.",
      difficulty: "medium",
      tags: ["torts", "defamation"],
      aiResponse: "Option B is correct because publishing false statements about someone is an example of defamation.",
    },
    {
      id: "to-7",
      text: "What is the primary purpose of the tort of nuisance?",
      options: [
        { id: "A", text: "To compensate for physical injuries." },
        { id: "B", text: "To address interference with the use and enjoyment of property." },
        { id: "C", text: "To punish intentional wrongdoing." },
        { id: "D", text: "To deter future negligence." },
        { id: "E", text: "To establish liability for defective products." },
      ],
      correctAnswer: "B",
      explanation: "The tort of nuisance addresses interference with the use and enjoyment of property.",
      difficulty: "medium",
      tags: ["torts", "nuisance"],
      aiResponse: "Option B is correct because nuisance law deals with interference with property rights.",
    },
    {
      id: "to-8",
      text: "Which of the following is an example of vicarious liability?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "An employer being held liable for the actions of an employee." },
        { id: "C", text: "A manufacturer selling a defective product." },
        { id: "D", text: "A person intentionally hitting another." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "B",
      explanation: "Vicarious liability holds one party responsible for the actions of another, such as an employer for an employee.",
      difficulty: "medium",
      tags: ["torts", "vicarious liability"],
      aiResponse: "Option B is correct because vicarious liability applies when an employer is held liable for an employee's actions.",
    },
    {
      id: "to-9",
      text: "What is the primary purpose of the tort of trespass to land?",
      options: [
        { id: "A", text: "To compensate for physical injuries." },
        { id: "B", text: "To address unauthorized entry onto another's property." },
        { id: "C", text: "To punish intentional wrongdoing." },
        { id: "D", text: "To deter future negligence." },
        { id: "E", text: "To establish liability for defective products." },
      ],
      correctAnswer: "B",
      explanation: "Trespass to land involves unauthorized entry onto another person's property.",
      difficulty: "medium",
      tags: ["torts", "trespass"],
      aiResponse: "Option B is correct because trespass to land addresses unauthorized entry onto property.",
    },
    {
      id: "to-10",
      text: "Which of the following is an example of a tort involving false imprisonment?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A store detaining a customer without justification." },
        { id: "C", text: "A manufacturer selling a defective product." },
        { id: "D", text: "A business owner failing to warn customers of a wet floor." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "B",
      explanation: "False imprisonment involves unlawfully restraining someone against their will.",
      difficulty: "medium",
      tags: ["torts", "false imprisonment"],
      aiResponse: "Option B is correct because detaining someone without justification is an example of false imprisonment.",
    },
    {
      id: "to-11",
      text: "What is the primary purpose of the tort of assault?",
      options: [
        { id: "A", text: "To compensate for physical injuries." },
        { id: "B", text: "To address the threat of imminent harm." },
        { id: "C", text: "To punish intentional wrongdoing." },
        { id: "D", text: "To deter future negligence." },
        { id: "E", text: "To establish liability for defective products." },
      ],
      correctAnswer: "B",
      explanation: "Assault involves the threat of imminent harm, causing reasonable apprehension of harm.",
      difficulty: "medium",
      tags: ["torts", "assault"],
      aiResponse: "Option B is correct because assault addresses the threat of imminent harm.",
    },
    {
      id: "to-12",
      text: "Which of the following is an example of a tort involving battery?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A person intentionally hitting another." },
        { id: "C", text: "A manufacturer selling a defective product." },
        { id: "D", text: "A business owner failing to warn customers of a wet floor." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "B",
      explanation: "Battery involves intentional harmful or offensive contact with another person.",
      difficulty: "medium",
      tags: ["torts", "battery"],
      aiResponse: "Option B is correct because intentionally hitting another person is an example of battery.",
    },
    {
      id: "to-13",
      text: "What is the primary purpose of the tort of conversion?",
      options: [
        { id: "A", text: "To compensate for physical injuries." },
        { id: "B", text: "To address the wrongful taking or use of another's property." },
        { id: "C", text: "To punish intentional wrongdoing." },
        { id: "D", text: "To deter future negligence." },
        { id: "E", text: "To establish liability for defective products." },
      ],
      correctAnswer: "B",
      explanation: "Conversion involves the wrongful taking or use of another person's property.",
      difficulty: "medium",
      tags: ["torts", "conversion"],
      aiResponse: "Option B is correct because conversion addresses the wrongful use of another's property.",
    },
    {
      id: "to-14",
      text: "Which of the following is an example of a tort involving intentional infliction of emotional distress?",
      options: [
        { id: "A", text: "A driver running a red light and causing an accident." },
        { id: "B", text: "A person engaging in extreme and outrageous conduct causing severe emotional distress." },
        { id: "C", text: "A manufacturer selling a defective product." },
        { id: "D", text: "A business owner failing to warn customers of a wet floor." },
        { id: "E", text: "A newspaper publishing false statements about a public official." },
      ],
      correctAnswer: "B",
      explanation: "Intentional infliction of emotional distress involves extreme and outrageous conduct causing severe emotional harm.",
      difficulty: "medium",
      tags: ["torts", "emotional distress"],
      aiResponse: "Option B is correct because extreme and outrageous conduct causing emotional distress is the basis for this tort.",
    },
    {
      id: "to-15",
      text: "What is the primary purpose of the tort of negligence per se?",
      options: [
        { id: "A", text: "To compensate for physical injuries." },
        { id: "B", text: "To establish liability when a defendant violates a statute designed to protect the plaintiff." },
        { id: "C", text: "To punish intentional wrongdoing." },
        { id: "D", text: "To deter future negligence." },
        { id: "E", text: "To establish liability for defective products." },
      ],
      correctAnswer: "B",
      explanation: "Negligence per se applies when a defendant violates a statute designed to protect the plaintiff, establishing liability.",
      difficulty: "hard",
      tags: ["torts", "negligence per se"],
      aiResponse: "Option B is correct because negligence per se establishes liability when a statute is violated.",
    },
  ];

  // Combine all questions for the mixed section
  if (subject === "mixed") {
    const allQuestions = [
      ...constitutionalLawQuestions,
      ...contractsQuestions,
      ...criminalLawQuestions,
      ...civilProcedureQuestions,
      ...evidenceQuestions,
      ...realPropertyQuestions,
      ...tortsQuestions,
    ];

    // Shuffle the questions for a mixed session
    return shuffleArray(allQuestions);
  }

  // Return questions for specific subjects
  switch (subject) {
    case "Constitutional Law":
      return constitutionalLawQuestions;
    case "Contracts":
      return contractsQuestions;
    case "Criminal Law & Procedure":
      return criminalLawQuestions;
    case "Civil Procedure":
      return civilProcedureQuestions;
    case "Evidence":
      return evidenceQuestions;
    case "Real Property":
      return realPropertyQuestions;
    case "Torts":
      return tortsQuestions;
    default:
      return [];
  }
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}