"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  LucideArrowLeft,
  LucideBarChart,
  LucideBookOpen,
  LucideSend,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi John! I've analyzed your recent practice sessions. Your logical reasoning score has improved by 3 points since last week. What would you like to focus on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Based on your recent performance, I recommend focusing on strengthening your analytical reasoning skills, particularly with grouping games. I've noticed you're spending too much time setting up your diagrams. Let's work on a more efficient approach to diagramming these types of games.",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center">
        <Link href="/plain">
          <Button variant="ghost" size="icon">
            <LucideArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">AI Coach</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Your recent progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Logical Reasoning</p>
                    <p className="text-sm font-medium">75%</p>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Analytical Reasoning</p>
                    <p className="text-sm font-medium">68%</p>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Reading Comprehension</p>
                    <p className="text-sm font-medium">82%</p>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                    <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                      <LucideBookOpen className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        Logical Reasoning Practice
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Yesterday • 15/20 correct
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                    <div className="mt-0.5 rounded-full bg-amber-100 p-1 dark:bg-amber-900">
                      <LucideBookOpen className="h-3 w-3 text-amber-700 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">
                        Logic Games Practice
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 days ago • 12/23 correct
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md bg-slate-50 p-2 dark:bg-slate-900">
                    <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900">
                      <LucideBarChart className="h-3 w-3 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Full Practice Test</p>
                      <p className="text-xs text-muted-foreground">
                        5 days ago • Score: 162
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="flex h-[600px] flex-col">
            <CardHeader>
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat with AI Coach</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="chat"
                  className="flex h-full flex-col data-[state=inactive]:hidden"
                >
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            message.role === "assistant"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "assistant"
                                ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                                : "bg-blue-600 text-white dark:bg-blue-700"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <div className="flex items-center space-x-2">
                      <Textarea
                        placeholder="Ask your AI coach a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-[60px] flex-1 resize-none"
                      />
                      <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                      >
                        <LucideSend className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Try asking: "What should I focus on to improve my score?"
                      or "Can you explain assumption questions?"
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="recommendations"
                  className="h-full overflow-y-auto p-4 data-[state=inactive]:hidden"
                >
                  <div className="space-y-6">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
                      <h3 className="mb-2 font-medium text-amber-800 dark:text-amber-300">
                        Priority Focus Area
                      </h3>
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        Based on your recent performance, you should prioritize
                        improving your Analytical Reasoning skills, particularly
                        with grouping games.
                      </p>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          className="text-amber-800 dark:text-amber-300"
                        >
                          View Recommended Exercises
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 font-medium">
                        Recommended Study Materials
                      </h3>
                      <div className="space-y-3">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900">
                                <LucideBookOpen className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                              </div>
                              <h4 className="font-medium">
                                Analytical Reasoning Mastery
                              </h4>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            A focused module on diagramming techniques for
                            complex grouping games.
                          </p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-purple-100 p-1.5 dark:bg-purple-900">
                                <LucideBookOpen className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                              </div>
                              <h4 className="font-medium">
                                Assumption Questions Deep Dive
                              </h4>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Strengthen your ability to identify and evaluate
                            assumptions in logical reasoning.
                          </p>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900">
                                <LucideBookOpen className="h-4 w-4 text-green-700 dark:text-green-300" />
                              </div>
                              <h4 className="font-medium">
                                Timed Practice Drills
                              </h4>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Improve your speed and accuracy with targeted timed
                            exercises.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 font-medium">Weekly Goals</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Complete 50 Analytical Reasoning questions
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Progress value={30} className="h-2 w-32" />
                              <span className="text-xs text-muted-foreground">
                                15/50 completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Take 2 timed practice sections
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Progress value={50} className="h-2 w-32" />
                              <span className="text-xs text-muted-foreground">
                                1/2 completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-slate-50 p-3 dark:bg-slate-900">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Review all incorrect answers with AI coach
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Progress value={20} className="h-2 w-32" />
                              <span className="text-xs text-muted-foreground">
                                In progress
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0"></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}