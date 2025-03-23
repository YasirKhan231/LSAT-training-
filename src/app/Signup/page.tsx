"use client";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import SignupForm from "../../../components/SignupForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-black">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-800 to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Abstract Shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-800 blur-3xl opacity-20 -bottom-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-800 blur-3xl opacity-20 top-10 -right-20 animate-pulse"></div>

        {/* Content */}
        <div className="relative flex flex-col justify-center px-12 text-white">
          <div className="mb-8 animate-fadeIn">
            <Link href="/" className="flex items-center">
              <div className="p-2 bg-gray-800 rounded-xl">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <span className="ml-3 text-3xl font-bold">BAR Training</span>
            </Link>
          </div>

          <h2 className="text-4xl font-bold mb-6 animate-slideRight">
            Start Your BAR Journey
          </h2>
          <p className="text-xl text-gray-400 mb-12 animate-slideRight animation-delay-200">
            Join thousands of successful students who have mastered the BAR exam
            with our AI-powered platform.
          </p>

          <div className="grid gap-6 animate-slideUp animation-delay-400">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20">
              <h3 className="font-semibold text-xl mb-2">
                AI-Powered Learning
              </h3>
              <p className="text-gray-400">
                Get personalized study plans and real-time feedback tailored to
                your needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
                <div className="text-2xl font-bold mb-1 text-blue-400">93%</div>
                <p className="text-gray-400">Score improvement</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/20">
                <div className="text-2xl font-bold mb-1 text-blue-400">
                  5,000+
                </div>
                <p className="text-gray-400">Practice questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold text-gray-100">
                BAR Training
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-100">
              Create your account
            </h1>
            <p className="text-gray-400 mt-2">
              Join our community of BAR learners
            </p>
          </div>

          <SignupForm />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
