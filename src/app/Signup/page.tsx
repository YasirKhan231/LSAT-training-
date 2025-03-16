// app/Signup/page.tsx
import SignupForm from "../../../components/SignupForm";
import GoogleSignIn from "../../../components/GoogleSignin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Left Panel - Background Image and Content */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 overflow-hidden relative">
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
        <div className="absolute w-96 h-96 rounded-full bg-purple-400 blur-3xl opacity-20 -bottom-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20 top-10 -right-20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-16">
          <div className="max-w-lg text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-10 rounded-full backdrop-blur-sm border border-white border-opacity-20 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your LSAT Journey
            </h2>
            <p className="text-xl text-indigo-100 mb-10">
              Join thousands of students who improved their LSAT scores with our
              AI-powered learning platform.
            </p>

            <div className="space-y-6 mb-10">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-left border border-white border-opacity-10 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  What you'll get:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">
                      Personalized study plans
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">
                      Interactive logic games
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">
                      Full-length practice exams
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-white text-sm">
                      Performance analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 text-left border border-white border-opacity-10 shadow-xl">
              <p className="italic text-white mb-4">
                "LSAT Training helped me target my weaknesses and improve where
                it matters most. My score jumped from 157 to 171 in just 10
                weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white mr-3">
                  MT
                </div>
                <div>
                  <p className="font-medium text-white">Michael T.</p>
                  <p className="text-indigo-200 text-sm">Columbia Law '23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 lg:p-8 transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(79,70,229,0.3)]">
          {/* Header with Logo */}
          <div className="mb-6 text-center">
            <Link href="/">
              <div className="inline-flex bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-2.5 rounded-xl shadow-md mx-auto hover:shadow-lg transition-shadow duration-200">
                <span className="font-bold text-xl">LSAT Training</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-800">
              Create account
            </h1>
            <p className="text-gray-500 text-sm">
              Join our community of LSAT learners
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <SignupForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <GoogleSignIn />

            <div className="flex items-center justify-between pt-2 text-sm">
              <Link
                href="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>Back to home</span>
              </Link>

              <span className="text-gray-500">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
