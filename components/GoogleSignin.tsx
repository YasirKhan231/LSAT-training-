"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (!user) throw new Error("No user data received");

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If the user is new, store their details
        const userData = {
          userId: user.uid,
          email: user.email || "",
          name: user.displayName || "Anonymous",
          authProvider: "google", // Set authProvider to "google"
          subscription: "free", // Default to free plan
          lsatTestDate: null,
          targetScore: null,
          StudyStreak: 0,
          PracticeQuestions: 0,
          currentScore: null,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          onboarded: false, // User has not completed onboarding yet
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
        };

        await setDoc(userRef, userData);
        router.push("/onboarding"); // Redirect new users to onboarding
      } else {
        router.push("/dashboard"); // Redirect existing users to the dashboard
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Could not sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
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
            Signing in...
          </div>
        ) : (
          "Continue with Google"
        )}
      </button>

      {error && (
        <div className="mt-3 text-sm text-center text-red-600">{error}</div>
      )}
    </div>
  );
}
