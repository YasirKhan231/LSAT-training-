"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Send } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useMobile from "@/hooks/use-mobile";

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
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [performanceInsight, setPerformanceInsight] =
    useState<PerformanceInsight | null>(null);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [uuid, setUuid] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  const isMobile = useMobile();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid);
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
        fetchUserData(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user?uuid=${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);

      if (data.performanceInsights && data.performanceInsights.length > 0) {
        const sortedInsights = data.performanceInsights.sort(
          (a: PerformanceInsight, b: PerformanceInsight) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setPerformanceInsight(sortedInsights[0]);
      }

      if (data.practiceHistory) {
        setPracticeHistory(data.practiceHistory);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !uuid) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsChatLoading(true);

    try {
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
      setIsChatLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 px-3 py-6">
      <div className="mx-auto max-w-[1800px]">
        {!isMobile ? (
          <>
            <div className="mb-6 flex items-center">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-black">AI Coach</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Left Side: Performance Insights and Recent Activity */}
              <div className="md:col-span-1">
                <Card className="border-gray-200 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-black">
                      Performance Insights
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Your recent progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {isLoading ? (
                        <div className="flex justify-center items-center">
                          <div
                            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 
                                       border-gray-400"
                          ></div>
                        </div>
                      ) : performanceInsight &&
                        userData?.performanceInsights?.length > 0 ? (
                        userData.performanceInsights
                          .slice(0, 3)
                          .map((insight: PerformanceInsight, index: number) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-700 capitalize">
                                  {insight.examId.replace(/-/g, " ")}
                                </p>
                                <p className="text-sm font-medium text-black">
                                  {insight.correctAnswers}/
                                  {insight.totalQuestions}
                                </p>
                              </div>
                              <Progress
                                value={
                                  (insight.correctAnswers /
                                    insight.totalQuestions) *
                                  100
                                }
                                className="h-2 bg-gray-100"
                                indicatorClassName="bg-gray-700"
                              />
                            </div>
                          ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No performance data available.
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-2 text-sm font-medium text-black">
                        Recent Activity
                      </h3>
                      <div className="space-y-3">
                        {practiceHistory.length > 0 ? (
                          practiceHistory.map((session, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 rounded-md bg-gray-50 p-3"
                            >
                              <div className="mt-0.5 rounded-full bg-gray-200 p-1">
                                <BookOpen className="h-3 w-3 text-gray-700" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">
                                  {session.section} Practice
                                </p>
                                <p className="text-xs text-gray-500">
                                  {session.score}/{session.totalQuestions}{" "}
                                  correct
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
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
                <Card className="flex flex-col h-[calc(100vh-130px)] border-gray-200 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-black">
                      Chat with AI Coach
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4"
                  >
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
                                ? "bg-gray-100 text-gray-800 border border-gray-200"
                                : "bg-black text-white border border-gray-300"
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
                          <div className="rounded-lg bg-gray-100 p-4 border border-gray-200">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="border-t border-gray-200 p-3 bg-white">
                    <div className="flex items-center space-x-2">
                      <Textarea
                        placeholder="Ask your AI coach a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 resize-none rounded-md border-gray-300 bg-white p-2 text-sm focus:border-gray-400 focus:ring-0 text-gray-800 placeholder:text-gray-400"
                        rows={1}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={isChatLoading || !input.trim()}
                        className="rounded-md bg-black text-white border border-gray-300 p-2 hover:bg-gray-800 hover:border-gray-400 disabled:opacity-50"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : (
          // Mobile-only chat interface that takes full screen
          <div className="fixed inset-0 flex flex-col bg-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 text-gray-600 hover:text-black"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-xl font-bold text-black">AI Coach</h1>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
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
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === "assistant"
                          ? "bg-gray-100 text-gray-800 border border-gray-200"
                          : "bg-black text-white border border-gray-300"
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
                    <div className="rounded-lg bg-gray-100 p-3 border border-gray-200">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center space-x-2">
                <Textarea
                  placeholder="Ask your AI coach a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none rounded-md border-gray-300 bg-white p-2 text-sm focus:border-gray-400 focus:ring-0 text-gray-800 placeholder:text-gray-400"
                  rows={1}
                />
                <Button
                  onClick={handleSend}
                  disabled={isChatLoading || !input.trim()}
                  className="rounded-md bg-black text-white border border-gray-300 p-2 hover:bg-gray-800 hover:border-gray-400 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
