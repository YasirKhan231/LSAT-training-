"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "../../../../../components/ProtectRoute";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
import { Clock, HelpCircle, ArrowRight } from "lucide-react";

// Mock data - in a real app this would come from an API or database
const mockExamData = {
  "prep-test-71": {
    title: "PrepTest 71",
    sections: [
      {
        id: "lr-1",
        title: "Logical Reasoning I",
        duration: 35, // minutes
        questions: [
          {
            id: "lr-1-q1",
            text: "Which one of the following most accurately expresses the main point of the passage?",
            stimulus:
              "The notion that the state should have a role in providing education for children is a recent historical development. Throughout most of history, education was seen as the responsibility of families and religious institutions. Public education systems emerged in the nineteenth century as societies became more complex and the need for a literate and educated workforce increased. Today, state-provided education is considered a fundamental right in most countries, although there are ongoing debates about the extent of government involvement in curriculum development and educational standards.",
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
              "The passage's main point is that state involvement in education is a relatively recent historical development, as indicated in the first sentence and elaborated throughout the passage. The other options address secondary details or overstate what the passage actually claims.",
          },
          {
            id: "lr-1-q2",
            text: "The argument above is most vulnerable to criticism on the grounds that it:",
            stimulus:
              "The minimum wage should be abolished. When the minimum wage increases, businesses are forced to hire fewer workers or reduce employee hours to maintain profitability. This results in higher unemployment among low-skilled workers, the very people the minimum wage is supposed to help.",
            choices: [
              {
                id: "A",
                text: "Fails to consider alternative ways businesses might respond to minimum wage increases",
              },
              {
                id: "B",
                text: "Assumes without justification that the purpose of the minimum wage is to increase employment",
              },
              {
                id: "C",
                text: "Overlooks the possibility that increased wages might lead to increased consumer spending",
              },
              {
                id: "D",
                text: "Relies on an ambiguous use of the term 'low-skilled workers'",
              },
              {
                id: "E",
                text: "Presents a false dilemma by suggesting only two possible business responses",
              },
            ],
            correctAnswer: "A",
            explanation:
              "The argument assumes businesses can only respond to minimum wage increases by cutting jobs or hours, ignoring other possibilities like absorbing costs, raising prices, improving efficiency, or reducing profits elsewhere. This simplistic assumption weakens the conclusion.",
          },
          {
            id: "lr-1-q3",
            text: "Which one of the following most logically completes the argument?",
            stimulus:
              "People who exercise regularly tend to be healthier than those who don't exercise. However, this correlation doesn't necessarily mean that exercise causes better health, because people who choose to exercise may also engage in other healthy behaviors like eating nutritious foods and getting adequate sleep. But this alternative explanation can be ruled out because studies show that even when lifestyle factors are controlled for, ________.",
            choices: [
              {
                id: "A",
                text: "exercise is associated with better mental health outcomes",
              },
              {
                id: "B",
                text: "people who exercise regularly report feeling more energetic",
              },
              {
                id: "C",
                text: "regular exercise still correlates strongly with better health outcomes",
              },
              {
                id: "D",
                text: "some people can maintain good health without regular exercise",
              },
              {
                id: "E",
                text: "exercises of different types produce different health benefits",
              },
            ],
            correctAnswer: "C",
            explanation:
              "The argument is trying to establish that exercise causes better health, not just that they're correlated. The alternative explanation is that other healthy behaviors, not exercise itself, might be responsible. To rule this out logically, we need to show that even when controlling for these other factors, exercise still correlates with better health (C).",
          },
        ],
      },
      // Section 2: Reading Comprehension
      {
        id: "rc",
        title: "Reading Comprehension",
        duration: 35, // minutes
        questions: [
          {
            id: "rc-passage1-q1",
            text: "According to the passage, which of the following best describes the author's view of conventional economics?",
            stimulus:
              "Ecological economics represents a significant departure from conventional economic thinking. Traditional economics treats the economy as a closed system, where natural resources are readily available inputs and waste is an acceptable output. This model assumes that economic growth can continue indefinitely and that technological innovation will solve any resource constraints. Ecological economists, by contrast, view the economy as a subsystem of the larger ecological system. From this perspective, the economy cannot grow beyond the regenerative capacity of the biosphere. While conventional economics focuses primarily on efficient allocation of resources within markets, ecological economics emphasizes sustainability and equitable distribution across generations. This doesn't mean rejecting markets entirely, but rather recognizing their limitations and supplementing them with other policy instruments when dealing with environmental issues that markets alone cannot adequately address.",
            choices: [
              {
                id: "A",
                text: "It is fundamentally flawed and should be completely rejected.",
              },
              {
                id: "B",
                text: "It fails to recognize the economy as part of a larger ecological system.",
              },
              {
                id: "C",
                text: "It correctly prioritizes market efficiency over sustainability concerns.",
              },
              {
                id: "D",
                text: "It acknowledges but underestimates the importance of technological innovation.",
              },
              {
                id: "E",
                text: "It offers a more practical approach than ecological economics.",
              },
            ],
            correctAnswer: "B",
            explanation:
              "The passage states that 'Traditional economics treats the economy as a closed system,' whereas ecological economists 'view the economy as a subsystem of the larger ecological system.' This directly supports answer choice B.",
          },
          {
            id: "rc-passage1-q2",
            text: "The primary purpose of the passage is to:",
            stimulus: "[Same passage as above]",
            choices: [
              {
                id: "A",
                text: "advocate for the complete replacement of conventional economics",
              },
              {
                id: "B",
                text: "explain how ecological economics differs from conventional economics",
              },
              {
                id: "C",
                text: "demonstrate the superiority of ecological economics in solving environmental problems",
              },
              {
                id: "D",
                text: "criticize conventional economics for ignoring technological innovation",
              },
              {
                id: "E",
                text: "argue that markets cannot address environmental issues",
              },
            ],
            correctAnswer: "B",
            explanation:
              "The passage primarily explains the differences between ecological economics and conventional economics, highlighting their different assumptions and focuses, rather than advocating for one over the other.",
          },
          {
            id: "rc-passage1-q3",
            text: "According to the passage, ecological economists believe that:",
            stimulus: "[Same passage as above]",
            choices: [
              {
                id: "A",
                text: "markets should be completely abandoned when addressing environmental issues",
              },
              {
                id: "B",
                text: "technological innovation cannot solve resource constraints",
              },
              {
                id: "C",
                text: "economic growth must remain within ecological limits",
              },
              {
                id: "D",
                text: "equitable distribution is more important than sustainability",
              },
              {
                id: "E",
                text: "policy instruments are unnecessary for environmental protection",
              },
            ],
            correctAnswer: "C",
            explanation:
              "The passage states that ecological economists 'view the economy as a subsystem of the larger ecological system' and that 'the economy cannot grow beyond the regenerative capacity of the biosphere,' supporting answer choice C.",
          },
        ],
      },
      // Section 3: Analytical Reasoning (Logic Games)
      {
        id: "ar",
        title: "Analytical Reasoning",
        duration: 35, // minutes
        questions: [
          {
            id: "ar-game1-q1",
            text: "If T is assigned to exactly one scholarship, which one of the following must be true?",
            stimulus:
              "A university committee must allocate three scholarships—X, Y, and Z—among seven students: P, Q, R, S, T, U, and V. The allocation must conform to the following conditions:\n- Exactly one scholarship is allocated to each of exactly three students.\n- If P is allocated a scholarship, then Q is allocated a scholarship.\n- If Q is allocated a scholarship, then Q is allocated scholarship X.\n- If R is allocated a scholarship, then R is not allocated scholarship Z.\n- Either S is allocated scholarship Y or T is allocated scholarship Y, but not both.\n- If V is allocated a scholarship, then U is allocated a scholarship.",
            choices: [
              { id: "A", text: "P is allocated scholarship Y." },
              { id: "B", text: "Q is not allocated a scholarship." },
              { id: "C", text: "R is allocated scholarship X." },
              { id: "D", text: "S is not allocated a scholarship." },
              { id: "E", text: "U is allocated scholarship Z." },
            ],
            correctAnswer: "D",
            explanation:
              "If T is assigned exactly one scholarship, it must be Y (as stated in the condition 'Either S is allocated scholarship Y or T is allocated scholarship Y, but not both'). This means S cannot be allocated Y. As there are only three scholarships total, and three students must receive exactly one each, S cannot receive any scholarship, making D the correct answer.",
          },
          {
            id: "ar-game1-q2",
            text: "Which one of the following could be the complete allocation of scholarships?",
            stimulus: "[Same game setup as above]",
            choices: [
              { id: "A", text: "P: X; Q: Y; T: Z" },
              { id: "B", text: "Q: X; R: Y; V: Z" },
              { id: "C", text: "Q: X; S: Y; U: Z" },
              { id: "D", text: "R: X; S: Y; U: Z" },
              { id: "E", text: "R: Y; T: Z; V: X" },
            ],
            correctAnswer: "C",
            explanation:
              "Let's check option C: Q gets X (satisfies the condition that if Q gets a scholarship, Q gets X), S gets Y (satisfies the condition about S or T getting Y), and U gets Z. This doesn't violate any conditions: P doesn't get a scholarship so we don't need to worry about Q; R isn't allocated a scholarship; S gets Y but T doesn't; V doesn't get a scholarship so we don't need to worry about U. All conditions are satisfied.",
          },
          {
            id: "ar-game1-q3",
            text: "If R is allocated scholarship X, which one of the following must be true?",
            stimulus: "[Same game setup as above]",
            choices: [
              { id: "A", text: "P is allocated scholarship Z." },
              { id: "B", text: "Q is not allocated a scholarship." },
              { id: "C", text: "S is allocated scholarship Y." },
              { id: "D", text: "T is allocated scholarship Z." },
              { id: "E", text: "U is allocated scholarship Y." },
            ],
            correctAnswer: "B",
            explanation:
              "If R is allocated scholarship X, then Q cannot be allocated X. According to the conditions, if Q receives any scholarship, it must be X. Since Q cannot receive X (as R has it), Q cannot receive any scholarship, making B the correct answer.",
          },
        ],
      },
      // Section 4: Logical Reasoning II
      {
        id: "lr-2",
        title: "Logical Reasoning II",
        duration: 35, // minutes
        questions: [
          {
            id: "lr-2-q1",
            text: "Which one of the following most accurately describes the flaw in the argument?",
            stimulus:
              "Surveys show that employees who telecommute have higher job satisfaction and lower stress levels than employees who work in an office. Therefore, to improve employee wellbeing, companies should allow all employees to work from home.",
            choices: [
              {
                id: "A",
                text: "It overlooks the possibility that factors other than work location contribute to employee wellbeing.",
              },
              {
                id: "B",
                text: "It fails to consider that correlation does not necessarily indicate causation.",
              },
              {
                id: "C",
                text: "It mistakenly assumes that what applies to some employees applies to all employees.",
              },
              {
                id: "D",
                text: "It relies on surveys that may not be representative of all workplace environments.",
              },
              {
                id: "E",
                text: "It presents a false dichotomy between working in an office and working from home.",
              },
            ],
            correctAnswer: "C",
            explanation:
              "The argument assumes that because telecommuting benefits some employees (those currently doing it), it would benefit all employees. This ignores that different employees may have different preferences, circumstances, and job requirements that affect whether telecommuting would improve their wellbeing.",
          },
          {
            id: "lr-2-q2",
            text: "Which one of the following principles, if valid, most helps to justify the argument's conclusion?",
            stimulus:
              "Companies should not require employees to disclose their vaccination status as a condition of employment. Such requirements violate employee privacy by forcing them to reveal personal medical information.",
            choices: [
              {
                id: "A",
                text: "Companies should never collect any health information from their employees.",
              },
              {
                id: "B",
                text: "Employment conditions should never intrude on an employee's personal life.",
              },
              {
                id: "C",
                text: "People have a right to keep their personal medical information private from their employers.",
              },
              {
                id: "D",
                text: "Workplace health and safety should be secondary to employee privacy concerns.",
              },
              {
                id: "E",
                text: "Vaccination status is irrelevant to employee job performance.",
              },
            ],
            correctAnswer: "C",
            explanation:
              "The conclusion that companies should not require vaccination status disclosure is based on the premise that this violates employee privacy. The principle in C directly supports this by asserting that people have a right to keep medical information private from employers.",
          },
          {
            id: "lr-2-q3",
            text: "Which one of the following, if true, most seriously weakens the argument?",
            stimulus:
              "The new driver assistance system must be making cars safer. Since its introduction three years ago, the total number of reported accidents involving cars with this system has decreased by 15 percent.",
            choices: [
              {
                id: "A",
                text: "The number of cars on the road has decreased by 20 percent over the past three years.",
              },
              {
                id: "B",
                text: "Other new safety features were introduced in cars during the same three-year period.",
              },
              {
                id: "C",
                text: "Insurance companies offer lower premiums to drivers whose cars have the new assistance system.",
              },
              {
                id: "D",
                text: "Drivers tend to be more cautious when using new technology they are unfamiliar with.",
              },
              {
                id: "E",
                text: "The assistance system is primarily available in luxury vehicles driven by experienced drivers.",
              },
            ],
            correctAnswer: "A",
            explanation:
              "If the number of cars decreased by 20 percent while accidents only decreased by 15 percent, this suggests the rate of accidents per car actually increased, which weakens the argument that the driver assistance system is making cars safer.",
          },
        ],
      },
    ],
  },
};

export default function ExamPage() {
  const router = useRouter();
  const params = useParams();
  const examId = params.examId as string;

  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [examStarted, setExamStarted] = useState(false);

  const examData = mockExamData[examId as keyof typeof mockExamData];
  const section = examData?.sections[currentSection];
  const question = section?.questions[currentQuestion];

  useEffect(() => {
    if (examStarted && section) {
      // Set the timer for the current section
      setTimeRemaining(section.duration * 60); // convert to seconds

      // Timer countdown logic
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Automatically move to next section or finish exam
            if (currentSection < examData.sections.length - 1) {
              setCurrentSection(currentSection + 1);
              setCurrentQuestion(0);
              setShowHint(false);
            } else {
              // End of exam
              router.push(`/practise/mock-exam/${examId}/results`);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [
    examStarted,
    currentSection,
    examData,
    examId,
    router,
    currentQuestion,
    section,
  ]);

  if (!examData) {
    return <div>Exam not found</div>;
  }

  const startExam = () => {
    setExamStarted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
    } else if (currentSection < examData.sections.length - 1) {
      // Move to next section
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      setShowHint(false);
      setHintsUsed(0);
    } else {
      // End of exam
      router.push(`/practise/mock-exam/${examId}/results`);
    }
  };

  const handleRequestHint = () => {
    if (hintsUsed < 3) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  if (!examStarted) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{examData.title}</CardTitle>
              <p className="text-gray-600">
                You are about to start a full-length LSAT practice exam.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold">This exam includes:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {examData.sections.map((section, index) => (
                    <li key={index}>
                      {section.title} - {section.duration} minutes
                    </li>
                  ))}
                </ul>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
                  <h3 className="font-semibold text-amber-800">
                    Important Information:
                  </h3>
                  <ul className="text-amber-700 mt-2 space-y-1 text-sm">
                    <li>
                      • This is a timed exam. Each section has a strict time
                      limit.
                    </li>
                    <li>
                      • You can use up to 3 AI hints per section if needed.
                    </li>
                    <li>
                      • You cannot return to previous sections once completed.
                    </li>
                    <li>
                      • Ensure you're in a quiet environment with minimal
                      distractions.
                    </li>
                    <li>
                      • Consider using scratch paper for logic games and complex
                      reasoning.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={startExam}>
                Begin Exam
              </Button>
            </CardFooter>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with timer and progress */}
        <div className="bg-white p-4 rounded-md shadow mb-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-lg">{section.title}</h1>
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {section.questions.length}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-1 ${
                  timeRemaining < 300 ? "text-red-600" : "text-gray-700"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="font-mono text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRequestHint}
                disabled={hintsUsed >= 3 || showHint}
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Hint ({3 - hintsUsed} left)
              </Button>
            </div>
          </div>

          <Progress
            value={(currentQuestion / section.questions.length) * 100}
            className="mt-2"
          />
        </div>

        {/* Question */}
        <div className="bg-white p-6 rounded-md shadow mb-6">
          {/* Reading stimulus */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-gray-800 leading-relaxed">{question.stimulus}</p>
          </div>

          {/* Question text */}
          <h2 className="text-lg font-medium mb-4">{question.text}</h2>

          {/* Answer choices */}
          <RadioGroup
            value={selectedAnswers[question.id] || ""}
            onValueChange={(value) => handleSelectAnswer(question.id, value)}
            className="space-y-3"
          >
            {question.choices.map((choice) => (
              <div
                key={choice.id}
                className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50"
              >
                <RadioGroupItem value={choice.id} id={`choice-${choice.id}`} />
                <Label
                  htmlFor={`choice-${choice.id}`}
                  className="cursor-pointer flex-1 leading-normal"
                >
                  <span className="font-semibold">{choice.id}.</span>{" "}
                  {choice.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* AI Hint */}
          {showHint && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">AI Hint:</h3>
              <p className="text-blue-700 text-sm">
                Consider what the passage identifies as a "recent historical
                development" and which answer choice most directly addresses
                this central theme. Focus on the first sentence of the passage
                for the main point.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <div>{/* Instructions/Help could go here */}</div>
          <Button onClick={handleNextQuestion}>
            {currentQuestion < section.questions.length - 1
              ? "Next Question"
              : "Next Section"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}