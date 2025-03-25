"use client"; // Mark as a Client Component

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import Firestore (db) from your Firebase config
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Lock,
} from "lucide-react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();

  // Password validation
  const hasMinLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const markFieldAsTouched = (field: keyof typeof formTouched) => {
    setFormTouched({ ...formTouched, [field]: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Mark all fields as touched for validation display
    setFormTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with the provided name
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      // Store user information in Firestore
      if (userCredential.user) {
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          uid: userCredential.user.uid,
          displayName: name,
          email: userCredential.user.email,
          createdAt: new Date().toISOString(),
          onboarded: false, // User has not completed onboarding yet
          subscription: "free", // Default to free plan

          // Set other fields to null or default values
          authProvider: "email",
          barExamTestDate: null,
          targetScore: null,
          currentScore: null,
          updatedAt: null,
          questionDataKey: null,
          StudyStreak: 0,
          PracticeQuestions: 0,
          preferredSchedule: null,
          weeklyHours: null,
          barExamPreparationMaterial: null,
          additionalInformation: null,
          progress: {
            constitutionalLaw: 0,
            contracts: 0,
            criminalLaw: 0,
            totalTimeSpent: 0,
            testAttempts: 0,
            lastUpdated: null,
          },
          performanceInsights: [],
          practiceHistory: [],
          bookmarkedQuestions: [],
          simulatedExams: [],
          essays: [],
          specificAreas: [],
          challengingAreas: [],
          payments: [],
        });
      }

      // Redirect to onboarding page
      router.push("/onboarding");
    } catch (error: unknown) {
      let errorMessage = "Failed to create account";
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email already in use";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak";
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-900/10 border-l-4 border-red-400 p-3 mb-4 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="name" className="text-xs font-medium text-gray-300">
              Full name
            </label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-500" />
            </div>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markFieldAsTouched("name")}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#121218] focus:border-[#121218] transition-all duration-200 bg-[#1a1d2a] text-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-300 mb-2"
          >
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markFieldAsTouched("email")}
              required
              className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-[#1a1d2a] text-white ${
                formTouched.email && !isValidEmail && email
                  ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : formTouched.email && isValidEmail && email
                  ? "border-green-400 focus:ring-green-500 focus:border-green-500"
                  : "border-gray-700 focus:ring-[#121218] focus:border-[#121218]"
              }`}
            />
            {formTouched.email && email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {isValidEmail ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
            )}
          </div>
          {formTouched.email && email && !isValidEmail && (
            <p className="mt-1 text-xs text-red-400">
              Please enter a valid email address
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-500" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markFieldAsTouched("password")}
              required
              className={`w-full pl-10 pr-10 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-[#1a1d2a] text-white ${
                formTouched.password && !hasMinLength && password
                  ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : formTouched.password && hasMinLength && password
                  ? "border-green-400 focus:ring-green-500 focus:border-green-500"
                  : "border-gray-700 focus:ring-[#121218] focus:border-[#121218]"
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex mt-1.5 space-x-4">
            <div
              className={`flex items-center ${
                hasMinLength
                  ? "text-green-400"
                  : formTouched.password
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              {hasMinLength ? (
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
              )}
              <span className="text-xs">Min 8 characters</span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-gray-300 mb-2"
          >
            Confirm password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-500" />
            </div>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => markFieldAsTouched("confirmPassword")}
              required
              className={`w-full pl-10 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 bg-[#1a1d2a] text-white ${
                formTouched.confirmPassword && confirmPassword
                  ? passwordsMatch
                    ? "border-green-400 focus:ring-green-500 focus:border-green-500"
                    : "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-700 focus:ring-[#121218] focus:border-[#121218]"
              }`}
            />
            {formTouched.confirmPassword && confirmPassword && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {passwordsMatch ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
            )}
          </div>

          {formTouched.confirmPassword &&
            confirmPassword &&
            !passwordsMatch && (
              <p className="mt-1 text-xs text-red-400">Passwords don't match</p>
            )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#0a0a0f] via-[#121218] to-[#0a0a0f] hover:from-[#0a0a0f] hover:via-[#181820] hover:to-[#0a0a0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#121218] shadow-sm hover:shadow transition-all duration-200 border border-gray-700/30"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </div>
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-gray-300 hover:text-white"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
