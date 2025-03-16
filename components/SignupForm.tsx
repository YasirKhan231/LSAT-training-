"use client"; // Mark as a Client Component

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Import Firestore (db) from your Firebase config
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
          authProvider: null,
          lsatTestDate: null,
          targetScore: null,
          currentScore: null,
          updatedAt: null,
          StudyStreak: 0,
          PracticeQuestions: 0,
          preferredSchedule: null,
          weeklyHours: null,
          lsatPreparationMaterial: null,
          additionalInformation: null,
          progress: {
            logicalReasoning: 0,
            analyticalReasoning: 0,
            readingComprehension: 0,
            totalTimeSpent: 0,
            testAttempts: 0,
            lastUpdated: null,
          },
          performanceInsights: [],
          practiceHistory: [],
          bookmarkedQuestions: [],
          simulatedExams: [],
          logicGames: [],
          plan: [],
          studyPlan: {
            today: [],
            weekly: [],
            monthly: [],
            lastUpdated: null,
          },
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
    <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10 sm:max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Create your account
      </h2>
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field mt-1"
          />
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field mt-1"
          />
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
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
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
