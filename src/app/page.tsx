"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  BookOpen,
  Shield,
  Star,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [text, setText] = useState("");
  const texts = [
    "Ace Your Bar Exam",
    "Master Legal Concepts",
    "Pass with Confidence",
  ];
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + texts[textIndex][index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      // After completing the text, wait for 2 seconds, then reset and move to the next text
      const timeout = setTimeout(() => {
        setText("");
        setIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [index, textIndex, texts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="bg-transparent py-4 px-4 absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-lg font-bold">
            BarExamPrep
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
            <Link
              href="/subscription"
              className="text-gray-300 hover:text-white"
            >
              Pricing
            </Link>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm mt-2 p-4 rounded-md">
            <div className="flex flex-col space-y-3">
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link
                href="/subscription"
                className="text-gray-300 hover:text-white"
              >
                Pricing
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,40,45,0.5)_0%,rgba(10,10,15,0)_70%)]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <p className="text-sm uppercase tracking-wider text-gray-300">
              Bar Exam Preparation
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            The Ultimate Guide to
            <br />
            <span className="text-gray-400">Bar Exam Success</span>
          </h1>
          <p className="text-lg mb-2 h-8 text-gray-200 font-medium">
            {text}
            <span className="animate-pulse">|</span>
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-2xl mx-auto">
            Comprehensive study materials, practice exams, and expert guidance
            to help you achieve your best score on the bar exam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="flex justify-center">
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md text-sm font-medium flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <Link href="/subscription" className="flex justify-center">
              <button className="border border-gray-700 text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm font-medium">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#121218]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Advanced Study Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <Shield className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Comprehensive Study Plans
              </h3>
              <p className="text-gray-400 text-sm">
                Tailored study plans designed to cover all areas of the bar
                exam, ensuring you're fully prepared for every section.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Customized schedules</span>
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Progress tracking</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <BarChart className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Full-Length Mock Exams
              </h3>
              <p className="text-gray-400 text-sm">
                Practice with realistic simulations of the actual bar exam under
                timed conditions with high-quality questions.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Timed practice sessions</span>
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Detailed performance analytics</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <BookOpen className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Interactive Legal Modules
              </h3>
              <p className="text-gray-400 text-sm">
                Master challenging legal concepts with our visual, interactive
                learning modules designed by experts.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Visual case studies</span>
                </li>
                <li className="flex items-start text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-gray-300 mr-2 mt-1 flex-shrink-0" />
                  <span>Step-by-step explanations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 border-t border-gray-800 bg-gradient-to-b from-[#121218] to-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            How Our Bar Prep Works
          </h2>

          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs">
                  1
                </div>
                <span className="ml-2 text-sm">Assessment</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  2
                </div>
                <span className="ml-2 text-sm">Training</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  3
                </div>
                <span className="ml-2 text-sm">Practice</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                  4
                </div>
                <span className="ml-2 text-sm">Results</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">
                Personalized Assessment
              </h3>
              <p className="text-gray-400 text-sm">
                Start with a diagnostic test to identify your strengths and
                weaknesses in bar exam subjects.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">Targeted Training</h3>
              <p className="text-gray-400 text-sm">
                Focus on areas that need improvement with tailored study
                materials and expert guidance.
              </p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">Practice & Review</h3>
              <p className="text-gray-400 text-sm">
                Take full-length practice exams and review detailed explanations
                to reinforce your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 border-t border-gray-800 bg-gradient-to-b from-[#0a0a0f] to-[#121218]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            What Our Users Say
          </h2>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Join thousands of aspiring lawyers who trust BarExamPrep to help
            them pass the bar exam.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="flex mb-4">
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-gray-300 text-sm mb-4">
                "BarExamPrep has been a game changer for my studies. The
                comprehensive study materials and mock exams helped me pass the
                bar exam on my first attempt!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                  JD
                </div>
                <div>
                  <h3 className="text-sm font-semibold">James D.</h3>
                  <p className="text-xs text-gray-400">Harvard Law '24</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="flex mb-4">
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-gray-300 text-sm mb-4">
                "The practice exams were incredibly realistic and helped me
                build the confidence I needed to succeed. I highly recommend
                BarExamPrep to anyone preparing for the bar exam."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full mr-3 flex items-center justify-center text-xs font-bold">
                  SK
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Sarah K.</h3>
                  <p className="text-xs text-gray-400">Columbia Law '23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 border-t border-gray-800 bg-gradient-to-b from-[#121218] to-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Everything you need to know about our service
          </p>

          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-6">
              <h3 className="text-lg font-medium mb-2">
                Is this service legal?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, our service is completely legal. We provide study materials
                and practice exams to help you prepare for the bar exam.
              </p>
            </div>

            <div className="border-b border-gray-800 pb-6">
              <h3 className="text-lg font-medium mb-2">
                How effective are your study materials?
              </h3>
              <p className="text-gray-400 text-sm">
                Our study materials are designed by legal experts and have
                helped thousands of students pass the bar exam on their first
                attempt.
              </p>
            </div>

            <div className="border-b border-gray-800 pb-6">
              <h3 className="text-lg font-medium mb-2">
                Can I access the materials on multiple devices?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, you can access your study materials on any device with an
                internet connection.
              </p>
            </div>

            <div className="border-b border-gray-800 pb-6">
              <h3 className="text-lg font-medium mb-2">
                Is my payment information secure?
              </h3>
              <p className="text-gray-400 text-sm">
                We use industry-standard encryption to protect your payment
                information and ensure your data is secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 border-t border-gray-800 text-center bg-gradient-to-b from-[#0a0a0f] to-[#000000]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider mb-2 text-gray-400">
            THE FUTURE OF BAR EXAM PREP
          </p>
          <h2 className="text-3xl font-bold mb-6">
            Ready to pass the bar exam
            <br />
            with confidence?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join thousands of aspiring lawyers who trust BarExamPrep to help
            them achieve their goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md text-sm font-medium">
                Get Started Now
              </button>
            </Link>
            <Link href="/subscription">
              <button className="border border-gray-700 text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm font-medium">
                View Pricing Plans
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="mr-2">
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">
              BarExamPrep is the ultimate tool for bar exam success.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-800 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>© 2024 BarExamPrep - All rights reserved</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
