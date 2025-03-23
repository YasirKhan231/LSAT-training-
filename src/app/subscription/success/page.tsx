"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../../components/ProtectRoute";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SubscriptionSuccessPage() {
  const router = useRouter();

  // In a real app, you would verify the payment status server-side
  useEffect(() => {
    // Update user subscription status in your context/state management
    // This would typically be handled by a webhook in production
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-900/30 mb-6 border border-indigo-500/30">
            <CheckCircle className="h-10 w-10 text-indigo-400" />
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-4">
            Subscription Successful!
          </h1>

          <p className="text-lg text-slate-400 mb-8">
            Thank you for upgrading to premium. You now have full access to all
            BAR training features.
          </p>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg mb-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-indigo-300 mb-2">
              What's Next?
            </h2>
            <p className="text-slate-300 mb-4">
              Here are some premium features you can now explore:
            </p>
            <ul className="text-left text-slate-300 space-y-2 max-w-lg mx-auto mb-4">
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2">•</span>
                <span>Take unlimited full-length simulated BAR exams</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2">•</span>
                <span>
                  Explore the complete question bank with AI explanations
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 font-bold mr-2">•</span>
                <span>
                  Generate a personalized study plan based on your performance
                </span>
              </li>
            </ul>
          </div>

          <div className="space-x-4">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-none">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/practice/mock-exam">
              <Button
                variant="outline"
                className="border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-300"
              >
                Take a Full-Length Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
