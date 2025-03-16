import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";

export default function LoginPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-[0_15px_35px_-15px_rgba(59,130,246,0.3)]">
          {/* Header with Logo */}
          <div className="mb-4 text-center">
            <Link href="/">
              <div className="inline-flex bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-2 rounded-lg shadow-md mx-auto hover:shadow-lg transition-shadow duration-200">
                <span className="font-bold text-lg">LSAT Training</span>
              </div>
            </Link>
            <h1 className="text-xl font-bold mt-4 mb-1 text-gray-800">
              Welcome back
            </h1>
            <p className="text-gray-500 text-xs">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
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

            <div className="flex items-center justify-between pt-1 text-xs">
              <Link
                href="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>Back to home</span>
              </Link>

              <span className="text-gray-500">
                Need an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Background Image and Content */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 overflow-hidden relative">
        {/* Abstract Shapes */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-400 blur-3xl opacity-20 -bottom-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-20 top-10 -right-20"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          <div className="max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white bg-opacity-10 rounded-full backdrop-blur-sm border border-white border-opacity-20 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
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

            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              Prepare for Success
            </h2>
            <p className="text-base text-blue-100 mb-5 text-center">
              Our AI-powered platform helps you maximize your LSAT score with
              personalized study plans and advanced analytics.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 text-left border border-white border-opacity-10 hover:bg-opacity-20 transition-all duration-200">
                <div className="text-xl font-bold text-white mb-0.5">93%</div>
                <p className="text-blue-100 text-xs">
                  of our students improve their scores by 8+ points
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 text-left border border-white border-opacity-10 hover:bg-opacity-20 transition-all duration-200">
                <div className="text-xl font-bold text-white mb-0.5">
                  5,000+
                </div>
                <p className="text-blue-100 text-xs">
                  practice questions with detailed explanations
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-4 text-left border border-white border-opacity-10 shadow-xl hover:bg-opacity-10 transition-all duration-200">
              <p className="italic text-white mb-3 text-sm">
                "The personalized feedback and analytics helped me identify my
                weak areas and focus my study time effectively. I improved my
                score by 12 points!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs mr-2">
                  JD
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Jamie D.</p>
                  <p className="text-blue-200 text-xs">Harvard Law '24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
