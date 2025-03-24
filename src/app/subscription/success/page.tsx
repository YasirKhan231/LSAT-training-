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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#121218]/30 mb-6 border border-[#1a1a1f]/30">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-4">
            Subscription Successful!
          </h1>

          <p className="text-lg text-white mb-8">
            Thank you for upgrading to premium. You now have full access to all
            BAR training features.
          </p>

          <div className="bg-[#121218]/50 border border-[#1a1a1f] p-6 rounded-lg mb-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-2">What's Next?</h2>
            <p className="text-white mb-4">
              Here are some premium features you can now explore:
            </p>
            <ul className="text-left text-white space-y-2 max-w-lg mx-auto mb-4">
              <li className="flex items-start">
                <span className="text-white font-bold mr-2">•</span>
                <span>Take unlimited full-length simulated BAR exams</span>
              </li>
              <li className="flex items-start">
                <span className="text-white font-bold mr-2">•</span>
                <span>
                  Explore the complete question bank with AI explanations
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-white font-bold mr-2">•</span>
                <span>
                  Generate a personalized study plan based on your performance
                </span>
              </li>
            </ul>
          </div>

          <div className="space-x-4">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-[#121218] to-[#1a1a1f] hover:from-[#1a1a1f] hover:to-[#1a1a1f] text-white border-none">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/practice/mock-exam">
              <Button
                variant="outline"
                className="border-[#1a1a1f] bg-[#121218]/50 hover:bg-[#1a1a1f] text-white"
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
