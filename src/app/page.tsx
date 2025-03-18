import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  BarChart,
  BookOpen,
  Award,
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 -top-20 -right-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full opacity-10 bottom-10 -left-20 animate-pulse animation-delay-1000"></div>
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
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 animate-fadeIn">
            Master the BAR with{" "}
            <span className="text-blue-300">AI-Powered</span> Learning
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 animate-fadeIn animation-delay-200">
            Personalized study plans, interactive practice, and real-time
            feedback to help you achieve your best score.
          </p>
          <div className="animate-fadeIn animation-delay-400">
            <Link href="/login">
              <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-5 rounded-xl text-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center mx-auto shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slideUp animation-delay-600">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 shadow-lg">
              <div className="text-4xl font-bold mb-2">93%</div>
              <p className="text-blue-200">Students improved their scores</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 shadow-lg">
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-blue-200">Average point improvement</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-20 shadow-lg">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-blue-200">Practice questions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose BAR Training
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                AI-Powered Coaching
              </h3>
              <p className="text-gray-600 text-lg">
                Receive personalized feedback and strategies tailored to your
                strengths and weaknesses.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Adaptive question selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Smart error analysis</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Full-Length Mock Exams
              </h3>
              <p className="text-gray-600 text-lg">
                Practice with realistic simulations of the actual BAR under
                timed conditions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Section-by-section timing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Detailed performance analytics</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Interactive Logic Games
              </h3>
              <p className="text-gray-600 text-lg">
                Master the most challenging section with our visual, interactive
                game interface.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Visual game boards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Step-by-step explanations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Success Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full mr-4 flex items-center justify-center text-xl font-bold text-white">
                  JD
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Jamie D.</h3>
                  <p className="text-gray-500">Harvard Law '24</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "With BAR Training, I improved my score by 12 points in just two
                months. The AI feedback was like having a personal tutor
                available 24/7. The logic games module especially helped me turn
                my weakest section into my strongest."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-indigo-600 rounded-full mr-4 flex items-center justify-center text-xl font-bold text-white">
                  MT
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Michael T.</h3>
                  <p className="text-gray-500">Columbia Law '23</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "The personalized study plan adapted to my progress and focused
                on my weak areas. The practice exams felt just like the real
                thing, and the detailed analytics helped me understand exactly
                where I needed to improve."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 text-white w-full">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Improve Your BAR Score?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of students who have boosted their scores with our
            AI-powered platform. Start your journey today.
          </p>
          <Link href="/login">
            <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto">
              Start Your Preparation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>

          <div className="mt-12 flex justify-center space-x-8">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-blue-300 mr-2" />
              <span>10-point guarantee</span>
            </div>
            <div className="flex items-center">
              <Award className="h-6 w-6 text-blue-300 mr-2" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center">
              <Award className="h-6 w-6 text-blue-300 mr-2" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
