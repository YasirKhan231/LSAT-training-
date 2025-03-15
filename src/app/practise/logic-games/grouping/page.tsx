"use client";

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
import { Clock, BarChart, Users } from "lucide-react";

// Sample grouping games data
const groupingGames = [
  {
    id: "committee-selection",
    title: "Committee Selection",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "Eight individuals must be selected to form three different committees according to specific membership requirements.",
    completed: true,
    score: "6/7",
  },
  {
    id: "zoo-exhibits",
    title: "Zoo Exhibits",
    difficulty: "Hard",
    estimatedTime: 20,
    description:
      "Nine animals must be assigned to three different exhibits based on habitat requirements and compatibility conditions.",
    completed: false,
  },
  {
    id: "work-teams",
    title: "Work Teams",
    difficulty: "Easy",
    estimatedTime: 12,
    description:
      "Seven employees must be divided into two work teams with various skill requirements and constraints.",
    completed: false,
  },
  {
    id: "book-categories",
    title: "Book Categories",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "Ten books must be categorized into three genres while following specific classification rules.",
    completed: false,
  },
];

export default function GroupingGamesPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <div className="flex items-center mb-2">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Grouping Games
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Assign elements to groups while satisfying various constraints.
            These games test your ability to organize elements into categories.
          </p>
        </header>

        <div className="mt-6 mb-8 bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">
            About Grouping Games
          </h2>
          <p className="text-purple-700 mb-4">
            Grouping games require you to assign elements to different
            categories or groups according to specific conditions. These games
            test your ability to:
          </p>
          <ul className="text-purple-700 space-y-1 ml-6 list-disc">
            <li>Track group membership and size constraints</li>
            <li>
              Manage conditional assignments (if X is in group 1, then Y must be
              in group 2)
            </li>
            <li>Handle "in/out" decisions for group membership</li>
            <li>Balance multiple group requirements simultaneously</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-purple-200">
            <h3 className="font-medium text-purple-800 mb-2">Strategy Tips:</h3>
            <p className="text-purple-700">
              Create clear diagrams with separate spaces for each group. Pay
              special attention to "must be in same group" and "cannot be in
              same group" rules, as these often provide powerful deductions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupingGames.map((game) => (
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
              Mastering Grouping Games
            </h3>
            <p className="text-gray-600 mb-4">
              Learn essential strategies for solving complex grouping games,
              including in/out diagrams and advanced deduction techniques.
            </p>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-gray-500">
                Video Tutorial: Grouping Game Strategies
              </p>
            </div>
            <Button variant="outline">Watch Tutorial</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
