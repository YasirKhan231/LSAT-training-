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
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-6 border border-gray-200">
            <CheckCircle className="h-10 w-10 text-black" />
          </div>

          <h1 className="text-3xl font-extrabold text-black mb-4">
            Subscription Successful!
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Thank you for upgrading to premium. You now have full access to all
            BAR training features.
          </p>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-black mb-2">What's Next?</h2>
            <p className="text-gray-700 mb-4">
              Here are some premium features you can now explore:
            </p>
            <ul className="text-left text-gray-700 space-y-2 max-w-lg mx-auto mb-4">
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>Take unlimited full-length simulated BAR exams</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>
                  Explore the complete question bank with AI explanations
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span>
                  Generate a personalized study plan based on your performance
                </span>
              </li>
            </ul>
          </div>

          <div className="space-x-4">
            <Link href="/dashboard">
              <Button className="bg-black text-white hover:bg-gray-800 border-none">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/practice/mock-exam">
              <Button
                variant="outline"
                className="border-gray-300 bg-white hover:bg-gray-100 text-black"
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
