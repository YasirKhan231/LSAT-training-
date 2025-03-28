"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white text-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full text-black"
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
        <div className="absolute w-96 h-96 rounded-full bg-black blur-3xl opacity-10 -bottom-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-black blur-3xl opacity-10 top-10 -right-20 animate-pulse"></div>

        {/* Content */}
        <div className="relative flex flex-col justify-center p-12 text-black">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <span className="ml-4 text-3xl font-bold">Prep For Law</span>
          </div>

          <h2 className="text-4xl font-bold mb-6 animate-fadeIn">
            Securely Access Your Account
          </h2>
          <p className="text-xl text-gray-500 mb-12 animate-fadeIn animation-delay-200">
            Join thousands of students who have improved their BAR exam scores
            with our AI-powered platform.
          </p>

          <div className="grid gap-6 animate-slideUp animation-delay-400">
            <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="font-semibold text-xl mb-2">
                AI-Powered Learning
              </h3>
              <p className="text-gray-500">
                Get personalized study plans and real-time feedback tailored to
                your needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold mb-1">93%</div>
                <p className="text-gray-500">Score improvement</p>
              </div>
              <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold mb-1">5,000+</div>
                <p className="text-gray-500">Practice questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn border border-[#1a1a1f]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-gray-500" />
              <span className="ml-2 text-2xl font-bold text-black">
                Prep For Law
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black">
              Securely Access Your Account
            </h1>
            <p className="text-gray-500 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1a1a1f]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignIn></GoogleSignIn>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-black flex items-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <p className="text-gray-500">
              Need an account?{" "}
              <Link
                href="/Signup"
                className="font-medium text-gray-500 hover:text-gray-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
