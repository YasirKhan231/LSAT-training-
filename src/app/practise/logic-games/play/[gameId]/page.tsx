"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "../../../../../../components/ProtectRoute";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Clock,
  BrainCircuit,
  Check,
  X,
  LightbulbIcon,
  ArrowRightIcon,
  UndoIcon,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";

// Define a type for the game object
interface Game {
  title: string;
  type: string;
  difficulty: string;
  description: string;
  rules: string[];
  elements: string[];
  slots: string[] | number[];
  questions: {
    id: string;
    text: string;
    choices: { id: string; text: string }[];
    correctAnswer: string;
    explanation: string;
  }[];
  selectionSize?: number; // Optional for Selection games
  groupSizes?: number[]; // Optional for Grouping games
  isHybrid?: boolean; // Optional for Hybrid games
  hybridType?: string; // Optional for Hybrid games
}

// Mock game data for all game types
const mockGames: Record<string, Game> = {
  // SEQUENCING GAMES
  "race-lineup": {
    title: "Race Lineup",
    type: "Sequencing",
    difficulty: "Easy",
    description:
      "Six runners (J, K, L, M, N, and P) must be arranged in six consecutive positions at the starting line of a race.",
    rules: [
      "J must be positioned somewhere ahead of K (not necessarily immediately ahead).",
      "L must be either in position 1 or position 6.",
      "M must be in a position immediately adjacent to N.",
      "P must be in position 3 or position 4.",
      "K cannot be in position 2.",
    ],
    elements: ["J", "K", "L", "M", "N", "P"],
    slots: [1, 2, 3, 4, 5, 6],
    questions: [
      {
        id: "q1",
        text: "Which one of the following could be the arrangement of runners, from position 1 to position 6?",
        choices: [
          { id: "A", text: "J, M, P, N, K, L" },
          { id: "B", text: "L, J, P, K, M, N" },
          { id: "C", text: "L, N, P, M, J, K" },
          { id: "D", text: "M, J, P, K, N, L" },
          { id: "E", text: "N, M, P, J, K, L" },
        ],
        correctAnswer: "A",
        explanation:
          "Option A satisfies all constraints: J (position 1) is ahead of K (position 5); L is in position 6 (either 1 or 6); M (position 2) is adjacent to N (position 4); P is in position 3; and K is not in position 2.",
      },
      {
        id: "q2",
        text: "If L is in position 1, which one of the following must be true?",
        choices: [
          { id: "A", text: "J is in position 2." },
          { id: "B", text: "K is in position 6." },
          { id: "C", text: "M is in position 2." },
          { id: "D", text: "N is in position 5." },
          { id: "E", text: "P is in position 3." },
        ],
        correctAnswer: "E",
        explanation:
          "If L is in position 1, then P must be in position 3 or 4. Since M must be adjacent to N, they must occupy two consecutive positions. The only way to arrange all elements validly is for P to be in position 3.",
      },
    ],
  },

  // GROUPING GAMES
  "committee-selection": {
    title: "Committee Selection",
    type: "Grouping",
    difficulty: "Medium",
    description:
      "Eight individuals (A through H) must be selected to form three different committees according to specific membership requirements.",
    rules: [
      "The planning committee must have exactly three members.",
      "The budget committee must have exactly two members.",
      "The outreach committee must have exactly three members.",
      "A and B cannot serve on the same committee.",
      "If C is on the planning committee, then D must be on the budget committee.",
      "E must be on either the planning committee or the outreach committee.",
      "F and G must serve on the same committee.",
      "H cannot serve on the budget committee.",
    ],
    elements: ["A", "B", "C", "D", "E", "F", "G", "H"],
    slots: ["Planning", "Budget", "Outreach"],
    groupSizes: [3, 2, 3], // Specific to Grouping games
    questions: [
      {
        id: "q1",
        text: "Which of the following could be a valid committee assignment?",
        choices: [
          {
            id: "A",
            text: "Planning: A, C, E; Budget: D, H; Outreach: B, F, G",
          },
          {
            id: "B",
            text: "Planning: A, E, H; Budget: B, D; Outreach: C, F, G",
          },
          {
            id: "C",
            text: "Planning: C, F, G; Budget: A, D; Outreach: B, E, H",
          },
          {
            id: "D",
            text: "Planning: E, F, G; Budget: A, D; Outreach: B, C, H",
          },
          {
            id: "E",
            text: "Planning: B, E, H; Budget: C, D; Outreach: A, F, G",
          },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Planning has 3 members; Budget has 2 members; Outreach has 3 members; A and B are on different committees; C is not on planning so D doesn't need to be on budget (but D is on budget anyway); E is on planning; F and G are on the same committee (planning); H is not on budget.",
      },
    ],
  },

  // SELECTION GAMES
  "gift-selection": {
    title: "Gift Selection",
    type: "Selection",
    difficulty: "Easy",
    description:
      "Four gifts must be selected from a collection of seven items (Q, R, S, T, U, V, and W) according to recipient preferences.",
    rules: [
      "If Q is selected, then R cannot be selected.",
      "If S is selected, then both T and U must be selected.",
      "Either V or W must be selected, but not both.",
      "If W is selected, then Q must be selected.",
    ],
    elements: ["Q", "R", "S", "T", "U", "V", "W"],
    slots: ["Selected", "Not Selected"],
    selectionSize: 4, // Specific to Selection games
    questions: [
      {
        id: "q1",
        text: "Which of the following could be a complete and accurate list of the selected gifts?",
        choices: [
          { id: "A", text: "Q, S, T, V" },
          { id: "B", text: "Q, T, U, W" },
          { id: "C", text: "Q, S, T, U" },
          { id: "D", text: "Q, T, U, V" },
          { id: "E", text: "R, S, T, U" },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Q is selected but R is not; S is not selected so T and U don't have to be selected together (though both are selected); V is selected and W is not selected; and since W is not selected, the rule about Q being selected if W is selected doesn't apply.",
      },
    ],
  },

  // HYBRID GAMES
  "job-assignments": {
    title: "Job Assignments",
    type: "Hybrid (Sequencing & Selection)",
    difficulty: "Hard",
    description:
      "Six employees must be assigned to different projects and scheduled to work on specific days of the week.",
    rules: [
      "Each employee works on exactly one day from Monday to Friday.",
      "No more than two employees can work on the same day.",
      "Project A requires J and K to work on consecutive days.",
      "Project B requires L to work on Monday or Tuesday.",
      "Project C requires M to work on Wednesday if N works on Thursday.",
      "Project D requires P to work on the same day as another employee.",
    ],
    elements: ["J", "K", "L", "M", "N", "P"],
    slots: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    isHybrid: true, // Specific to Hybrid games
    hybridType: "schedule",
    questions: [
      {
        id: "q1",
        text: "Which of the following is an acceptable schedule of workdays?",
        choices: [
          {
            id: "A",
            text: "J: Monday; K: Tuesday; L: Monday; M: Wednesday; N: Thursday; P: Friday",
          },
          {
            id: "B",
            text: "J: Monday; K: Wednesday; L: Monday; M: Tuesday; N: Thursday; P: Tuesday",
          },
          {
            id: "C",
            text: "J: Tuesday; K: Monday; L: Tuesday; M: Thursday; N: Wednesday; P: Thursday",
          },
          {
            id: "D",
            text: "J: Tuesday; K: Wednesday; L: Monday; M: Friday; N: Thursday; P: Monday",
          },
          {
            id: "E",
            text: "J: Wednesday; K: Thursday; L: Monday; M: Wednesday; N: Tuesday; P: Wednesday",
          },
        ],
        correctAnswer: "D",
        explanation:
          "Option D satisfies all constraints: Each employee works one day; No more than two employees work on any day (Monday has L and P, Tuesday has J, Wednesday has K, Thursday has N, Friday has M); J and K work on consecutive days (Tuesday and Wednesday); L works on Monday; Since N works on Thursday, M would need to work on Wednesday if the rule applied, but M works on Friday so the rule doesn't apply; P works on the same day as L (Monday).",
      },
    ],
  },
};

export default function LogicGamePlayPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;

  // Handle case for non-existent game ID by providing a default game
  const game = mockGames[gameId] || mockGames["race-lineup"];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerState, setAnswerState] = useState<{
    [key: string]: string | null;
  }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState<
    Array<{ element: string; slot: string | number } | null>
  >([]);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showRules, setShowRules] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [unusedElements, setUnusedElements] = useState<string[]>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (game) {
      setUnusedElements([...game.elements]);
      setGameState([]);
      setScore({ correct: 0, total: game.questions.length });
      setCurrentQuestionIndex(0);
      setAnswerState({});
      setShowExplanation(false);
      setTimeSpent(0);
      setIsTimerRunning(true);
      setHintsUsed(0);
      setCurrentHint(null);
      setHintLevel(0);
    }
  }, [game]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const currentQuestion = game.questions[currentQuestionIndex];

  const handleDragStart = (element: string) => {
    setDraggedElement(element);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slot: string | number) => {
    e.preventDefault();

    if (!draggedElement) return;

    // Check if element already exists in gameState
    const existingIndex = gameState.findIndex(
      (item) => item && item.element === draggedElement
    );

    // Create new game state
    const newGameState = [...gameState];

    // If element exists elsewhere, remove it
    if (existingIndex !== -1) {
      newGameState.splice(existingIndex, 1);
    } else {
      // Remove from unused elements
      setUnusedElements((prev) => prev.filter((el) => el !== draggedElement));
    }

    // Add element to new slot
    newGameState.push({ element: draggedElement, slot });

    // Update game state
    setGameState(newGameState);
    setDraggedElement(null);
  };

  const handleRemoveElement = (element: string) => {
    // Remove element from game state
    setGameState((prev) => prev.filter((item) => item?.element !== element));

    // Add element back to unused elements
    setUnusedElements((prev) => [...prev, element]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswerState((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const checkAnswer = () => {
    const isCorrect =
      answerState[currentQuestion.id] === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < game.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      // Save results to localStorage for the results page
      const gameResults = {
        gameId,
        title: game.title,
        type: game.type,
        score: score.correct,
        total: score.total,
        timeSpent,
        hintsUsed,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(
        `logic_game_result_${gameId}`,
        JSON.stringify(gameResults)
      );

      // End of game, navigate to results
      router.push(`/practise/logic-games/results/${gameId}`);
    }
  };

  const resetGameState = () => {
    setGameState([]);
    setUnusedElements([...game.elements]);
    setDraggedElement(null);
  };

  const requestHint = () => {
    setHintsUsed(hintsUsed + 1);
    setCurrentHint(getHintForCurrentQuestion());
    setHintLevel(1);
  };

  const increaseHintLevel = () => {
    if (hintLevel < 3) {
      setHintLevel(hintLevel + 1);
    }
  };

  const getHintForCurrentQuestion = () => {
    // Game-specific hints based on the current question
    const baseHints = [
      "Look carefully at the constraints that involve the elements mentioned in the question.",
      "Try visualizing different possible arrangements and check them against all the rules.",
      "Consider the implications of combining multiple rules together.",
    ];

    // Game-type specific hints
    if (game.type.includes("Sequencing")) {
      return [
        "For sequencing games, pay attention to elements with fixed or highly constrained positions.",
        "Consider how ordering relationships (before/after) create chains or sequences.",
        "Test each answer choice against all rules, especially adjacency constraints.",
      ][Math.min(hintLevel - 1, 2)];
    } else if (game.type.includes("Grouping")) {
      return [
        "For grouping games, start with elements that must go in specific groups.",
        "Pay careful attention to 'must be together' and 'cannot be together' rules.",
        "Verify that each group has the correct number of elements as specified in the rules.",
      ][Math.min(hintLevel - 1, 2)];
    } else if (game.type.includes("Selection")) {
      return [
        "For selection games, identify elements that must be selected or rejected first.",
        "Pay attention to conditional selection rules (if X then Y) and their logical contrapositive.",
        "Verify that the total number of selections matches the requirement in the game.",
      ][Math.min(hintLevel - 1, 2)];
    } else {
      return baseHints[Math.min(hintLevel - 1, 2)];
    }
  };

  const isGameStateValid = () => {
    // Basic validation
    if (game.type.includes("Grouping")) {
      const groupCounts: { [key: string]: number } = {};
      for (const item of gameState) {
        if (item) {
          const slot = item.slot.toString();
          groupCounts[slot] = (groupCounts[slot] || 0) + 1;
        }
      }

      // Check if any group exceeds its size limit
      for (let i = 0; i < game.slots.length; i++) {
        const slot = game.slots[i].toString();
        const maxSize = game.groupSizes?.[i] || 0;
        if (groupCounts[slot] > maxSize) {
          return false;
        }
      }
    }

    return true;
  };

  const getGameStateError = () => {
    if (!isGameStateValid()) {
      return "There are placement errors in your current arrangement.";
    }
    return null;
  };

  const getAISuggestion = () => {
    // More intelligent AI suggestions based on game type and current state
    if (gameState.length === 0) {
      if (game.type.includes("Sequencing")) {
        return "Start by identifying elements with fixed positions (like L in position 1 or 6).";
      } else if (game.type.includes("Grouping")) {
        return "Begin with elements that must go in specific groups (like Camel in Desert).";
      } else if (game.type.includes("Selection")) {
        return "Start with elements that must be selected or rejected based on the rules.";
      } else {
        return "Break down this hybrid game into its component parts and tackle one aspect at a time.";
      }
    }

    // More specific suggestions based on current game progress
    if (gameState.length <= 2) {
      return "Now consider how the placement of these elements affects others through the game rules.";
    } else if (gameState.length <= 4) {
      return "You're making good progress. Check if any rules create logical chains or force specific placements.";
    } else {
      return "Almost complete! Verify your arrangement against all the rules, especially conditional constraints.";
    }
  };

  // Render the appropriate game board based on game type
  const renderGameBoard = () => {
    if (game.type.includes("Sequencing")) {
      return (
        <div className="flex space-x-1">
          {Array.isArray(game.slots) &&
            game.slots.map((slot, index) => (
              <div
                key={index}
                className="flex-1 border-2 border-dashed border-gray-300 rounded-md h-20 flex flex-col items-center justify-center bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot)}
              >
                <div className="text-sm text-gray-500 mb-1">
                  Position {slot}
                </div>
                {gameState.find((item) => item?.slot === slot) ? (
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-md font-bold text-white bg-blue-500 relative cursor-pointer"
                    onClick={() =>
                      handleRemoveElement(
                        gameState.find((item) => item?.slot === slot)
                          ?.element || ""
                      )
                    }
                  >
                    {gameState.find((item) => item?.slot === slot)?.element}
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                      ×
                    </span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-md border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-400">
                    ?
                  </div>
                )}
              </div>
            ))}
        </div>
      );
    } else if (game.type.includes("Grouping")) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(game.slots) &&
            game.slots.map((slot, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot)}
              >
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {slot}
                </div>
                <div className="min-h-[120px] space-y-2">
                  {gameState
                    .filter((item) => item?.slot === slot)
                    .map((item, elemIndex) => (
                      <div
                        key={elemIndex}
                        className="flex items-center justify-center w-10 h-10 rounded-md font-bold text-white bg-purple-500 relative cursor-pointer"
                        onClick={() => handleRemoveElement(item?.element || "")}
                      >
                        {item?.element}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                          ×
                        </span>
                      </div>
                    ))}
                  <div className="text-sm text-gray-400 mt-2 text-center">
                    {game.groupSizes
                      ? `(${
                          gameState.filter((item) => item?.slot === slot).length
                        }/${game.groupSizes[index]})`
                      : ""}
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
    } else if (game.type.includes("Selection")) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(game.slots) &&
            game.slots.map((slot, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot)}
              >
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {slot}
                </div>
                <div className="min-h-[120px] flex flex-wrap gap-2">
                  {gameState
                    .filter((item) => item?.slot === slot)
                    .map((item, elemIndex) => (
                      <div
                        key={elemIndex}
                        className={`flex items-center justify-center w-10 h-10 rounded-md font-bold text-white relative cursor-pointer ${
                          slot === "Selected" ? "bg-green-500" : "bg-gray-500"
                        }`}
                        onClick={() => handleRemoveElement(item?.element || "")}
                      >
                        {item?.element}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                          ×
                        </span>
                      </div>
                    ))}
                </div>
                <div className="text-sm text-gray-400 mt-2 text-center">
                  {slot === "Selected" && game.selectionSize
                    ? `(${
                        gameState.filter((item) => item?.slot === slot).length
                      }/${game.selectionSize})`
                    : ""}
                </div>
              </div>
            ))}
        </div>
      );
    } else if (game.isHybrid && game.hybridType === "schedule") {
      return (
        <div className="grid grid-cols-5 gap-2">
          {Array.isArray(game.slots) &&
            game.slots.map((slot, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-300 rounded-md p-3 bg-gray-50"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot)}
              >
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {slot}
                </div>
                <div className="min-h-[100px] space-y-2">
                  {gameState
                    .filter((item) => item?.slot === slot)
                    .map((item, elemIndex) => (
                      <div
                        key={elemIndex}
                        className="flex items-center justify-center w-8 h-8 rounded-md font-bold text-white bg-amber-500 relative cursor-pointer"
                        onClick={() => handleRemoveElement(item?.element || "")}
                      >
                        {item?.element}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                          ×
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      );
    }

    return <div>Game board not available</div>;
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{game.title}</h1>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {game.type}
              </Badge>
              <Badge
                variant={
                  game.difficulty === "Hard" || game.difficulty === "Very Hard"
                    ? "destructive"
                    : "default"
                }
              >
                {game.difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              <span className="font-mono">{formatTime(timeSpent)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? "Pause" : "Resume"}
            </Button>

            <Link href="/practise/logic-games">
              <Button variant="ghost" size="sm">
                Exit Game
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader
                className="pb-3 cursor-pointer"
                onClick={() => setShowRules(!showRules)}
              >
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Game Rules</CardTitle>
                  {showRules ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardHeader>

              {showRules && (
                <CardContent className="border-t pt-3">
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <ul className="space-y-2">
                    {game.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 font-bold mr-2">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Available Elements</CardTitle>
              </CardHeader>
              <CardContent className="border-t pt-3">
                <div className="flex flex-wrap gap-2 mb-4">
                  {unusedElements.map((element) => (
                    <div
                      key={element}
                      draggable
                      onDragStart={() => handleDragStart(element)}
                      className="flex items-center justify-center w-10 h-10 rounded-md font-bold text-white bg-blue-500 cursor-move"
                    >
                      {element}
                    </div>
                  ))}
                  {unusedElements.length === 0 && (
                    <p className="text-gray-400 text-sm">
                      All elements have been placed.
                    </p>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetGameState}
                  className="w-full"
                >
                  <UndoIcon className="h-4 w-4 mr-2" />
                  Reset Setup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </CardHeader>
              <CardContent className="border-t pt-3">
                <div className="space-y-4">
                  {getGameStateError() ? (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm font-medium text-red-800">
                        <X className="h-4 w-4 inline mr-1" />
                        {getGameStateError()}
                      </p>
                    </div>
                  ) : gameState.length > 0 ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm font-medium text-green-800">
                        <Check className="h-4 w-4 inline mr-1" />
                        Your current setup is valid!
                      </p>
                    </div>
                  ) : null}

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      <BrainCircuit className="h-4 w-4 inline mr-1" />
                      <span className="font-medium">AI Suggestion:</span>{" "}
                      {getAISuggestion()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={requestHint}
                      disabled={hintsUsed >= 3}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Request Hint ({3 - hintsUsed} left)
                    </Button>

                    {currentHint && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-amber-800">
                            <LightbulbIcon className="h-4 w-4 inline mr-1" />
                            Hint Level {hintLevel}/3
                          </p>
                          {hintLevel < 3 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-amber-800"
                              onClick={increaseHintLevel}
                            >
                              More Detail
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-amber-700">{currentHint}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Game Board */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {game.title} - Interactive Workspace
                </CardTitle>
              </CardHeader>
              <CardContent>{renderGameBoard()}</CardContent>
            </Card>

            {/* Question Area */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1} of{" "}
                    {game.questions.length}
                  </CardTitle>
                  <Badge variant="outline">
                    {Math.round(
                      (currentQuestionIndex / game.questions.length) * 100
                    )}
                    % Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-medium">{currentQuestion.text}</p>

                  <RadioGroup
                    value={answerState[currentQuestion.id] || ""}
                    onValueChange={(value) =>
                      handleAnswerSelect(currentQuestion.id, value)
                    }
                    className="space-y-3"
                  >
                    {currentQuestion.choices.map((choice) => (
                      <div
                        key={choice.id}
                        className={`flex items-start space-x-2 p-2 rounded-md ${
                          showExplanation
                            ? choice.id === currentQuestion.correctAnswer
                              ? "bg-green-50 border border-green-200"
                              : answerState[currentQuestion.id] === choice.id
                              ? "bg-red-50 border border-red-200"
                              : "hover:bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem
                          value={choice.id}
                          id={`choice-${choice.id}`}
                          disabled={showExplanation}
                        />
                        <Label
                          htmlFor={`choice-${choice.id}`}
                          className="cursor-pointer flex-1 leading-normal"
                        >
                          <span className="font-semibold">{choice.id}.</span>{" "}
                          {choice.text}
                        </Label>
                        {showExplanation &&
                          choice.id === currentQuestion.correctAnswer && (
                            <Check className="h-5 w-5 text-green-600" />
                          )}
                        {showExplanation &&
                          answerState[currentQuestion.id] === choice.id &&
                          choice.id !== currentQuestion.correctAnswer && (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                      </div>
                    ))}
                  </RadioGroup>

                  {showExplanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                      <h3 className="font-medium text-blue-800 mb-2">
                        Explanation:
                      </h3>
                      <p className="text-blue-700">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t flex justify-between">
                {!showExplanation ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={!answerState[currentQuestion.id]}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    {currentQuestionIndex < game.questions.length - 1
                      ? "Next Question"
                      : "Finish Game"}
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
