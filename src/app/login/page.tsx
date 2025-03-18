import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function LoginPage() {
  return (
    <div className="flex bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 overflow-hidden relative">
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

        {/* Abstract Shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-400 blur-3xl opacity-20 -bottom-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20 top-10 -right-20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          <div className="max-w-md">
            <div className="mb-8 flex justify-center">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Prepare for Success
            </h2>
            <p className="text-lg text-blue-100 mb-6 text-center">
              Our AI-powered platform helps you maximize your LSAT score with
              personalized study plans and advanced analytics.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-left border border-white border-opacity-10 hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold text-white mb-1">93%</div>
                <p className="text-blue-100 text-sm">
                  of our students improve their scores by 8+ points
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-left border border-white border-opacity-10 hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold text-white mb-1">5,000+</div>
                <p className="text-blue-100 text-sm">
                  practice questions with detailed explanations
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-5 text-left border border-white border-opacity-10 shadow-xl hover:bg-opacity-10 transition-all duration-200">
              <p className="italic text-white mb-4 text-base">
                "The personalized feedback and analytics helped me identify my
                weak areas and focus my study time effectively. I improved my
                score by 12 points!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm mr-3">
                  JD
                </div>
                <div>
                  <p className="font-medium text-white text-base">Jamie D.</p>
                  <p className="text-blue-200 text-sm">Harvard Law '24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          {/* Header with Logo */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mt-6 mb-2 text-gray-800">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <LoginForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignIn />

            <div className="flex items-center justify-between pt-2 text-sm">
              <Link
                href="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to home</span>
              </Link>

              <span className="text-gray-500">
                Need an account?{" "}
                <Link
                  href="/Signup"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
