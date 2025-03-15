"use client";

import { useState } from "react";
import ProtectedRoute from "../../../../components/ProtectRoute";
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
import {
  Brain,
  Clock,
  BarChart,
  Grid,
  Users,
  Box,
  Shuffle,
  Filter,
} from "lucide-react";

export default function LogicGamesPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Interactive Logic Games
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Master LSAT Analytical Reasoning with AI-powered assistance and
            interactive solving tools
          </p>
        </header>

        {/* Game Type Categories */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Game Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Grid className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Sequencing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm">
                  Arrange elements in a specific order based on given
                  conditions.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/practise/logic-games/sequencing"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Practice Sequencing
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Grouping</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm">
                  Assign elements to groups while satisfying various
                  constraints.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/practise/logic-games/grouping" className="w-full">
                  <Button variant="outline" className="w-full">
                    Practice Grouping
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Box className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Selection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm">
                  Choose elements from a set based on conditional rules.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/practise/logic-games/selection" className="w-full">
                  <Button variant="outline" className="w-full">
                    Practice Selection
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <Shuffle className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Hybrid</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 text-sm">
                  Complex games combining multiple rule types and arrangements.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/practise/logic-games/hybrid" className="w-full">
                  <Button variant="outline" className="w-full">
                    Practice Hybrid
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Featured Game */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Featured Logic Game
          </h2>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-blue-500">FEATURED</Badge>
                  <CardTitle className="text-xl">Office Assignment</CardTitle>
                  <p className="text-gray-600 mt-1">Sequencing & Grouping</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>~15 min</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart className="h-4 w-4 mr-1" />
                    <span>Difficulty: Hard</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Seven executives—F, G, H, J, K, L, and M—must be assigned to
                seven consecutive offices numbered 1 through 7. Each executive
                must be assigned to exactly one office, and each office must be
                assigned to exactly one executive. The assignments are subject
                to the following constraints...
              </p>
              <div className="bg-white p-4 rounded-md shadow-sm border border-blue-100">
                <p className="font-medium text-blue-800 mb-2">
                  Game Highlights:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Complex sequencing with conditional rules</li>
                  <li>• Requires tracking multiple variables simultaneously</li>
                  <li>• Tests key deduction skills needed for the LSAT</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/practise/logic-games/play/office-assignment"
                className="w-full"
              >
                <Button className="w-full">Start This Game</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Games & Progress */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Games
            </h2>
            <div className="space-y-4">
              <Card>
                <div className="flex p-4 items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Committee Selection</h3>
                    <p className="text-sm text-gray-500">
                      Grouping • Completed 2 days ago
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium mb-1">
                      5/6 Correct
                    </div>
                    <Link href="/practise/logic-games/play/committee-selection">
                      <Button size="sm" variant="outline">
                        Play Again
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex p-4 items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Grid className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Delivery Schedule</h3>
                    <p className="text-sm text-gray-500">
                      Sequencing • Completed 5 days ago
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-600 font-medium mb-1">
                      4/7 Correct
                    </div>
                    <Link href="/practise/logic-games/play/delivery-schedule">
                      <Button size="sm" variant="outline">
                        Play Again
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Skills Progress
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Sequencing</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Grouping</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Selection</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Hybrid</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link href="/practise/logic-games/skills-assessment">
                    <Button variant="outline" className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Take Skills Assessment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
