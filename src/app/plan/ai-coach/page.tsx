"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Send } from "lucide-react";
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

interface PerformanceInsight {
  examId: string;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeMinutes: number;
  timestamp: string;
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "How can I help you to clear the bar exam?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false); // Separate loading state for chat
  const [isLoading, setIsLoading] = useState(false); // Loading state for user data
  const [userData, setUserData] = useState<any>(null);
  const [performanceInsight, setPerformanceInsight] =
    useState<PerformanceInsight | null>(null);
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
    setIsLoading(true); // Set loading state for user data
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);

      // Set the most recent performance insight
      if (data.performanceInsights && data.performanceInsights.length > 0) {
        // Sort performanceInsights by timestamp to get the most recent entry
        const sortedInsights = data.performanceInsights.sort(
          (a: PerformanceInsight, b: PerformanceInsight) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setPerformanceInsight(sortedInsights[0]); // Set the most recent entry
      }

      // Set practice history
      if (data.practiceHistory) {
        setPracticeHistory(data.practiceHistory);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false); // Reset loading state for user data
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !uuid) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsChatLoading(true); // Set loading state for chat

    try {
      // Send message to the backend (OpenAI or ChatGPT-like backend)
      const response = await fetch(`/api/plan/ai-coach?uuid=${uuid}`, {
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
      setIsChatLoading(false); // Reset loading state for chat
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-300 p-6">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">AI Coach</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Side: Performance Insights and Recent Activity */}
          <div className="md:col-span-1">
            <Card className="border-slate-800 shadow-xl bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">
                  Performance Insights
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Your recent progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : performanceInsight &&
                    userData?.performanceInsights?.length > 0 ? (
                    userData.performanceInsights
                      .slice(0, 3) // Show only the first 3 exams
                      .map((insight: PerformanceInsight, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium capitalize text-slate-300">
                              {insight.examId.replace(/-/g, " ")}
                            </p>
                            <p className="text-sm font-medium text-indigo-400">
                              {insight.correctAnswers}/{insight.totalQuestions}
                            </p>
                          </div>
                          <Progress
                            value={
                              (insight.correctAnswers /
                                insight.totalQuestions) *
                              100
                            }
                            className="h-2 bg-slate-800"
                            indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500"
                          />
                        </div>
                      ))
                  ) : (
                    <p className="text-xs text-slate-500">
                      No performance data available.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-medium text-white">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {practiceHistory.length > 0 ? (
                      practiceHistory.map((session, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 rounded-md bg-slate-800/30 p-2 border border-slate-700/50"
                        >
                          <div className="mt-0.5 rounded-full bg-indigo-900/30 p-1 border border-indigo-500/30">
                            <BookOpen className="h-3 w-3 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-300">
                              {session.section} Practice
                            </p>
                            <p className="text-xs text-slate-500">
                              {session.score}/{session.totalQuestions} correct
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500">
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
            <Card className="flex flex-col h-[600px] border-slate-800 shadow-xl bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Chat with AI Coach
                </CardTitle>
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
                            ? "bg-slate-800 text-slate-300 border border-slate-700/50"
                            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg bg-slate-800 p-4 border border-slate-700/50">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="border-t border-slate-800 p-4 bg-slate-900">
                <div className="flex items-center space-x-2">
                  <Textarea
                    placeholder="Ask your AI coach a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 resize-none rounded-md border-slate-700 bg-slate-800/50 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 text-slate-300 placeholder:text-slate-500"
                    rows={2}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isChatLoading || !input.trim()}
                    className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 p-2 text-white hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Try asking: "What should I focus on?" or "Explain assumption
                  questions."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
