"use client";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import LoginForm from "../../../components/LoginForm";
import GoogleSignIn from "../../../components/GoogleSignin";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white text-black overflow-hidden">
        {/* Subtle Geometric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-90">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10" />
        </div>

        {/* Modern Accent Elements */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 blur-xl opacity-40"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 blur-xl opacity-40"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Content */}
        <motion.div
          className="relative flex flex-col justify-center p-12 z-10"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Logo */}
          <motion.div className="flex items-center mb-12" variants={item}>
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="ml-4 text-3xl font-bold">Prep For Law</span>
          </motion.div>

          <motion.h2 className="text-4xl font-bold mb-6" variants={item}>
            Securely Access Your Account
          </motion.h2>
          <motion.p className="text-xl text-gray-600 mb-12" variants={item}>
            Join thousands of students who have improved their BAR exam scores
            with our AI-powered platform.
          </motion.p>

          <motion.div className="grid gap-6" variants={container}>
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <h3 className="font-semibold text-xl mb-2">
                AI-Powered Learning
              </h3>
              <p className="text-gray-600">
                Get personalized study plans and real-time feedback tailored to
                your needs.
              </p>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-4" variants={container}>
              <motion.div
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold mb-1 text-black">93%</div>
                <p className="text-gray-600">Score improvement</p>
              </motion.div>
              <motion.div
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold mb-1 text-black">5,000+</div>
                <p className="text-gray-600">Practice questions</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold text-black">
                Prep For Law
              </span>
            </Link>
          </div>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h1 className="text-2xl font-bold text-black">
              Securely Access Your Account
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <LoginForm />
          </motion.div>

          <motion.div
            className="relative my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <GoogleSignIn />
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-between text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Link
              href="/"
              className="text-gray-600 hover:text-black flex items-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <p className="text-gray-600">
              Need an account?{" "}
              <Link
                href="/Signup"
                className="font-medium text-black hover:text-gray-800 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
