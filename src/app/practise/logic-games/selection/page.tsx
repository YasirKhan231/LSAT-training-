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
import { Clock, BarChart, Box } from "lucide-react";

// Sample selection games data
const selectionGames = [
  {
    id: "movie-selection",
    title: "Movie Selection",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "A film festival must select exactly five films from a pool of eight candidates based on specific selection criteria.",
    completed: false,
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Hard",
    estimatedTime: 18,
    description:
      "A student must select exactly six courses from nine options while following various scheduling constraints.",
    completed: false,
  },
  {
    id: "gift-selection",
    title: "Gift Selection",
    difficulty: "Easy",
    estimatedTime: 12,
    description:
      "Four gifts must be selected from a collection of seven items according to recipient preferences.",
    completed: true,
    score: "5/6",
  },
  {
    id: "project-assignments",
    title: "Project Assignments",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "Five projects must be selected from eight possibilities and assigned to team members based on skill requirements.",
    completed: false,
  },
];

export default function SelectionGamesPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Box className="h-5 w-5 text-green-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Selection Games
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Choose elements from a set based on conditional rules. These games
            test your ability to determine which combinations are valid.
          </p>
        </header>

        <div className="mt-6 mb-8 bg-green-50 p-6 rounded-lg border border-green-100">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            About Selection Games
          </h2>
          <p className="text-green-700 mb-4">
            Selection games require you to choose specific elements from a
            larger set based on various conditions. These games test your
            ability to:
          </p>
          <ul className="text-green-700 space-y-1 ml-6 list-disc">
            <li>
              Track conditional selection requirements (if X is selected, then Y
              must also be selected)
            </li>
            <li>
              Manage mutually exclusive selections (if X is selected, then Y
              cannot be selected)
            </li>
            <li>Balance numeric constraints (exactly 5 must be selected)</li>
            <li>Identify valid and invalid selection combinations</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-green-200">
            <h3 className="font-medium text-green-800 mb-2">Strategy Tips:</h3>
            <p className="text-green-700">
              Create in/out tables to track which elements must be selected or
              rejected. Look for rules that form "chains" of selections or
              rejections, as these often create powerful constraints.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectionGames.map((game) => (
            <Card key={game.id} className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <Badge
                    variant={
                      game.difficulty === "Easy"
                        ? "default"
                        : game.difficulty === "Medium"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {game.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm mb-4">{game.description}</p>
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
              Selection Game Mastery
            </h3>
            <p className="text-gray-600 mb-4">
              Learn how to efficiently track selection constraints and identify
              key inferences in complex selection games.
            </p>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-gray-500">
                Video Tutorial: Selection Game Techniques
              </p>
            </div>
            <Button variant="outline">Watch Tutorial</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
