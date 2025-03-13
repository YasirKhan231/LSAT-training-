// components/GoogleSignIn.tsx
"use client"; // Mark as a Client Component

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function GoogleSignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after sign-in
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
}
