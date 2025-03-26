"use client";

import Link from "next/link";
import "./globals.css";
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
import Kyle from "../../public/Kyle.png";
import gabriele from "../../public/gabriele.png";
import Benjamin from "../../public/benjamin.png";
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
    <div className="min-h-screen bg-[#0a0c14] text-white">
      {/* Navbar */}
      <nav className="py-5 px-4 md:px-8 border-b border-gray-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-semibold">
            BarExamPrep
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white text-sm flex items-center"
            >
              <span className="w-5 h-5 mr-2 opacity-70">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white text-sm flex items-center"
            >
              <span className="w-5 h-5 mr-2 opacity-70">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14s1.5 2 4 2 4-2 4-2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9h.01M15 9h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Login
            </Link>
            <Link
              href="/subscription"
              className="text-gray-300 hover:text-white text-sm flex items-center"
            >
              <span className="w-5 h-5 mr-2 opacity-70">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Pricing
            </Link>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/login" className="hidden md:block">
            <button className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium">
              Sign in
            </button>
          </Link>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0e1018]/90 backdrop-blur-sm mt-2 p-4 rounded-md">
            <div className="flex flex-col space-y-3">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
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
      <section className="pt-20 pb-32 px-4 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,33,52,0.8)_0%,rgba(10,12,20,0)_70%)]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block text-gray-400 text-sm mb-3">
            Bar Exam Preparation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            The Ultimate Guide to
            <br />
            <span className="text-gray-400">Bar Exam Success</span>
          </h1>
          <div className="h-8 flex items-center justify-center mb-6">
            <p className="text-lg text-gray-200 font-medium">
              {text}
              <span className="inline-block h-[22px] w-[2px] bg-white mx-1 mt-1 animate-pulse"></span>
            </p>
          </div>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Comprehensive study materials, practice exams, and expert guidance
            to help you achieve your best score on the bar exam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="bg-[#1a1f2e] hover:bg-[#252b3d] border border-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium flex items-center justify-center group w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/subscription">
              <button className="border border-gray-700 text-white hover:bg-white/5 px-6 py-3 rounded-md text-sm font-medium w-full sm:w-auto">
                View Pricing
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#0a0c14] border-t border-gray-800/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Advanced Study Features
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            Our technology uses proprietary methods to transform complex legal
            concepts while preserving clarity and comprehension.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="mb-6 w-10 h-10 flex items-center justify-center">
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
            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="mb-6 w-10 h-10 flex items-center justify-center">
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
            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="mb-6 w-10 h-10 flex items-center justify-center">
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
      <section className="py-20 px-4 bg-[#0a0c14] border-t border-gray-800/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">
            How Our Bar Prep Works
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            A simple step-by-step process to help you succeed on your bar exam
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1f2e] border border-gray-700 flex items-center justify-center text-lg font-medium mx-auto mb-6">
                1
              </div>
              <h3 className="text-lg font-semibold mb-3">Assessment</h3>
              <p className="text-gray-400 text-sm">
                Start with a diagnostic test to identify your strengths and
                weaknesses in bar exam subjects.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1f2e] border border-gray-700 flex items-center justify-center text-lg font-medium mx-auto mb-6">
                2
              </div>
              <h3 className="text-lg font-semibold mb-3">Training</h3>
              <p className="text-gray-400 text-sm">
                Focus on areas that need improvement with tailored study
                materials and expert guidance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1f2e] border border-gray-700 flex items-center justify-center text-lg font-medium mx-auto mb-6">
                3
              </div>
              <h3 className="text-lg font-semibold mb-3">Practice</h3>
              <p className="text-gray-400 text-sm">
                Take full-length practice exams and review detailed explanations
                to reinforce your learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#0a0c14] border-t border-gray-800/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">
            What Our Users Say
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            Join thousands of aspiring lawyers who trust BarExamPrep to help
            them pass the bar exam
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="flex mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-300 text-sm mb-6">
                "BarExamPrep has been a game changer for my studies. The
                comprehensive study materials and mock exams helped me pass the
                bar exam on my first attempt!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                  <img
                    src={Benjamin.src}
                    alt="Benjamin Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Benjamin Chen</h3>
                  <p className="text-xs text-gray-400">Harvard Law '24</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="flex mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-300 text-sm mb-6">
                "The practice exams were incredibly realistic and helped me
                build the confidence I needed to succeed. I highly recommend
                BarExamPrep to anyone preparing for the bar exam."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                  <img
                    src={gabriele.src}
                    alt="Gabriele Muratori"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Gabriele Muratori</h3>
                  <p className="text-xs text-gray-400">Columbia Law '23</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0e1018] p-8 rounded-lg border border-gray-800/40">
              <div className="flex mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-300 text-sm mb-6">
                "As a working professional, I needed a flexible study solution.
                BarExamPrep provided exactly what I needed with their on-demand
                resources and personalized study plan."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                  <img
                    src={Kyle.src}
                    alt="Kyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Kyle</h3>
                  <p className="text-xs text-gray-400">NYU Law '23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[#0a0c14] border-t border-gray-800/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
            Everything you need to know about our service
          </p>

          <div className="space-y-6">
            <div className="bg-[#0e1018] p-6 rounded-lg border border-gray-800/40">
              <h3 className="text-lg font-medium mb-2">
                Is this service legal?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, our service is completely legal. We provide study materials
                and practice exams to help you prepare for the bar exam.
              </p>
            </div>

            <div className="bg-[#0e1018] p-6 rounded-lg border border-gray-800/40">
              <h3 className="text-lg font-medium mb-2">
                How effective are your study materials?
              </h3>
              <p className="text-gray-400 text-sm">
                Our study materials are designed by legal experts and have
                helped thousands of students pass the bar exam on their first
                attempt.
              </p>
            </div>

            <div className="bg-[#0e1018] p-6 rounded-lg border border-gray-800/40">
              <h3 className="text-lg font-medium mb-2">
                Can I access the materials on multiple devices?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes, you can access your study materials on any device with an
                internet connection.
              </p>
            </div>

            <div className="bg-[#0e1018] p-6 rounded-lg border border-gray-800/40">
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
      <section className="py-20 px-4 bg-[#0a0c14] border-t border-gray-800/40 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider mb-2 text-gray-400">
            THE FUTURE OF BAR EXAM PREP
          </p>
          <h2 className="text-4xl font-bold mb-6">
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
              <button className="bg-[#1a1f2e] hover:bg-[#252b3d] border border-gray-700 text-white px-6 py-3 rounded-md text-sm font-medium">
                Get Started Now
              </button>
            </Link>
            <Link href="/subscription">
              <button className="border border-gray-700 text-white hover:bg-white/5 px-6 py-3 rounded-md text-sm font-medium">
                View Pricing Plans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#0a0c14] border-t border-gray-800/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-white text-xl font-semibold">
                BarExamPrep
              </Link>
              <p className="text-gray-400 text-xs mt-2 max-w-xs">
                A comprehensive bar exam preparation platform designed to help
                you succeed.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <div className="w-8 h-8 rounded-full bg-[#1a1f2e] flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <div className="w-8 h-8 rounded-full bg-[#1a1f2e] flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 9h4v12H2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800/40 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-500">
              © 2024 BarExamPrep - All rights reserved
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-400">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-gray-400">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
