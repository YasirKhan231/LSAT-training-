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
      explanation:
        "Hearsay is defined as an out-of-court statement offered to prove the truth of the matter asserted.",
      difficulty: "easy",
      tags: ["evidence", "hearsay"],
      aiResponse:
        "Option B is correct because the legal definition of hearsay is an out-of-court statement introduced to prove the truth of the assertion made.",
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
      explanation:
        "Business records are an exception to the hearsay rule if they are kept in the regular course of business.",
      difficulty: "medium",
      tags: ["evidence", "hearsay exceptions"],
      aiResponse:
        "Option A is correct because business records are admissible as an exception to the hearsay rule if they meet certain requirements.",
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
      explanation:
        "The best evidence rule requires the original document to prove its contents.",
      difficulty: "medium",
      tags: ["evidence", "best evidence rule"],
      aiResponse:
        "Option B is correct because the best evidence rule requires the original document to prove its contents.",
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
      explanation:
        "Character evidence refers to evidence of a person's character or reputation.",
      difficulty: "medium",
      tags: ["evidence", "character evidence"],
      aiResponse:
        "Option A is correct because character evidence includes testimony about a person's reputation.",
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
      explanation:
        "The exclusionary rule prevents evidence obtained in violation of a defendant's constitutional rights from being used in court.",
      difficulty: "medium",
      tags: ["evidence", "exclusionary rule"],
      aiResponse:
        "Option A is correct because the exclusionary rule excludes evidence obtained illegally.",
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
      explanation:
        "A fee simple estate is the highest form of land ownership and grants the holder the maximum rights allowed under the law.",
      difficulty: "medium",
      tags: ["real property", "ownership"],
      aiResponse:
        "Option C is correct because a fee simple estate represents absolute ownership of property with the right to use, transfer, or bequeath it without restrictions.",
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
      explanation:
        "A deed is used to transfer ownership of real property from one party to another.",
      difficulty: "easy",
      tags: ["real property", "deeds"],
      aiResponse:
        "Option B is correct because a deed is a legal document used to transfer ownership of real property.",
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
      explanation:
        "An easement is a right to use another person's land for a specific purpose, such as a driveway.",
      difficulty: "medium",
      tags: ["real property", "easements"],
      aiResponse:
        "Option A is correct because an easement grants the right to use another person's land for a specific purpose.",
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
      explanation:
        "A title search is conducted to identify any liens, encumbrances, or other issues with the property's title.",
      difficulty: "medium",
      tags: ["real property", "title search"],
      aiResponse:
        "Option B is correct because a title search is used to identify any liens or encumbrances on the property.",
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
      explanation:
        "A fee simple estate is an example of a freehold estate, which grants the holder ownership of the property.",
      difficulty: "medium",
      tags: ["real property", "freehold estates"],
      aiResponse:
        "Option B is correct because a fee simple estate is a type of freehold estate that grants full ownership rights.",
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
      explanation:
        "Strict liability applies in cases where a party is held responsible for damages regardless of intent or negligence, such as product liability.",
      difficulty: "medium",
      tags: ["torts", "strict liability"],
      aiResponse:
        "Option C is correct because strict liability applies when a manufacturer produces a defective product that causes harm, regardless of fault.",
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
      explanation:
        "Compensatory damages are intended to compensate the plaintiff for their losses.",
      difficulty: "easy",
      tags: ["torts", "damages"],
      aiResponse:
        "Option B is correct because compensatory damages are designed to compensate the plaintiff for their losses.",
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
      explanation:
        "Negligence occurs when a person fails to exercise reasonable care, resulting in harm to another.",
      difficulty: "medium",
      tags: ["torts", "negligence"],
      aiResponse:
        "Option A is correct because running a red light is an example of failing to exercise reasonable care, which constitutes negligence.",
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
      explanation:
        "Punitive damages are intended to punish the defendant and deter future wrongdoing.",
      difficulty: "medium",
      tags: ["torts", "damages"],
      aiResponse:
        "Option B is correct because punitive damages are designed to punish the defendant and deter future misconduct.",
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
      explanation:
        "An intentional tort involves intentional harm, such as battery.",
      difficulty: "medium",
      tags: ["torts", "intentional torts"],
      aiResponse:
        "Option C is correct because intentionally hitting another person is an example of an intentional tort.",
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