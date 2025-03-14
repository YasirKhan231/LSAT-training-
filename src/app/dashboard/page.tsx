// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../../../components/ProtectRoute";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email?.split("@")[0] || "User");
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your progress and continue your LSAT preparation
          </p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Overview */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Practice Completed
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View all practice sessions
                </a>
              </div>
            </div>
          </div>

          {/* Recent Score */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Average Score
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">--</dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View score details
                </a>
              </div>
            </div>
          </div>

          {/* Study Streak */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Current Streak
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                0 days
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View study calendar
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">
            Continue your preparation
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/practice/ai-tutor" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Practice with AI Tutor
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Get personalized feedback and guidance from an AI tutor
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/practice/question-bank" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Question Bank
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Practice with our extensive library of LSAT questions
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/practise/mock-exam" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg transition duration-150 ease-in-out transform hover:scale-105 hover:shadow-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mock Exams
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Test your skills with timed practice exams
                  </p>
                </div>
                <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
