"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  Sparkles,
  Flame,
  Menu,
  CheckCircle,
  Shield,
  BarChart,
  BookOpen,
  Star,
  ArrowRight,
  ChevronDown,
  Gavel,
  Scale,
  Landmark,
  Bookmark,
  BookText,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 19,
    minutes: 7,
    seconds: 38,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };

        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0)
          return { ...prev, minutes: newMinutes, seconds: 59 };

        const newHours = prev.hours - 1;
        if (newHours >= 0)
          return { ...prev, hours: newHours, minutes: 59, seconds: 59 };

        const newDays = prev.days - 1;
        if (newDays >= 0)
          return { days: newDays, hours: 23, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "What do I get access to exactly?",
      answer:
        "You'll get access to our AI-powered platform that helps you prepare for the bar exam with comprehensive study materials, practice exams, and personalized feedback. Our system adapts to your learning style and focuses on areas where you need the most improvement.",
    },
    {
      question: "How many practice exams are included?",
      answer:
        "We have over 50+ full-length practice exams covering all subjects tested on the bar exam. Each exam is designed to simulate the actual testing experience with realistic questions and time constraints.",
    },
    {
      question: "How does the personalized study plan work?",
      answer:
        "Our AI analyzes your performance on diagnostic tests and practice exams to identify your strengths and weaknesses. It then creates a customized study schedule that prioritizes the areas where you need the most improvement, ensuring efficient and effective preparation.",
    },
    {
      question: "Is there a guarantee I'll pass the bar exam?",
      answer:
        "While we can't guarantee everyone will pass, our program has a 92% success rate for first-time test takers who complete our recommended study plan. If you don't pass, we offer extended access to our platform at no additional cost until you do.",
    },
    {
      question: "What subjects are covered?",
      answer:
        "Our platform covers all subjects tested on the bar exam, including Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, Torts, and more. We also provide specialized materials for state-specific portions of the exam.",
    },
    {
      question: "Do you offer live instruction?",
      answer:
        "Yes, we offer weekly live webinars with experienced bar exam instructors who can answer your questions in real-time. These sessions are recorded and available for replay if you can't attend live.",
    },
    {
      question: "How long before the exam should I start studying?",
      answer:
        "For optimal results, we recommend starting your preparation 3-6 months before your exam date. This gives you enough time to thoroughly review all subjects, complete practice exams, and address any weak areas without feeling rushed.",
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const countdownItemVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className={`py-5 px-4 text-black md:px-8 fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex items-center">
                <Gavel className="h-6 w-6 mr-2 text-black" />
                <span className="font-instrument">LexPrep</span>
              </div>
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-sm flex items-center group">
              <span className="w-5 h-5 mr-2 opacity-70 group-hover:text-black transition-colors">
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
              <span className="relative overflow-hidden group-hover:text-black transition-colors">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link href="/login" className="text-sm flex items-center group">
              <span className="w-5 h-5 mr-2 opacity-70 group-hover:text-black transition-colors">
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
              <span className="relative overflow-hidden group-hover:text-black transition-colors">
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link
              href="/subscription"
              className="text-sm flex items-center group"
            >
              <span className="w-5 h-5 mr-2 opacity-70 group-hover:text-black transition-colors">
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
              <span className="relative overflow-hidden group-hover:text-black transition-colors">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
          <Link href="/login" className="hidden md:block">
            <motion.button
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-black shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </Link>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white shadow-lg mt-2 p-4 rounded-md absolute left-4 right-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-black transition-colors py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-black transition-colors py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/subscription"
                  className="text-gray-800 hover:text-black transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="text-black relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Countdown Timer */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="bg-white backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <Flame className="h-5 w-5 text-black" />
            <span className="text-sm font-medium">Launch Event Ends</span>
            <motion.div
              className="flex space-x-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={countdownItemVariant}
                className="bg-black text-white rounded-md px-2 py-1 text-sm font-bold"
              >
                {countdown.days}
                <span className="text-xs font-normal ml-1">d</span>
              </motion.div>
              <motion.span variants={countdownItemVariant}>:</motion.span>
              <motion.div
                variants={countdownItemVariant}
                className="bg-black text-white rounded-md px-2 py-1 text-sm font-bold"
              >
                {String(countdown.hours).padStart(2, "0")}
                <span className="text-xs font-normal ml-1">h</span>
              </motion.div>
              <motion.span variants={countdownItemVariant}>:</motion.span>
              <motion.div
                variants={countdownItemVariant}
                className="bg-black text-white rounded-md px-2 py-1 text-sm font-bold"
              >
                {String(countdown.minutes).padStart(2, "0")}
                <span className="text-xs font-normal ml-1">m</span>
              </motion.div>
              <motion.span variants={countdownItemVariant}>:</motion.span>
              <motion.div
                variants={countdownItemVariant}
                className="bg-black text-white rounded-md px-2 py-1 text-sm font-bold"
              >
                {String(countdown.seconds).padStart(2, "0")}
                <span className="text-xs font-normal ml-1">s</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="text-black max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-instrument text-black text-5xl md:text-7xl font-normal leading-tight mb-6">
              Bar Exam Preparation
              <br />
              <motion.span
                className="relative inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                The Ultimate Guide to{" "}
                <span className="text-black relative font-instrument italic ">
                  Bar Exam Success
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </span>
              </motion.span>
            </h1>
            <motion.p
              className="text-gray-800 text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              Comprehensive study materials, practice exams, and expert guidance
              to help you achieve your best score on the bar exam.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center items-center my-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p className="text-lg flex items-center bg-white backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-gray-200">
              The first{" "}
              <motion.span
                className="inline-block bg-black text-white rounded-md px-3 py-1 text-sm mx-2 font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                AI Agents
              </motion.span>{" "}
              to automate preparation
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <motion.button
              className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full flex items-center mb-4 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              <Link href="/login" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.button>

            <motion.div
              className="flex items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gray-${
                      300 + i * 100
                    } border-2 border-white shadow-md`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
                  />
                ))}
              </div>
              <motion.span
                className="ml-3 text-sm bg-white backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.3 }}
              >
                <span className="font-bold">300+</span> Successful Students
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            onClick={() =>
              featuresRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="text-sm text-gray-500 mb-2">
              Scroll to explore
            </span>
            <ChevronDown className="h-6 w-6 text-black" />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <section
        ref={featuresRef}
        className="py-24 px-4 text-black relative overflow-hidden bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-black mb-3 bg-gray-100 px-4 py-1 rounded-full">
              ADVANCED FEATURES
            </span>
            <h2 className="font-instrument text-4xl md:text-5xl font-normal mb-6 text-center leading-tight">
              Advanced Study Features
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Our technology uses proprietary methods to transform complex legal
              concepts while preserving clarity and comprehension.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Features Section 1 */}
            <motion.div
              className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group hover:border-gray-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mb-6 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-2xl text-black group-hover:bg-gray-200 transition-colors"
                whileHover={{ rotate: 5 }}
              >
                <Shield className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-black transition-colors">
                Comprehensive Study Plans
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Tailored study plans designed to cover all areas of the bar
                exam, ensuring you're fully prepared for every section.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Customized schedules based on your strengths</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time progress tracking and adjustments</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group hover:border-gray-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mb-6 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-2xl text-black group-hover:bg-gray-200 transition-colors"
                whileHover={{ rotate: 5 }}
              >
                <BarChart className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-black transition-colors">
                Full-Length Mock Exams
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Practice with realistic simulations of the actual bar exam under
                timed conditions with high-quality questions.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Timed practice sessions with realistic conditions</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-500" />
                  <span>Detailed performance analytics and insights</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group hover:border-gray-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mb-6 w-16 h-16 flex items-center justify-center bg-gray-100 rounded-2xl text-black group-hover:bg-gray-200 transition-colors"
                whileHover={{ rotate: 5 }}
              >
                <BookOpen className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-black transition-colors">
                Interactive Legal Modules
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Master challenging legal concepts with our visual, interactive
                learning modules designed by experts.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Visual case studies and concept mapping</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Step-by-step explanations with examples</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        ref={howItWorksRef}
        className="py-24 px-4 border-t border-gray-100 bg-gray-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 right-20">
            <Scale className="w-32 h-32 text-gray-400" />
          </div>
          <div className="absolute bottom-20 left-20">
            <Landmark className="w-32 h-32 text-gray-400" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-black mb-3 bg-gray-100 px-4 py-1 rounded-full">
              OUR PROCESS
            </span>
            <h2 className="font-instrument text-4xl md:text-5xl font-normal mb-8 text-center leading-tight text-black">
              How Our Bar Prep Works
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              A simple step-by-step process to help you succeed on your bar exam
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Process connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gray-300 z-0"></div>

            <motion.div className="text-center relative z-10" variants={fadeIn}>
              <motion.div
                className="w-16 h-16 rounded-full bg-black border-4 border-gray-100 flex items-center justify-center text-xl font-bold text-white mx-auto mb-8 shadow-lg"
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                1
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-black">
                Assessment
              </h3>
              <p className="text-gray-600 text-base">
                Start with a diagnostic test to identify your strengths and
                weaknesses in bar exam subjects.
              </p>
            </motion.div>

            <motion.div className="text-center relative z-10" variants={fadeIn}>
              <motion.div
                className="w-16 h-16 rounded-full bg-black border-4 border-gray-100 flex items-center justify-center text-xl font-bold text-white mx-auto mb-8 shadow-lg"
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                2
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-black">
                Training
              </h3>
              <p className="text-gray-600 text-base">
                Focus on areas that need improvement with tailored study
                materials and expert guidance.
              </p>
            </motion.div>

            <motion.div className="text-center relative z-10" variants={fadeIn}>
              <motion.div
                className="w-16 h-16 rounded-full bg-black border-4 border-gray-100 flex items-center justify-center text-xl font-bold text-white mx-auto mb-8 shadow-lg"
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.4,
                }}
              >
                3
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-black">
                Practice
              </h3>
              <p className="text-gray-600 text-base">
                Take full-length practice exams and review detailed explanations
                to reinforce your learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-24 px-4 border-t border-gray-100 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-semibold text-black mb-3 bg-gray-100 px-4 py-1 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="font-instrument text-4xl md:text-5xl font-normal mb-8 text-center leading-tight text-black">
              What Our Users Say
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              Join thousands of aspiring lawyers who trust LexPrep to help them
              pass the bar exam
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all relative"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-5 left-8 bg-gray-100 p-2 rounded-full">
                <Gavel className="h-5 w-5 text-black" />
              </div>
              <div className="flex mb-4 mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-base mb-6 italic">
                "LexPrep has been a game changer for my studies. The
                comprehensive study materials and mock exams helped me pass the
                bar exam on my first attempt!"
              </p>
              <div className="flex items-center">
                <div className="text-black">
                  <h3 className="text-sm font-semibold">Benjamin Chen</h3>
                  <p className="text-xs text-gray-500">Harvard Law '24</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all relative"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-5 left-8 bg-gray-100 p-2 rounded-full">
                <Scale className="h-5 w-5 text-black" />
              </div>
              <div className="flex mb-4 mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-base mb-6 italic">
                "The practice exams were incredibly realistic and helped me
                build the confidence I needed to succeed. I highly recommend
                LexPrep to anyone preparing for the bar exam."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-3 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Gabriele Muratori"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-black">
                  <h3 className="text-sm font-semibold">Gabriele Muratori</h3>
                  <p className="text-xs text-gray-500">Columbia Law '23</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all relative"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -top-5 left-8 bg-gray-100 p-2 rounded-full">
                <Landmark className="h-5 w-5 text-black" />
              </div>
              <div className="flex mb-4 mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-base mb-6 italic">
                "As a working professional, I needed a flexible study solution.
                LexPrep provided exactly what I needed with their on-demand
                resources and personalized study plan."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-3 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Kyle"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-black">
                  <h3 className="text-sm font-semibold">Kyle Thompson</h3>
                  <p className="text-xs text-gray-500">NYU Law '23</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >

            <h2 className="font-instrument text-4xl font-normal mb-8 text-center text-black">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                variants={fadeIn}
              >
                <motion.button
                  className="flex justify-between items-center w-full text-left p-6"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                >
                  <h3 className="text-lg font-medium text-black">
                    {item.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus
                      className={`h-6 w-6 ${
                        openFaq === index ? "text-black" : "text-gray-400"
                      }`}
                    />
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 border-t border-gray-100 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <p className="text-xs uppercase tracking-wider mb-2 text-black font-semibold">
              THE FUTURE OF BAR EXAM PREP
            </p>
            <h2 className="font-instrument text-black text-4xl md:text-5xl font-normal mb-8 text-center leading-tight">
              Ready to pass the bar exam
              <br />
              with confidence?
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Join thousands of aspiring lawyers who trust LexPrep to help them
              achieve their goals.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <Link href="/login">
                  <motion.button
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Link href="/subscription">
                  <motion.button
                    className="border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 px-8 py-4 rounded-full text-base font-medium shadow-sm hover:shadow-md transition-all w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Pricing Plans
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div
              className="mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="font-instrument text-black text-2xl font-normal mb-2 inline-block"
              >
                <div className="flex items-center">
                  <Gavel className="h-6 w-6 mr-2" />
                  LexPrep
                </div>
              </Link>
              <p className="text-gray-600 text-sm mt-2 max-w-xs">
                A comprehensive bar exam preparation platform designed to help
                you succeed.
              </p>
            </motion.div>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="#" aria-label="Twitter">
                <motion.div
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-md"
                  whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="18"
                    height="18"
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
                </motion.div>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <motion.div
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-md"
                  whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="18"
                    height="18"
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
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 LexPrep - All rights reserved
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-black transition-colors mb-2 md:mb-0"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-black transition-colors mb-2 md:mb-0"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-black transition-colors mb-2 md:mb-0"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}