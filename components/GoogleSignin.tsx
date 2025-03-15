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
          name: user.displayName || "Anonymous",
          email: user.email || "",
          lsatDate: "2025-06-10",
          targetScore: 170,
          weeklyHours: 10,
          subscription: "free",
          progress: {
            logicalReasoning: 0,
            analyticalReasoning: 0,
            readingComprehension: 0,
          },
          practiceHistory: [],
          bookmarkedQuestions: [],
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
        {isLoading ? "Signing in..." : "Continue with Google"}
      </button>

      {error && (
        <div className="mt-3 text-sm text-center text-red-600">{error}</div>
      )}
    </div>
  );
}
