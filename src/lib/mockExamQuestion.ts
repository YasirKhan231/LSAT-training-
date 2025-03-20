
type Exam = {
  title: string;
  sections: Section[];
};
type Section = {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
};
type Question = {
  id: string;
  text: string;
  stimulus?: string;
  choices: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
};

export const mockExamData: Record<string, Exam> = {
  "constitutional-law": {
  title: "Constitutional Law",
  sections: [
    {
      id: "cl-1",
      title: "Constitutional Law I",
      duration: 30,
      questions: [
        {
          id: "cl-1-q1",
          text: "Which one of the following most accurately expresses the main point of the passage?",
          stimulus:
            "The notion that the state should have a role in providing education for children is a recent historical development...",
          choices: [
            {
              id: "A",
              text: "Public education emerged as a result of increasing social complexity.",
            },
            {
              id: "B",
              text: "State involvement in education is a relatively recent historical phenomenon.",
            },
            {
              id: "C",
              text: "Religious institutions were the primary providers of education throughout most of history.",
            },
            {
              id: "D",
              text: "Government control of curriculum development is controversial in modern educational systems.",
            },
            {
              id: "E",
              text: "Education has always been considered a fundamental right, but its providers have changed over time.",
            },
          ],
          correctAnswer: "B",
          explanation:
            "The passage's main point is that state involvement in education is a relatively recent historical development...",
        },
        {
          id: "cl-1-q2",
          text: "Which constitutional amendment guarantees freedom of speech?",
          choices: [
            { id: "A", text: "First Amendment" },
            { id: "B", text: "Second Amendment" },
            { id: "C", text: "Fourth Amendment" },
            { id: "D", text: "Fifth Amendment" },
            { id: "E", text: "Tenth Amendment" },
          ],
          correctAnswer: "A",
          explanation:
            "The First Amendment guarantees freedom of speech, religion, press, assembly, and petition.",
        },
        {
          id: "cl-1-q3",
          text: "What is the primary purpose of the Commerce Clause?",
          choices: [
            { id: "A", text: "To regulate interstate commerce" },
            { id: "B", text: "To protect individual rights" },
            { id: "C", text: "To establish federal courts" },
            { id: "D", text: "To define state powers" },
            { id: "E", text: "To limit executive authority" },
          ],
          correctAnswer: "A",
          explanation:
            "The Commerce Clause grants Congress the power to regulate commerce among the states.",
        },
        {
          id: "cl-1-q4",
          text: "What is the significance of Marbury v. Madison?",
          choices: [
            { id: "A", text: "It established judicial review" },
            { id: "B", text: "It expanded executive power" },
            { id: "C", text: "It limited state sovereignty" },
            { id: "D", text: "It defined the separation of powers" },
            { id: "E", text: "It abolished slavery" },
          ],
          correctAnswer: "A",
          explanation:
            "Marbury v. Madison established the principle of judicial review, allowing courts to strike down laws that violate the Constitution.",
        },
        {
          id: "cl-1-q5",
          text: "Which clause prevents states from discriminating against citizens of other states?",
          choices: [
            { id: "A", text: "Privileges and Immunities Clause" },
            { id: "B", text: "Due Process Clause" },
            { id: "C", text: "Equal Protection Clause" },
            { id: "D", text: "Supremacy Clause" },
            { id: "E", text: "Commerce Clause" },
          ],
          correctAnswer: "A",
          explanation:
            "The Privileges and Immunities Clause prevents states from discriminating against citizens of other states.",
        },
      ],
    },
    {
      id: "cl-2",
      title: "Constitutional Law II",
      duration: 30,
      questions: [
        {
          id: "cl-2-q1",
          text: "What is the primary purpose of the Equal Protection Clause?",
          choices: [
            { id: "A", text: "To ensure equal treatment under the law" },
            { id: "B", text: "To guarantee voting rights" },
            { id: "C", text: "To regulate interstate commerce" },
            { id: "D", text: "To protect against unreasonable searches" },
            { id: "E", text: "To establish due process" },
          ],
          correctAnswer: "A",
          explanation:
            "The Equal Protection Clause ensures that no state shall deny any person within its jurisdiction the equal protection of the laws.",
        },
        {
          id: "cl-2-q2",
          text: "What is the significance of the Supremacy Clause?",
          choices: [
            { id: "A", text: "It establishes federal law as the supreme law of the land" },
            { id: "B", text: "It limits federal power" },
            { id: "C", text: "It grants states exclusive authority" },
            { id: "D", text: "It defines executive powers" },
            { id: "E", text: "It protects individual rights" },
          ],
          correctAnswer: "A",
          explanation:
            "The Supremacy Clause establishes that federal law takes precedence over state laws.",
        },
        {
          id: "cl-2-q3",
          text: "What does the Due Process Clause guarantee?",
          choices: [
            { id: "A", text: "Fair treatment under the law" },
            { id: "B", text: "Freedom of speech" },
            { id: "C", text: "Right to bear arms" },
            { id: "D", text: "Protection against unreasonable searches" },
            { id: "E", text: "Right to a speedy trial" },
          ],
          correctAnswer: "A",
          explanation:
            "The Due Process Clause guarantees that no person shall be deprived of life, liberty, or property without fair legal procedures.",
        },
        {
          id: "cl-2-q4",
          text: "What is the significance of the Necessary and Proper Clause?",
          choices: [
            { id: "A", text: "It grants Congress implied powers" },
            { id: "B", text: "It limits federal authority" },
            { id: "C", text: "It defines state powers" },
            { id: "D", text: "It protects individual rights" },
            { id: "E", text: "It establishes judicial review" },
          ],
          correctAnswer: "A",
          explanation:
            "The Necessary and Proper Clause grants Congress the authority to pass laws necessary to carry out its enumerated powers.",
        },
        {
          id: "cl-2-q5",
          text: "What is the purpose of the Establishment Clause?",
          choices: [
            { id: "A", text: "To prevent government establishment of religion" },
            { id: "B", text: "To protect freedom of speech" },
            { id: "C", text: "To ensure equal protection under the law" },
            { id: "D", text: "To regulate interstate commerce" },
            { id: "E", text: "To define executive powers" },
          ],
          correctAnswer: "A",
          explanation:
            "The Establishment Clause prohibits the government from establishing an official religion or favoring one religion over another.",
        },
      ],
    },
  ],
},
contracts: {
  title: "Contracts",
  sections: [
    {
      id: "ct-1",
      title: "Contracts I",
      duration: 30,
      questions: [
        {
          id: "ct-1-q1",
          text: "What is required for a valid contract?",
          choices: [
            { id: "A", text: "Offer, acceptance, consideration" },
            { id: "B", text: "Written agreement" },
            { id: "C", text: "Notarization" },
            { id: "D", text: "Government approval" },
            { id: "E", text: "Witnesses" },
          ],
          correctAnswer: "A",
          explanation:
            "A valid contract requires an offer, acceptance, and consideration.",
        },
        {
          id: "ct-1-q2",
          text: "What is the Statute of Frauds?",
          choices: [
            { id: "A", text: "A law requiring certain contracts to be in writing" },
            { id: "B", text: "A law against fraudulent behavior" },
            { id: "C", text: "A law regulating consumer contracts" },
            { id: "D", text: "A law governing international trade" },
            { id: "E", text: "A law about bankruptcy" },
          ],
          correctAnswer: "A",
          explanation:
            "The Statute of Frauds requires certain types of contracts to be in writing to be enforceable.",
        },
        {
          id: "ct-1-q3",
          text: "What is the difference between a bilateral and a unilateral contract?",
          choices: [
            { id: "A", text: "A bilateral contract involves mutual promises, while a unilateral contract involves a promise in exchange for an act" },
            { id: "B", text: "A bilateral contract is written, while a unilateral contract is oral" },
            { id: "C", text: "A bilateral contract is enforceable, while a unilateral contract is not" },
            { id: "D", text: "A bilateral contract involves goods, while a unilateral contract involves services" },
            { id: "E", text: "A bilateral contract is governed by state law, while a unilateral contract is governed by federal law" },
          ],
          correctAnswer: "A",
          explanation:
            "A bilateral contract involves mutual promises, while a unilateral contract involves a promise in exchange for an act.",
        },
        {
          id: "ct-1-q4",
          text: "What is the parol evidence rule?",
          choices: [
            { id: "A", text: "A rule that prevents the introduction of extrinsic evidence to contradict a written contract" },
            { id: "B", text: "A rule that requires all contracts to be in writing" },
            { id: "C", text: "A rule that allows oral modifications to written contracts" },
            { id: "D", text: "A rule that governs the interpretation of ambiguous terms" },
            { id: "E", text: "A rule that requires witnesses for all contracts" },
          ],
          correctAnswer: "A",
          explanation:
            "The parol evidence rule prevents the introduction of extrinsic evidence to contradict a written contract.",
        },
        {
          id: "ct-1-q5",
          text: "What is the effect of a voidable contract?",
          choices: [
            { id: "A", text: "It is enforceable unless the party with the power to void chooses to do so" },
            { id: "B", text: "It is automatically unenforceable" },
            { id: "C", text: "It is enforceable only if both parties agree" },
            { id: "D", text: "It is enforceable only in court" },
            { id: "E", text: "It is enforceable only if it is in writing" },
          ],
          correctAnswer: "A",
          explanation:
            "A voidable contract is enforceable unless the party with the power to void chooses to do so.",
        },
      ],
    },
    {
      id: "ct-2",
      title: "Contracts II",
      duration: 30,
      questions: [
        {
          id: "ct-2-q1",
          text: "What is the effect of a material breach of contract?",
          choices: [
            { id: "A", text: "The non-breaching party is excused from performance" },
            { id: "B", text: "The contract is automatically terminated" },
            { id: "C", text: "The breaching party must pay punitive damages" },
            { id: "D", text: "The contract is void ab initio" },
            { id: "E", text: "The breaching party can sue for specific performance" },
          ],
          correctAnswer: "A",
          explanation:
            "A material breach allows the non-breaching party to be excused from further performance and to seek remedies.",
        },
        {
          id: "ct-2-q2",
          text: "What is the doctrine of substantial performance?",
          choices: [
            { id: "A", text: "A party who substantially performs their obligations can recover under the contract, minus damages for any defects" },
            { id: "B", text: "A party must fully perform their obligations to recover under the contract" },
            { id: "C", text: "A party can recover only if the other party agrees" },
            { id: "D", text: "A party can recover only if the contract is in writing" },
            { id: "E", text: "A party can recover only if the breach is material" },
          ],
          correctAnswer: "A",
          explanation:
            "The doctrine of substantial performance allows a party who substantially performs their obligations to recover under the contract, minus damages for any defects.",
        },
        {
          id: "ct-2-q3",
          text: "What is the difference between a condition precedent and a condition subsequent?",
          choices: [
            { id: "A", text: "A condition precedent must occur before a party's obligation arises, while a condition subsequent terminates an obligation" },
            { id: "B", text: "A condition precedent is always written, while a condition subsequent is oral" },
            { id: "C", text: "A condition precedent is governed by state law, while a condition subsequent is governed by federal law" },
            { id: "D", text: "A condition precedent is enforceable, while a condition subsequent is not" },
            { id: "E", text: "A condition precedent involves goods, while a condition subsequent involves services" },
          ],
          correctAnswer: "A",
          explanation:
            "A condition precedent must occur before a party's obligation arises, while a condition subsequent terminates an obligation.",
        },
        {
          id: "ct-2-q4",
          text: "What is the remedy of specific performance?",
          choices: [
            { id: "A", text: "A court order requiring a party to perform their contractual obligations" },
            { id: "B", text: "A monetary award for breach of contract" },
            { id: "C", text: "A cancellation of the contract" },
            { id: "D", text: "A modification of the contract terms" },
            { id: "E", text: "A requirement that the contract be in writing" },
          ],
          correctAnswer: "A",
          explanation:
            "Specific performance is a court order requiring a party to perform their contractual obligations.",
        },
        {
          id: "ct-2-q5",
          text: "What is the doctrine of promissory estoppel?",
          choices: [
            { id: "A", text: "A promise is enforceable if the promisee relies on it to their detriment" },
            { id: "B", text: "A promise is enforceable only if it is in writing" },
            { id: "C", text: "A promise is enforceable only if both parties agree" },
            { id: "D", text: "A promise is enforceable only in court" },
            { id: "E", text: "A promise is enforceable only if it involves goods" },
          ],
          correctAnswer: "A",
          explanation:
            "Promissory estoppel makes a promise enforceable if the promisee relies on it to their detriment.",
        },
      ],
    },
  ],
},
  "criminal-law-procedure": {
  title: "Criminal Law & Procedure",
  sections: [
    {
      id: "cr-1",
      title: "Criminal Law I",
      duration: 30,
      questions: [
        {
          id: "cr-1-q1",
          text: "What is the burden of proof in a criminal case?",
          choices: [
            { id: "A", text: "Beyond a reasonable doubt" },
            { id: "B", text: "Preponderance of the evidence" },
            { id: "C", text: "Clear and convincing evidence" },
            { id: "D", text: "Probable cause" },
            { id: "E", text: "Reasonable suspicion" },
          ],
          correctAnswer: "A",
          explanation:
            "In a criminal case, the prosecution must prove the defendant's guilt beyond a reasonable doubt.",
        },
        {
          id: "cr-1-q2",
          text: "What is the difference between murder and manslaughter?",
          choices: [
            { id: "A", text: "Murder requires malice aforethought, while manslaughter does not" },
            { id: "B", text: "Murder is a felony, while manslaughter is a misdemeanor" },
            { id: "C", text: "Murder involves premeditation, while manslaughter involves negligence" },
            { id: "D", text: "Murder is punishable by life imprisonment, while manslaughter is not" },
            { id: "E", text: "Murder requires intent, while manslaughter requires recklessness" },
          ],
          correctAnswer: "A",
          explanation:
            "Murder requires malice aforethought, while manslaughter does not.",
        },
        {
          id: "cr-1-q3",
          text: "What is the definition of 'actus reus'?",
          choices: [
            { id: "A", text: "The physical act of committing a crime" },
            { id: "B", text: "The mental state of committing a crime" },
            { id: "C", text: "The intent to commit a crime" },
            { id: "D", text: "The result of a criminal act" },
            { id: "E", text: "The legal justification for a crime" },
          ],
          correctAnswer: "A",
          explanation:
            "Actus reus refers to the physical act of committing a crime.",
        },
        {
          id: "cr-1-q4",
          text: "What is the definition of 'mens rea'?",
          choices: [
            { id: "A", text: "The mental state of committing a crime" },
            { id: "B", text: "The physical act of committing a crime" },
            { id: "C", text: "The intent to commit a crime" },
            { id: "D", text: "The result of a criminal act" },
            { id: "E", text: "The legal justification for a crime" },
          ],
          correctAnswer: "A",
          explanation:
            "Mens rea refers to the mental state of committing a crime.",
        },
        {
          id: "cr-1-q5",
          text: "What is the difference between a felony and a misdemeanor?",
          choices: [
            { id: "A", text: "A felony is a more serious crime with harsher penalties than a misdemeanor" },
            { id: "B", text: "A felony involves violence, while a misdemeanor does not" },
            { id: "C", text: "A felony is punishable by imprisonment, while a misdemeanor is not" },
            { id: "D", text: "A felony requires intent, while a misdemeanor requires negligence" },
            { id: "E", text: "A felony is a federal crime, while a misdemeanor is a state crime" },
          ],
          correctAnswer: "A",
          explanation:
            "A felony is a more serious crime with harsher penalties than a misdemeanor.",
        },
        {
          id: "cr-1-q6",
          text: "What is the principle of 'double jeopardy'?",
          choices: [
            { id: "A", text: "A defendant cannot be tried twice for the same crime" },
            { id: "B", text: "A defendant can be tried in both state and federal court for the same crime" },
            { id: "C", text: "A defendant can be charged with multiple crimes for the same act" },
            { id: "D", text: "A defendant can be tried again if new evidence is discovered" },
            { id: "E", text: "A defendant can be tried again if the first trial ends in a mistrial" },
          ],
          correctAnswer: "A",
          explanation:
            "The principle of double jeopardy prevents a defendant from being tried twice for the same crime.",
        },
      ],
    },
    {
      id: "cr-2",
      title: "Criminal Procedure I",
      duration: 30,
      questions: [
        {
          id: "cr-2-q1",
          text: "What does the Fourth Amendment protect against?",
          choices: [
            { id: "A", text: "Unreasonable searches and seizures" },
            { id: "B", text: "Self-incrimination" },
            { id: "C", text: "Cruel and unusual punishment" },
            { id: "D", text: "Double jeopardy" },
            { id: "E", text: "Excessive bail" },
          ],
          correctAnswer: "A",
          explanation:
            "The Fourth Amendment protects against unreasonable searches and seizures.",
        },
        {
          id: "cr-2-q2",
          text: "What is the Miranda warning?",
          choices: [
            { id: "A", text: "A warning given to suspects about their rights before interrogation" },
            { id: "B", text: "A warning given to victims about their rights" },
            { id: "C", text: "A warning given to witnesses about their rights" },
            { id: "D", text: "A warning given to jurors about their duties" },
            { id: "E", text: "A warning given to defendants about their charges" },
          ],
          correctAnswer: "A",
          explanation:
            "The Miranda warning informs suspects of their rights, including the right to remain silent and the right to an attorney.",
        },
        {
          id: "cr-2-q3",
          text: "What is the exclusionary rule?",
          choices: [
            { id: "A", text: "Evidence obtained illegally cannot be used in court" },
            { id: "B", text: "Evidence obtained legally cannot be used in court" },
            { id: "C", text: "Evidence obtained without a warrant cannot be used in court" },
            { id: "D", text: "Evidence obtained with a warrant cannot be used in court" },
            { id: "E", text: "Evidence obtained by the police cannot be used in court" },
          ],
          correctAnswer: "A",
          explanation:
            "The exclusionary rule prevents evidence obtained illegally from being used in court.",
        },
        {
          id: "cr-2-q4",
          text: "What is the purpose of the Sixth Amendment?",
          choices: [
            { id: "A", text: "To guarantee the right to a fair trial" },
            { id: "B", text: "To protect against unreasonable searches and seizures" },
            { id: "C", text: "To protect against self-incrimination" },
            { id: "D", text: "To protect against cruel and unusual punishment" },
            { id: "E", text: "To protect against double jeopardy" },
          ],
          correctAnswer: "A",
          explanation:
            "The Sixth Amendment guarantees the right to a fair trial, including the right to a speedy trial, an impartial jury, and the right to counsel.",
        },
        {
          id: "cr-2-q5",
          text: "What is the difference between a grand jury and a petit jury?",
          choices: [
            { id: "A", text: "A grand jury determines whether to indict, while a petit jury determines guilt or innocence" },
            { id: "B", text: "A grand jury is used in civil cases, while a petit jury is used in criminal cases" },
            { id: "C", text: "A grand jury is smaller than a petit jury" },
            { id: "D", text: "A grand jury is used in federal cases, while a petit jury is used in state cases" },
            { id: "E", text: "A grand jury determines guilt, while a petit jury determines sentencing" },
          ],
          correctAnswer: "A",
          explanation:
            "A grand jury determines whether to indict a defendant, while a petit jury determines guilt or innocence at trial.",
        },
        {
          id: "cr-2-q6",
          text: "What is the purpose of the Eighth Amendment?",
          choices: [
            { id: "A", text: "To protect against cruel and unusual punishment" },
            { id: "B", text: "To protect against unreasonable searches and seizures" },
            { id: "C", text: "To protect against self-incrimination" },
            { id: "D", text: "To protect against double jeopardy" },
            { id: "E", text: "To protect against excessive bail" },
          ],
          correctAnswer: "A",
          explanation:
            "The Eighth Amendment protects against cruel and unusual punishment and excessive bail.",
        },
      ],
    },
  ],
},
  "civil-procedure": {
  title: "Civil Procedure",
  sections: [
    {
      id: "cp-1",
      title: "Civil Procedure I",
      duration: 30,
      questions: [
        {
          id: "cp-1-q1",
          text: "What is the purpose of a summons in civil procedure?",
          choices: [
            { id: "A", text: "To notify the defendant of a lawsuit" },
            { id: "B", text: "To request a jury trial" },
            { id: "C", text: "To file a motion to dismiss" },
            { id: "D", text: "To initiate discovery" },
            { id: "E", text: "To appeal a judgment" },
          ],
          correctAnswer: "A",
          explanation:
            "A summons is used to notify the defendant of the lawsuit and compel their appearance in court.",
        },
        {
          id: "cp-1-q2",
          text: "What is the difference between personal jurisdiction and subject matter jurisdiction?",
          choices: [
            { id: "A", text: "Personal jurisdiction concerns the court's authority over the parties, while subject matter jurisdiction concerns the court's authority over the type of case" },
            { id: "B", text: "Personal jurisdiction is based on the defendant's residence, while subject matter jurisdiction is based on the plaintiff's residence" },
            { id: "C", text: "Personal jurisdiction is governed by state law, while subject matter jurisdiction is governed by federal law" },
            { id: "D", text: "Personal jurisdiction applies to criminal cases, while subject matter jurisdiction applies to civil cases" },
            { id: "E", text: "Personal jurisdiction is determined by the plaintiff, while subject matter jurisdiction is determined by the defendant" },
          ],
          correctAnswer: "A",
          explanation:
            "Personal jurisdiction concerns the court's authority over the parties, while subject matter jurisdiction concerns the court's authority over the type of case.",
        },
        {
          id: "cp-1-q3",
          text: "What is the purpose of a complaint in civil procedure?",
          choices: [
            { id: "A", text: "To state the plaintiff's claims and the relief sought" },
            { id: "B", text: "To notify the defendant of the lawsuit" },
            { id: "C", text: "To request a jury trial" },
            { id: "D", text: "To file a motion to dismiss" },
            { id: "E", text: "To initiate discovery" },
          ],
          correctAnswer: "A",
          explanation:
            "A complaint is used to state the plaintiff's claims and the relief sought.",
        },
        {
          id: "cp-1-q4",
          text: "What is the difference between a motion to dismiss and a motion for summary judgment?",
          choices: [
            { id: "A", text: "A motion to dismiss challenges the legal sufficiency of the complaint, while a motion for summary judgment challenges the factual sufficiency of the case" },
            { id: "B", text: "A motion to dismiss is filed by the plaintiff, while a motion for summary judgment is filed by the defendant" },
            { id: "C", text: "A motion to dismiss is based on procedural grounds, while a motion for summary judgment is based on substantive grounds" },
            { id: "D", text: "A motion to dismiss is used in criminal cases, while a motion for summary judgment is used in civil cases" },
            { id: "E", text: "A motion to dismiss is governed by state law, while a motion for summary judgment is governed by federal law" },
          ],
          correctAnswer: "A",
          explanation:
            "A motion to dismiss challenges the legal sufficiency of the complaint, while a motion for summary judgment challenges the factual sufficiency of the case.",
        },
        {
          id: "cp-1-q5",
          text: "What is the purpose of discovery in civil procedure?",
          choices: [
            { id: "A", text: "To gather evidence and information from the opposing party" },
            { id: "B", text: "To notify the defendant of the lawsuit" },
            { id: "C", text: "To request a jury trial" },
            { id: "D", text: "To file a motion to dismiss" },
            { id: "E", text: "To appeal a judgment" },
          ],
          correctAnswer: "A",
          explanation:
            "Discovery is used to gather evidence and information from the opposing party.",
        },
        {
          id: "cp-1-q6",
          text: "What is the difference between a deposition and an interrogatory?",
          choices: [
            { id: "A", text: "A deposition is an oral examination under oath, while an interrogatory is a written question" },
            { id: "B", text: "A deposition is used in criminal cases, while an interrogatory is used in civil cases" },
            { id: "C", text: "A deposition is governed by state law, while an interrogatory is governed by federal law" },
            { id: "D", text: "A deposition is filed by the plaintiff, while an interrogatory is filed by the defendant" },
            { id: "E", text: "A deposition is used to request a jury trial, while an interrogatory is used to file a motion to dismiss" },
          ],
          correctAnswer: "A",
          explanation:
            "A deposition is an oral examination under oath, while an interrogatory is a written question.",
        },
      ],
    },
    {
      id: "cp-2",
      title: "Civil Procedure II",
      duration: 30,
      questions: [
        {
          id: "cp-2-q1",
          text: "What is the Erie Doctrine?",
          choices: [
            { id: "A", text: "A rule requiring federal courts to apply state substantive law in diversity cases" },
            { id: "B", text: "A rule about personal jurisdiction" },
            { id: "C", text: "A rule about subject matter jurisdiction" },
            { id: "D", text: "A rule about venue" },
            { id: "E", text: "A rule about class actions" },
          ],
          correctAnswer: "A",
          explanation:
            "The Erie Doctrine requires federal courts to apply state substantive law in diversity cases.",
        },
        {
          id: "cp-2-q2",
          text: "What is the purpose of a motion for summary judgment?",
          choices: [
            { id: "A", text: "To resolve the case without a trial if there are no genuine issues of material fact" },
            { id: "B", text: "To notify the defendant of the lawsuit" },
            { id: "C", text: "To request a jury trial" },
            { id: "D", text: "To file a motion to dismiss" },
            { id: "E", text: "To initiate discovery" },
          ],
          correctAnswer: "A",
          explanation:
            "A motion for summary judgment is used to resolve the case without a trial if there are no genuine issues of material fact.",
        },
        {
          id: "cp-2-q3",
          text: "What is the difference between a bench trial and a jury trial?",
          choices: [
            { id: "A", text: "A bench trial is decided by a judge, while a jury trial is decided by a jury" },
            { id: "B", text: "A bench trial is used in criminal cases, while a jury trial is used in civil cases" },
            { id: "C", text: "A bench trial is governed by state law, while a jury trial is governed by federal law" },
            { id: "D", text: "A bench trial is filed by the plaintiff, while a jury trial is filed by the defendant" },
            { id: "E", text: "A bench trial is used to request a jury trial, while a jury trial is used to file a motion to dismiss" },
          ],
          correctAnswer: "A",
          explanation:
            "A bench trial is decided by a judge, while a jury trial is decided by a jury.",
        },
        {
          id: "cp-2-q4",
          text: "What is the purpose of a pretrial conference?",
          choices: [
            { id: "A", text: "To discuss the case and encourage settlement before trial" },
            { id: "B", text: "To notify the defendant of the lawsuit" },
            { id: "C", text: "To request a jury trial" },
            { id: "D", text: "To file a motion to dismiss" },
            { id: "E", text: "To initiate discovery" },
          ],
          correctAnswer: "A",
          explanation:
            "A pretrial conference is used to discuss the case and encourage settlement before trial.",
        },
        {
          id: "cp-2-q5",
          text: "What is the difference between a default judgment and a summary judgment?",
          choices: [
            { id: "A", text: "A default judgment is entered when the defendant fails to respond, while a summary judgment is entered when there are no genuine issues of material fact" },
            { id: "B", text: "A default judgment is used in criminal cases, while a summary judgment is used in civil cases" },
            { id: "C", text: "A default judgment is governed by state law, while a summary judgment is governed by federal law" },
            { id: "D", text: "A default judgment is filed by the plaintiff, while a summary judgment is filed by the defendant" },
            { id: "E", text: "A default judgment is used to request a jury trial, while a summary judgment is used to file a motion to dismiss" },
          ],
          correctAnswer: "A",
          explanation:
            "A default judgment is entered when the defendant fails to respond, while a summary judgment is entered when there are no genuine issues of material fact.",
        },
        {
          id: "cp-2-q6",
          text: "What is the purpose of a motion for a directed verdict?",
          choices: [
            { id: "A", text: "To ask the judge to rule in favor of one party because the other party has not met the burden of proof" },
            { id: "B", text: "To notify the defendant of the lawsuit" },
            { id: "C", text: "To request a jury trial" },
            { id: "D", text: "To file a motion to dismiss" },
            { id: "E", text: "To initiate discovery" },
          ],
          correctAnswer: "A",
          explanation:
            "A motion for a directed verdict asks the judge to rule in favor of one party because the other party has not met the burden of proof.",
        },
      ],
    },
  ],
},
evidence: {
  title: "Evidence",
  sections: [
    {
      id: "ev-1",
      title: "Evidence I",
      duration: 30,
      questions: [
        {
          id: "ev-1-q1",
          text: "What is the hearsay rule?",
          choices: [
            { id: "A", text: "A rule excluding out-of-court statements offered for the truth of the matter asserted" },
            { id: "B", text: "A rule about expert testimony" },
            { id: "C", text: "A rule about character evidence" },
            { id: "D", text: "A rule about authentication" },
            { id: "E", text: "A rule about privilege" },
          ],
          correctAnswer: "A",
          explanation:
            "The hearsay rule excludes out-of-court statements offered for the truth of the matter asserted, unless an exception applies.",
        },
        {
          id: "ev-1-q2",
          text: "What is an exception to the hearsay rule?",
          choices: [
            { id: "A", text: "A statement made under the excitement of a startling event" },
            { id: "B", text: "A statement made by a witness in court" },
            { id: "C", text: "A statement made by a judge" },
            { id: "D", text: "A statement made by a lawyer" },
            { id: "E", text: "A statement made by a juror" },
          ],
          correctAnswer: "A",
          explanation:
            "A statement made under the excitement of a startling event is an exception to the hearsay rule.",
        },
        {
          id: "ev-1-q3",
          text: "What is the difference between direct evidence and circumstantial evidence?",
          choices: [
            { id: "A", text: "Direct evidence directly proves a fact, while circumstantial evidence requires inference" },
            { id: "B", text: "Direct evidence is always admissible, while circumstantial evidence is not" },
            { id: "C", text: "Direct evidence is used in criminal cases, while circumstantial evidence is used in civil cases" },
            { id: "D", text: "Direct evidence is governed by state law, while circumstantial evidence is governed by federal law" },
            { id: "E", text: "Direct evidence is filed by the plaintiff, while circumstantial evidence is filed by the defendant" },
          ],
          correctAnswer: "A",
          explanation:
            "Direct evidence directly proves a fact, while circumstantial evidence requires inference.",
        },
        {
          id: "ev-1-q4",
          text: "What is the purpose of the authentication requirement?",
          choices: [
            { id: "A", text: "To ensure that evidence is what it purports to be" },
            { id: "B", text: "To exclude evidence that is irrelevant" },
            { id: "C", text: "To exclude evidence that is hearsay" },
            { id: "D", text: "To exclude evidence that is privileged" },
            { id: "E", text: "To exclude evidence that is prejudicial" },
          ],
          correctAnswer: "A",
          explanation:
            "The authentication requirement ensures that evidence is what it purports to be.",
        },
        {
          id: "ev-1-q5",
          text: "What is the difference between relevance and materiality?",
          choices: [
            { id: "A", text: "Relevance concerns the logical connection between evidence and a fact, while materiality concerns the importance of the fact to the case" },
            { id: "B", text: "Relevance is governed by state law, while materiality is governed by federal law" },
            { id: "C", text: "Relevance is used in criminal cases, while materiality is used in civil cases" },
            { id: "D", text: "Relevance is filed by the plaintiff, while materiality is filed by the defendant" },
            { id: "E", text: "Relevance is always admissible, while materiality is not" },
          ],
          correctAnswer: "A",
          explanation:
            "Relevance concerns the logical connection between evidence and a fact, while materiality concerns the importance of the fact to the case.",
        },
        {
          id: "ev-1-q6",
          text: "What is the purpose of the privilege rule?",
          choices: [
            { id: "A", text: "To protect certain confidential communications from being disclosed" },
            { id: "B", text: "To exclude evidence that is irrelevant" },
            { id: "C", text: "To exclude evidence that is hearsay" },
            { id: "D", text: "To exclude evidence that is prejudicial" },
            { id: "E", text: "To exclude evidence that is cumulative" },
          ],
          correctAnswer: "A",
          explanation:
            "The privilege rule protects certain confidential communications from being disclosed.",
        },
      ],
    },
    {
      id: "ev-2",
      title: "Evidence II",
      duration: 30,
      questions: [
        {
          id: "ev-2-q1",
          text: "What is the Best Evidence Rule?",
          choices: [
            { id: "A", text: "A rule requiring the original document to prove its contents" },
            { id: "B", text: "A rule about witness credibility" },
            { id: "C", text: "A rule about circumstantial evidence" },
            { id: "D", text: "A rule about demonstrative evidence" },
            { id: "E", text: "A rule about judicial notice" },
          ],
          correctAnswer: "A",
          explanation:
            "The Best Evidence Rule requires the original document to prove its contents, unless an exception applies.",
        },
        {
          id: "ev-2-q2",
          text: "What is the difference between lay opinion and expert opinion?",
          choices: [
            { id: "A", text: "Lay opinion is based on personal observation, while expert opinion is based on specialized knowledge" },
            { id: "B", text: "Lay opinion is always admissible, while expert opinion is not" },
            { id: "C", text: "Lay opinion is used in criminal cases, while expert opinion is used in civil cases" },
            { id: "D", text: "Lay opinion is governed by state law, while expert opinion is governed by federal law" },
            { id: "E", text: "Lay opinion is filed by the plaintiff, while expert opinion is filed by the defendant" },
          ],
          correctAnswer: "A",
          explanation:
            "Lay opinion is based on personal observation, while expert opinion is based on specialized knowledge.",
        },
        {
          id: "ev-2-q3",
          text: "What is the purpose of the chain of custody requirement?",
          choices: [
            { id: "A", text: "To ensure that evidence has not been tampered with" },
            { id: "B", text: "To exclude evidence that is irrelevant" },
            { id: "C", text: "To exclude evidence that is hearsay" },
            { id: "D", text: "To exclude evidence that is privileged" },
            { id: "E", text: "To exclude evidence that is prejudicial" },
          ],
          correctAnswer: "A",
          explanation:
            "The chain of custody requirement ensures that evidence has not been tampered with.",
        },
        {
          id: "ev-2-q4",
          text: "What is the difference between a leading question and a non-leading question?",
          choices: [
            { id: "A", text: "A leading question suggests the answer, while a non-leading question does not" },
            { id: "B", text: "A leading question is always admissible, while a non-leading question is not" },
            { id: "C", text: "A leading question is used in criminal cases, while a non-leading question is used in civil cases" },
            { id: "D", text: "A leading question is governed by state law, while a non-leading question is governed by federal law" },
            { id: "E", text: "A leading question is filed by the plaintiff, while a non-leading question is filed by the defendant" },
          ],
          correctAnswer: "A",
          explanation:
            "A leading question suggests the answer, while a non-leading question does not.",
        },
        {
          id: "ev-2-q5",
          text: "What is the purpose of the judicial notice rule?",
          choices: [
            { id: "A", text: "To allow the court to accept certain facts as true without formal proof" },
            { id: "B", text: "To exclude evidence that is irrelevant" },
            { id: "C", text: "To exclude evidence that is hearsay" },
            { id: "D", text: "To exclude evidence that is privileged" },
            { id: "E", text: "To exclude evidence that is prejudicial" },
          ],
          correctAnswer: "A",
          explanation:
            "The judicial notice rule allows the court to accept certain facts as true without formal proof.",
        },
        {
          id: "ev-2-q6",
          text: "What is the difference between a presumption and an inference?",
          choices: [
            { id: "A", text: "A presumption requires the opposing party to disprove it, while an inference does not" },
            { id: "B", text: "A presumption is always admissible, while an inference is not" },
            { id: "C", text: "A presumption is used in criminal cases, while an inference is used in civil cases" },
            { id: "D", text: "A presumption is governed by state law, while an inference is governed by federal law" },
            { id: "E", text: "A presumption is filed by the plaintiff, while an inference is filed by the defendant" },
          ],
          correctAnswer: "A",
          explanation:
            "A presumption requires the opposing party to disprove it, while an inference does not.",
        },
      ],
    },
  ],
},
  "real-property": {
  title: "Real Property",
  sections: [
    {
      id: "rp-1",
      title: "Real Property I",
      duration: 30,
      questions: [
        {
          id: "rp-1-q1",
          text: "What is a fee simple estate?",
          choices: [
            { id: "A", text: "The highest form of ownership in real property" },
            { id: "B", text: "A leasehold estate" },
            { id: "C", text: "A life estate" },
            { id: "D", text: "An easement" },
            { id: "E", text: "A license" },
          ],
          correctAnswer: "A",
          explanation:
            "A fee simple estate is the highest form of ownership in real property, granting the owner full rights to the property.",
        },
        {
          id: "rp-1-q2",
          text: "What is the difference between a freehold estate and a leasehold estate?",
          choices: [
            { id: "A", text: "A freehold estate is ownership, while a leasehold estate is a temporary right to use the property" },
            { id: "B", text: "A freehold estate is governed by state law, while a leasehold estate is governed by federal law" },
            { id: "C", text: "A freehold estate is used in commercial properties, while a leasehold estate is used in residential properties" },
            { id: "D", text: "A freehold estate is filed by the plaintiff, while a leasehold estate is filed by the defendant" },
            { id: "E", text: "A freehold estate is always perpetual, while a leasehold estate is always temporary" },
          ],
          correctAnswer: "A",
          explanation:
            "A freehold estate is ownership, while a leasehold estate is a temporary right to use the property.",
        },
        {
          id: "rp-1-q3",
          text: "What is the purpose of a deed in real property?",
          choices: [
            { id: "A", text: "To transfer ownership of real property" },
            { id: "B", text: "To create a leasehold estate" },
            { id: "C", text: "To establish an easement" },
            { id: "D", text: "To create a license" },
            { id: "E", text: "To establish a mortgage" },
          ],
          correctAnswer: "A",
          explanation:
            "A deed is used to transfer ownership of real property.",
        },
        {
          id: "rp-1-q4",
          text: "What is the difference between a warranty deed and a quitclaim deed?",
          choices: [
            { id: "A", text: "A warranty deed guarantees the title, while a quitclaim deed does not" },
            { id: "B", text: "A warranty deed is used in commercial properties, while a quitclaim deed is used in residential properties" },
            { id: "C", text: "A warranty deed is governed by state law, while a quitclaim deed is governed by federal law" },
            { id: "D", text: "A warranty deed is filed by the plaintiff, while a quitclaim deed is filed by the defendant" },
            { id: "E", text: "A warranty deed is always perpetual, while a quitclaim deed is always temporary" },
          ],
          correctAnswer: "A",
          explanation:
            "A warranty deed guarantees the title, while a quitclaim deed does not.",
        },
        {
          id: "rp-1-q5",
          text: "What is the purpose of a mortgage in real property?",
          choices: [
            { id: "A", text: "To secure a loan with real property as collateral" },
            { id: "B", text: "To transfer ownership of real property" },
            { id: "C", text: "To create a leasehold estate" },
            { id: "D", text: "To establish an easement" },
            { id: "E", text: "To create a license" },
          ],
          correctAnswer: "A",
          explanation:
            "A mortgage is used to secure a loan with real property as collateral.",
        },
        {
          id: "rp-1-q6",
          text: "What is the difference between a lien and an encumbrance?",
          choices: [
            { id: "A", text: "A lien is a financial claim against the property, while an encumbrance is any claim or restriction on the property" },
            { id: "B", text: "A lien is governed by state law, while an encumbrance is governed by federal law" },
            { id: "C", text: "A lien is used in commercial properties, while an encumbrance is used in residential properties" },
            { id: "D", text: "A lien is filed by the plaintiff, while an encumbrance is filed by the defendant" },
            { id: "E", text: "A lien is always perpetual, while an encumbrance is always temporary" },
          ],
          correctAnswer: "A",
          explanation:
            "A lien is a financial claim against the property, while an encumbrance is any claim or restriction on the property.",
        },
      ],
    },
    {
      id: "rp-2",
      title: "Real Property II",
      duration: 30,
      questions: [
        {
          id: "rp-2-q1",
          text: "What is the Rule Against Perpetuities?",
          choices: [
            { id: "A", text: "A rule limiting the duration of future interests in property" },
            { id: "B", text: "A rule about adverse possession" },
            { id: "C", text: "A rule about zoning" },
            { id: "D", text: "A rule about mortgages" },
            { id: "E", text: "A rule about landlord-tenant relationships" },
          ],
          correctAnswer: "A",
          explanation:
            "The Rule Against Perpetuities limits the duration of future interests in property to prevent indefinite control over property.",
        },
        {
          id: "rp-2-q2",
          text: "What is the purpose of adverse possession?",
          choices: [
            { id: "A", text: "To allow someone to gain ownership of property through continuous and open use" },
            { id: "B", text: "To transfer ownership of real property" },
            { id: "C", text: "To create a leasehold estate" },
            { id: "D", text: "To establish an easement" },
            { id: "E", text: "To create a license" },
          ],
          correctAnswer: "A",
          explanation:
            "Adverse possession allows someone to gain ownership of property through continuous and open use.",
        },
        {
          id: "rp-2-q3",
          text: "What is the difference between an easement and a license?",
          choices: [
            { id: "A", text: "An easement is a permanent right to use the property, while a license is a temporary right" },
            { id: "B", text: "An easement is governed by state law, while a license is governed by federal law" },
            { id: "C", text: "An easement is used in commercial properties, while a license is used in residential properties" },
            { id: "D", text: "An easement is filed by the plaintiff, while a license is filed by the defendant" },
            { id: "E", text: "An easement is always perpetual, while a license is always temporary" },
          ],
          correctAnswer: "A",
          explanation:
            "An easement is a permanent right to use the property, while a license is a temporary right.",
        },
        {
          id: "rp-2-q4",
          text: "What is the purpose of a covenant in real property?",
          choices: [
            { id: "A", text: "To create a legally binding agreement regarding the use of the property" },
            { id: "B", text: "To transfer ownership of real property" },
            { id: "C", text: "To create a leasehold estate" },
            { id: "D", text: "To establish an easement" },
            { id: "E", text: "To create a license" },
          ],
          correctAnswer: "A",
          explanation:
            "A covenant creates a legally binding agreement regarding the use of the property.",
        },
        {
          id: "rp-2-q5",
          text: "What is the difference between a zoning ordinance and a restrictive covenant?",
          choices: [
            { id: "A", text: "A zoning ordinance is a government regulation, while a restrictive covenant is a private agreement" },
            { id: "B", text: "A zoning ordinance is governed by state law, while a restrictive covenant is governed by federal law" },
            { id: "C", text: "A zoning ordinance is used in commercial properties, while a restrictive covenant is used in residential properties" },
            { id: "D", text: "A zoning ordinance is filed by the plaintiff, while a restrictive covenant is filed by the defendant" },
            { id: "E", text: "A zoning ordinance is always perpetual, while a restrictive covenant is always temporary" },
          ],
          correctAnswer: "A",
          explanation:
            "A zoning ordinance is a government regulation, while a restrictive covenant is a private agreement.",
        },
        {
          id: "rp-2-q6",
          text: "What is the purpose of a title search in real property?",
          choices: [
            { id: "A", text: "To verify the ownership and legal status of the property" },
            { id: "B", text: "To transfer ownership of real property" },
            { id: "C", text: "To create a leasehold estate" },
            { id: "D", text: "To establish an easement" },
            { id: "E", text: "To create a license" },
          ],
          correctAnswer: "A",
          explanation:
            "A title search is used to verify the ownership and legal status of the property.",
        },
      ],
    },
  ],
},
torts: {
  title: "Torts",
  sections: [
    {
      id: "to-1",
      title: "Torts I",
      duration: 30,
      questions: [
        {
          id: "to-1-q1",
          text: "What is negligence?",
          choices: [
            { id: "A", text: "A failure to exercise reasonable care" },
            { id: "B", text: "Intentional harm" },
            { id: "C", text: "Strict liability" },
            { id: "D", text: "Defamation" },
            { id: "E", text: "Nuisance" },
          ],
          correctAnswer: "A",
          explanation:
            "Negligence is a failure to exercise reasonable care, resulting in harm to another person.",
        },
        {
          id: "to-1-q2",
          text: "What are the elements of a negligence claim?",
          choices: [
            { id: "A", text: "Duty, breach, causation, and damages" },
            { id: "B", text: "Intent, harm, and causation" },
            { id: "C", text: "Duty, intent, and damages" },
            { id: "D", text: "Breach, harm, and causation" },
            { id: "E", text: "Duty, intent, and causation" },
          ],
          correctAnswer: "A",
          explanation:
            "The elements of a negligence claim are duty, breach, causation, and damages.",
        },
        {
          id: "to-1-q3",
          text: "What is the difference between actual cause and proximate cause?",
          choices: [
            { id: "A", text: "Actual cause is the direct cause of harm, while proximate cause is the legal cause of harm" },
            { id: "B", text: "Actual cause is governed by state law, while proximate cause is governed by federal law" },
            { id: "C", text: "Actual cause is used in criminal cases, while proximate cause is used in civil cases" },
            { id: "D", text: "Actual cause is filed by the plaintiff, while proximate cause is filed by the defendant" },
            { id: "E", text: "Actual cause is always present, while proximate cause is not" },
          ],
          correctAnswer: "A",
          explanation:
            "Actual cause is the direct cause of harm, while proximate cause is the legal cause of harm.",
        },
        {
          id: "to-1-q4",
          text: "What is the purpose of the duty of care in negligence?",
          choices: [
            { id: "A", text: "To establish the standard of care owed to others" },
            { id: "B", text: "To determine the amount of damages" },
            { id: "C", text: "To establish intent" },
            { id: "D", text: "To determine causation" },
            { id: "E", text: "To establish strict liability" },
          ],
          correctAnswer: "A",
          explanation:
            "The duty of care establishes the standard of care owed to others.",
        },
        {
          id: "to-1-q5",
          text: "What is the difference between contributory negligence and comparative negligence?",
          choices: [
            { id: "A", text: "Contributory negligence bars recovery if the plaintiff is at fault, while comparative negligence reduces recovery based on fault" },
            { id: "B", text: "Contributory negligence is governed by state law, while comparative negligence is governed by federal law" },
            { id: "C", text: "Contributory negligence is used in criminal cases, while comparative negligence is used in civil cases" },
            { id: "D", text: "Contributory negligence is filed by the plaintiff, while comparative negligence is filed by the defendant" },
            { id: "E", text: "Contributory negligence is always present, while comparative negligence is not" },
          ],
          correctAnswer: "A",
          explanation:
            "Contributory negligence bars recovery if the plaintiff is at fault, while comparative negligence reduces recovery based on fault.",
        },
        {
          id: "to-1-q6",
          text: "What is the purpose of the assumption of risk defense?",
          choices: [
            { id: "A", text: "To bar recovery if the plaintiff voluntarily assumed the risk of harm" },
            { id: "B", text: "To determine the amount of damages" },
            { id: "C", text: "To establish intent" },
            { id: "D", text: "To determine causation" },
            { id: "E", text: "To establish strict liability" },
          ],
          correctAnswer: "A",
          explanation:
            "The assumption of risk defense bars recovery if the plaintiff voluntarily assumed the risk of harm.",
        },
      ],
    },
    {
      id: "to-2",
      title: "Torts II",
      duration: 30,
      questions: [
        {
          id: "to-2-q1",
          text: "What is strict liability?",
          choices: [
            { id: "A", text: "Liability without fault" },
            { id: "B", text: "Liability based on negligence" },
            { id: "C", text: "Liability for intentional torts" },
            { id: "D", text: "Liability for defamation" },
            { id: "E", text: "Liability for nuisance" },
          ],
          correctAnswer: "A",
          explanation:
            "Strict liability imposes liability without fault, typically in cases involving inherently dangerous activities or defective products.",
        },
        {
          id: "to-2-q2",
          text: "What is the difference between intentional torts and negligence?",
          choices: [
            { id: "A", text: "Intentional torts require intent to harm, while negligence requires a failure to exercise reasonable care" },
            { id: "B", text: "Intentional torts are governed by state law, while negligence is governed by federal law" },
            { id: "C", text: "Intentional torts are used in criminal cases, while negligence is used in civil cases" },
            { id: "D", text: "Intentional torts are filed by the plaintiff, while negligence is filed by the defendant" },
            { id: "E", text: "Intentional torts are always present, while negligence is not" },
          ],
          correctAnswer: "A",
          explanation:
            "Intentional torts require intent to harm, while negligence requires a failure to exercise reasonable care.",
        },
        {
          id: "to-2-q3",
          text: "What is the purpose of the tort of defamation?",
          choices: [
            { id: "A", text: "To protect against false statements that harm reputation" },
            { id: "B", text: "To determine the amount of damages" },
            { id: "C", text: "To establish intent" },
            { id: "D", text: "To determine causation" },
            { id: "E", text: "To establish strict liability" },
          ],
          correctAnswer: "A",
          explanation:
            "The tort of defamation protects against false statements that harm reputation.",
        },
        {
          id: "to-2-q4",
          text: "What is the difference between libel and slander?",
          choices: [
            { id: "A", text: "Libel is written defamation, while slander is spoken defamation" },
            { id: "B", text: "Libel is governed by state law, while slander is governed by federal law" },
            { id: "C", text: "Libel is used in criminal cases, while slander is used in civil cases" },
            { id: "D", text: "Libel is filed by the plaintiff, while slander is filed by the defendant" },
            { id: "E", text: "Libel is always present, while slander is not" },
          ],
          correctAnswer: "A",
          explanation:
            "Libel is written defamation, while slander is spoken defamation.",
        },
        {
          id: "to-2-q5",
          text: "What is the purpose of the tort of nuisance?",
          choices: [
            { id: "A", text: "To protect against unreasonable interference with the use and enjoyment of property" },
            { id: "B", text: "To determine the amount of damages" },
            { id: "C", text: "To establish intent" },
            { id: "D", text: "To determine causation" },
            { id: "E", text: "To establish strict liability" },
          ],
          correctAnswer: "A",
          explanation:
            "The tort of nuisance protects against unreasonable interference with the use and enjoyment of property.",
        },
        {
          id: "to-2-q6",
          text: "What is the difference between a private nuisance and a public nuisance?",
          choices: [
            { id: "A", text: "A private nuisance affects an individual, while a public nuisance affects the community" },
            { id: "B", text: "A private nuisance is governed by state law, while a public nuisance is governed by federal law" },
            { id: "C", text: "A private nuisance is used in criminal cases, while a public nuisance is used in civil cases" },
            { id: "D", text: "A private nuisance is filed by the plaintiff, while a public nuisance is filed by the defendant" },
            { id: "E", text: "A private nuisance is always present, while a public nuisance is not" },
          ],
          correctAnswer: "A",
          explanation:
            "A private nuisance affects an individual, while a public nuisance affects the community.",
        },
      ],
    },
  ],
},
};