// examStrengthsAndImprovements.ts
type ExamStrengthsAndImprovements = {
  [key: string]: {
    strengths: string[];
    areasForImprovement: string[];
  };
};

export  const examStrengthsAndImprovements: ExamStrengthsAndImprovements = {
  "constitutional-law": {
    strengths: [
      "Logical Reasoning - Assumption Questions",
      "Reading Comprehension - Humanities Passages",
      "Pacing on Reading Comprehension",
    ],
    areasForImprovement: [
      "Analytical Reasoning - Grouping Games",
      "Logical Reasoning - Conditional Logic",
      "Reading Comprehension - Science Passages",
    ],
  },
  contracts: {
    strengths: [
      "Contract Formation - Offer and Acceptance",
      "Contract Interpretation - Plain Meaning Rule",
      "Remedies - Specific Performance",
    ],
    areasForImprovement: [
      "Contract Defenses - Duress and Undue Influence",
      "Third-Party Rights - Assignment and Delegation",
      "Statute of Frauds - Exceptions",
    ],
  },
  "criminal-law-procedure": {
    strengths: [
      "Elements of Crimes - Mens Rea and Actus Reus",
      "Defenses - Insanity and Intoxication",
      "Fourth Amendment - Search and Seizure",
    ],
    areasForImprovement: [
      "Fifth Amendment - Self-Incrimination",
      "Sixth Amendment - Right to Counsel",
      "Sentencing - Mitigating Factors",
    ],
  },
  "civil-procedure": {
    strengths: [
      "Jurisdiction - Subject Matter and Personal",
      "Pleading Standards - Notice Pleading",
      "Pre-Trial Motions - Summary Judgment",
    ],
    areasForImprovement: [
      "Discovery - Scope and Limitations",
      "Appeals - Final Judgment Rule",
      "Class Actions - Certification Requirements",
    ],
  },
  evidence: {
    strengths: [
      "Relevance - Probative Value vs. Prejudice",
      "Hearsay - Exceptions and Exclusions",
      "Impeachment - Prior Inconsistent Statements",
    ],
    areasForImprovement: [
      "Privileges - Attorney-Client and Doctor-Patient",
      "Authentication - Chain of Custody",
      "Expert Testimony - Daubert Standard",
    ],
  },
  "real-property": {
    strengths: [
      "Estates in Land - Fee Simple and Life Estates",
      "Concurrent Ownership - Joint Tenancy and Tenancy in Common",
      "Landlord-Tenant Law - Lease Agreements",
    ],
    areasForImprovement: [
      "Easements - Creation and Termination",
      "Zoning - Variance and Nonconforming Use",
      "Adverse Possession - Elements and Defenses",
    ],
  },
  torts: {
    strengths: [
      "Negligence - Duty of Care and Breach",
      "Intentional Torts - Assault and Battery",
      "Strict Liability - Abnormally Dangerous Activities",
    ],
    areasForImprovement: [
      "Defenses - Contributory and Comparative Negligence",
      "Damages - Compensatory and Punitive",
      "Products Liability - Design and Manufacturing Defects",
    ],
  },
  "family-law": {
    strengths: [
      "Marriage - Validity and Annulment",
      "Divorce - Grounds and Property Division",
      "Child Custody - Best Interests of the Child",
    ],
    areasForImprovement: [
      "Child Support - Calculation and Enforcement",
      "Adoption - Legal Requirements",
      "Domestic Violence - Protective Orders",
    ],
  },
  "business-associations": {
    strengths: [
      "Corporations - Formation and Governance",
      "Partnerships - General and Limited",
      "Fiduciary Duties - Directors and Officers",
    ],
    areasForImprovement: [
      "Shareholder Rights - Derivative Suits",
      "Mergers and Acquisitions - Appraisal Rights",
      "Securities Regulation - Disclosure Requirements",
    ],
  },
  "wills-trusts-estates": {
    strengths: [
      "Wills - Execution and Revocation",
      "Trusts - Creation and Administration",
      "Intestate Succession - Default Rules",
    ],
    areasForImprovement: [
      "Estate Planning - Tax Implications",
      "Will Contests - Undue Influence",
      "Trustee Duties - Breach and Remedies",
    ],
  },
  "professional-responsibility": {
    strengths: [
      "Conflicts of Interest - Identification and Resolution",
      "Confidentiality - Attorney-Client Privilege",
      "Competence - Duty to Provide Adequate Representation",
    ],
    areasForImprovement: [
      "Advertising - Ethical Restrictions",
      "Fees - Reasonableness and Disclosure",
      "Withdrawal - Mandatory and Permissive",
    ],
  },
  "secured-transactions": {
    strengths: [
      "Attachment - Creation of Security Interests",
      "Perfection - Filing and Possession",
      "Priority - Competing Claims",
    ],
    areasForImprovement: [
      "Default - Rights and Remedies",
      "Bankruptcy - Impact on Security Interests",
      "Consumer Transactions - Special Rules",
    ],
  },
}; 