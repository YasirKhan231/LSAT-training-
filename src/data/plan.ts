export type StudyPlanKey = "terrible" | "bad" | "decent" | "good" | "amazing";

export const studyPlans: Record<
  StudyPlanKey,
  { today: string[]; weekly: string[][]; monthly: string[][] }
> = {
  terrible: {
    today: [
      "Review basic Constitutional Law principles",
      "Practice 5 easy Contract Law questions",
      "Read an overview of Criminal Law & Procedure",
      "Memorize key Civil Procedure rules",
      "Study fundamental Evidence rules",
    ],
    weekly: [
      [
        "Complete 10 Contract Law multiple-choice questions",
        "Analyze 1 Constitutional Law case",
        "Take a quiz on Criminal Law defenses",
        "Practice writing 1 Evidence essay",
        "Review the statute of frauds in Contracts",
      ],
      [
        "Complete 15 Torts multiple-choice questions",
        "Study 2 Real Property cases",
        "Write 1 essay on Civil Procedure",
        "Memorize key Evidence rules",
        "Review Criminal Law defenses",
      ],
      [
        "Complete 20 Evidence multiple-choice questions",
        "Analyze 2 key Criminal Law cases",
        "Write 1 essay on Contracts",
        "Review Civil Procedure rules",
        "Memorize key Real Property concepts",
      ],
      [
        "Complete 25 multiple-choice questions across all subjects",
        "Write 2 practice essays for Torts",
        "Take 1 full-length practice exam",
        "Review the Federal Rules of Civil Procedure",
        "Memorize key Constitutional Law principles",
      ],
    ],
    monthly: [
      [
        "Complete 50 multiple-choice questions across all subjects",
        "Master 3 Real Property concepts",
        "Write 2 practice essays for Torts",
        "Take 1 full-length practice exam",
        "Review the Federal Rules of Civil Procedure",
      ],
      [
        "Complete 60 multiple-choice questions across all subjects",
        "Analyze 5 key Constitutional Law cases",
        "Write 3 practice essays on Contracts",
        "Take 2 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
      [
        "Complete 70 multiple-choice questions across all subjects",
        "Master 4 complex legal scenarios",
        "Write 4 practice essays on Torts",
        "Take 3 full-length practice exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 80 multiple-choice questions across all subjects",
        "Analyze 10 key Criminal Law cases",
        "Write 5 practice essays on Contracts",
        "Take 4 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
  },
  bad: {
    today: [
      "Review intermediate Constitutional Law concepts",
      "Practice 10 medium-difficulty Contract Law questions",
      "Memorize key Criminal Procedure amendments",
      "Analyze 2 Civil Procedure rules",
      "Study hearsay exceptions in Evidence",
    ],
    weekly: [
      [
        "Complete 20 Real Property questions",
        "Study 3 important Torts cases",
        "Take 1 timed essay on Criminal Law",
        "Review leading case law in Constitutional Law",
        "Memorize key legal maxims for Contracts",
      ],
      [
        "Complete 25 Evidence multiple-choice questions",
        "Write 2 essays on Contracts",
        "Analyze 5 key Criminal Law cases",
        "Review Civil Procedure rules",
        "Memorize key Real Property concepts",
      ],
      [
        "Complete 30 Torts multiple-choice questions",
        "Write 3 essays on Real Property issues",
        "Analyze 7 key contract defenses",
        "Take a mock oral argument session",
        "Review evidentiary privileges",
      ],
      [
        "Complete 35 multiple-choice questions across all subjects",
        "Write 4 practice essays covering multiple subjects",
        "Master 5 analytical reasoning scenarios",
        "Take 2 full-length simulated exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
    ],
    monthly: [
      [
        "Complete 100 practice questions across subjects",
        "Write 3 practice essays covering multiple subjects",
        "Master 5 analytical reasoning scenarios",
        "Take 2 full-length simulated exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 120 practice questions across subjects",
        "Analyze 10 key Constitutional Law cases",
        "Write 4 practice essays on Torts",
        "Take 3 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
      [
        "Complete 140 practice questions across subjects",
        "Master 8 complex legal scenarios",
        "Write 5 essays under timed conditions",
        "Take 4 full-length practice exams",
        "Memorize procedural deadlines in Civil Procedure",
      ],
      [
        "Complete 160 practice questions across subjects",
        "Analyze 15 key Criminal Law cases",
        "Write 6 practice essays on Contracts",
        "Take 5 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
  },
  decent: {
    today: [
      "Review Constitutional Law precedents",
      "Practice 15 moderate Contract Law questions",
      "Break down a Criminal Law case ruling",
      "Study class actions in Civil Procedure",
      "Analyze hearsay exceptions in depth",
    ],
    weekly: [
      [
        "Complete 40 Torts multiple-choice questions",
        "Write 2 essays on Real Property issues",
        "Analyze 5 key contract defenses",
        "Take a mock oral argument session",
        "Review evidentiary privileges",
      ],
      [
        "Complete 45 Evidence multiple-choice questions",
        "Write 3 essays on Contracts",
        "Analyze 7 key Criminal Law cases",
        "Review Civil Procedure rules",
        "Memorize key Real Property concepts",
      ],
      [
        "Complete 50 multiple-choice questions across all subjects",
        "Write 4 practice essays covering multiple subjects",
        "Master 5 analytical reasoning scenarios",
        "Take 2 full-length simulated exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 55 multiple-choice questions across all subjects",
        "Write 5 practice essays on Torts",
        "Analyze 10 key Constitutional Law cases",
        "Take 3 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
    monthly: [
      [
        "Complete 200 practice questions across subjects",
        "Master 8 complex legal scenarios",
        "Take 4 full-length practice exams",
        "Write 5 essays under timed conditions",
        "Memorize procedural deadlines in Civil Procedure",
      ],
      [
        "Complete 220 practice questions across subjects",
        "Analyze 15 key Constitutional Law cases",
        "Write 6 practice essays on Torts",
        "Take 5 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
      [
        "Complete 240 practice questions across subjects",
        "Master 10 complex legal scenarios",
        "Write 7 practice essays on Contracts",
        "Take 6 full-length practice exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 260 practice questions across subjects",
        "Analyze 20 key Criminal Law cases",
        "Write 8 practice essays on Torts",
        "Take 7 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
  },
  good: {
    today: [
      "Review advanced Constitutional Law doctrines",
      "Solve 20 challenging Contract Law questions",
      "Analyze recent Supreme Court rulings",
      "Study nuanced defenses in Criminal Law",
      "Memorize key exceptions in hearsay and evidence rules",
    ],
    weekly: [
      [
        "Complete 60 practice questions across all subjects",
        "Draft 3 practice essays with self-assessment",
        "Review Real Property mortgage and easement rules",
        "Take a practice MBE section under timed conditions",
        "Memorize statutory interpretation principles",
      ],
      [
        "Complete 65 Evidence multiple-choice questions",
        "Write 4 essays on Contracts",
        "Analyze 10 key Criminal Law cases",
        "Review Civil Procedure rules",
        "Memorize key Real Property concepts",
      ],
      [
        "Complete 70 multiple-choice questions across all subjects",
        "Write 5 practice essays covering multiple subjects",
        "Master 5 analytical reasoning scenarios",
        "Take 2 full-length simulated exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 75 multiple-choice questions across all subjects",
        "Write 6 practice essays on Torts",
        "Analyze 15 key Constitutional Law cases",
        "Take 3 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
    monthly: [
      [
        "Complete 300 practice questions covering all subjects",
        "Write 8 full-length essays",
        "Take 6 simulated bar exams",
        "Master all Civil Procedure and jurisdictional issues",
        "Review leading case law for Constitutional challenges",
      ],
      [
        "Complete 320 practice questions across subjects",
        "Analyze 20 key Constitutional Law cases",
        "Write 10 practice essays on Torts",
        "Take 7 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
      [
        "Complete 340 practice questions across subjects",
        "Master 12 complex legal scenarios",
        "Write 12 practice essays on Contracts",
        "Take 8 full-length practice exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 360 practice questions across subjects",
        "Analyze 25 key Criminal Law cases",
        "Write 14 practice essays on Torts",
        "Take 9 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
  },
  amazing: {
    today: [
      "Master advanced Constitutional Law principles",
      "Solve 25 expert-level Contract Law questions",
      "Analyze case law trends in Criminal Law",
      "Memorize exceptions to all major rules in Evidence",
      "Practice writing a full-length essay in 30 minutes",
    ],
    weekly: [
      [
        "Complete 80 mixed-subject multiple-choice questions",
        "Write 5 timed essays under real bar exam conditions",
        "Simulate a full-length bar exam section",
        "Review state-specific Civil Procedure distinctions",
        "Debrief 3 past exam essay answers and improve analysis",
      ],
      [
        "Complete 85 Evidence multiple-choice questions",
        "Write 6 essays on Contracts",
        "Analyze 15 key Criminal Law cases",
        "Review Civil Procedure rules",
        "Memorize key Real Property concepts",
      ],
      [
        "Complete 90 multiple-choice questions across all subjects",
        "Write 7 practice essays covering multiple subjects",
        "Master 5 analytical reasoning scenarios",
        "Take 2 full-length simulated exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 95 multiple-choice questions across all subjects",
        "Write 8 practice essays on Torts",
        "Analyze 20 key Constitutional Law cases",
        "Take 3 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
    monthly: [
      [
        "Complete 400+ practice questions across all subjects",
        "Master all major Real Property and Torts concepts",
        "Take 8 full-length bar exam simulations",
        "Write and self-grade 10 full essays",
        "Review all commonly tested legal doctrines",
      ],
      [
        "Complete 420 practice questions across subjects",
        "Analyze 25 key Constitutional Law cases",
        "Write 12 practice essays on Torts",
        "Take 9 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
      [
        "Complete 440 practice questions across subjects",
        "Master 15 complex legal scenarios",
        "Write 14 practice essays on Contracts",
        "Take 10 full-length practice exams",
        "Review major jurisdictional rules in Civil Procedure",
      ],
      [
        "Complete 460 practice questions across subjects",
        "Analyze 30 key Criminal Law cases",
        "Write 16 practice essays on Torts",
        "Take 11 full-length practice exams",
        "Review the Federal Rules of Evidence",
      ],
    ],
  },
};