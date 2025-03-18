import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignupForm from "../../../components/SignupForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function SignupPage() {
  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left Panel - Background Image and Content */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 overflow-hidden relative">
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
        <div className="absolute w-96 h-96 rounded-full bg-blue-400 blur-3xl opacity-20 -bottom-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20 top-10 -right-20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          <div className="max-w-lg">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-10 rounded-full backdrop-blur-sm border border-white border-opacity-20 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
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

            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Start Your BAR Journey
            </h2>
            <p className="text-lg text-blue-100 mb-6 text-center">
              Join thousands of students who improved their BAR scores with our
              AI-powered learning platform.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-10 shadow-lg">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
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
                  <span className="text-white text-xs">
                    Personalized study plans
                  </span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-10 shadow-lg">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
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
                  <span className="text-white text-xs">
                    Interactive logic games
                  </span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-10 shadow-lg">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
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
                  <span className="text-white text-xs">
                    Full-length practice exams
                  </span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 border border-white border-opacity-10 shadow-lg">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
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
                  <span className="text-white text-xs">
                    Performance analytics
                  </span>
                </div>
              </div>
            </div>

            {/* Success Story */}
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-10 shadow-xl">
              <p className="italic text-white text-sm mb-3">
                "BAR Training helped me target my weaknesses and improve where
                it matters most. My score jumped from 157 to 171 in just 10
                weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs mr-2">
                  MT
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Michael T.</p>
                  <p className="text-blue-200 text-xs">Columbia Law '23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Header with Logo */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-800">
              Create account
            </h1>
            <p className="text-gray-500 text-sm">
              Join our community of BAR learners
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <SignupForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <GoogleSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
