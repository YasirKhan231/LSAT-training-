type CaseData = {
  id: string;
  title: string;
  facts: string;
  issue: string;
  holding: string;
  reasoning: string;
};

export const sampleCases: CaseData[] = [
  // **Judicial Review & Court Powers**
  {
    id: "case1",
    title: "Marbury v. Madison (1803)",
    facts: "William Marbury was appointed as a justice of the peace but did not receive his commission. He sued Secretary of State James Madison to force its delivery.",
    issue: "Does the Supreme Court have the authority to review acts of Congress and declare them unconstitutional?",
    holding: "Yes, the Court established the principle of judicial review.",
    reasoning: "The Constitution is the supreme law, and it is the judiciary’s duty to interpret it, including invalidating laws that conflict with it."
  },
  {
    id: "case2",
    title: "Martin v. Hunter's Lessee (1816)",
    facts: "A dispute over land confiscated during the Revolutionary War led to Virginia courts refusing to comply with a Supreme Court ruling.",
    issue: "Does the Supreme Court have appellate jurisdiction over state court decisions on federal law?",
    holding: "Yes, the Supreme Court has authority to review state court judgments on federal constitutional issues.",
    reasoning: "The Constitution’s Supremacy Clause and Judiciary Act of 1789 establish federal judicial supremacy."
  },
  {
    id: "case3",
    title: "Cooper v. Aaron (1958)",
    facts: "Arkansas officials resisted school desegregation after Brown v. Board, arguing they were not bound by Supreme Court rulings.",
    issue: "Are state officials bound by Supreme Court interpretations of the Constitution?",
    holding: "Yes, states must comply with Supreme Court constitutional interpretations.",
    reasoning: "The Constitution’s supremacy makes Court rulings binding on all states under Article VI."
  },
  {
    id: "case4",
    title: "Ex parte McCardle (1869)",
    facts: "A newspaper editor jailed for criticizing Reconstruction appealed under an 1867 statute, which Congress later repealed to prevent jurisdiction.",
    issue: "May Congress remove the Supreme Court’s appellate jurisdiction?",
    holding: "Yes, Congress has broad authority to regulate the Court’s appellate jurisdiction.",
    reasoning: "Article III allows Congress to make 'exceptions' to appellate jurisdiction."
  },
  {
    id: "case5",
    title: "United States v. Klein (1871)",
    facts: "Congress passed a law attempting to dictate outcomes in cases involving pardons for Confederate sympathizers.",
    issue: "May Congress dictate judicial outcomes in pending cases?",
    holding: "No, Congress cannot interfere with judicial decision-making.",
    reasoning: "Separation of powers prohibits legislative interference with judicial functions."
  },
  {
    id: "case6",
    title: "Plaut v. Spendthrift Farm, Inc. (1995)",
    facts: "Congress revived securities fraud claims after the Supreme Court dismissed them as time-barred.",
    issue: "May Congress reopen final judicial judgments?",
    holding: "No, Congress cannot retroactively alter final judgments.",
    reasoning: "Article III protects judicial finality as part of separation of powers."
  },
  {
    id: "case7",
    title: "City of Boerne v. Flores (1997)",
    facts: "Congress passed the Religious Freedom Restoration Act (RFRA) in response to Employment Division v. Smith.",
    issue: "May Congress expand religious freedoms beyond Court interpretations?",
    holding: "No, Congress cannot redefine constitutional rights under Section 5 of the Fourteenth Amendment.",
    reasoning: "Section 5 grants enforcement power, not authority to change constitutional meaning."
  },
  {
    id: "case8",
    title: "Shelby County v. Holder (2013)",
    facts: "Shelby County challenged Section 4(b) of the Voting Rights Act, which required preclearance for voting changes in certain states.",
    issue: "Is the preclearance coverage formula constitutional?",
    holding: "No, the formula is unconstitutional as it exceeds Congress’s enforcement power.",
    reasoning: "The formula was based on outdated data and violated 'equal sovereignty' of states."
  },

  // **Federalism & Commerce Clause**
  {
    id: "case9",
    title: "McCulloch v. Maryland (1819)",
    facts: "Maryland taxed the Second Bank of the United States; cashier James McCulloch refused to pay.",
    issue: "Does Congress have implied powers to create a national bank, and can states tax federal entities?",
    holding: "Yes to implied powers (Necessary and Proper Clause); no to state taxation.",
    reasoning: "Federal supremacy prevents state interference with federal operations."
  },
  {
    id: "case10",
    title: "Gibbons v. Ogden (1824)",
    facts: "New York granted a steamboat monopoly conflicting with a federal coastal license.",
    issue: "Does the Commerce Clause give Congress exclusive power over interstate navigation?",
    holding: "Yes, Congress has broad authority to regulate interstate commerce, including navigation.",
    reasoning: "Commerce includes all commercial intercourse between states."
  },
  {
    id: "case11",
    title: "United States v. E.C. Knight Co. (1895)",
    facts: "The federal government sued to block a sugar refining monopoly under the Sherman Antitrust Act.",
    issue: "Does Congress have authority to regulate manufacturing under the Commerce Clause?",
    holding: "No, manufacturing is not commerce under the Commerce Clause.",
    reasoning: "Commerce ends when goods come to rest; manufacturing precedes commerce."
  },
  {
    id: "case12",
    title: "Champion v. Ames (1903)",
    facts: "Congress banned interstate lottery ticket sales under the Commerce Clause.",
    issue: "May Congress prohibit interstate shipment of lottery tickets?",
    holding: "Yes, Congress may regulate immoral or harmful interstate activities.",
    reasoning: "The Commerce Clause includes authority to prohibit certain goods."
  },
  {
    id: "case13",
    title: "Hammer v. Dagenhart (1918)",
    facts: "Congress banned interstate shipment of goods produced with child labor.",
    issue: "Does Congress have authority to regulate child labor under the Commerce Clause?",
    holding: "No, production is not commerce, and regulation violates state police powers.",
    reasoning: "The Tenth Amendment reserves manufacturing regulation to states."
  },
  {
    id: "case14",
    title: "Wickard v. Filburn (1942)",
    facts: "A farmer grew excess wheat for personal use, violating federal quotas.",
    issue: "May Congress regulate purely local activities under the Commerce Clause?",
    holding: "Yes, if the activity, in aggregate, substantially affects interstate commerce.",
    reasoning: "Even small individual effects can collectively impact the national market."
  },
  {
    id: "case15",
    title: "Heart of Atlanta Motel v. United States (1964)",
    facts: "A motel refused to serve Black customers, violating the Civil Rights Act of 1964.",
    issue: "Does Congress have authority under the Commerce Clause to ban racial discrimination in public accommodations?",
    holding: "Yes, racial discrimination in hotels substantially affects interstate commerce.",
    reasoning: "Travelers between states are part of interstate commerce."
  },
  {
    id: "case16",
    title: "Katzenbach v. McClung (1964)",
    facts: "Ollie’s Barbecue refused to serve Black customers, challenging the Civil Rights Act.",
    issue: "Can Congress regulate local restaurants under the Commerce Clause?",
    holding: "Yes, racial discrimination in restaurants affects interstate commerce.",
    reasoning: "Food served in restaurants moves in interstate commerce."
  },
  {
    id: "case17",
    title: "United States v. Lopez (1995)",
    facts: "A student carried a gun to school, violating the Gun-Free School Zones Act.",
    issue: "Does Congress have authority under the Commerce Clause to regulate guns in schools?",
    holding: "No, gun possession in schools does not substantially affect interstate commerce.",
    reasoning: "The law exceeded Congress’s commerce power and violated federalism."
  },
  {
    id: "case18",
    title: "United States v. Morrison (2000)",
    facts: "A student sued under the Violence Against Women Act after being raped.",
    issue: "Does Congress have authority to create a federal civil remedy for gender-motivated violence?",
    holding: "No, gender-motivated crimes are not economic activity under the Commerce Clause.",
    reasoning: "Violence against women is a local issue, not interstate commerce."
  },
  {
    id: "case19",
    title: "Gonzales v. Raich (2005)",
    facts: "California allowed medical marijuana, but federal law prohibited it.",
    issue: "Does Congress have authority to ban locally grown medical marijuana?",
    holding: "Yes, under the Commerce Clause, Congress may regulate homegrown marijuana.",
    reasoning: "Local cultivation could affect the national marijuana market."
  },
  {
    id: "case20",
    title: "NFIB v. Sebelius (2012)",
    facts: "States challenged the Affordable Care Act’s individual mandate.",
    issue: "Does Congress have authority under the Commerce Clause to require health insurance?",
    holding: "No, but the mandate is constitutional as a tax under Congress’s taxing power.",
    reasoning: "The Commerce Clause does not permit Congress to compel economic activity."
  },

  // **Federalism & State Powers**
  {
    id: "case21",
    title: "Cooley v. Board of Wardens (1852)",
    facts: "Pennsylvania required ships to hire local pilots or pay a fee.",
    issue: "Does the Commerce Clause permit state regulation of interstate commerce?",
    holding: "Yes, if the subject requires local uniformity and Congress has not acted.",
    reasoning: "The Dormant Commerce Clause allows state regulation in certain cases."
  },
  {
    id: "case22",
    title: "Pike v. Bruce Church, Inc. (1970)",
    facts: "Arizona required cantaloupes grown in-state to be packed there before interstate sale.",
    issue: "Does the Dormant Commerce Clause prohibit state laws that burden interstate commerce?",
    holding: "Yes, unless the law’s local benefits outweigh the burden on commerce.",
    reasoning: "Courts balance state interests against interstate commerce effects."
  },
  {
    id: "case23",
    title: "Hughes v. Oklahoma (1979)",
    facts: "Oklahoma banned exporting minnows caught in-state.",
    issue: "Does the Dormant Commerce Clause prohibit state restrictions on natural resource exports?",
    holding: "Yes, states may not discriminate against interstate commerce.",
    reasoning: "Protectionist laws violate the Commerce Clause."
  },
  {
    id: "case24",
    title: "Maine v. Taylor (1986)",
    facts: "Maine banned importing out-of-state baitfish to protect local ecosystems.",
    issue: "Does the Dormant Commerce Clause allow environmental exceptions?",
    holding: "Yes, if no less discriminatory alternatives exist.",
    reasoning: "Legitimate local interests may justify some restrictions."
  },
  {
    id: "case25",
    title: "New Energy Co. v. Limbach (1988)",
    facts: "Ohio gave tax credits for ethanol, but only if produced in-state.",
    issue: "Does the Dormant Commerce Clause prohibit discriminatory tax credits?",
    holding: "Yes, state tax incentives favoring in-state businesses are unconstitutional.",
    reasoning: "Such laws distort interstate competition."
  },
  {
    id: "case26",
    title: "West Lynn Creamery v. Healy (1994)",
    facts: "Massachusetts taxed all milk sales but rebated proceeds to in-state producers.",
    issue: "Does a combined tax-and-subsidy scheme violate the Dormant Commerce Clause?",
    holding: "Yes, even indirect discrimination against out-of-state businesses is invalid.",
    reasoning: "The law effectively subsidized local producers at out-of-state expense."
  },
  {
    id: "case27",
    title: "Printz v. United States (1997)",
    facts: "The Brady Act required local law enforcement to conduct background checks.",
    issue: "May Congress compel state officials to enforce federal law?",
    holding: "No, the federal government cannot commandeer state officials.",
    reasoning: "The anti-commandeering principle protects state sovereignty."
  },
  {
    id: "case28",
    title: "Murphy v. NCAA (2018)",
    facts: "New Jersey legalized sports betting, conflicting with a federal ban.",
    issue: "Does the federal ban unconstitutionally commandeer state legislatures?",
    holding: "Yes, Congress cannot directly regulate state laws under the Commerce Clause.",
    reasoning: "The anti-commandeering doctrine applies to state legislative authority."
  },

  // **Taxing & Spending Power**
  {
    id: "case29",
    title: "Bailey v. Drexel Furniture (1922)",
    facts: "Congress imposed a tax on businesses using child labor.",
    issue: "May Congress use taxing power to regulate child labor?",
    holding: "No, the tax was a penalty exceeding Congress’s authority.",
    reasoning: "The Tenth Amendment reserves labor regulation to states."
  },
  {
    id: "case30",
    title: "United States v. Butler (1936)",
    facts: "Congress taxed agricultural processors to fund farm subsidies.",
    issue: "Does Congress have authority to regulate agriculture through taxes?",
    holding: "No, the tax was an unconstitutional attempt to control production.",
    reasoning: "The spending power must be for general welfare, not economic coercion."
  },
  {
    id: "case31",
    title: "South Dakota v. Dole (1987)",
    facts: "Congress withheld highway funds from states with drinking ages under 21.",
    issue: "May Congress condition federal funds on state compliance?",
    holding: "Yes, if the condition is related to the federal interest and not coercive.",
    reasoning: "Spending conditions must be unambiguous and reasonably related."
  },
  {
    id: "case32",
    title: "NFIB v. Sebelius (2012) (Medicaid Expansion)",
    facts: "The ACA required states to expand Medicaid or lose all federal funding.",
    issue: "Is the Medicaid expansion condition coercive?",
    holding: "Yes, threatening total loss of funds is unconstitutionally coercive.",
    reasoning: "States must have a genuine choice in accepting federal conditions."
  },

  // **Presidential Powers**
  {
    id: "case33",
    title: "Youngstown Sheet & Tube Co. v. Sawyer (1952)",
    facts: "President Truman seized steel mills during the Korean War to prevent a strike.",
    issue: "Does the President have inherent authority to seize private property?",
    holding: "No, the President lacks constitutional or statutory authority for such seizures.",
    reasoning: "Only Congress, not the President, can make such economic decisions."
  },
  {
    id: "case34",
    title: "United States v. Nixon (1974)",
    facts: "President Nixon refused to release White House tapes during the Watergate scandal.",
    issue: "Does executive privilege allow the President to withhold evidence in criminal cases?",
    holding: "No, executive privilege is not absolute and must yield to judicial process.",
    reasoning: "The need for evidence in criminal trials outweighs generalized confidentiality."
  },
  {
    id: "case35",
    title: "Clinton v. Jones (1997)",
    facts: "Paula Jones sued President Clinton for sexual harassment while in office.",
    issue: "Is a sitting President immune from civil lawsuits?",
    holding: "No, the President is not immune from civil litigation for unofficial acts.",
    reasoning: "The Constitution does not grant temporary immunity from private suits."
  },
  {
    id: "case36",
    title: "Nixon v. Fitzgerald (1982)",
    facts: "A former Air Force analyst sued Nixon for wrongful termination.",
    issue: "Is a President immune from civil damages for official acts?",
    holding: "Yes, the President has absolute immunity for acts within official duties.",
    reasoning: "Immunity protects the President from distractions while in office."
  },
  {
    id: "case37",
    title: "Trump v. Vance (2020)",
    facts: "A New York prosecutor subpoenaed Trump’s tax records for a state criminal investigation.",
    issue: "May a state compel a sitting President’s financial records?",
    holding: "Yes, the President is not categorically immune from state criminal subpoenas.",
    reasoning: "State grand jury investigations do not unduly burden presidential duties."
  },
  {
    id: "case38",
    title: "Zivotofsky v. Kerry (2015)",
    facts: "A U.S. citizen born in Jerusalem sued to have 'Israel' listed as his birthplace on his passport.",
    issue: "Does the President have exclusive recognition power over foreign states?",
    holding: "Yes, the President has sole authority to recognize foreign governments.",
    reasoning: "Recognition is a core executive power under Article II."
  },
  {
    id: "case39",
    title: "INS v. Chadha (1983)",
    facts: "Congress used a one-house veto to overturn an executive deportation decision.",
    issue: "Is the legislative veto constitutional?",
    holding: "No, legislative vetoes violate the bicameralism and presentment requirements.",
    reasoning: "Congress must pass laws through both houses and present them to the President."
  },
  {
    id: "case40",
    title: "Bowsher v. Synar (1986)",
    facts: "Congress gave the Comptroller General authority to enforce budget cuts under the Gramm-Rudman Act.",
    issue: "Does this violate separation of powers?",
    holding: "Yes, Congress cannot assign executive functions to an officer under its control.",
    reasoning: "The Constitution vests executive power solely in the President."
  },
  {
    id: "case41",
    title: "Mistretta v. United States (1989)",
    facts: "Congress created the U.S. Sentencing Commission to set binding sentencing guidelines.",
    issue: "Does this violate the nondelegation doctrine?",
    holding: "No, Congress may delegate rulemaking authority with clear standards.",
    reasoning: "The delegation was sufficiently constrained by statutory guidelines."
  },
  {
    id: "case42",
    title: "Trump v. Hawaii (2018)",
    facts: "President Trump issued a travel ban on several Muslim-majority countries.",
    issue: "Does the travel ban exceed presidential authority?",
    holding: "No, the President has broad authority over immigration under federal law.",
    reasoning: "The ban was facially neutral and within statutory and constitutional limits."
  },

  // **Due Process - Substantive**
  {
    id: "case43",
    title: "Lochner v. New York (1905)",
    facts: "New York limited bakers to a 60-hour workweek for health reasons.",
    issue: "Does the law violate liberty of contract under the Due Process Clause?",
    holding: "Yes, the law unreasonably interferes with employer-employee contracts.",
    reasoning: "The Fourteenth Amendment protects economic liberty from arbitrary state interference."
  },
  {
    id: "case44",
    title: "Nebbia v. New York (1934)",
    facts: "New York set minimum milk prices to stabilize the dairy industry.",
    issue: "Does price regulation violate due process?",
    holding: "No, states may regulate business to serve the public interest.",
    reasoning: "Economic regulations need only be reasonable and not arbitrary."
  },
  {
    id: "case45",
    title: "West Coast Hotel v. Parrish (1937)",
    facts: "A hotel challenged Washington’s minimum wage law for women.",
    issue: "Does a minimum wage law violate liberty of contract?",
    holding: "No, states may regulate wages to protect workers’ welfare.",
    reasoning: "The Constitution does not prohibit reasonable economic regulations."
  },
  {
    id: "case46",
    title: "Williamson v. Lee Optical (1955)",
    facts: "An Oklahoma law required prescriptions for eyeglass lens replacements.",
    issue: "Does the law violate due process?",
    holding: "No, economic regulations need only have a rational basis.",
    reasoning: "Courts defer to legislatures on economic policy unless irrational."
  },
  {
    id: "case47",
    title: "Meyer v. Nebraska (1923)",
    facts: "Nebraska banned teaching foreign languages to young children.",
    issue: "Does the law violate parents’ rights to direct their children’s education?",
    holding: "Yes, the law infringes on liberty under the Due Process Clause.",
    reasoning: "Parents have a constitutional right to control their children’s upbringing."
  },
  {
    id: "case48",
    title: "Pierce v. Society of Sisters (1925)",
    facts: "Oregon required all children to attend public schools.",
    issue: "Does the law violate parents’ rights to choose private or religious schools?",
    holding: "Yes, the law unreasonably interferes with parental liberty.",
    reasoning: "The Due Process Clause protects the right to direct children’s education."
  },
  {
    id: "case49",
    title: "Griswold v. Connecticut (1965)",
    facts: "Connecticut banned contraceptives, even for married couples.",
    issue: "Does the law violate a right to marital privacy?",
    holding: "Yes, the law infringes on a fundamental right to privacy.",
    reasoning: "The Bill of Rights creates 'penumbras' protecting privacy in marriage."
  },
  {
    id: "case50",
    title: "Eisenstadt v. Baird (1972)",
    facts: "Massachusetts banned distributing contraceptives to unmarried people.",
    issue: "Does the law violate equal protection and privacy rights?",
    holding: "Yes, the law discriminates against unmarried individuals without justification.",
    reasoning: "Privacy rights apply to all individuals, not just married couples."
  },{
    id: "case61",
    title: "Plessy v. Ferguson (1896)",
    facts: "Homer Plessy, a man of mixed race, was arrested for sitting in a 'whites-only' train car under Louisiana's Separate Car Act.",
    issue: "Does racial segregation violate the Equal Protection Clause?",
    holding: "No, 'separate but equal' facilities are constitutional.",
    reasoning: "The 14th Amendment guarantees legal equality but permits social segregation."
  },
  {
    id: "case62",
    title: "Buchanan v. Warley (1917)",
    facts: "Louisville ordinance prohibited Black people from buying homes on majority-white blocks.",
    issue: "Does racial zoning violate the 14th Amendment?",
    holding: "Yes, racial housing restrictions are unconstitutional.",
    reasoning: "Violates property rights and Equal Protection Clause."
  },
  {
    id: "case63",
    title: "Korematsu v. United States (1944)",
    facts: "Japanese-American citizen defied WWII internment orders.",
    issue: "Can citizens be forcibly relocated based on race?",
    holding: "Yes, military necessity justified (later repudiated).",
    reasoning: "Wartime deference to military (now widely criticized)."
  },
  {
    id: "case64",
    title: "Shelley v. Kraemer (1948)",
    facts: "White homeowners sued to enforce racial covenant against Black buyers.",
    issue: "Can courts enforce private racial covenants?",
    holding: "No, judicial enforcement violates 14th Amendment.",
    reasoning: "Court action constitutes state-sponsored discrimination."
  },
  {
    id: "case65",
    title: "Brown v. Board of Education (1954)",
    facts: "Black students denied admission to white schools under 'separate but equal'.",
    issue: "Does school segregation violate equal protection?",
    holding: "Yes, segregated schools are inherently unequal.",
    reasoning: "Generates feelings of inferiority in minority children."
  },
  {
    id: "case66",
    title: "Brown v. Board of Education II (1955)",
    facts: "Schools resisted desegregation after Brown I.",
    issue: "How should desegregation be implemented?",
    holding: "Schools must desegregate 'with all deliberate speed'.",
    reasoning: "Federal courts oversee compliance with Brown I."
  },
  {
    id: "case67",
    title: "Loving v. Virginia (1967)",
    facts: "Interracial couple convicted under Virginia's anti-miscegenation law.",
    issue: "Do bans on interracial marriage violate equal protection?",
    holding: "Yes, racial classifications in marriage are unconstitutional.",
    reasoning: "Marriage is a fundamental right protected by 14th Amendment."
  },
  {
    id: "case68",
    title: "Washington v. Davis (1976)",
    facts: "D.C. police exam disproportionately excluded Black applicants.",
    issue: "Must discrimination be intentional to violate equal protection?",
    holding: "Yes, disparate impact alone is insufficient.",
    reasoning: "14th Amendment prohibits purposeful discrimination."
  },
  {
    id: "case69",
    title: "Village of Arlington Heights v. Metropolitan Housing Corp. (1977)",
    facts: "Zoning change blocked low-income housing in white neighborhood.",
    issue: "How to prove discriminatory intent?",
    holding: "Consider history, procedural irregularities, and legislative history.",
    reasoning: "Facially neutral laws can violate equal protection if motivated by discrimination."
  },
  {
    id: "case70",
    title: "Regents of the University of California v. Bakke (1978)",
    facts: "White applicant denied admission to UC Davis Medical School's minority quota program.",
    issue: "Does racial affirmative action violate equal protection?",
    holding: "Quotas are unconstitutional but race may be a 'plus factor'.",
    reasoning: "Diversity is compelling interest, but rigid quotas aren't narrowly tailored."
  },
  {
    id: "case71",
    title: "Batson v. Kentucky (1986)",
    facts: "Prosecutor struck Black jurors from Black defendant's trial.",
    issue: "Does race-based jury selection violate equal protection?",
    holding: "Yes, peremptory strikes based on race are unconstitutional.",
    reasoning: "Racial discrimination in jury selection undermines fairness."
  },
  {
    id: "case72",
    title: "City of Richmond v. J.A. Croson Co. (1989)",
    facts: "Richmond required 30% of contracts go to minority-owned businesses.",
    issue: "Do racial set-asides violate equal protection?",
    holding: "Yes, strict scrutiny applies and Richmond lacked evidence of past discrimination.",
    reasoning: "Race-based remedies must address specific instances of discrimination."
  },
  {
    id: "case73",
    title: "Grutter v. Bollinger (2003)",
    facts: "University of Michigan Law School used race as admissions factor.",
    issue: "Is racial diversity in higher education a compelling interest?",
    holding: "Yes, narrowly tailored affirmative action is constitutional.",
    reasoning: "Diversity benefits education, but quotas are impermissible."
  },
  {
    id: "case74",
    title: "Gratz v. Bollinger (2003)",
    facts: "UMichigan undergrad admissions gave automatic points to minorities.",
    issue: "Does points-based affirmative action violate equal protection?",
    holding: "Yes, not narrowly tailored.",
    reasoning: "Mechanical racial bonuses are unconstitutional."
  },
  {
    id: "case75",
    title: "Parents Involved in Community Schools v. Seattle School District (2007)",
    facts: "School districts used race to assign students to balance diversity.",
    issue: "Can K-12 schools use race in student assignments?",
    holding: "No, racial balancing is not a compelling interest.",
    reasoning: "Race-based classifications must meet strict scrutiny."
  },
  {
    id: "case76",
    title: "Fisher v. University of Texas (2016)",
    facts: "UT Austin considered race as one factor in holistic admissions.",
    issue: "Does the policy satisfy strict scrutiny?",
    holding: "Yes, narrowly tailored to achieve diversity.",
    reasoning: "University proved no workable race-neutral alternatives."
  },
  {
    id: "case77",
    title: "Students for Fair Admissions v. Harvard/UNC (2023)",
    facts: "Harvard and UNC used race-conscious admissions; Asian American applicants alleged discrimination.",
    issue: "Is affirmative action in college admissions constitutional?",
    holding: "No, race-based admissions violate equal protection.",
    reasoning: "Diversity interests cannot justify racial classifications indefinitely."
  },

  // ========================
  // **Equal Protection - Gender (78-83)**
  // ========================
  {
    id: "case78",
    title: "Reed v. Reed (1971)",
    facts: "Idaho preferred men over women as estate administrators.",
    issue: "Does gender discrimination violate equal protection?",
    holding: "Yes, gender classifications require rational basis review.",
    reasoning: "First case to strike down gender discrimination under 14th Amendment."
  },
  {
    id: "case79",
    title: "Frontiero v. Richardson (1973)",
    facts: "Military benefits automatically granted to wives of servicemen but not husbands of servicewomen.",
    issue: "Does this gender distinction violate equal protection?",
    holding: "Yes, gender classifications are 'inherently suspect'.",
    reasoning: "Sex-based distinctions often reflect stereotypes."
  },
  {
    id: "case80",
    title: "Craig v. Boren (1976)",
    facts: "Oklahoma allowed women to buy low-alcohol beer at 18 but men at 21.",
    issue: "Does this gender classification survive scrutiny?",
    holding: "No, must serve 'important governmental objectives' and be 'substantially related'.",
    reasoning: "Established intermediate scrutiny for gender discrimination."
  },
  {
    id: "case81",
    title: "United States v. Virginia (1996)",
    facts: "Virginia Military Institute (VMI) was all-male; created separate program for women.",
    issue: "Does excluding women from VMI violate equal protection?",
    holding: "Yes, gender classifications require 'exceedingly persuasive justification'.",
    reasoning: "Separate program was not equal; stereotypes can't justify exclusion."
  },
  {
    id: "case82",
    title: "Nguyen v. INS (2001)",
    facts: "U.S. citizen father couldn't automatically pass citizenship to child born abroad (unlike mothers).",
    issue: "Does this gender distinction violate equal protection?",
    holding: "No, law served important interest in ensuring parent-child relationship.",
    reasoning: "Based on biological differences, not stereotypes."
  },
  {
    id: "case83",
    title: "Sessions v. Morales-Santana (2017)",
    facts: "Father couldn't transmit citizenship due to residency requirements that only applied to unwed fathers.",
    issue: "Does this gender distinction violate equal protection?",
    holding: "Yes, based on outdated stereotypes.",
    reasoning: "Gender classifications must be substantially related to important interests."
  },

  // ========================
  // **Equal Protection - Other (84-89)**
  // ========================
  {
    id: "case84",
    title: "Cleburne v. Cleburne Living Center (1985)",
    facts: "Texas city required special permit for group home for intellectually disabled.",
    issue: "Does this violate equal protection?",
    holding: "Yes, law lacked rational basis.",
    reasoning: "Prejudice against disabled persons isn't legitimate government interest."
  },
  {
    id: "case85",
    title: "Romer v. Evans (1996)",
    facts: "Colorado amended constitution to bar anti-discrimination protections for gays.",
    issue: "Does this violate equal protection?",
    holding: "Yes, law lacked rational basis and was motivated by animus.",
    reasoning: "Cannot target group for disfavored legal status."
  },
  {
    id: "case86",
    title: "San Antonio Independent School District v. Rodriguez (1973)",
    facts: "Texas funded schools through local property taxes, creating wealth disparities.",
    issue: "Does this violate equal protection?",
    holding: "No, education isn't fundamental right under Constitution.",
    reasoning: "System had rational basis (local control of schools)."
  },
  {
    id: "case87",
    title: "Plyler v. Doe (1982)",
    facts: "Texas denied public education to undocumented immigrant children.",
    issue: "Does this violate equal protection?",
    holding: "Yes, law lacked rational basis and harmed children.",
    reasoning: "Cannot punish children for parents' status."
  },
  {
    id: "case88",
    title: "Massachusetts Board of Retirement v. Murgia (1976)",
    facts: "State law required police officers to retire at 50.",
    issue: "Does this violate equal protection?",
    holding: "No, age classifications subject to rational basis review.",
    reasoning: "Law was rationally related to public safety."
  },
  {
    id: "case89",
    title: "Graham v. Richardson (1971)",
    facts: "Arizona denied welfare benefits to non-citizens.",
    issue: "Does this violate equal protection?",
    holding: "Yes, alienage classifications subject to strict scrutiny.",
    reasoning: "Non-citizens are 'discrete and insular minority' needing protection."
  },

  // ========================
  // **First Amendment - Speech (90-110)**
  // ========================
  {
    id: "case90",
    title: "Schenck v. United States (1919)",
    facts: "Socialist distributed anti-draft pamphlets during WWI.",
    issue: "Does anti-draft speech violate Espionage Act?",
    holding: "Yes, if creates 'clear and present danger'.",
    reasoning: "Famous 'fire in crowded theater' analogy for speech limits."
  },
  {
    id: "case91",
    title: "Brandenburg v. Ohio (1969)",
    facts: "KKK leader gave racist speech advocating violence.",
    issue: "What standard applies to inflammatory speech?",
    holding: "Only if likely to incite 'imminent lawless action'.",
    reasoning: "Replaced 'clear and present danger' with stricter protections."
  },
  {
    id: "case92",
    title: "Texas v. Johnson (1989)",
    facts: "Man burned American flag in political protest.",
    issue: "Is flag burning protected speech?",
    holding: "Yes, symbolic speech is protected under First Amendment.",
    reasoning: "Government can't prohibit expression of particular ideas."
  },
  {
    id: "case93",
    title: "Citizens United v. FEC (2010)",
    facts: "Nonprofit wanted to air political documentary during election season.",
    issue: "Can government restrict corporate political spending?",
    holding: "No, political spending is protected speech.",
    reasoning: "Corporations have First Amendment rights in elections."
  },
  {
    id: "case94",
    title: "New York Times v. Sullivan (1964)",
    facts: "Alabama official sued over civil rights ad containing minor inaccuracies.",
    issue: "What standard applies to defamation of public officials?",
    holding: "Must prove 'actual malice' (knowing falsehood or reckless disregard).",
    reasoning: "Protects robust debate about public figures."
  },{
    id: "case95",
    title: "Tinker v. Des Moines (1969)",
    facts: "Students suspended for wearing black armbands to protest Vietnam War.",
    issue: "Does prohibiting student anti-war speech violate First Amendment?",
    holding: "Yes, students retain constitutional rights in school.",
    reasoning: "School must show substantial disruption to prohibit speech."
  },
  {
    id: "case96",
    title: "Hustler Magazine v. Falwell (1988)",
    facts: "Magazine published parody suggesting Jerry Falwell had drunken incestuous relationship.",
    issue: "Does parody about public figures violate First Amendment?",
    holding: "No, public figures can't recover for intentional infliction of emotional distress from satire.",
    reasoning: "Protects free speech even when offensive or outrageous."
  },
  {
    id: "case97",
    title: "Miller v. California (1973)",
    facts: "Publisher convicted for mailing obscene materials.",
    issue: "What standard defines obscenity?",
    holding: "Obscenity is determined by: (1) community standards, (2) depicts sexual conduct, (3) lacks serious value.",
    reasoning: "Established three-prong test for obscenity exceptions to First Amendment."
  },
  {
    id: "case98",
    title: "R.A.V. v. City of St. Paul (1992)",
    facts: "Teen burned cross in Black family's yard, charged under hate speech ordinance.",
    issue: "Can government ban specific hate symbols?",
    holding: "No, content-based speech restrictions are unconstitutional.",
    reasoning: "Government can't prohibit speech based on disapproval of ideas."
  },
  {
    id: "case99",
    title: "Virginia v. Black (2003)",
    facts: "Defendant convicted under law banning cross-burning with intent to intimidate.",
    issue: "Is cross-burning protected speech?",
    holding: "Cross-burning with intent to intimidate can be banned.",
    reasoning: "True threats are not protected speech."
  },
  {
    id: "case100",
    title: "Morse v. Frederick (2007)",
    facts: "Student displayed Bong Hits 4 Jesus banner at school event",
    issue: "Can schools restrict student pro-drug speech?",
    holding: "Yes, schools may prohibit speech promoting illegal drug use.",
    reasoning: "Special characteristics of school environment justify limitation."
  },{
    id: "case101",
    title: "Snyder v. Phelps (2011)",
    facts: "Westboro Baptist Church protested at military funeral with offensive signs.",
    issue: "Does inflammatory protest speech at funerals receive First Amendment protection?",
    holding: "Yes, speech on public matters is protected even if offensive.",
    reasoning: "Public discourse cannot be limited just because it is hurtful."
  },
  {
    id: "case102",
    title: "Citizens United v. FEC (2010)",
    facts: "Nonprofit corporation wanted to air political documentary during election season.",
    issue: "Can government restrict independent political expenditures by corporations?",
    holding: "No, political spending is protected speech under First Amendment.",
    reasoning: "Corporations have free speech rights in election contexts."
  },
  {
    id: "case103",
    title: "McCutcheon v. FEC (2014)",
    facts: "Donor challenged aggregate limits on federal campaign contributions.",
    issue: "Do aggregate contribution limits violate First Amendment?",
    holding: "Yes, aggregate limits restrict political participation without sufficient justification.",
    reasoning: "The First Amendment protects the right to participate in democracy through contributions."
  },
  {
    id: "case104",
    title: "Reed v. Town of Gilbert (2015)",
    facts: "Town imposed stricter regulations on some temporary signs than others.",
    issue: "Do content-based sign regulations violate First Amendment?",
    holding: "Yes, content-based regulations are presumptively unconstitutional.",
    reasoning: "Government cannot favor some speech over others based on content."
  },{
    id: "case106",
    title: "Janus v. AFSCME (2018)",
    facts: "Non-union public employee challenged mandatory union fees as violation of free speech.",
    issue: "Can public-sector unions require non-members to pay agency fees?",
    holding: "No, mandatory fees violate First Amendment rights of non-members.",
    reasoning: "Compelling individuals to subsidize private speech they disagree with is unconstitutional."
  },
  {
    id: "case107",
    title: "National Institute of Family and Life Advocates v. Becerra (2018)",
    facts: "California required crisis pregnancy centers to post notices about state-sponsored abortion services.",
    issue: "Does compelled speech about abortion services violate First Amendment?",
    holding: "Yes, the disclosure requirement likely violates free speech rights.",
    reasoning: "Laws that target speech based on content are subject to strict scrutiny."
  },
  {
    id: "case108",
    title: "Iancu v. Brunetti (2019)",
    facts: "Fashion designer sought to trademark FUCT but was denied under Lanham Act's immoral/scandalous provision.",
    issue: "Does banning immoral/scandalous trademarks violate First Amendment?",
    holding: "Yes, the prohibition is viewpoint discrimination.",
    reasoning: "Government can't disfavor certain ideas under arbitrary standards of taste."
  },
  {
    id: "case109",
    title: "Uzuegbunam v. Preczewski (2021)",
    facts: "College student sued after being stopped from distributing religious literature on campus.",
    issue: "Can nominal damages keep alive a First Amendment claim after policy changes?",
    holding: "Yes, claims for nominal damages satisfy Article III standing.",
    reasoning: "Even small violations of constitutional rights warrant judicial remedy."
  },
  {
    id: "case110",
    title: "Shurtleff v. City of Boston (2022)",
    facts: "Boston denied Christian group's request to fly flag at city hall, approving other groups' flags.",
    issue: "Does excluding religious flags violate Free Speech Clause?",
    holding: "Yes, the refusal constituted viewpoint discrimination.",
    reasoning: "Government can't exclude religious perspectives from public forums open to other groups."
  },
  {
    id: "case105",
    title: "Mahanoy Area School District v. B.L. (2021)",
    facts: "Student suspended from cheerleading for posting vulgar Snapchat message off-campus.",
    issue: "Can schools regulate off-campus student speech?",
    holding: "Generally no, with limited exceptions for severe disruptions.",
    reasoning: "Students have First Amendment rights outside school context."
  },{
    id: "case111",
    title: "Lemon v. Kurtzman (1971)",
    facts: "Pennsylvania reimbursed religious schools for secular education costs.",
    issue: "Does state funding of religious schools violate Establishment Clause?",
    holding: "Yes, established the Lemon test for Establishment Clause cases.",
    reasoning: "Excessive government entanglement with religion is unconstitutional."
  },
  {
    id: "case112",
    title: "Engel v. Vitale (1962)",
    facts: "New York public schools required recitation of nondenominational prayer.",
    issue: "Do school-sponsored prayers violate Establishment Clause?",
    holding: "Yes, government-composed prayers are unconstitutional.",
    reasoning: "Prohibits government endorsement of religion."
  },
  {
    id: "case113",
    title: "Wisconsin v. Yoder (1972)",
    facts: "Amish parents refused to send children to school past 8th grade.",
    issue: "Can state compel education against religious beliefs?",
    holding: "No, Free Exercise protects Amish from compulsory education laws.",
    reasoning: "State interest must be compelling to override religious practice."
  },
  {
    id: "case114",
    title: "Employment Division v. Smith (1990)",
    facts: "Native American fired for peyote use in religious ceremony, denied unemployment.",
    issue: "Must religious exemptions be granted for neutral laws?",
    holding: "No, neutral laws of general applicability don't require exemptions.",
    reasoning: "Overruled strict scrutiny for religious challenges to neutral laws."
  },
  {
    id: "case115",
    title: "Church of Lukumi Babalu Aye v. Hialeah (1993)",
    facts: "City banned animal sacrifice targeting Santeria religion.",
    issue: "Does law targeting religious practice violate Free Exercise?",
    holding: "Yes, laws targeting specific religions face strict scrutiny.",
    reasoning: "Government hostility toward religion is unconstitutional."
  },
  {
    id: "case116",
    title: "Zelman v. Simmons-Harris (2002)",
    facts: "Ohio provided vouchers for students to attend religious schools.",
    issue: "Does school voucher program violate Establishment Clause?",
    holding: "No, neutral program with private choice is constitutional.",
    reasoning: "Government aid reaches religious institutions only through independent private choices."
  },
  {
    id: "case117",
    title: "Town of Greece v. Galloway (2014)",
    facts: "Town board meetings opened with predominantly Christian prayers.",
    issue: "Do legislative prayers violate Establishment Clause?",
    holding: "No, historical tradition allows nonsectarian legislative prayers.",
    reasoning: "Ceremonial prayers don't coerce participation or advance specific religion."
  },
  {
    id: "case118",
    title: "Trinity Lutheran Church v. Comer (2017)",
    facts: "Missouri denied church grant for playground resurfacing.",
    issue: "Can state exclude religious organizations from generally available benefits?",
    holding: "No, violates Free Exercise Clause.",
    reasoning: "Denying benefits solely because of religious character is unconstitutional."
  },
  {
    id: "case119",
    title: "Masterpiece Cakeshop v. Colorado (2018)",
    facts: "Baker refused to make wedding cake for same-sex couple.",
    issue: "Does requiring cake baking violate Free Exercise or Free Speech rights?",
    holding: "Yes, Colorado showed hostility to baker's religious beliefs.",
    reasoning: "Government must maintain neutrality toward religious views."
  },
  {
    id: "case120",
    title: "American Legion v. American Humanist Association (2019)",
    facts: "Challenge to 40-foot cross on public land as war memorial.",
    issue: "Does cross-shaped memorial violate Establishment Clause?",
    holding: "No, historical monuments with religious imagery are constitutional.",
    reasoning: "Longstanding monuments acquire secular meaning over time."
  },
  {
    id: "case121",
    title: "Espinoza v. Montana Department of Revenue (2020)",
    facts: "Montana excluded religious schools from tax credit scholarship program.",
    issue: "Does exclusion violate Free Exercise Clause?",
    holding: "Yes, religious schools cannot be excluded from generally available benefits.",
    reasoning: "Strict scrutiny applies to discrimination against religious institutions."
  },
  {
    id: "case122",
    title: "Fulton v. City of Philadelphia (2021)",
    facts: "City excluded Catholic foster agency for refusing same-sex couples.",
    issue: "Can government require religious agencies to violate beliefs?",
    holding: "No, policy not neutral toward religion.",
    reasoning: "Government lacks compelling interest in denying exemptions."
  },
  {
    id: "case123",
    title: "Kennedy v. Bremerton School District (2022)",
    facts: "Football coach fired for praying at midfield after games.",
    issue: "Does prohibiting public employee prayer violate First Amendment?",
    holding: "Yes, prayer was private speech, not government speech.",
    reasoning: "Government cannot suppress religious expression by employees."
  },

  // ========================
  // **Fourth Amendment (126-140)**
  // ========================
  {
    id: "case126",
    title: "Mapp v. Ohio (1961)",
    facts: "Police illegally searched home without warrant, found obscene materials.",
    issue: "Does exclusionary rule apply to states?",
    holding: "Yes, evidence obtained illegally can't be used in state courts.",
    reasoning: "Deters police misconduct through judicial integrity."
  },
  {
    id: "case127",
    title: "Terry v. Ohio (1968)",
    facts: "Police stopped and frisked men acting suspiciously, found weapons.",
    issue: "Can police conduct warrantless stops and frisks?",
    holding: "Yes, with reasonable suspicion of criminal activity.",
    reasoning: "Balances individual privacy against police safety needs."
  },
  {
    id: "case128",
    title: "Katz v. United States (1967)",
    facts: "FBI recorded phone calls from public phone booth without warrant.",
    issue: "Is electronic surveillance without warrant a search?",
    holding: "Yes, if person has reasonable expectation of privacy.",
    reasoning: "Fourth Amendment protects people, not just places."
  },
  {
    id: "case129",
    title: "United States v. Jones (2012)",
    facts: "Police tracked suspect's car via GPS for 4 weeks without warrant.",
    issue: "Is prolonged GPS tracking a search?",
    holding: "Yes, physical trespass with tracking device requires warrant.",
    reasoning: "Property-based approach to Fourth Amendment."
  },
  {
    id: "case130",
    title: "Riley v. California (2014)",
    facts: "Police searched arrested suspect's smartphone without warrant.",
    issue: "Does warrantless cell phone search incident to arrest violate Fourth Amendment?",
    holding: "Yes, digital content requires warrant.",
    reasoning: "Modern phones contain vast private information."
  },
  {
    id: "case131",
    title: "Carpenter v. United States (2018)",
    facts: "Police obtained suspect's cell phone location data without warrant.",
    issue: "Does accessing historical cell site location information require warrant?",
    holding: "Yes, creates detailed timeline of movements protected by Fourth Amendment.",
    reasoning: "People have reasonable expectation of privacy in physical movements."
  },
  {
    id: "case132",
    title: "Florida v. Jardines (2013)",
    facts: "Police used drug-sniffing dog at front door without warrant.",
    issue: "Is dog sniff at home entrance a search?",
    holding: "Yes, trespass on curtilage with investigative purpose requires warrant.",
    reasoning: "Home enjoys highest Fourth Amendment protection."
  },
  {
    id: "case133",
    title: "Whren v. United States (1996)",
    facts: "Police stopped car for pretextual traffic violation to investigate drugs.",
    issue: "Are pretextual stops constitutional?",
    holding: "Yes, if objectively justified by traffic violation.",
    reasoning: "Subjective motives don't invalidate objectively reasonable stops."
  },
  {
    id: "case134",
    title: "Atwater v. City of Lago Vista (2001)",
    facts: "Woman arrested for minor seatbelt violation.",
    issue: "Can police arrest for minor offenses?",
    holding: "Yes, if offense is punishable by jail time.",
    reasoning: "Fourth Amendment doesn't require proportionality in arrests."
  },
  {
    id: "case135",
    title: "Kyllo v. United States (2001)",
    facts: "Police used thermal imaging to detect indoor marijuana grow operation.",
    issue: "Is warrantless thermal imaging a search?",
    holding: "Yes, using sense-enhancing technology on home requires warrant.",
    reasoning: "People have expectation of privacy in home's intimate details."
  },

  // ========================
  // **Fifth Amendment (141-150)**
  // ========================
  {
    id: "case141",
    title: "Miranda v. Arizona (1966)",
    facts: "Suspect confessed without being informed of rights.",
    issue: "Must police inform suspects of rights before interrogation?",
    holding: "Yes, established Miranda warnings.",
    reasoning: "Protects against coercive police interrogations."
  },
  {
    id: "case142",
    title: "Dickerson v. United States (2000)",
    facts: "Congress passed law attempting to override Miranda.",
    issue: "Can Congress legislate around Miranda?",
    holding: "No, Miranda is constitutional rule.",
    reasoning: "Rooted in Constitution, not just judicial policy."
  },
  {
    id: "case143",
    title: "Kelo v. City of New London (2005)",
    facts: "City took private property for economic development.",
    issue: "Does economic development qualify as 'public use'?",
    holding: "Yes, but controversial expansion of eminent domain.",
    reasoning: "Broad deference to legislative public purpose determinations."
  },
  {
    id: "case144",
    title: "Bolling v. Sharpe (1954)",
    facts: "Segregated D.C. schools challenged under Fifth Amendment.",
    issue: "Does segregation violate Due Process Clause?",
    holding: "Yes, segregation is unconstitutional.",
    reasoning: "Fifth Amendment contains equal protection component."
  },
  {
    id: "case145",
    title: "Adarand Constructors v. Peña (1995)",
    facts: "Federal contract preference for minority businesses.",
    issue: "What standard applies to federal racial classifications?",
    holding: "Strict scrutiny applies to all racial classifications.",
    reasoning: "Equal protection applies equally to all races."
  },
  {
    id: "case146",
    title: "Berghuis v. Thompkins (2010)",
    facts: "Suspect remained silent for hours before confessing without invoking Miranda.",
    issue: "Must suspects expressly invoke Miranda rights?",
    holding: "Yes, silence alone doesn't invoke rights.",
    reasoning: "Suspect must unambiguously assert rights."
  },
  {
    id: "case147",
    title: "Salinas v. Texas (2013)",
    facts: "Suspect remained silent when asked incriminating question pre-arrest.",
    issue: "Can pre-arrest silence be used as evidence of guilt?",
    holding: "Yes, if suspect doesn't expressly invoke Fifth Amendment.",
    reasoning: "Fifth Amendment must be affirmatively claimed in non-custodial settings."
  },
  {
    id: "case148",
    title: "North Carolina v. Pearce (1969)",
    facts: "Judge imposed harsher sentence after retrial.",
    issue: "Does increased sentence after retrial violate Due Process?",
    holding: "Yes, unless based on objective new information.",
    reasoning: "Prevents judicial retaliation for exercising appeal rights."
  },
  {
    id: "case149",
    title: "United States v. Hubbell (2000)",
    facts: "Prosecution compelled production of incriminating documents.",
    issue: "Does compelled document production violate Fifth Amendment?",
    holding: "Yes, if act of production itself is testimonial.",
    reasoning: "Protects against self-incrimination through compelled acts."
  },
  {
    id: "case150",
    title: "Chavez v. Martinez (2003)",
    facts: "Police interrogated suspect without Miranda warnings while he was in pain.",
    issue: "Can coerced statements be used in civil cases?",
    holding: "No Miranda violation if statements not used in criminal case.",
    reasoning: "Fifth Amendment only protects against criminal use of compelled statements."
  },{
    id: "case151",
    title: "Gideon v. Wainwright (1963)",
    facts: "Indigent defendant denied counsel in Florida felony trial.",
    issue: "Does the Sixth Amendment require states to provide attorneys to indigent defendants in felony cases?",
    holding: "Yes, the right to counsel is fundamental and applies to states via the Fourteenth Amendment.",
    reasoning: "Fair trial impossible without counsel; overruled Betts v. Brady."
  },
  {
    id: "case152",
    title: "Miranda v. Arizona (1966)",
    facts: "Defendant confessed without being informed of rights.",
    issue: "Must police inform suspects of their rights before interrogation?",
    holding: "Yes, established Miranda warnings (right to remain silent, right to attorney).",
    reasoning: "Protects against coercive interrogations under Fifth and Sixth Amendments."
  },
  {
    id: "case153",
    title: "Strickland v. Washington (1984)",
    facts: "Defendant claimed ineffective assistance of counsel in death penalty case.",
    issue: "What standard determines ineffective assistance of counsel?",
    holding: "Two-prong test: (1) Deficient performance, (2) Prejudice to defendant.",
    reasoning: "Must show errors were so serious they deprived defendant of fair trial."
  },
  {
    id: "case154",
    title: "Batson v. Kentucky (1986)",
    facts: "Prosecutor struck Black jurors from Black defendant's trial.",
    issue: "Does race-based jury selection violate equal protection?",
    holding: "Yes, peremptory challenges cannot be based on race.",
    reasoning: "Racial discrimination in jury selection undermines fairness."
  },
  {
    id: "case155",
    title: "Crawford v. Washington (2004)",
    facts: "Used witness's recorded statement when witness was unavailable.",
    issue: "Does the Confrontation Clause allow testimonial hearsay without cross-examination?",
    holding: "No, testimonial statements require prior cross-examination.",
    reasoning: "Preserves defendant's right to face accusers."
  },
  {
    id: "case156",
    title: "Blakely v. Washington (2004)",
    facts: "Judge enhanced sentence based on facts not proven to jury.",
    issue: "Can judges find facts that increase maximum sentences?",
    holding: "No, facts used for sentencing enhancements must be proven to jury.",
    reasoning: "Protects Sixth Amendment right to jury trial."
  },
  {
    id: "case157",
    title: "Apprendi v. New Jersey (2000)",
    facts: "Judge enhanced sentence for hate crime based on preponderance standard.",
    issue: "Must facts increasing penalty be proven beyond reasonable doubt?",
    holding: "Yes, any fact increasing penalty is an element that must be proven to jury.",
    reasoning: "Except for prior convictions."
  },
  {
    id: "case158",
    title: "Rompilla v. Beard (2005)",
    facts: "Defense counsel failed to investigate defendant's records in death penalty case.",
    issue: "Does failure to investigate mitigating evidence constitute ineffective counsel?",
    holding: "Yes, counsel must make reasonable investigations.",
    reasoning: "Especially critical in capital cases."
  },
  {
    id: "case159",
    title: "Padilla v. Kentucky (2010)",
    facts: "Defendant pled guilty without being advised of deportation risk.",
    issue: "Must attorneys advise non-citizens of deportation consequences?",
    holding: "Yes, deportation is a material consequence of guilty pleas.",
    reasoning: "Professional norms require such advice."
  },
  {
    id: "case160",
    title: "Missouri v. Frye (2012)",
    facts: "Defendant's attorney failed to communicate plea offer.",
    issue: "Does ineffective assistance apply to plea bargaining?",
    holding: "Yes, defendants have right to effective assistance during plea process.",
    reasoning: "Pleas are critical phase of criminal proceedings."
  },
  {
    id: "case161",
    title: "Lafler v. Cooper (2012)",
    facts: "Defendant rejected plea due to bad legal advice, got harsher sentence at trial.",
    issue: "Can defendants claim prejudice from rejected pleas due to bad advice?",
    holding: "Yes, must show would have accepted plea and gotten better outcome.",
    reasoning: "Remedy is to offer original plea terms."
  },
  {
    id: "case162",
    title: "Hurricane v. Florida (2016)",
    facts: "Jury recommended death by 7-5 vote; judge imposed death sentence.",
    issue: "Must death sentences be unanimous?",
    holding: "No, but non-unanimous recommendations raise reliability concerns.",
    reasoning: "States may set their own sentencing procedures."
  },
  {
    id: "case163",
    title: "McCoy v. Louisiana (2018)",
    facts: "Attorney conceded guilt over defendant's objections in death penalty case.",
    issue: "Can counsel override defendant's decision to maintain innocence?",
    holding: "No, defendants have autonomy over fundamental decisions like maintaining innocence.",
    reasoning: "Personal choice that counsel cannot usurp."
  },
  {
    id: "case164",
    title: "Ramos v. Louisiana (2020)",
    facts: "Defendant convicted by 10-2 non-unanimous jury verdict.",
    issue: "Does Sixth Amendment require unanimous jury verdicts in state criminal trials?",
    holding: "Yes, unanimity is constitutional requirement.",
    reasoning: "Historical practice and reliability concerns."
  },
  {
    id: "case165",
    title: "Edwards v. Vannoy (2021)",
    facts: "Sought retroactive application of Ramos to prior convictions.",
    issue: "Is Ramos retroactive on collateral review?",
    holding: "No, Ramos announced new procedural rule not retroactive.",
    reasoning: "Doesn't qualify under Teague exception for watershed rules."
  },

  // ========================
  // **Eighth Amendment (166-180)**
  // ========================
  {
    id: "case166",
    title: "Furman v. Georgia (1972)",
    facts: "Challenged arbitrary application of death penalty.",
    issue: "Does discretionary death sentencing violate Eighth Amendment?",
    holding: "Yes, current practices constitute cruel and unusual punishment.",
    reasoning: "Sentencing standards are too arbitrary and capricious."
  },
  {
    id: "case167",
    title: "Gregg v. Georgia (1976)",
    facts: "Georgia's new death penalty statute with guided discretion.",
    issue: "Can revised death penalty laws satisfy Eighth Amendment?",
    holding: "Yes, when guided by objective standards to minimize arbitrariness.",
    reasoning: "Death penalty itself is constitutional with proper procedural safeguards."
  },
  {
    id: "case168",
    title: "Coker v. Georgia (1977)",
    facts: "Death sentence for rape of adult woman.",
    issue: "Is death penalty disproportionate for rape?",
    holding: "Yes, death penalty unconstitutional for rape of adult where victim doesn't die.",
    reasoning: "Excessive punishment relative to crime."
  },
  {
    id: "case169",
    title: "Lockett v. Ohio (1978)",
    facts: "Ohio law limited mitigating evidence in death penalty cases.",
    issue: "Must sentencers consider all mitigating evidence?",
    holding: "Yes, Eighth Amendment requires individualized sentencing.",
    reasoning: "Defendants entitled to present mitigating circumstances."
  },
  {
    id: "case170",
    title: "Tison v. Arizona (1987)",
    facts: "Defendants participated in felony that led to murder but didn't kill.",
    issue: "Can felony murderers who didn't kill receive death penalty?",
    holding: "Yes, if major participation and reckless indifference to human life.",
    reasoning: "Sufficient culpability under Eighth Amendment."
  },
  {
    id: "case171",
    title: "Thompson v. Oklahoma (1988)",
    facts: "15-year-old sentenced to death.",
    issue: "Is death penalty constitutional for offenders under 16?",
    holding: "No, execution of juveniles under 16 violates Eighth Amendment.",
    reasoning: "National consensus against executing young offenders."
  },
  {
    id: "case172",
    title: "Stanford v. Kentucky (1989)",
    facts: "16- and 17-year-olds sentenced to death.",
    issue: "Is death penalty constitutional for 16-17 year olds?",
    holding: "Yes, no national consensus against it (overruled by Roper).",
    reasoning: "States may set age limits."
  },
  {
    id: "case173",
    title: "Penry v. Lynaugh (1989)",
    facts: "Death sentence for defendant with intellectual disability.",
    issue: "Does Eighth Amendment bar executing intellectually disabled?",
    holding: "No categorical bar (overruled by Atkins).",
    reasoning: "Insufficient evidence of national consensus in 1989."
  },
  {
    id: "case174",
    title: "Atkins v. Virginia (2002)",
    facts: "Death sentence for defendant with intellectual disability.",
    issue: "Is executing intellectually disabled unconstitutional?",
    holding: "Yes, violates evolving standards of decency.",
    reasoning: "National consensus against such executions."
  },
  {
    id: "case175",
    title: "Roper v. Simmons (2005)",
    facts: "17-year-old sentenced to death.",
    issue: "Is death penalty constitutional for juveniles?",
    holding: "No, execution of offenders under 18 violates Eighth Amendment.",
    reasoning: "Juveniles have diminished culpability."
  },
  {
    id: "case176",
    title: "Kennedy v. Louisiana (2008)",
    facts: "Death sentence for child rape where victim survived.",
    issue: "Is death penalty constitutional for non-homicide crimes?",
    holding: "No, unconstitutional for crimes against individuals where victim doesn't die.",
    reasoning: "Disproportionate punishment."
  },
  {
    id: "case177",
    title: "Graham v. Florida (2010)",
    facts: "Juvenile sentenced to life without parole for non-homicide.",
    issue: "Is LWOP constitutional for juveniles in non-homicide cases?",
    holding: "No, violates Eighth Amendment.",
    reasoning: "Juveniles have capacity for change."
  },
  {
    id: "case178",
    title: "Miller v. Alabama (2012)",
    facts: "14-year-old sentenced to mandatory LWOP for homicide.",
    issue: "Is mandatory LWOP constitutional for juveniles?",
    holding: "No, mandatory LWOP violates Eighth Amendment.",
    reasoning: "Must consider juvenile's age and circumstances."
  },
  {
    id: "case179",
    title: "Glossip v. Gross (2015)",
    facts: "Challenged Oklahoma's lethal injection protocol.",
    issue: "Does midazolam execution method violate Eighth Amendment?",
    holding: "No, petitioners failed to prove known available alternative.",
    reasoning: "Execution methods must only not create substantial risk of severe pain."
  },
  {
    id: "case180",
    title: "Bucklew v. Precythe (2019)",
    facts: "Inmate with rare medical condition challenged lethal injection.",
    issue: "Must inmates proposing alternative execution methods prove feasibility?",
    holding: "Yes, must show alternative is available and significantly reduces risk.",
    reasoning: "States have legitimate interest in efficient executions."
  },

  // ========================
  // **Fourteenth Amendment (181-195)**
  // ========================
  {
    id: "case181",
    title: "Lochner v. New York (1905)",
    facts: "NY limited bakers' work hours; bakery owner convicted.",
    issue: "Does liberty of contract limit state labor regulations?",
    holding: "Yes, the law unreasonably interferes with employer/employee contracts.",
    reasoning: "Substantive due process protects economic liberty (later repudiated)."
  },
  {
    id: "case182",
    title: "West Coast Hotel v. Parrish (1937)",
    facts: "Washington's minimum wage law for women challenged.",
    issue: "Can states regulate wages under police powers?",
    holding: "Yes, overruled Lochner; economic regulations need only rational basis.",
    reasoning: "States may protect workers' welfare through labor laws."
  },
  {
    id: "case183",
    title: "Williamson v. Lee Optical (1955)",
    facts: "Oklahoma law restricted who could fit eyeglasses.",
    issue: "Does economic regulation violate Due Process Clause?",
    holding: "No, rational basis test applies to economic regulations.",
    reasoning: "Legislature may adopt piecemeal reforms."
  },
  {
    id: "case184",
    title: "Griswold v. Connecticut (1965)",
    facts: "State law banned contraceptives even for married couples.",
    issue: "Does law violate marital privacy rights?",
    holding: "Yes, violates right to marital privacy.",
    reasoning: "Penumbras of Bill of Rights create zones of privacy."
  },
  {
    id: "case185",
    title: "Roe v. Wade (1973)",
    facts: "Texas law banned abortions except to save mother's life.",
    issue: "Does Constitution protect right to abortion?",
    holding: "Yes, under right to privacy (overruled by Dobbs).",
    reasoning: "Balanced against state interests in potential life."
  },
  {
    id: "case186",
    title: "Planned Parenthood v. Casey (1992)",
    facts: "Pennsylvania imposed abortion restrictions (waiting period, parental consent).",
    issue: "Can states regulate abortion without violating Roe?",
    holding: "Yes, but cannot impose 'undue burden' on access.",
    reasoning: "Replaced trimester framework with undue burden standard."
  },
  {
    id: "case187",
    title: "Lawrence v. Texas (2003)",
    facts: "Texas law criminalized same-sex sodomy.",
    issue: "Does law violate substantive due process?",
    holding: "Yes, protects intimate conduct between consenting adults.",
    reasoning: "Overruled Bowers; liberty extends to private sexual conduct."
  },
  {
    id: "case188",
    title: "Obergefell v. Hodges (2015)",
    facts: "Same-sex couples denied marriage licenses in four states.",
    issue: "Does Fourteenth Amendment require states to license same-sex marriages?",
    holding: "Yes, marriage is fundamental right under Due Process and Equal Protection Clauses.",
    reasoning: "Denial causes dignitary harm to same-sex couples."
  },
  {
    id: "case189",
    title: "Dobbs v. Jackson Women's Health (2022)",
    facts: "Mississippi banned abortions after 15 weeks.",
    issue: "Is there constitutional right to abortion?",
    holding: "No, overruled Roe and Casey; issue returned to states.",
    reasoning: "Abortion right not deeply rooted in history/tradition."
  },
  {
    id: "case190",
    title: "Pierce v. Society of Sisters (1925)",
    facts: "Oregon required all children to attend public schools.",
    issue: "Does law violate parents' right to direct children's education?",
    holding: "Yes, unreasonable interference with parental liberty.",
    reasoning: "Parents have right to choose private/religious schooling."
  },
  {
    id: "case191",
    title: "Meyer v. Nebraska (1923)",
    facts: "Nebraska banned teaching foreign languages to young children.",
    issue: "Does law violate Fourteenth Amendment liberty interests?",
    holding: "Yes, infringes on teacher's livelihood and parents' rights.",
    reasoning: "Liberty includes right to acquire useful knowledge."
  },
  {
    id: "case192",
    title: "Buck v. Bell (1927)",
    facts: "Virginia ordered compulsory sterilization of 'feeble-minded' woman.",
    issue: "Does compulsory sterilization violate Due Process?",
    holding: "No, 'Three generations of imbeciles are enough.'",
    reasoning: "Infamous decision endorsing eugenics (never overturned)."
  },
  {
    id: "case193",
    title: "Skinner v. Oklahoma (1942)",
    facts: "Oklahoma's Habitual Criminal Sterilization Act targeted certain crimes.",
    issue: "Does selective sterilization violate Equal Protection?",
    holding: "Yes, creates irrational classifications between similar crimes.",
    reasoning: "Marriage and procreation are fundamental rights."
  },
  {
    id: "case194",
    title: "Washington v. Glucksberg (1997)",
    facts: "Washington banned physician-assisted suicide.",
    issue: "Is there constitutional right to assisted suicide?",
    holding: "No, not deeply rooted in history/tradition.",
    reasoning: "States may preserve human life."
  },
  {
    id: "case195",
    title: "Cruzan v. Director, MDH (1990)",
    facts: "Parents sought to withdraw life support from vegetative daughter.",
    issue: "Does Due Process protect right to refuse life-sustaining treatment?",
    holding: "Yes, but states may require clear evidence of patient's wishes.",
    reasoning: "Competent persons have liberty interest in refusing treatment."
  },

  // ========================
  // **Voting Rights (196-210)**
  // ========================
  {
    id: "case196",
    title: "Shelby County v. Holder (2013)",
    facts: "Challenged preclearance formula in Voting Rights Act Section 4(b).",
    issue: "Is the coverage formula constitutional under current conditions?",
    holding: "No, formula is outdated and violates state sovereignty.",
    reasoning: "Congress must base voting rules on current data."
  },
  {
    id: "case197",
    title: "Rucho v. Common Cause (2019)",
    facts: "Challenged partisan gerrymandering in NC and MD congressional maps.",
    issue: "Are partisan gerrymandering claims justiciable?",
    holding: "No, such claims present political questions beyond courts' reach.",
    reasoning: "No judicially manageable standards exist to evaluate partisan gerrymanders."
  },
  {
    id: "case198",
    title: "Brnovich v. DNC (2021)",
    facts: "Arizona restricted ballot collection and out-of-precinct voting.",
    issue: "Do these restrictions violate Section 2 of Voting Rights Act?",
    holding: "No, ordinary election administration rules are allowed.",
    reasoning: "Section 2 requires substantial disparity in opportunity."
  },
  {
    id: "case199",
    title: "Allen v. Milligan (2023)",
    facts: "Alabama's congressional map allegedly diluted Black voting power.",
    issue: "Does map violate Section 2 of Voting Rights Act?",
    holding: "Yes, likely violates Section 2 by denying equal opportunity.",
    reasoning: "Race-neutral alternatives could provide fair representation."
  },
  {
    id: "case200",
    title: "Baker v. Carr (1962)",
    facts: "Tennessee hadn't redistricted since 1901, creating urban/rural disparities.",
    issue: "Are malapportionment claims justiciable?",
    holding: "Yes, courts can review under Equal Protection Clause.",
    reasoning: "Established 'one person, one vote' principle."
  },
  {
    id: "case201",
    title: "Reynolds v. Sims (1964)",
    facts: "Alabama's legislative districts had severe population disparities.",
    issue: "Must state legislative districts be equally populated?",
    holding: "Yes, 'one person, one vote' applies to state legislatures.",
    reasoning: "Equal Protection requires substantially equal representation."
  },
  {
    id: "case202",
    title: "Shaw v. Reno (1993)",
    facts: "North Carolina created majority-Black congressional district with bizarre shape.",
    issue: "Can racial gerrymandering violate Equal Protection?",
    holding: "Yes, extreme racial sorting requires strict scrutiny.",
    reasoning: "Race-based districting reinforces harmful stereotypes."
  },
  {
    id: "case203",
    title: "Bush v. Gore (2000)",
    facts: "Florida recount dispute in 2000 presidential election.",
    issue: "Did Florida's recount standards violate Equal Protection?",
    holding: "Yes, lack of uniform standards for recount violates equal treatment of voters.",
    reasoning: "Limited to present circumstances (no precedent value)."
  },
  {
    id: "case204",
    title: "Crawford v. Marion County (2008)",
    facts: "Indiana required photo ID to vote.",
    issue: "Does voter ID law unduly burden voting rights?",
    holding: "No, state's interest in preventing fraud justifies minimal burden.",
    reasoning: "Non-severe burdens don't violate Fourteenth Amendment."
  },
  {
    id: "case205",
    title: "Citizens United v. FEC (2010)",
    facts: "Federal law restricted corporate electioneering communications.",
    issue: "Do spending limits violate First Amendment?",
    holding: "Yes, political spending is protected speech.",
    reasoning: "Corporations have free speech rights in elections."
  },
  {
    id: "case206",
    title: "McCutcheon v. FEC (2014)",
    facts: "Federal aggregate limits on campaign contributions.",
    issue: "Do aggregate contribution limits violate First Amendment?",
    holding: "Yes, restrict participation without sufficient anti-corruption justification.",
    reasoning: "Individual contribution limits already prevent corruption."
  },
  {
    id: "case207",
    title: "Arizona Free Enterprise v. Bennett (2011)",
    facts: "Arizona provided matching funds to candidates who accepted spending limits.",
    issue: "Does public financing system burden opponents' speech?",
    holding: "Yes, penalizes candidates for spending more than opponents.",
    reasoning: "Cannot financially disadvantage speakers for exercising First Amendment rights."
  },
  {
    id: "case208",
    title: "Davis v. Bandemer (1986)",
    facts: "Indiana Democrats challenged partisan gerrymander.",
    issue: "Are partisan gerrymandering claims justiciable?",
    holding: "Yes, but plaintiffs failed to prove unconstitutional discrimination.",
    reasoning: "Partisan gerrymandering may violate Equal Protection if consistently degrading."
  },
  {
    id: "case209",
    title: "Vieth v. Jubelirer (2004)",
    facts: "Pennsylvania Democrats challenged partisan gerrymander.",
    issue: "Is there manageable standard for partisan gerrymandering claims?",
    holding: "No standard commanded majority (plurality said nonjusticiable).",
    reasoning: "No consensus on how to measure unconstitutional partisanship."
  },
  {
    id: "case210",
    title: "Moore v. Harper (2023)",
    facts: "NC legislature claimed state courts can't review congressional maps.",
    issue: "Does 'independent state legislature' theory prevent judicial review?",
    holding: "No, state courts may review election laws under state constitutions.",
    reasoning: "State legislatures remain bound by state constitutional constraints."
  },{
    "id": "case211",
    "title": "Pierson v. Post (1805)",
    "facts": "Post was hunting a fox on unowned land when Pierson intercepted and killed it.",
    "issue": "Does pursuit of wild animals give a property right to the hunter?",
    "holding": "No, property in wild animals is acquired only by physical capture.",
    "reasoning": "Certainty requires clear rules; mere pursuit is insufficient for ownership."
  },
  {
    "id": "case212",
    "title": "Ghen v. Rich (1881)",
    "facts": "Whaler killed whale with marked bomb lance but another ship found the carcass.",
    "issue": "Does custom govern ownership of wild animals in specialized industries?",
    "holding": "Yes, local whaling customs determined ownership rights.",
    "reasoning": "Industry customs may establish property rules where formal law is silent."
  },
  {
    "id": "case213",
    "title": "Keeble v. Hickeringill (1707)",
    "facts": "Defendant fired guns to scare ducks away from plaintiff's decoy pond.",
    "issue": "Is malicious interference with lawful trade/property use actionable?",
    "holding": "Yes, intentional interference with property use is unlawful.",
    "reasoning": "Property rights include the right to undisturbed lawful use."
  },
  {
    "id": "case214",
    "title": "Popov v. Hayashi (2002)",
    "facts": "Two fans fought over ownership of Barry Bonds' record-breaking home run ball.",
    "issue": "Who owns a baseball when possession is disputed?",
    "holding": "Shared ownership under equitable division (split between both parties).",
    "reasoning": "Popov had incomplete possession; Hayashi had physical control but no clear right."
  },
  {
    "id": "case215",
    "title": "Johnson v. M'Intosh (1823)",
    "facts": "Conflicting land claims from Native American purchase vs. federal grant.",
    "issue": "Can private individuals buy land directly from Native Americans?",
    "holding": "No, only the federal government could acquire Native lands.",
    "reasoning": "Discovery doctrine gave European nations exclusive right to extinguish native title."
  },
  {
    "id": "case216",
    "title": "Tee-Hit-Ton Indians v. United States (1955)",
    "facts": "Alaska Natives claimed compensation for timber taken from ancestral lands.",
    "issue": "Does Fifth Amendment require compensation for taking aboriginal title?",
    "holding": "No, unrecognized aboriginal title creates no compensable property right.",
    "reasoning": "Congress has plenary power over tribal lands; mere possession insufficient."
  },
  {
    "id": "case217",
    "title": "Goddard v. Winchell (1892)",
    "facts": "Meteorite buried in plaintiff's land was excavated by defendant.",
    "issue": "Does a meteorite belong to the landowner where it embeds?",
    "holding": "Yes, meteorites become part of the land and belong to the landowner.",
    "reasoning": "Objects firmly attached to land become fixtures owned by the landowner."
  },
  {
    "id": "case218",
    "title": "Armory v. Delamirie (1722)",
    "facts": "Chimney sweep's boy found jewel and took it to goldsmith who refused to return it.",
    "issue": "What rights does a finder have against all but the true owner?",
    "holding": "Finder has possessory right superior to all except true owner.",
    "reasoning": "Prior possession creates property rights enforceable against later possessors."
  },
  {
    "id": "case219",
    "title": "Hannah v. Peel (1945)",
    "facts": "Soldier found brooch in house later purchased by defendant.",
    "issue": "Does a finder in another's building acquire rights against the owner?",
    "holding": "Yes, when owner didn't know of item's existence.",
    "reasoning": "Constructive possession requires knowledge; finder keeps against unaware owner."
  },
  {
    "id": "case220",
    "title": "Eads v. Brazelton (1861)",
    "facts": "Dispute over ownership of abandoned shipwreck in Mississippi River.",
    "issue": "Who owns an abandoned shipwreck?",
    "holding": "First salvager with intent to reduce to possession acquires rights.",
    "reasoning": "Abandoned property goes to first taker establishing control."
  },
  {
    "id": "case221",
    "title": "Haslem v. Lockwood (1871)",
    "facts": "Plaintiff collected manure from public street; defendant took it.",
    "issue": "Does labor on abandoned material create property rights?",
    "holding": "Yes, labor invested in abandoned property establishes ownership.",
    "reasoning": "Value added through labor creates property interest."
  },
  {
    "id": "case222",
    "title": "McAvoy v. Medina (1866)",
    "facts": "Customer found money left in shop owner's barber chair.",
    "issue": "Who owns mislaid (vs. lost) property?",
    "holding": "Shop owner gets possession against all but true owner.",
    "reasoning": "Mislaid property goes to landowner where intentionally placed."
  },
  {
    "id": "case223",
    "title": "Newman v. Sathyavaglswaran (2002)",
    "facts": "Parents sued over unauthorized removal of deceased son's corneas.",
    "issue": "Do next of kin have property rights in a decedent's corneas?",
    "holding": "No property right exists under state anatomical gift law.",
    "reasoning": "Statute gave medical examiner authority; no common law property right."
  },
  {
    "id": "case224",
    "title": "Moore v. Regents of the University of California (1990)",
    "facts": "Patient's cells were used for profitable research without consent.",
    "issue": "Do patients have property rights in excised body tissues?",
    "holding": "No property right in discarded cells under conversion theory.",
    "reasoning": "Research incentives outweigh individual property claims in biological materials."
  },
  {
    "id": "case225",
    "title": "Baker v. Weedon (1972)",
    "facts": "Life tenant sought to sell property; remaindermen objected.",
    "issue": "Can life estate property be sold against remaindermen's wishes?",
    "holding": "Sale allowed only if necessary to preserve all parties' interests.",
    "reasoning": "Equitable partition possible when property becomes economically unproductive."
  },
  {
    "id": "case226",
    "title": "White v. Brown (1977)",
    "facts": "Will left house to widow 'to have and enjoy during her life' with no remainder specified.",
    "issue": "Did testator create life estate or fee simple?",
    "holding": "Life estate only, with reversion to heirs.",
    "reasoning": "Precatory language ('to have and enjoy') didn't overcome life estate intent."
  },
  {
    "id": "case227",
    "title": "Symphony Space v. Pergola Properties (1996)",
    "facts": "Dispute over enforceability of long-term option to purchase property.",
    "issue": "Did option violate rule against perpetuities?",
    "holding": "Yes, option could vest beyond permissible timeframe.",
    "reasoning": "Commercial options are subject to traditional rule against perpetuities."
  },
  {
    "id": "case228",
    "title": "Estate of Ghiglia v. Commissioner (1989)",
    "facts": "Decedent's will left property 'so long as used for family purposes.'",
    "issue": "Was this a fee simple determinable?",
    "holding": "Yes, creating possibility of reverter.",
    "reasoning": "Durational language ('so long as') indicates defeasible estate."
  },
  {
    "id": "case229",
    "title": "Mountain Brow Lodge No. 82 v. Toscano (1968)",
    "facts": "Deed granted land 'provided it is used for lodge purposes.'",
    "issue": "Was this a fee simple subject to condition subsequent?",
    "holding": "Yes, with right of re-entry for condition broken.",
    "reasoning": "'Provided' language creates conditional estate with forfeiture remedy."
  },
  {
    "id": "case230",
    "title": "Mahrenholz v. County Board of School Trustees (1981)",
    "facts": "Deed granted land to school district 'until abandonment.'",
    "issue": "Did this create possibility of reverter?",
    "holding": "Yes, automatic reversion upon abandonment.",
    "reasoning": "'Until' language establishes fee simple determinable."
  },
  {
    "id": "case231",
    "title": "Brown v. Independent Baptist Church of Woburn (1950)",
    "facts": "Deed granted land 'for so long as used for church purposes.'",
    "issue": "What happens when defeasible condition is violated?",
    "holding": "Property reverts to grantor's heirs automatically.",
    "reasoning": "Fee simple determinable terminates automatically upon condition breach."
  },
  {
    "id": "case232",
    "title": "Delfino v. Vealencis (1980)",
    "facts": "Co-owners disagreed about partitioning property.",
    "issue": "Should court order partition in kind or by sale?",
    "holding": "Physical partition preferred unless impractical.",
    "reasoning": "Partition in kind preserves property rights; sale is last resort."
  },
  {
    "id": "case233",
    "title": "Spiller v. Mackereth (1976)",
    "facts": "Dispute over whether co-ownership was joint tenancy or tenancy in common.",
    "issue": "What creates tenancy in common?",
    "holding": "Absent clear intent, presumption favors tenancy in common.",
    "reasoning": "Joint tenancy requires 'four unities' and express language."
  },
  {
    "id": "case234",
    "title": "Riddle v. Harmon (1980)",
    "facts": "Joint tenant unilaterally severed joint tenancy by deed to herself.",
    "issue": "Can joint tenancy be severed without notice to other tenant?",
    "holding": "Yes, unilateral action suffices to sever.",
    "reasoning": "Common law allows severance by any act destroying any unity."
  },
  {
    "id": "case235",
    "title": "United States v. Craft (2002)",
    "facts": "IRS levied husband's interest in entireties property for tax debt.",
    "issue": "Does tenancy by entirety create separate taxable interest?",
    "holding": "Yes, individual interest exists for federal tax purposes.",
    "reasoning": "Federal law doesn't recognize entirety immunity from individual debts."
  },
  {
    "id": "case236",
    "title": "Sawada v. Endo (1977)",
    "facts": "Creditors sought to reach entirety property for husband's tort debt.",
    "issue": "Is entirety property immune from individual spouse's tort debts?",
    "holding": "Yes, entirety property protected from individual obligations.",
    "reasoning": "Unity of marriage prevents seizure for individual spouse's liabilities."
  },
  {
    "id": "case237",
    "title": "O'Keeffe v. Snyder (1980)",
    "facts": "Artist sued to recover stolen paintings bought by good faith purchaser.",
    "issue": "When does statute of limitations begin for stolen chattels?",
    "holding": "Clock starts when owner discovers or reasonably should discover location.",
    "reasoning": "Discovery rule balances owners' and good faith purchasers' rights."
  },
  {
    "id": "case238",
    "title": "Javins v. First National Realty Corp. (1970)",
    "facts": "Tenant withheld rent due to uninhabitable conditions.",
    "issue": "Does urban leasing carry implied warranty of habitability?",
    "holding": "Yes, residential leases include implied habitability warranty.",
    "reasoning": "Modern leasing is contract-based with mutual dependencies."
  },
  {
    "id": "case239",
    "title": "Hilder v. St. Peter (1984)",
    "facts": "Tenant withheld rent after landlord failed to repair unsafe conditions.",
    "issue": "Can tenant withhold rent for landlord's breach of habitability?",
    "holding": "Yes, with proper procedures and escrow.",
    "reasoning": "Rent withholding is remedy for material breach of housing codes."
  },
  {
    "id": "case240",
    "title": "Sommer v. Kridel (1977)",
    "facts": "Landlord sued abandoning tenant despite finding replacement tenant.",
    "issue": "Must landlord mitigate damages when tenant abandons?",
    "holding": "Yes, landlords have duty to mitigate damages.",
    "reasoning": "Modern contract principles override traditional property rules."
  },
  {
    "id": "case241",
    "title": "Berg v. Wiley (1978)",
    "facts": "Landlord locked out tenant without court process.",
    "issue": "Is self-help eviction lawful?",
    "holding": "No, judicial process required even for lease violations.",
    "reasoning": "Public policy favors peaceful resolution through courts."
  },
  {
    "id": "case242",
    "title": "Ernst v. Conditt (1964)",
    "facts": "Landlord interfered with tenant's quiet enjoyment.",
    "issue": "What constitutes constructive eviction?",
    "holding": "Substantial interference justifying abandonment qualifies.",
    "reasoning": "Tenant must actually vacate within reasonable time."
  },
  {
    "id": "case243",
    "title": "Kendall v. Pestana (1985)",
    "facts": "Landlord withheld consent to lease assignment unreasonably.",
    "issue": "May landlords arbitrarily refuse assignments?",
    "holding": "No, consent may be withheld only reasonably.",
    "reasoning": "Restraints on alienation disfavored absent legitimate purpose."
  },
  {
    "id": "case244",
    "title": "Williams v. Safe Deposit & Trust Co. (1949)",
    "facts": "Will created successive life estates with contingent remainders.",
    "issue": "Did will violate rule against perpetuities?",
    "holding": "Yes, remote contingencies might vest too late.",
    "reasoning": "All possibilities must vest within lives in being plus 21 years."
  },
  {
    "id": "case245",
    "title": "City of Virginia Beach v. ESG Enterprises (1994)",
    "facts": "Deed restriction limited land use for 100 years.",
    "issue": "Do long-term restrictions violate public policy?",
    "holding": "No, if reasonable and not absolute restraint.",
    "reasoning": "Fixed-term restrictions are valid if not perpetual."
  },
  {
    "id": "case246",
    "title": "Brown v. Safeway Stores (1980)",
    "facts": "Dispute over commercial lease renewal option.",
    "issue": "Must option exercises strictly comply with lease terms?",
    "holding": "Yes, time-sensitive options require precise performance.",
    "reasoning": "Commercial certainty demands strict construction of option terms."
  },
  {
    "id": "case247",
    "title": "Shelley v. Kraemer (1948)",
    "facts": "Racial covenant barred sale to African Americans.",
    "issue": "Can courts enforce private racial covenants?",
    "holding": "No, judicial enforcement constitutes state action violating 14th Amendment.",
    "reasoning": "Court enforcement implicates state in unconstitutional discrimination."
  },
  {
    "id": "case248",
    "title": "Neponsit Property Owners' Association v. Emigrant Industrial Savings Bank (1938)",
    "facts": "Association sought to enforce maintenance fee covenant against successor.",
    "issue": "Does covenant run with the land?",
    "holding": "Yes, if intent, touch/concern, and privity exist.",
    "reasoning": "Covenants may bind successors if meeting traditional requirements."
  },
  {
    "id": "case249",
    "title": "Sanborn v. McLean (1925)",
    "facts": "Defendant built gas station despite neighborhood residential character.",
    "issue": "Can reciprocal negative easements be implied?",
    "holding": "Yes, if general scheme exists and purchaser had notice.",
    "reasoning": "Uniform restrictions create implied reciprocal servitudes."
  },
  {
    "id": "case250",
    "title": "Rick v. West (1962)",
    "facts": "Buyer claimed implied easement for beach access over seller's retained land.",
    "issue": "When do implied easements arise?",
    "holding": "When pre-existing use is apparent, continuous, and reasonably necessary.",
    "reasoning": "Prior use gives notice and demonstrates parties' intent."
  },
  {
    "id": "case251",
    "title": "Van Sandt v. Royster (1938)",
    "facts": "Buyer claimed implied easement for drainage across seller's retained parcel.",
    "issue": "Does strict necessity require absolute necessity?",
    "holding": "No, reasonable necessity suffices for implied easements.",
    "reasoning": "Modern approach favors finding easements based on apparent prior use."
  },
  {
    "id": "case252",
    "title": "Holbrook v. Taylor (1976)",
    "facts": "Landowner allowed neighbor to use road for years then revoked permission.",
    "issue": "Can permissive use become irrevocable easement?",
    "holding": "Yes, if reliance was substantial and foreseeable.",
    "reasoning": "Equitable estoppel may create easements absent formal requirements."
  },
  {
    "id": "case253",
    "title": "Brown v. Voss (1986)",
    "facts": "Easement holder built second home on dominant estate.",
    "issue": "Can easement use exceed original scope?",
    "holding": "No, easements limited to contemplated original purpose.",
    "reasoning": "Increased burden on servient estate constitutes misuse."
  },
  {
    "id": "case254",
    "title": "State ex rel. Thornton v. Hay (1969)",
    "facts": "Public claimed customary right to dry sand beach area.",
    "issue": "Can custom create public property rights?",
    "holding": "Yes, for longstanding, reasonable, uninterrupted public use.",
    "reasoning": "Ancient customs may ripen into enforceable public easements."
  },
  {
    "id": "case255",
    "title": "Prah v. Maretti (1982)",
    "facts": "New construction blocked neighbor's solar panels.",
    "issue": "Is there a right to solar access?",
    "holding": "Solar access may be protected under nuisance law.",
    "reasoning": "Changing energy needs justify recognizing new property interests."
  },
  {
    "id": "case256",
    "title": "Fontainebleau Hotel Corp. v. Forty-Five Twenty-Five, Inc. (1959)",
    "facts": "New hotel tower cast shadow on neighboring hotel's pool.",
    "issue": "Is there natural right to light and air?",
    "holding": "No, absent easement or zoning restriction.",
    "reasoning": "Property owners have no inherent right to unobstructed air/light."
  },
  {
    "id": "case257",
    "title": "Acton v. Blundell (1843)",
    "facts": "Well owner drained neighbor's well by pumping groundwater.",
    "issue": "Who owns percolating groundwater?",
    "holding": "Absolute ownership - landowners may extract freely.",
    "reasoning": "English rule gives landowners untrammeled subsurface rights."
  },
  {
    "id": "case258",
    "title": "Katz v. Walkinshaw (1903)",
    "facts": "Excessive groundwater pumping drained neighbors' wells.",
    "issue": "Should groundwater use be limited?",
    "holding": "Yes, reasonable use standard applies.",
    "reasoning": "American rule balances competing landowner interests."
  },
  {
    "id": "case259",
    "title": "United States v. Causby (1946)",
    "facts": "Military planes flew low over chicken farm, frightening livestock.",
    "issue": "How low must flights be to constitute a taking?",
    "holding": "Regular flights at 83 feet effected a taking.",
    "reasoning": "Airspace invasions that impair surface use require compensation."
  },
  {
    "id": "case260",
    "title": "Tyler v. Wilkinson (1827)",
    "facts": "Upstream mill owner diverted water from downstream user.",
    "issue": "What rights do riparian owners have?",
    "holding": "Reasonable use standard governs riparian disputes.",
    "reasoning": "Equal rights to water flow subject to reasonable utilization."
  },
  {
    "id": "case261",
    "title": "Keys v. Romley (1966)",
    "facts": "Landowner altered natural drainage, flooding neighbor's property.",
    "issue": "What governs surface water disputes?",
    "holding": "Reasonable use standard applies.",
    "reasoning": "Common enemy rule modified to prevent unreasonable harm."
  },
  {
    "id": "case262",
    "title": "Coffin v. Left Hand Ditch Co. (1882)",
    "facts": "Prior appropriator diverted water from junior riparian user.",
    "issue": "Does prior appropriation override riparian rights?",
    "holding": "Yes, in jurisdictions adopting appropriation system.",
    "reasoning": "First in time prevails where water scarcity demands priority system."
  },
  {
    "id": "case263",
    "title": "Pennsylvania Coal Co. v. Mahon (1922)",
    "facts": "Subsidence law prevented coal company from mining under homes.",
    "issue": "When does regulation become a taking?",
    "holding": "Regulation that goes 'too far' requires compensation.",
    "reasoning": "Diminution in value must be balanced against public benefit."
  },
  {
    "id": "case264",
    "title": "Miller v. Schoene (1928)",
    "facts": "State ordered destruction of ornamental cedar trees to protect apple orchards.",
    "issue": "Must government compensate when protecting public welfare?",
    "holding": "No, not when destroying one property interest to save another.",
    "reasoning": "Police power allows preference of higher economic value uses."
  },
  {
    "id": "case265",
    "title": "Village of Euclid v. Ambler Realty Co. (1926)",
    "facts": "Zoning ordinance restricted industrial use of property.",
    "issue": "Is zoning constitutional?",
    "holding": "Yes, as valid exercise of police power.",
    "reasoning": "Land use regulation permissible to promote public welfare."
  },
  {
    "id": "case266",
    "title": "Penn Central Transportation Co. v. New York City (1978)",
    "facts": "Landmark designation prevented building above Grand Central Terminal.",
    "issue": "Does historic preservation constitute a taking?",
    "holding": "Not per se, considering economic impact and investment expectations.",
    "reasoning": "Ad hoc balancing test considers character, economic impact, and interference."
  },
  {
    "id": "case267",
    "title": "Lucas v. South Carolina Coastal Council (1992)",
    "facts": "Beachfront construction ban deprived all economic value.",
    "issue": "Is total deprivation of economic value a categorical taking?",
    "holding": "Yes, unless prohibited by background principles of state law.",
    "reasoning": "Total regulatory takings require compensation under Fifth Amendment."
  },
  {
    "id": "case268",
    "title": "Dolan v. City of Tigard (1994)",
    "facts": "City demanded land dedication for permit approval.",
    "issue": "What standard applies to permit exactions?",
    "holding": "'Rough proportionality' required between impacts and conditions.",
    "reasoning": "Nexus must exist and conditions must be roughly proportional to impacts."
  },
  {
    "id": "case269",
    "title": "Nollan v. California Coastal Commission (1987)",
    "facts": "Beach access easement demanded for building permit.",
    "issue": "Must exactions have essential nexus to project impacts?",
    "holding": "Yes, no arbitrary connection between conditions and public need.",
    "reasoning": "Unrelated conditions amount to extortion violating Takings Clause."
  },
  {
    "id": "case270",
    "title": "Kelo v. City of New London (2005)",
    "facts": "City condemned property for economic development project.",
    "issue": "Does economic development qualify as 'public use'?",
    "holding": "Yes, if part of comprehensive development plan.",
    "reasoning": "Broad deference to legislative public purpose determinations."
  },
  {
    "id": "case271",
    "title": "Loretto v. Teleprompter Manhattan CATV Corp. (1982)",
    "facts": "Law required landlords to permit cable equipment installation.",
    "issue": "Do minor physical occupations constitute takings?",
    "holding": "Yes, any permanent physical occupation requires compensation.",
    "reasoning": "Physical invasions are per se takings regardless of economic impact."
  },
  {
    "id": "case272",
    "title": "Tahoe-Sierra Preservation Council v. Tahoe Regional Planning Agency (2002)",
    "facts": "Moratorium halted development for 32 months.",
    "issue": "Are temporary moratoria categorical takings?",
    "holding": "No, duration and context evaluated under Penn Central test.",
    "reasoning": "Temporary restrictions aren't per se takings like permanent ones."
  },
  {
    "id": "case273",
    "title": "Hadacheck v. Sebastian (1915)",
    "facts": "Brickmaker's operation became prohibited nuisance after zoning change.",
    "issue": "Must pre-existing uses be compensated when prohibited?",
    "holding": "No, public nuisance regulation doesn't require compensation.",
    "reasoning": "Police power allows prohibition of harmful uses regardless of timing."
  },
  {
    "id": "case274",
    "title": "Pruneyard Shopping Center v. Robins (1980)",
    "facts": "Shopping center barred political petitioning on premises.",
    "issue": "Do state constitutions create speech rights in private shopping centers?",
    "holding": "Yes, state may expand free speech protections beyond federal floor.",
    "reasoning": "Private property open to public may be subject to state free speech guarantees."
  },
  {
    "id": "case275",
    "title": "International Shoe Co. v. Washington (1945)",
    "facts": "Delaware corporation had salesmen in Washington but no physical presence.",
    "issue": "What contacts satisfy due process for personal jurisdiction?",
    "holding": "Minimum contacts making litigation 'reasonable and just.'",
    "reasoning": "Systematic activities create implied consent to jurisdiction."
  },
  {
    "id": "case276",
    "title": "Pennoyer v. Neff (1878)",
    "facts": "Oregon court entered default judgment against nonresident with in-state property.",
    "issue": "What limits exist on state court jurisdiction over nonresidents?",
    "holding": "Jurisdiction requires in-state service or property attachment.",
    "reasoning": "Territorial sovereignty limits state court power over outsiders."
  },
  {
    "id": "case277",
    "title": "World-Wide Volkswagen Corp. v. Woodson (1980)",
    "facts": "Oklahoma court asserted jurisdiction over NY dealer for car accident.",
    "issue": "Does mere foreseeability of product entering state create jurisdiction?",
    "holding": "No, purposeful availment required, not just foreseeable effects.",
    "reasoning": "Stream of commerce must reflect deliberate targeting of forum state."
  },
  {
    "id": "case278",
    "title": "Burger King Corp. v. Rudzewicz (1985)",
    "facts": "Florida franchise agreement with Michigan franchisee led to breach suit.",
    "issue": "Do contractual relationships establish personal jurisdiction?",
    "holding": "Yes, if defendant purposefully availed themselves of forum benefits.",
    "reasoning": "Deliberate contractual connections satisfy minimum contacts test."
  },
  {
    "id": "case279",
    "title": "Asahi Metal Industry Co. v. Superior Court (1987)",
    "facts": "Japanese parts maker sued in California for defective motorcycle tire valve.",
    "issue": "Does component manufacturer's awareness of product destination create jurisdiction?",
    "holding": "No, mere awareness insufficient without purposeful targeting (plurality).",
    "reasoning": "Stream of commerce plus additional conduct required for jurisdiction."
  },
  {
    "id": "case280",
    "title": "J. McIntyre Machinery, Ltd. v. Nicastro (2011)",
    "facts": "British manufacturer's machine injured NJ worker; no NJ-specific marketing.",
    "issue": "Does single product entry via distributor create jurisdiction?",
    "holding": "No, purposeful targeting of forum required (plurality).",
    "reasoning": "Stream of commerce theory alone insufficient for specific jurisdiction."
  },
  {
    "id": "case281",
    "title": "Goodyear Dunlop Tires Operations, S.A. v. Brown (2011)",
    "facts": "Foreign subsidiaries of Goodyear sued in NC for bus accident in France.",
    "issue": "When does general jurisdiction exist over foreign corporations?",
    "holding": "Only where affiliations are 'continuous and systematic' - essentially at home.",
    "reasoning": "General jurisdiction requires substantial in-state presence approximating domicile."
  },
  {
    "id": "case282",
    "title": "Daimler AG v. Bauman (2014)",
    "facts": "Argentine plaintiffs sued German automaker in CA for human rights abuses abroad.",
    "issue": "Can general jurisdiction extend beyond principal place of business?",
    "holding": "No, general jurisdiction limited to place of incorporation and principal HQ.",
    "reasoning": "Jurisdiction requires affiliations so continuous as to render defendant 'at home.'"
  },
  {
    "id": "case283",
    "title": "Ford Motor Co. v. Montana Eighth Judicial District Court (2021)",
    "facts": "Ford sued in states where defective vehicles were sold but not manufactured.",
    "issue": "Does specific jurisdiction require causal connection between forum contacts and claims?",
    "holding": "No, sufficient that claims arise from related forum activities.",
    "reasoning": "Jurisdiction proper where defendant serves market and injury occurs there."
  },
  {
    "id": "case284",
    "title": "Shaffer v. Heitner (1977)",
    "facts": "Delaware court asserted quasi in rem jurisdiction over nonresident directors via stock sequestration.",
    "issue": "Do in rem actions require minimum contacts?",
    "holding": "Yes, all jurisdiction exercises must satisfy International Shoe standard.",
    "reasoning": "Property presence alone insufficient without minimum contacts."
  },
  {
    "id": "case285",
    "title": "Burnham v. Superior Court (1990)",
    "facts": "Nonresident served while briefly visiting California for unrelated business.",
    "issue": "Does transient ('tag') jurisdiction satisfy due process?",
    "holding": "Yes, physical presence remains valid service basis.",
    "reasoning": "Historical practice and practical considerations support tag jurisdiction."
  },
  {
    "id": "case286",
    "title": "Insurance Corp. of Ireland v. Compagnie des Bauxites de Guinee (1982)",
    "facts": "Defendant refused jurisdictional discovery, leading to default sanction.",
    "issue": "May courts presume jurisdiction from discovery noncompliance?",
    "holding": "Yes, procedural due process allows sanctions for noncompliance.",
    "reasoning": "Jurisdictional determinations are subject to ordinary litigation rules."
  },
  {
    "id": "case287",
    "title": "Kulko v. Superior Court (1978)",
    "facts": "NY father sent child to visit CA mother, who then filed custody petition.",
    "issue": "Does child's presence create jurisdiction over nonresident parent?",
    "holding": "No, unilateral forum contacts by others don't establish jurisdiction.",
    "reasoning": "Minimum contacts must arise from defendant's purposeful forum availment."
  },
  {
    "id": "case288",
    "title": "McGee v. International Life Insurance Co. (1957)",
    "facts": "Texas insurer's single California policy enforced in CA court.",
    "issue": "Can single contract create jurisdiction?",
    "holding": "Yes, when contract has substantial connection to forum.",
    "reasoning": "Modern commerce allows jurisdiction based on isolated substantial contacts."
  },
  {
    "id": "case289",
    "title": "Carnival Cruise Lines, Inc. v. Shute (1991)",
    "facts": "Cruise ticket's forum selection clause required suits in Florida.",
    "issue": "Are forum selection clauses enforceable?",
    "holding": "Yes, unless fundamentally unfair.",
    "reasoning": "Reasonable clauses reduce litigation costs and provide predictability."
  },
  {
    "id": "case290",
    "title": "Bremen v. Zapata Off-Shore Co. (1972)",
    "facts": "International towage contract specified London forum for disputes.",
    "issue": "Are international forum selection clauses enforceable?",
    "holding": "Yes, absent strong public policy or inconvenience showing.",
    "reasoning": "International commerce requires respect for contractual forum choices."
  },
  {
    "id": "case291",
    "title": "Gulf Oil Corp. v. Gilbert (1947)",
    "facts": "VA plaintiff sued NY defendant in NY for VA accident.",
    "issue": "When may courts dismiss under forum non conveniens?",
    "holding": "When alternative forum exists and private/public factors favor dismissal.",
    "reasoning": "Court may decline jurisdiction if another forum is more appropriate."
  },
  {
    "id": "case292",
    "title": "Louisville & Nashville Railroad Co. v. Mottley (1908)",
    "facts": "Plaintiffs alleged federal law would prevent contract enforcement.",
    "issue": "Does anticipation of federal defense create federal question jurisdiction?",
    "holding": "No, federal question must appear on face of well-pleaded complaint.",
    "reasoning": "Jurisdiction depends on plaintiff's claims, not potential defenses."
  },
  {
    "id": "case293",
    "title": "Grable & Sons Metal Products, Inc. v. Darue Engineering & Mfg. (2005)",
    "facts": "State quiet title action turned on federal tax notice requirements.",
    "issue": "When do state law claims raise substantial federal issues?",
    "holding": "When federal issue is (1) necessary, (2) substantial, and (3) capable of resolution without disrupting federal-state balance.",
    "reasoning": "Narrow category where state claims implicate significant federal interests."
  },
  {
    "id": "case294",
    "title": "Gunn v. Minton (2013)",
    "facts": "Legal malpractice claim required interpretation of patent law.",
    "issue": "Does patent law malpractice create federal jurisdiction?",
    "holding": "No, federal interest insufficient to displace state court authority.",
    "reasoning": "Hypothetical patent question in malpractice suit doesn't satisfy Grable test."
  },
  {
    "id": "case295",
    "title": "Strawbridge v. Curtiss (1806)",
    "facts": "Diversity suit with partial alignment of citizenship.",
    "issue": "What constitutes complete diversity?",
    "holding": "No plaintiff may share citizenship with any defendant.",
    "reasoning": "Diversity jurisdiction requires total opposition of interests."
  },
  {
    "id": "case296",
    "title": "Mas v. Perry (1974)",
    "facts": "French couple temporarily in Louisiana sued landlord.",
    "issue": "What determines citizenship for diversity?",
    "holding": "Domicile (physical presence plus intent to remain) controls.",
    "reasoning": "Temporary residence doesn't change established domicile."
  },
  {
    "id": "case297",
    "title": "Hertz Corp. v. Friend (2010)",
    "facts": "Dispute over Hertz's principal place of business for diversity purposes.",
    "issue": "How is corporate citizenship determined?",
    "holding": "'Nerve center' test - where officers direct corporate activities.",
    "reasoning": "Simple, objective rule avoids complex jurisdictional inquiries."
  },
  {
    "id": "case298",
    "title": "Grupo Dataflux v. Atlas Global Group, L.P. (2004)",
    "facts": "Diversity destroyed by post-filing change in citizenship.",
    "issue": "Does curing citizenship defect during litigation preserve jurisdiction?",
    "holding": "No, diversity measured at time of filing only.",
    "reasoning": "Jurisdictional certainty requires bright-line timing rule."
  },
  {
    "id": "case299",
    "title": "Exxon Mobil Corp. v. Allapattah Services (2005)",
    "facts": "Class action with some class members not meeting amount-in-controversy.",
    "issue": "May supplemental jurisdiction extend to additional class members?",
    "holding": "Yes, if one claim satisfies requirements and others form same case/controversy.",
    "reasoning": "Section 1367 permits aggregation in such circumstances."
  },
  {
    "id": "case300",
    "title": "Owen Equipment & Erection Co. v. Kroger (1978)",
    "facts": "Plaintiff sued nondiverse third-party defendant destroying complete diversity.",
    "issue": "Does diversity jurisdiction extend to impleaded parties?",
    "holding": "No, jurisdiction must exist independently for each claim.",
    "reasoning": "Ancillary jurisdiction doesn't override complete diversity requirement."
  },
  {
    "id": "case301",
    "title": "United Mine Workers v. Gibbs (1966)",
    "facts": "State law claim joined with federal labor law claim.",
    "issue": "When may federal courts hear pendent state claims?",
    "holding": "When state and federal claims derive from common nucleus of operative fact.",
    "reasoning": "Judicial economy supports hearing logically related claims together."
  },
  {
    "id": "case302",
    "title": "Kokkonen v. Guardian Life Insurance Co. of America (1994)",
    "facts": "District court enforced settlement agreement after dismissing case.",
    "issue": "Do federal courts have inherent power to enforce settlements?",
    "holding": "No, requires independent jurisdictional basis or incorporation into dismissal order.",
    "reasoning": "Ancillary jurisdiction limited to matters necessary to dispose of original claims."
  },
  {
    "id": "case303",
    "title": "Ruhrgas AG v. Marathon Oil Co. (1999)",
    "facts": "District court dismissed for lack of personal jurisdiction without deciding subject matter jurisdiction.",
    "issue": "Must subject matter jurisdiction be decided first?",
    "holding": "No, courts may choose threshold dismissal grounds.",
    "reasoning": "Judicial economy permits flexible sequencing of jurisdictional issues."
  },
  {
    "id": "case304",
    "title": "Sinochem International Co. v. Malaysia International Shipping Corp. (2007)",
    "facts": "Forum non conveniens dismissal before jurisdictional determination.",
    "issue": "May courts dismiss for forum non conveniens without establishing jurisdiction?",
    "holding": "Yes, when jurisdiction is difficult and dismissal otherwise appropriate.",
    "reasoning": "Practical considerations allow threshold forum non conveniens rulings."
  },
  {
    "id": "case305",
    "title": "Conley v. Gibson (1957)",
    "facts": "Railroad workers alleged racial discrimination in union representation.",
    "issue": "What pleading standard applies to avoid dismissal?",
    "holding": "'No set of facts' standard - notice pleading suffices.",
    "reasoning": "FRCP reject technical pleading requirements in favor of simplified notice."
  },
  {
    "id": "case306",
    "title": "Bell Atlantic Corp. v. Twombly (2007)",
    "facts": "Antitrust conspiracy alleged without specific facts.",
    "issue": "What pleading standard applies to survive motion to dismiss?",
    "holding": "Plausibility standard - must state facially plausible claim.",
    "reasoning": "Conclusory allegations require factual enhancement showing entitlement to relief."
  },
  {
    "id": "case307",
    "title": "Ashcroft v. Iqbal (2009)",
    "facts": "Muslim detainee alleged discriminatory confinement post-9/11.",
    "issue": "Does Twombly apply beyond antitrust?",
    "holding": "Yes, plausibility pleading applies to all civil cases.",
    "reasoning": "Rule 8 requires showing claim is plausible on its face, not just possible."
  },
  {
    "id": "case308",
    "title": "Zielinski v. Philadelphia Piers, Inc. (1956)",
    "facts": "Plaintiff mistakenly sued wrong defendant but sought amendment after limitations period.",
    "issue": "When do amendments relate back to original filing?",
    "holding": "When new party had notice and isn't prejudiced by the change.",
    "reasoning": "Relation back permitted despite technical pleading errors preventing recovery."
  },
  {
    "id": "case309",
    "title": "Swierkiewicz v. Sorema N.A. (2002)",
    "facts": "Age/national origin discrimination claim dismissed for insufficient details.",
    "issue": "Must employment discrimination complaints plead prima facie case?",
    "holding": "No, notice pleading standard applies to Title VII claims.",
    "reasoning": "McDonnell Douglas framework is evidentiary standard, not pleading requirement."
  },
  {
    "id": "case310",
    "title": "Leatherman v. Tarrant County Narcotics Intelligence & Coordination Unit (1993)",
    "facts": "Section 1983 suit against municipality required heightened pleading?",
    "issue": "Do civil rights claims require fact-specific pleading?",
    "holding": "No, FRCP notice pleading applies equally to all claims.",
    "reasoning": "Municipal liability follows usual pleading rules; no heightened standard."
  },
  {
    "id": "case311",
    "title": "Dioguardi v. Durning (1944)",
    "facts": "Pro se plaintiff filed inartful complaint about customs seizure.",
    "issue": "How are pro se pleadings evaluated?",
    "holding": "Liberal construction required to assess potential claims.",
    "reasoning": "Courts must look beyond formal pleading defects in pro se filings."
  },
  {
    "id": "case312",
    "title": "Erie Railroad Co. v. Tompkins (1938)",
    "facts": "Pennsylvania injury case applying federal vs. state negligence standards.",
    "issue": "May federal courts create general common law?",
    "holding": "No, federal courts must apply state substantive law in diversity cases.",
    "reasoning": "No federal general common law exists under Rules of Decision Act."
  },
  {
    "id": "case313",
    "title": "Guaranty Trust Co. v. York (1945)",
    "facts": "State statute of limitations barred claim but federal equity practice might allow it.",
    "issue": "When must federal courts follow state law?",
    "holding": "When failure to do so would significantly affect litigation outcome.",
    "reasoning": "Outcome-determination test ensures Erie's policy of forum-shopping prevention."
  },
  {
    "id": "case314",
    "title": "Byrd v. Blue Ridge Rural Electric Cooperative (1958)",
    "facts": "State law treated worker status as jury question; federal practice as judge question.",
    "issue": "How to balance state substantive interests vs. federal procedural rules?",
    "holding": "Balancing test weighs state interests against federal procedural needs.",
    "reasoning": "Strong federal interests may justify departing from state procedural rules."
  },
  {
    "id": "case315",
    "title": "Hanna v. Plumer (1965)",
    "facts": "Federal service rule vs. state in-hand service requirement for executor.",
    "issue": "Do FRCP override contrary state procedures?",
    "holding": "Yes, valid FRCP apply regardless of conflicting state law.",
    "reasoning": "Federal rules adopted under Rules Enabling Act control if constitutional and valid."
  },
  {
    "id": "case316",
    "title": "Gasperini v. Center for Humanities, Inc. (1996)",
    "facts": "State law required appellate review of excessive verdicts.",
    "issue": "Must federal courts apply state standards for reviewing damages?",
    "holding": "Yes, as substantive law under Erie, but Seventh Amendment limits reexamination.",
    "reasoning": "State damage review standards may reflect substantive policies requiring deference."
  },
  {
    "id": "case317",
    "title": "Semtek International v. Lockheed Martin Corp. (2001)",
    "facts": "Federal diversity dismissal based on statute of limitations.",
    "issue": "Does federal dismissal bar refiling in state court?",
    "holding": "Federal dismissal gets same preclusive effect as state court dismissal would.",
    "reasoning": "Federal common law adopts state claim preclusion rules for diversity cases."
  },
  {
    "id": "case318",
    "title": "Shady Grove Orthopedic Associates v. Allstate Insurance Co. (2010)",
    "facts": "State law barred class actions for statutory penalties; FRCP 23 permitted them.",
    "issue": "Does FRCP 23 override state class action restrictions?",
    "holding": "Yes, if rule is valid under Rules Enabling Act (plurality).",
    "reasoning": "Federal rules govern procedure unless they abridge substantive rights."
  },
  {
    "id": "case319",
    "title": "Walker v. Armco Steel Corp. (1980)",
    "facts": "State law treated filing as tolling event; FRCP 3 said filing commences action.",
    "issue": "Which controls for statute of limitations purposes?",
    "holding": "State law governs when service establishes limitations tolling.",
    "reasoning": "Statute of limitations is substantive under Erie analysis."
  },
  {
    "id": "case320",
    "title": "Hansberry v. Lee (1940)",
    "facts": "Class action bound absent members despite inadequate representation.",
    "issue": "When may class judgments bind absent parties?",
    "holding": "Only when adequate representation and procedural fairness exist.",
    "reasoning": "Due process requires protecting absent class members' interests."
  },
    {
      "id": "case321",
      "title": "Amchem Products, Inc. v. Windsor (1997)",
      "facts": "Class action settlement for asbestos exposure claims before injuries manifested.",
      "issue": "Can class action settle future claims of uninjured class members?",
      "holding": "No, inadequate representation and conflicts preclude certification.",
      "reasoning": "Settlement classes must meet Rule 23(a) requirements; divergent interests prevent adequate representation."
    },
    {
      "id": "case322",
      "title": "Ortiz v. Fibreboard Corp. (1999)",
      "facts": "Limited fund class action settlement for asbestos liabilities.",
      "issue": "Does limited fund theory justify mandatory settlement class?",
      "holding": "No, insufficient showing of limited fund and inadequate representation.",
      "reasoning": "Strict requirements for limited fund certification not met; settlement unfair to some claimants."
    },
    {
      "id": "case323",
      "title": "Wal-Mart Stores, Inc. v. Dukes (2011)",
      "facts": "1.5 million female employees alleged company-wide discrimination.",
      "issue": "Did class meet commonality requirement under Rule 23(a)(2)?",
      "holding": "No, no common question capable of classwide resolution.",
      "reasoning": "Discretionary employment decisions lack commonality absent specific discriminatory policy."
    },
    {
      "id": "case324",
      "title": "Comcast Corp. v. Behrend (2013)",
      "facts": "Antitrust class action with flawed damages model.",
      "issue": "Must damages model match liability theory for class certification?",
      "holding": "Yes, class certification requires valid damages methodology.",
      "reasoning": "Trial plan must show damages are measurable on classwide basis."
    },
    {
      "id": "case325",
      "title": "AT&T Mobility LLC v. Concepcion (2011)",
      "facts": "Consumer contract barred class arbitration.",
      "issue": "Does FAA preempt state law invalidating class action waivers?",
      "holding": "Yes, state law obstructs arbitration's efficiency.",
      "reasoning": "FAA favors arbitration; class procedures conflict with arbitration's informality."
    },
    {
      "id": "case326",
      "title": "Bristol-Myers Squibb Co. v. Superior Court (2017)",
      "facts": "Nonresident plaintiffs sued in CA for injuries from drug made elsewhere.",
      "issue": "Can state exercise specific jurisdiction over nonresident claims?",
      "holding": "No, insufficient connection between forum and nonresidents' claims.",
      "reasoning": "Jurisdiction requires affiliation between forum and specific claims."
    },
    {
      "id": "case327",
      "title": "Campbell v. City of Los Angeles (2018)",
      "facts": "Police officers' collective action under FLSA for overtime pay.",
      "issue": "Must collective action members file written consent to sue?",
      "holding": "Yes, FLSA requires affirmative opt-in by plaintiffs.",
      "reasoning": "Statute's language mandates written consent to become party plaintiff."
    },
    {
      "id": "case328",
      "title": "Temple v. Synthes Corp. (1990)",
      "facts": "Product liability suit against multiple defendants.",
      "issue": "Must all joint tortfeasors be joined under Rule 19?",
      "holding": "No, joint tortfeasors are permissive parties.",
      "reasoning": "Complete relief possible among parties; no compulsory joinder required."
    },
    {
      "id": "case329",
      "title": "Provident Tradesmens Bank & Trust Co. v. Patterson (1968)",
      "facts": "Car accident case where nonparty driver might be liable.",
      "issue": "Was absent party 'necessary' under Rule 19?",
      "holding": "No, existing parties could adequately litigate fault.",
      "reasoning": "Practical considerations determine whether party is indispensable."
    },
    {
      "id": "case330",
      "title": "Hickman v. Taylor (1947)",
      "facts": "Attorney refused to produce witness statements from accident investigation.",
      "issue": "Are attorney work product materials discoverable?",
      "holding": "No, absent showing of substantial need.",
      "reasoning": "Work product doctrine protects adversarial trial preparation materials."
    },
    {
      "id": "case331",
      "title": "Upjohn Co. v. United States (1981)",
      "facts": "IRS sought attorney-client communications with company employees.",
      "issue": "Does privilege cover communications with non-control-group employees?",
      "holding": "Yes, if communications concern legal advice within employee's duties.",
      "reasoning": "Privilege scope depends on communication purpose, not employee status."
    },
    {
      "id": "case332",
      "title": "Seattle Times Co. v. Rhinehart (1984)",
      "facts": "Court prohibited newspaper from publishing discovered cult membership lists.",
      "issue": "Can courts restrict use of discovered information?",
      "holding": "Yes, protective orders may limit dissemination.",
      "reasoning": "Discovery has different First Amendment implications than ordinary publication."
    },
    {
      "id": "case333",
      "title": "Herbert v. Lando (1979)",
      "facts": "Defamation defendant refused to disclose editorial process.",
      "issue": "Are media defendants' editorial decisions discoverable?",
      "holding": "Yes, relevant to actual malice determination.",
      "reasoning": "First Amendment doesn't shield evidence of state of mind in libel cases."
    },
    {
      "id": "case334",
      "title": "Zubulake v. UBS Warburg LLC (2003)",
      "facts": "Employer failed to preserve relevant emails in discrimination case.",
      "issue": "What are parties' obligations for electronic discovery?",
      "holding": "Must preserve reasonably anticipated relevant evidence; sanctions for failure.",
      "reasoning": "Electronic records require proactive preservation; cost-shifting may apply."
    },
    {
      "id": "case335",
      "title": "National Hockey League v. Metropolitan Hockey Club (1976)",
      "facts": "Plaintiffs repeatedly failed to comply with discovery orders.",
      "issue": "What sanctions are appropriate for discovery violations?",
      "holding": "Dismissal justified for willful noncompliance.",
      "reasoning": "Courts may impose severe sanctions for deliberate obstruction."
    },
    {
      "id": "case336",
      "title": "Adickes v. S.H. Kress & Co. (1970)",
      "facts": "Civil rights plaintiff alleged conspiracy in lunch counter refusal.",
      "issue": "Who bears burden on summary judgment motions?",
      "holding": "Movant must show absence of genuine dispute; non-movant gets benefit of doubt.",
      "reasoning": "Rule 56 requires showing no material facts in dispute to prevail."
    },
    {
      "id": "case337",
      "title": "Celotex Corp. v. Catrett (1986)",
      "facts": "Asbestos case where plaintiff lacked evidence of exposure to defendant's product.",
      "issue": "Must moving party negate opponent's claim without discovery?",
      "holding": "No, may point to absence of evidence supporting essential element.",
      "reasoning": "Summary judgment proper when non-movant fails to make showing on essential element."
    },
    {
      "id": "case338",
      "title": "Anderson v. Liberty Lobby, Inc. (1986)",
      "facts": "Libel case where clear and convincing evidence standard applied.",
      "issue": "Does evidentiary standard affect summary judgment analysis?",
      "holding": "Yes, court must consider applicable burden of proof.",
      "reasoning": "Summary judgment standard mirrors trial standard for sufficiency of evidence."
    },
    {
      "id": "case339",
      "title": "Matsushita Electric Industrial Co. v. Zenith Radio Corp. (1986)",
      "facts": "Antitrust conspiracy claim with economically implausible theory.",
      "issue": "Can implausible claims survive summary judgment?",
      "holding": "No, economically irrational claims require more persuasive evidence.",
      "reasoning": "Unreasonable inferences don't create genuine factual disputes."
    },
    {
      "id": "case340",
      "title": "Scott v. Harris (2007)",
      "facts": "Police chase video contradicted plaintiff's excessive force allegations.",
      "issue": "How do courts evaluate incontrovertible video evidence?",
      "holding": "When video blatantly contradicts testimony, court needn't adopt non-movant's version.",
      "reasoning": "Objective evidence may override contrary witness accounts."
    },
    {
      "id": "case341",
      "title": "Katz v. Children's Hospital of Orange County (2001)",
      "facts": "Plaintiff submitted self-serving affidavit to oppose summary judgment.",
      "issue": "Are self-serving affidavits sufficient to create factual disputes?",
      "holding": "Yes, if based on personal knowledge and not conclusory.",
      "reasoning": "Credibility determinations are for trial, not summary judgment."
    },
    {
      "id": "case342",
      "title": "Federated Department Stores, Inc. v. Moitie (1981)",
      "facts": "Plaintiffs refiled dismissed claims in state court after federal dismissal.",
      "issue": "Does claim preclusion bar refiling in different court?",
      "holding": "Yes, final judgment on merits precludes relitigation.",
      "reasoning": "Res judicata applies regardless of plaintiff's tactical reasons."
    },
    {
      "id": "case343",
      "title": "Taylor v. Sturgell (2008)",
      "facts": "Plaintiff sought same FOIA documents previously denied to another requester.",
      "issue": "Can nonparty be bound by prior judgment under 'virtual representation'?",
      "holding": "No, except in specific established exceptions.",
      "reasoning": "Due process limits preclusion against nonparties."
    },
    {
      "id": "case344",
      "title": "Parklane Hosiery Co. v. Shore (1979)",
      "facts": "SEC injunction case used offensively in subsequent shareholder suit.",
      "issue": "When may offensive nonmutual collateral estoppel apply?",
      "holding": "Permissible if defendant had full opportunity to litigate in first action.",
      "reasoning": "Court discretion considers fairness and efficiency factors."
    },
    {
      "id": "case345",
      "title": "Allen v. McCurry (1980)",
      "facts": "Fourth Amendment claim previously litigated in criminal case.",
      "issue": "Does issue preclusion apply to §1983 claims?",
      "holding": "Yes, full and fair litigation in criminal case precludes relitigation.",
      "reasoning": "Section 1983 doesn't override traditional preclusion principles."
    },
    {
      "id": "case346",
      "title": "San Remo Hotel, L.P. v. City and County of San Francisco (2005)",
      "facts": "State court takings determination sought to be relitigated in federal court.",
      "issue": "Does issue preclusion bar relitigation of takings claims?",
      "holding": "Yes, full and fair state litigation precludes federal relitigation.",
      "reasoning": "Williamson County doesn't create exception to preclusion rules."
    },
    {
      "id": "case347",
      "title": "Montana v. United States (1979)",
      "facts": "Federal government challenged state tax after related contractor case.",
      "issue": "Can government be estopped by prior litigation?",
      "holding": "Yes, when closely related to prior case it controlled.",
      "reasoning": "Preclusion applies when government substantially controls litigation."
    },
    {
      "id": "case348",
      "title": "Cohen v. Beneficial Industrial Loan Corp. (1949)",
      "facts": "Shareholder suit required bond posting under state law.",
      "issue": "Is denial of interlocutory appeal reviewable?",
      "holding": "Yes, under collateral order doctrine for separable final decisions.",
      "reasoning": "Appeal permitted for conclusive decisions separable from merits."
    },
    {
      "id": "case349",
      "title": "Mitchell v. Forsyth (1985)",
      "facts": "Attorney General appealed denial of immunity in wiretap case.",
      "issue": "Are qualified immunity denials immediately appealable?",
      "holding": "Yes, as immunity is immunity from suit, not just liability.",
      "reasoning": "Collateral order doctrine protects right to avoid trial."
    },
    {
      "id": "case350",
      "title": "Steel Co. v. Citizens for a Better Environment (1998)",
      "facts": "Environmental group sued for past violations already remedied.",
      "issue": "May courts assume hypothetical jurisdiction?",
      "holding": "No, jurisdiction must be established before merits.",
      "reasoning": "Article III prohibits advisory opinions on hypothetical jurisdiction."
    },
    {
      "id": "case351",
      "title": "Caterpillar Inc. v. Lewis (1996)",
      "facts": "Diversity case improperly removed but cured by time of judgment.",
      "issue": "Does jurisdictional defect require vacating final judgment?",
      "holding": "No, if cured before judgment issued.",
      "reasoning": "Final judgment may stand despite earlier jurisdictional error."
    },
    {
      "id": "case352",
      "title": "Old Chief v. United States (1997)",
      "facts": "Defendant offered to stipulate to prior felony conviction status.",
      "issue": "Must court accept stipulation to avoid prejudicial evidence?",
      "holding": "No, prosecution may prove case with probative evidence.",
      "reasoning": "Stipulations don't necessarily satisfy prosecution's evidentiary needs."
    },
    {
      "id": "case353",
      "title": "Sprint/United Management Co. v. Mendelsohn (2008)",
      "facts": "Plaintiff sought testimony about discrimination by other supervisors.",
      "issue": "Are 'me too' discrimination claims admissible?",
      "holding": "Relevance depends on factual similarities; no per se rule.",
      "reasoning": "Trial court has discretion to evaluate contextual relevance."
    },
    {
      "id": "case354",
      "title": "United States v. James (1998)",
      "facts": "Prior drug dealing evidence introduced in murder trial.",
      "issue": "When are prior bad acts admissible?",
      "holding": "If relevant to material issue and not unduly prejudicial.",
      "reasoning": "Rule 404(b) permits evidence for non-character purposes."
    },
    {
      "id": "case355",
      "title": "Michelson v. United States (1948)",
      "facts": "Defendant's character witness cross-examined about specific acts.",
      "issue": "How may character evidence be presented?",
      "holding": "Reputation testimony only; cross-examination limited to good faith basis.",
      "reasoning": "Character evidence rules balance probative value against prejudice."
    },
    {
      "id": "case356",
      "title": "Huddleston v. United States (1988)",
      "facts": "Stolen TV receipts introduced to show knowledge in stolen goods case.",
      "issue": "What standard applies for Rule 404(b) evidence?",
      "holding": "Sufficient evidence for jury to find act occurred by preponderance.",
      "reasoning": "Court needn't make preliminary finding before admission."
    },
    {
      "id": "case357",
      "title": "United States v. Manske (2006)",
      "facts": "Defendant sought to introduce victim's prior false allegations.",
      "issue": "Can defendants use 'reverse 404(b)' evidence?",
      "holding": "Yes, subject to same relevance/prejudice balancing.",
      "reasoning": "Defendants enjoy same evidentiary rights as prosecution."
    },
    {
      "id": "case358",
      "title": "State v. Williams (1983)",
      "facts": "Prior sexual assault evidence introduced in rape trial.",
      "issue": "When is prior sexual conduct admissible?",
      "holding": "Only if relevant to consent or prosecution's case.",
      "reasoning": "Rape shield laws limit admissibility to protect victims."
    },
    {
      "id": "case359",
      "title": "Williams v. New York (1949)",
      "facts": "Judge considered non-testimonial information at sentencing.",
      "issue": "What evidence is admissible at sentencing?",
      "holding": "Hearsay and non-adjudicated conduct may be considered.",
      "reasoning": "Sentencing requires broad information to assess rehabilitation."
    },
    {
      "id": "case360",
      "title": "Dutton v. Evans (1970)",
      "facts": "Co-conspirator's statement admitted after conspiracy ended.",
      "issue": "Does co-conspirator exception require conspiracy's continuation?",
      "holding": "No, if statement furthers conspiracy's objectives.",
      "reasoning": "Hearsay exceptions based on reliability, not contemporaneity."
    },
    {
      "id": "case361",
      "title": "United States v. Inadi (1986)",
      "facts": "Co-conspirator statements admitted without showing unavailability.",
      "issue": "Must declarant be unavailable for co-conspirator exception?",
      "holding": "No, unavailability requirement doesn't apply.",
      "reasoning": "Live testimony wouldn't provide same evidentiary value."
    },
    {
      "id": "case362",
      "title": "Idaho v. Wright (1990)",
      "facts": "Child's hearsay statements admitted without cross-examination.",
      "issue": "What makes hearsay sufficiently reliable?",
      "holding": "Particularized guarantees of trustworthiness required.",
      "reasoning": "Residual exception demands showing of inherent reliability."
    },
    {
      "id": "case363",
      "title": "White v. Illinois (1992)",
      "facts": "Child's excited utterance admitted without testimony.",
      "issue": "Must declarant be unavailable for excited utterance exception?",
      "holding": "No, unavailability not required for firmly rooted exceptions.",
      "reasoning": "Excited utterances carry inherent reliability."
    },
    {
      "id": "case364",
      "title": "Crawford v. Washington (2004)",
      "facts": "Wife's recorded statement used against husband at trial.",
      "issue": "Does confrontation clause allow testimonial hearsay without cross?",
      "holding": "No, testimonial statements require confrontation unless unavailability plus prior cross.",
      "reasoning": "Core confrontation right applies to testimonial statements."
    },
    {
      "id": "case365",
      "title": "Davis v. Washington (2006)",
      "facts": "911 call and domestic violence statements admitted.",
      "issue": "What makes statements testimonial vs. non-testimonial?",
      "holding": "Statements for emergency assistance are non-testimonial.",
      "reasoning": "Primary purpose test distinguishes investigative from emergency statements."
    },
    {
      "id": "case366",
      "title": "Giles v. California (2008)",
      "facts": "Murder defendant claimed forfeiture by killing victim-witness.",
      "issue": "Does forfeiture require intent to prevent testimony?",
      "holding": "Yes, must show purpose to make witness unavailable.",
      "reasoning": "Forfeiture applies only to intentional witness tampering."
    },
    {
      "id": "case367",
      "title": "Michigan v. Bryant (2011)",
      "facts": "Dying victim identified shooter to police.",
      "issue": "Are dying declarations testimonial?",
      "holding": "No, when primary purpose is addressing ongoing emergency.",
      "reasoning": "Context determines whether statements aimed at emergency or prosecution."
    },
    {
      "id": "case368",
      "title": "Melendez-Diaz v. Massachusetts (2009)",
      "facts": "Drug lab certificates admitted without analyst testimony.",
      "issue": "Are forensic reports testimonial?",
      "holding": "Yes, analysts must testify absent prior cross-examination.",
      "reasoning": "Scientific reports prepared for litigation trigger confrontation rights."
    },
    {
      "id": "case369",
      "title": "Bullcoming v. New Mexico (2011)",
      "facts": "Surrogate testified about non-testifying analyst's blood alcohol report.",
      "issue": "Does surrogate testimony satisfy confrontation?",
      "holding": "No, actual analyst must testify about own work.",
      "reasoning": "Surrogates can't convey analyst's observations or methods."
    },
    {
      "id": "case370",
      "title": "Williams v. Illinois (2012)",
      "facts": "Expert testified about DNA report prepared by non-testifying analyst.",
      "issue": "Does expert reliance on testimonial reports violate confrontation?",
      "holding": "No, if expert offers independent opinion (plurality).",
      "reasoning": "Not testimonial if not offered for truth of underlying statements."
    },
    {
      "id": "case371",
      "title": "Ohio v. Clark (2015)",
      "facts": "Preschooler's statements to teachers about abuse admitted.",
      "issue": "Are child statements to teachers testimonial?",
      "holding": "No, when primary purpose is protection, not investigation.",
      "reasoning": "Objective circumstances determine testimonial nature."
    },
    {
      "id": "case372",
      "title": "Jaffee v. Redmond (1996)",
      "facts": "Therapist resisted testifying about police officer patient.",
      "issue": "Is there federal psychotherapist-patient privilege?",
      "holding": "Yes, protects confidential therapy communications.",
      "reasoning": "Public and private interests favor protecting therapeutic relationships."
    },
    {
      "id": "case373",
      "title": "Swidler & Berlin v. United States (1998)",
      "facts": "Special counsel sought notes from deceased Vince Foster's lawyer.",
      "issue": "Does attorney-client privilege survive client's death?",
      "holding": "Yes, absent exceptional circumstances.",
      "reasoning": "Posthumous privilege serves client's expectation of confidentiality."
    },
    {
      "id": "case374",
      "title": "United States v. Nixon (1974)",
      "facts": "President refused to produce Watergate tapes.",
      "issue": "Is executive privilege absolute?",
      "holding": "No, yields to demonstrated judicial need in criminal cases.",
      "reasoning": "Balanced against fundamental demands of due process."
    },
    {
      "id": "case375",
      "title": "University of Pennsylvania v. EEOC (1990)",
      "facts": "EEOC sought peer review materials in tenure discrimination case.",
      "issue": "Is there academic peer review privilege?",
      "holding": "No, absent congressional recognition.",
      "reasoning": "Creating new privileges requires weighing public interests."
    },
    {
      "id": "case376",
      "title": "Frye v. United States (1923)",
      "facts": "Defendant sought to introduce lie detector test results.",
      "issue": "What standard governs novel scientific evidence?",
      "holding": "Must be 'generally accepted' in relevant field.",
      "reasoning": "Consensus ensures reliability of novel methodologies."
    },
    {
      "id": "case377",
      "title": "Daubert v. Merrell Dow Pharmaceuticals (1993)",
      "facts": "Plaintiffs' experts linked drug to birth defects.",
      "issue": "What standard applies to expert scientific testimony?",
      "holding": "Trial judge must ensure relevance and reliability.",
      "reasoning": "Flexible factors replace Frye: testing, peer review, error rates, standards."
    },
    {
      "id": "case378",
      "title": "General Electric Co. v. Joiner (1997)",
      "facts": "Trial court excluded plaintiff's expert causation testimony.",
      "issue": "What standard applies to appellate review of Daubert rulings?",
      "holding": "Abuse of discretion standard applies.",
      "reasoning": "Trial courts have latitude in gatekeeping determinations."
    },
    {
      "id": "case379",
      "title": "Kumho Tire Co. v. Carmichael (1999)",
      "facts": "Tire expert's testimony excluded in product liability case.",
      "issue": "Does Daubert apply to non-scientific experts?",
      "holding": "Yes, gatekeeping applies to all expert testimony.",
      "reasoning": "Rule 702 makes no distinction between scientific and technical knowledge."
    },
    {
      "id": "case380",
      "title": "Weisgram v. Marley Co. (2000)",
      "facts": "Appellate court found expert testimony improperly admitted.",
      "issue": "May appellate court direct judgment as matter of law?",
      "holding": "Yes, if remaining evidence insufficient after excluding improper testimony.",
      "reasoning": "New trial not required when deficiency is substantive."
    },
    {
      "id": "case381",
      "title": "Walkovszky v. Carlton (1966)",
      "facts": "Taxi accident victim sued individual cab owner/shareholder.",
      "issue": "When may corporate veil be pierced?",
      "holding": "Not for undercapitalization alone without fraud or misuse.",
      "reasoning": "Separate incorporation serves legitimate business purposes."
    },
    {
      "id": "case382",
      "title": "Sea-Land Services, Inc. v. Pepper Source (1991)",
      "facts": "Shipping company sued alter ego corporations for unpaid bills.",
      "issue": "What justifies piercing corporate veil?",
      "holding": "Substantial disregard of corporate formalities and inequity.",
      "reasoning": "Corporate fiction disregarded when used as mere instrumentality."
    },
    {
      "id": "case383",
      "title": "Consumer's Co-op of Walworth Co. v. Olsen (1988)",
      "facts": "Co-op sued shareholder for corporate debts.",
      "issue": "Do corporate formalities matter for veil piercing?",
      "holding": "Yes, failure to observe formalities supports piercing.",
      "reasoning": "Substantial compliance with corporate procedures maintains separateness."
    },
    {
      "id": "case384",
      "title": "A. Gay Jenson Farms Co. v. Cargill, Inc. (1981)",
      "facts": "Grain elevator failed; farmers sued controlling company.",
      "issue": "Does control alone create liability?",
      "holding": "Yes, when control is pervasive and leads to inequity.",
      "reasoning": "Dominating control without regard to corporate separateness justifies piercing."
    },
    {
      "id": "case385",
      "title": "Kinney Shoe Corp. v. Polan (1991)",
      "facts": "Creditor sued sole shareholder of defunct corporation.",
      "issue": "Does single shareholder status justify piercing?",
      "holding": "No, absent fraud or injustice from corporate form use.",
      "reasoning": "Sole ownership alone doesn't negate corporate protections."
    },
    {
      "id": "case386",
      "title": "Dodge v. Ford Motor Co. (1919)",
      "facts": "Minority shareholders challenged dividend policy.",
      "issue": "Must corporations maximize shareholder value?",
      "holding": "Directors may consider other interests but primarily serve shareholders.",
      "reasoning": "Business judgment gives discretion but not to ignore profit motive."
    },
    {
      "id": "case387",
      "title": "Shlensky v. Wrigley (1968)",
      "facts": "Minority shareholder sued over refusal to install lights for night games.",
      "issue": "What deference does business judgment rule provide?",
      "holding": "Courts won't second-guess honest operational decisions.",
      "reasoning": "Absent fraud or conflict, directors manage business operations."
    },
    {
      "id": "case388",
      "title": "Sinclair Oil Corp. v. Levien (1971)",
      "facts": "Parent caused subsidiary to declare excessive dividends.",
      "issue": "What standard applies to self-dealing transactions?",
      "holding": "Entire fairness test for conflicted controller decisions.",
      "reasoning": "Parent-subsidiary dealings require rigorous scrutiny."
    },
    {
      "id": "case389",
      "title": "Schnell v. Chris-Craft Industries, Inc. (1971)",
      "facts": "Board moved annual meeting date to impede proxy contest.",
      "issue": "May boards manipulate procedures to entrench themselves?",
      "holding": "No, inequitable conduct violates fiduciary duties.",
      "reasoning": "Corporate machinery must not be used for improper entrenchment."
    },
    {
      "id": "case390",
      "title": "Unocal Corp. v. Mesa Petroleum Co. (1985)",
      "facts": "Board adopted discriminatory self-tender to thwart hostile takeover.",
      "issue": "What standard applies to defensive measures?",
      "holding": "Enhanced scrutiny: reasonable threat and proportional response.",
      "reasoning": "Defensive tactics must be reasonable relative to threat posed."
    },
    {
      "id": "case391",
      "title": "Smith v. Van Gorkom (1985)",
      "facts": "Board approved merger after brief discussion without reading terms.",
      "issue": "What satisfies duty of care in major decisions?",
      "holding": "Gross negligence breaches duty despite good faith.",
      "reasoning": "Substantive due process required for informed decisions."
    },
    {
      "id": "case392",
      "title": "Blasius Industries, Inc. v. Atlas Corp. (1988)",
      "facts": "Board added seats to prevent shareholder vote.",
      "issue": "What scrutiny applies to election interference?",
      "holding": "Compelling justification required for impeding shareholder vote.",
      "reasoning": "Shareholder franchise is fundamental corporate feature."
    },
    {
      "id": "case393",
      "title": "In re Caremark International Inc. Derivative Litigation (1996)",
      "facts": "Shareholders sued over failure to prevent employee fraud.",
      "issue": "What oversight duties do directors have?",
      "holding": "Must ensure adequate information/existing systems to monitor compliance.",
      "reasoning": "Good faith oversight is essential fiduciary duty."
    },
    {
      "id": "case394",
      "title": "Stone v. Ritter (2006)",
      "facts": "Bank directors allegedly failed to monitor AML compliance.",
      "issue": "What shows bad faith in oversight failures?",
      "holding": "Sustained/systematic failure to exercise oversight.",
      "reasoning": "Caremark standard requires showing directors knew of and ignored red flags."
    },
    {
      "id": "case395",
      "title": "Disney v. Walt Disney Co. (2006)",
      "facts": "Shareholders challenged $140M severance to departing president.",
      "issue": "What constitutes bad faith in compensation decisions?",
      "holding": "Not bad faith if disinterested directors approve with some deliberation.",
      "reasoning": "Extreme facts required to overcome business judgment protection."
    },
    {
      "id": "case396",
      "title": "Kamin v. American Express Co. (1976)",
      "facts": "Directors chose stock dividend over sale with tax advantages.",
      "issue": "May courts review dividend policy?",
      "holding": "No, absent fraud or oppression of minority.",
      "reasoning": "Dividend decisions firmly within business judgment discretion."
    },
    {
      "id": "case397",
      "title": "Schreiber v. Pennzoil Co. (1985)",
      "facts": "Shareholders challenged discriminatory self-tender offer.",
      "issue": "What governs selective stock repurchases?",
      "holding": "Full disclosure required; business judgment applies if no coercion.",
      "reasoning": "Arm's-length transactions get deference absent structural coercion."
    },
    {
      "id": "case398",
      "title": "Revlon, Inc. v. MacAndrews & Forbes Holdings, Inc. (1986)",
      "facts": "Board resisted hostile bid then favored lower leveraged buyout.",
      "issue": "What duties apply in sale of control?",
      "holding": "Directors must maximize shareholder value in change of control.",
      "reasoning": "Auctioneering duty triggers when breakup inevitable."
    },
    {
      "id": "case399",
      "title": "Paramount Communications, Inc. v. Time Inc. (1989)",
      "facts": "Time abandoned shareholder vote on Warner merger to thwart Paramount.",
      "issue": "Must boards always maximize short-term value?",
      "holding": "No, may favor long-term strategy over immediate premium.",
      "reasoning": "No Revlon duties absent change of control."
    },
    {
      "id": "case400",
      "title": "Paramount Communications, Inc. v. QVC Network, Inc. (1994)",
      "facts": "Lockup options and termination fee in Viacom merger.",
      "issue": "What protections apply in controlling shareholder transactions?",
      "holding": "Entire fairness standard unless approved by independent directors/ shareholders.",
      "reasoning": "Conflicted transactions require rigorous procedural protections."
    },
      {
        "id": "case401",
        "title": "eBay Domestic Holdings, Inc. v. Newmark (2010)",
        "facts": "Craigslist adopted poison pill to preserve corporate culture.",
        "issue": "Can non-financial objectives justify defensive measures?",
        "holding": "No, directors must maximize shareholder value, not social goals.",
        "reasoning": "Corporate purpose is shareholder wealth maximization within legal bounds."
      },
      {
        "id": "case402",
        "title": "Corwin v. KKR Financial Holdings LLC (2015)",
        "facts": "Shareholders approved merger then sued for breaches of fiduciary duty.",
        "issue": "What effect does shareholder approval have on post-closing damages claims?",
        "holding": "Business judgment rule applies to fully informed, uncoerced shareholder votes.",
        "reasoning": "Informed shareholder ratification cleanses most conflicts under enhanced scrutiny."
      },
      {
        "id": "case403",
        "title": "Moran v. Household International, Inc. (1985)",
        "facts": "Company adopted poison pill without shareholder vote.",
        "issue": "Are poison pills valid under state law?",
        "holding": "Yes, within board's authority under business judgment rule.",
        "reasoning": "Pills are proportionate response to threat of coercive takeovers."
      },
      {
        "id": "case404",
        "title": "Air Products & Chemicals, Inc. v. Airgas, Inc. (2011)",
        "facts": "Board maintained poison pill against fully priced, non-coercive tender offer.",
        "issue": "How long may pills block premium offers?",
        "holding": "Indefinitely, if consistent with directors' good faith view of long-term value.",
        "reasoning": "No per se time limit when board reasonably believes offer undervalues company."
      },
      {
        "id": "case405",
        "title": "Guth v. Loft, Inc. (1939)",
        "facts": "CEO diverted Pepsi opportunity to himself during company's financial distress.",
        "issue": "What constitutes a corporate opportunity?",
        "holding": "Any opportunity in company's line of business that it could financially undertake.",
        "reasoning": "Fiduciaries cannot exploit opportunities belonging to the corporation."
      },
      {
        "id": "case406",
        "title": "Broz v. Cellular Information Systems, Inc. (1996)",
        "facts": "Director acquired FCC licenses while company was in bankruptcy.",
        "issue": "What test determines corporate opportunities?",
        "holding": "Multi-factor test including company's interest/expectancy and director's good faith.",
        "reasoning": "Flexible approach better serves corporate interests than rigid tests."
      },
      {
        "id": "case407",
        "title": "Weinberger v. UOP, Inc. (1983)",
        "facts": "Majority shareholder bought out minority in cash-out merger.",
        "issue": "What standard applies to controlling shareholder transactions?",
        "holding": "Entire fairness (fair dealing and fair price) unless approved by independent committee/ majority of minority.",
        "reasoning": "Structural protections can shift burden but not eliminate fairness review."
      },
      {
        "id": "case408",
        "title": "Kahn v. M&F Worldwide Corp. (2014)",
        "facts": "Controlling shareholder merger approved by special committee and majority of minority.",
        "issue": "What procedural protections justify business judgment review?",
        "holding": "Independent committee with real bargaining power and informed, uncoerced minority vote.",
        "reasoning": "Effective procedural protections approximate arm's-length transaction."
      },
      {
        "id": "case409",
        "title": "Aronson v. Lewis (1984)",
        "facts": "Shareholder alleged excessive compensation to 75-year-old chairman.",
        "issue": "When is pre-suit demand on directors excused?",
        "holding": "Demand excused if particularized facts create reasonable doubt about disinterest or due care.",
        "reasoning": "Demand futility exists when directors would be deciding on own liability."
      },
      {
        "id": "case410",
        "title": "Zapata Corp. v. Maldonado (1981)",
        "facts": "Special litigation committee moved to dismiss derivative suit.",
        "issue": "What standard applies to committee dismissal recommendations?",
        "holding": "Two-step test: (1) committee independence and good faith investigation; (2) court's independent business judgment.",
        "reasoning": "Judicial review necessary to protect shareholder interests."
      },
      {
        "id": "case411",
        "title": "Joy v. North (1983)",
        "facts": "Bank directors sued for mismanagement leading to losses.",
        "issue": "What standard applies to dismissal of derivative suits?",
        "holding": "Business judgment rule protects decisions made in good faith with reasonable investigation.",
        "reasoning": "Courts defer to director decisions absent conflicts or gross negligence."
      },
      {
        "id": "case412",
        "title": "Marx v. Akers (1996)",
        "facts": "Shareholder alleged directors approved excessive compensation.",
        "issue": "What satisfies demand futility pleading?",
        "holding": "Must show majority of directors were interested or lacked independence.",
        "reasoning": "Generalized allegations insufficient to excuse demand requirement."
      },
      {
        "id": "case413",
        "title": "In re Oracle Corp. Derivative Litigation (2003)",
        "facts": "Special litigation committee members had Stanford ties to defendant directors.",
        "issue": "What constitutes committee independence?",
        "holding": "Must be free from disabling conflicts, including social/friendship ties.",
        "reasoning": "Independence requires absence of influences compromising impartiality."
      },
      {
        "id": "case414",
        "title": "SEC v. W.J. Howey Co. (1946)",
        "facts": "Florida citrus grove sales with service contracts.",
        "issue": "What constitutes an 'investment contract' security?",
        "holding": "Investment of money in common enterprise with profits from others' efforts.",
        "reasoning": "Substance over form determines whether transaction involves securities."
      },
      {
        "id": "case415",
        "title": "SEC v. Ralston Purina Co. (1953)",
        "facts": "Company sold stock to employees without registration.",
        "issue": "What qualifies as private placement exemption?",
        "holding": "Offerees must have access to equivalent information as registration would provide.",
        "reasoning": "Exemption depends on investors' ability to fend for themselves."
      },
      {
        "id": "case416",
        "title": "Basic Inc. v. Levinson (1988)",
        "facts": "Merger negotiations denied but leaked, affecting stock trades.",
        "issue": "When are contingent events material?",
        "holding": "Probability/magnitude test - balance likelihood against anticipated impact.",
        "reasoning": "Materiality depends on significance to reasonable investor."
      },
      {
        "id": "case417",
        "title": "TSC Industries, Inc. v. Northway, Inc. (1976)",
        "facts": "Omitted facts in proxy statement about controlling shareholder relationship.",
        "issue": "What standard defines materiality?",
        "holding": "Substantial likelihood reasonable investor would consider fact important.",
        "reasoning": "Materiality requires showing fact would alter 'total mix' of information."
      },
      {
        "id": "case418",
        "title": "Dirks v. SEC (1983)",
        "facts": "Analyst uncovered fraud through insider tips then advised clients.",
        "issue": "What constitutes illegal tippee trading?",
        "holding": "Only when tipper breaches duty for personal benefit and tippee knows.",
        "reasoning": "Personal benefit can be pecuniary or intangible (e.g., friendship gain)."
      },
      {
        "id": "case419",
        "title": "United States v. O'Hagan (1997)",
        "facts": "Lawyer traded on client's confidential takeover information.",
        "issue": "Does misappropriation of non-employer information violate 10b-5?",
        "holding": "Yes, deception occurs when secretly using confidential information for trading.",
        "reasoning": "Fraud includes breaching confidentiality duties to source, not just shareholders."
      },
      {
        "id": "case420",
        "title": "Chiarella v. United States (1980)",
        "facts": "Printer decoded takeover targets from documents but didn't disclose when trading.",
        "issue": "Must insider disclose before trading?",
        "holding": "Only if duty to disclose exists (e.g., fiduciary relationship).",
        "reasoning": "Silence fraudulent only when duty to speak arises from relationship."
      },
      {
        "id": "case421",
        "title": "Matrixx Initiatives, Inc. v. Siracusano (2011)",
        "facts": "Company didn't disclose adverse event reports about cold remedy.",
        "issue": "Must statistical significance trigger disclosure?",
        "holding": "No, materiality depends on contextual significance to investors.",
        "reasoning": "Bright-line statistical tests inappropriate for materiality determinations."
      },
      {
        "id": "case422",
        "title": "Stoneridge Investment Partners, LLC v. Scientific-Atlanta, Inc. (2008)",
        "facts": "Investors sued vendors for participating in Charter's accounting fraud.",
        "issue": "Can secondary actors be liable for private securities fraud?",
        "holding": "No, unless investors relied on their deceptive conduct.",
        "reasoning": "Scheme liability requires showing actual reliance on defendant's misrepresentations."
      },
      {
        "id": "case423",
        "title": "Morrison v. National Australia Bank Ltd. (2010)",
        "facts": "Foreign investors sued foreign issuer for U.S.-listed security losses.",
        "issue": "Does §10(b) apply extraterritorially?",
        "holding": "Only to (1) domestic transactions or (2) foreign transactions listed on U.S. exchanges.",
        "reasoning": "Presumption against extraterritoriality limits U.S. securities laws."
      },
      {
        "id": "case424",
        "title": "Ernst & Ernst v. Hochfelder (1976)",
        "facts": "Investors sued auditor for negligence in failing to detect fraud.",
        "issue": "Does §10(b) require scienter?",
        "holding": "Yes, negligence insufficient - must show intent to deceive/manipulate.",
        "reasoning": "Statutory language ('manipulative/deceptive') implies intentional misconduct."
      },
      {
        "id": "case425",
        "title": "Schreiber v. Burlington Northern, Inc. (1985)",
        "facts": "Tender offeror amended terms after initial announcement.",
        "issue": "What constitutes 'manipulation' under §14(e)?",
        "holding": "Requires misrepresentation or nondisclosure, not just changed terms.",
        "reasoning": "Manipulation implies conduct likely to mislead reasonable investors."
      },
      {
        "id": "case426",
        "title": "Blue Chip Stamps v. Manor Drug Stores (1975)",
        "facts": "Non-purchaser sued for alleged misrepresentations affecting decision not to buy.",
        "issue": "Can non-purchasers/sellers sue under Rule 10b-5?",
        "holding": "No, standing limited to actual purchasers/sellers.",
        "reasoning": "Prevents vexatious litigation based on hypothetical transactions."
      },
      {
        "id": "case427",
        "title": "Santa Fe Industries, Inc. v. Green (1977)",
        "facts": "Minority shareholders alleged unfair squeeze-out merger.",
        "issue": "Does corporate mismanagement violate §10(b)?",
        "holding": "No, absent deception - breach of fiduciary duty is state law claim.",
        "reasoning": "Federal securities laws don't create general fairness standards."
      },
      {
        "id": "case428",
        "title": "Dura Pharmaceuticals, Inc. v. Broudo (2005)",
        "facts": "Investors alleged price inflation but didn't show subsequent loss causation.",
        "issue": "Must plaintiffs prove misrepresentation caused economic loss?",
        "holding": "Yes, must show causal connection between misrepresentation and loss.",
        "reasoning": "Price inflation alone doesn't establish proximate cause of loss."
      },
      {
        "id": "case429",
        "title": "Halliburton Co. v. Erica P. John Fund, Inc. (2014)",
        "facts": "Investors sought to rebut fraud-on-the-market presumption at class cert.",
        "issue": "Can defendants present price impact evidence pre-certification?",
        "holding": "Yes, defendants may rebut presumption with evidence lack of price impact.",
        "reasoning": "Price impact is predicate for presumption - must allow early challenge."
      },
      {
        "id": "case430",
        "title": "Martin v. Peyton (1927)",
        "facts": "Lenders received profit share and oversight rights in failing business.",
        "issue": "When does lending relationship become partnership?",
        "holding": "When lenders assume control and profit participation.",
        "reasoning": "Partnership arises from profit-sharing and joint control, not formal labels."
      },
      {
        "id": "case431",
        "title": "National Biscuit Co. v. Stroud (1959)",
        "facts": "One partner objected to bread deliveries from plaintiff.",
        "issue": "Can single partner bind partnership against co-partner's objection?",
        "holding": "Yes, for ordinary partnership business unless third party knows of restriction.",
        "reasoning": "Apparent authority prevails over internal disagreements."
      },
      {
        "id": "case432",
        "title": "Meinhard v. Salmon (1928)",
        "facts": "Joint venturer secretly renewed lease for himself after venture term.",
        "issue": "What fiduciary duties apply to partners?",
        "holding": "Highest duty of loyalty - 'not honesty alone, but punctilio of honor'.",
        "reasoning": "Partners must disclose and refrain from self-dealing with partnership opportunities."
      },
      {
        "id": "case433",
        "title": "Page v. Page (1961)",
        "facts": "Partner sought judicial dissolution of unprofitable partnership.",
        "issue": "When may courts dissolve partnerships at will?",
        "holding": "When continuation would be impractical or inequitable.",
        "reasoning": "Partnerships at will dissolve by any partner's express will to exit."
      }
    
  ]
  
