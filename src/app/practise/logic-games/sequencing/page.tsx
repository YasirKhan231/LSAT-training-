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
import { Clock, BarChart, Grid } from "lucide-react";

// Sample sequencing games data
const sequencingGames = [
  {
    id: "race-lineup",
    title: "Race Lineup",
    difficulty: "Easy",
    estimatedTime: 10,
    description:
      "Six runners (J, K, L, M, N, and P) must be arranged in six consecutive positions at the starting line of a race.",
    completed: false,
  },
  {
    id: "book-arrangement",
    title: "Book Arrangement",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "Seven books (F through L) must be arranged on a shelf in a specific order according to various constraints.",
    completed: true,
    score: "5/7",
  },
  {
    id: "concert-schedule",
    title: "Concert Schedule",
    difficulty: "Hard",
    estimatedTime: 20,
    description:
      "Eight bands must perform, one at a time, according to specific scheduling constraints.",
    completed: false,
  },
  {
    id: "delivery-route",
    title: "Delivery Route",
    difficulty: "Medium",
    estimatedTime: 15,
    description:
      "A delivery truck must visit five locations in a single trip, following a specific route with constraints.",
    completed: false,
  },
];

export default function SequencingGamesPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Grid className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Sequencing Games
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            Arrange elements in a specific order based on given conditions.
            These games test your ability to determine precise ordering
            relationships.
          </p>
        </header>

        <div className="mt-6 mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            About Sequencing Games
          </h2>
          <p className="text-blue-700 mb-4">
            Sequencing games require you to arrange elements in a specific order
            according to given rules and constraints. These games test your
            ability to:
          </p>
          <ul className="text-blue-700 space-y-1 ml-6 list-disc">
            <li>Track ordering relationships (before/after)</li>
            <li>
              Manage conditional placements (if X is 3rd, then Y must be 5th)
            </li>
            <li>Identify valid and invalid arrangements</li>
            <li>Draw inferences from combinations of rules</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">Strategy Tips:</h3>
            <p className="text-blue-700">
              For sequencing games, create a number line or slots to represent
              positions. Focus on finding "anchors" (elements with fixed or
              highly constrained positions) and build your solution from there.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sequencingGames.map((game) => (
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
              Master Sequencing Games
            </h3>
            <p className="text-gray-600 mb-4">
              Watch our video tutorial on advanced sequencing techniques,
              covering fundamental patterns and solving strategies.
            </p>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <p className="text-gray-500">
                Video Tutorial: Advanced Sequencing Techniques
              </p>
            </div>
            <Button variant="outline">Watch Tutorial</Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
