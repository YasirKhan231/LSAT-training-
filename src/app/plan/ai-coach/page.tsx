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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

// Define the type for practice history
interface PracticeSession {
  section: string;
  score: number;
  totalQuestions: number;
}

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "How can I help you to clear the bar exam?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [performanceData, setPerformanceData] = useState({
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

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to the backend
      const response = await fetch(`/api/ai-coach?uuid=${uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, message: input }),
      });
      const data = await response.json();

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to fetch response from AI" },
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

        <div className="md:col-span-2">
          <Card className="flex h-[600px] flex-col">
            <CardHeader>
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="chat">Chat with AI Coach</TabsTrigger>
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
              </Tabs>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0"></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
