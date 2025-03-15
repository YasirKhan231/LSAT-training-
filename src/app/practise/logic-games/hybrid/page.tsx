"use client";

import { useState } from "react";
import ProtectedRoute from "../../../../../components/ProtectRoute";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Shuffle } from "lucide-react";

// Sample hybrid games data
const hybridGames = [
  {
    id: "museum-exhibit",
    title: "Museum Exhibit",
    difficulty: "Hard",
    estimatedTime: 25,
    description:
      "A museum must display seven artifacts in three different rooms, with specific artifacts displayed in a particular order.",
    completed: false,
    gameTypes: ["Sequencing", "Grouping"],
  },
  {
    id: "conference-schedule",
    title: "Conference Schedule",
    difficulty: "Very Hard",
    estimatedTime: 30,
    description:
      "Eight presentations must be selected from twelve proposals and scheduled across three time slots according to various constraints.",
    completed: false,
    gameTypes: ["Selection", "Sequencing", "Grouping"],
  },
  {
    id: "job-assignments",
    title: "Job Assignments",
    difficulty: "Hard",
    estimatedTime: 22,
    description:
      "Six employees must be assigned to different projects and scheduled to work on specific days of the week.",
    completed: true,
    score: "5/8",
    gameTypes: ["Sequencing", "Selection"],
  },
  {
    id: "product-launch",
    title: "Product Launch",
    difficulty: "Hard",
    estimatedTime: 25,
    description:
      "Five products must be selected for launch and arranged in a specific order across three different markets.",
    completed: false,
    gameTypes: ["Selection", "Grouping"],
  },
];

export default function HybridGamesPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <div className="flex items-center mb-2">
            <div className="bg-amber-100 p-2 rounded-lg mr-3">
              <Shuffle className="h-5 w-5 text-amber-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Hybrid Games
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Complex games combining multiple rule types and arrangements. These
            challenging games test your mastery of integrated logic skills.
          </p>
        </header>

        <div className="mt-6 mb-8 bg-amber-50 p-6 rounded-lg border border-amber-100">
          <h2 className="text-xl font-semibold text-amber-800 mb-3">
            About Hybrid Games
          </h2>
          <p className="text-amber-700 mb-4">
            Hybrid games combine elements from sequencing, grouping, and
            selection games into more complex scenarios. These advanced games
            test your ability to:
          </p>
          <ul className="text-amber-700 space-y-1 ml-6 list-disc">
            <li>Integrate multiple game types (sequencing + grouping, etc.)</li>
            <li>
              Track complex variable relationships across different dimensions
            </li>
            <li>Balance competing constraints simultaneously</li>
            <li>
              Create sophisticated diagrams that capture multiple game aspects
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-amber-200">
            <h3 className="font-medium text-amber-800 mb-2">Strategy Tips:</h3>
            <p className="text-amber-700">
              Start by identifying which elements of the game are sequencing,
              grouping, or selection. Create integrated diagrams that capture
              all relevant relationships. Consider using a grid or matrix when
              tracking multiple variables.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hybridGames.map((game) => (
            <Card key={game.id} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <Badge
                    variant={
                      game.difficulty === "Hard"
                        ? "destructive"
                        : game.difficulty === "Very Hard"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {game.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {game.gameTypes.map((type) => (
                    <Badge key={type} variant="outline" className="bg-amber-50">
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="mr-4">~{game.estimatedTime} min</span>

                  {game.completed && (
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span className="text-green-600 font-medium">
                        {game.score}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/practise/logic-games/play/${game.id}`}
                  className="w-full"
                >
                  <Button
                    variant={game.completed ? "outline" : "default"}
                    className="w-full"
                  >
                    {game.completed ? "Play Again" : "Start Game"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Learning Resources
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium text-gray-900 mb-3">
              Advanced Hybrid Game Strategies
            </h3>
            <p className="text-gray-600 mb-4">
              Master the most challenging LSAT games with advanced techniques
              for integrating multiple game types and creating powerful
              diagrams.
            </p>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-gray-500">
                Video Tutorial: Mastering Hybrid Games
              </p>
            </div>
            <Button variant="outline">Watch Tutorial</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
