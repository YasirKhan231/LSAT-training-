"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LucideArrowLeft,
  LucideBarChart,
  LucideBookOpen,
  LucideSend,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Ensure Firebase is initialized

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PracticeSession {
  section: string;
  score: number;
  totalQuestions: number;
}

interface PerformanceData {
  logicalReasoning: number;
  analyticalReasoning: number;
  readingComprehension: number;
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "How can I help you to clear the bar exam?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    logicalReasoning: 0,
    analyticalReasoning: 0,
    readingComprehension: 0,
  });
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [uuid, setUuid] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  // Set the username and UUID from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid); // Set the UUID
        setUserName(user.displayName || user.email?.split("@")[0] || "User"); // Set the username
        fetchUserData(user.uid); // Fetch user data
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user data from the backend
  const fetchUserData = async (uid: string) => {
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);

      // Set performance data
      if (data.performanceInsights) {
        setPerformanceData({
          logicalReasoning: data.performanceInsights.logicalReasoning || 0,
          analyticalReasoning:
            data.performanceInsights.analyticalReasoning || 0,
          readingComprehension:
            data.performanceInsights.readingComprehension || 0,
        });
      }

      // Set practice history
      if (data.practiceHistory) {
        setPracticeHistory(data.practiceHistory);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !uuid) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/ai-coach?uuid=${uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-6 flex items-center">
        <Link href="/plan">
          <Button variant="ghost" size="icon">
            <LucideArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">AI Coach</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Side: Performance Insights and Recent Activity */}
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
                    <p className="text-sm font-medium">
                      {performanceData.logicalReasoning}%
                    </p>
                  </div>
                  <Progress
                    value={performanceData.logicalReasoning}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Analytical Reasoning</p>
                    <p className="text-sm font-medium">
                      {performanceData.analyticalReasoning}%
                    </p>
                  </div>
                  <Progress
                    value={performanceData.analyticalReasoning}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Reading Comprehension</p>
                    <p className="text-sm font-medium">
                      {performanceData.readingComprehension}%
                    </p>
                  </div>
                  <Progress
                    value={performanceData.readingComprehension}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
                <div className="space-y-3">
                  {practiceHistory.length > 0 ? (
                    practiceHistory.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 rounded-md bg-slate-50 p-2 dark:bg-slate-900"
                      >
                        <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900">
                          <LucideBookOpen className="h-3 w-3 text-blue-700 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">
                            {session.section} Practice
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.score}/{session.totalQuestions} correct
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No recent practice sessions found.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: ChatGPT-like Chat UI */}
        <div className="md:col-span-2 flex flex-col">
          <Card className="flex flex-col h-[600px] bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Chat with AI Coach</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
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
                      className={`rounded-lg p-4 max-w-[70%] ${
                        message.role === "assistant"
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <div className="border-t p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Ask your AI coach a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none rounded-md border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  rows={2}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <LucideSend className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Try asking: "What should I focus on?" or "Explain assumption
                questions."
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
