"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);

    try {
      // This would be replaced with actual payment processing logic
      // For example, redirecting to a Stripe checkout page
      console.log(`Processing subscription for plan: ${planId}`);

      // Mock implementation - you would replace this with actual Stripe redirect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // After successful payment, update user's subscription status in your database
      // and redirect to success page or dashboard
      router.push("/subscription/success");
    } catch (error) {
      console.error("Subscription error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-300 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Upgrade Your BAR Preparation
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-slate-400">
              Get unlimited access to AI-powered BAR training tools and
              personalized study plans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-slate-800 shadow-xl bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Free</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">$0</span>
                  <span className="text-slate-500 ml-1">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Limited question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">1 simulated BAR exam</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Basic performance tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-slate-700 mr-2 shrink-0" />
                    <span className="text-slate-500">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-slate-700 mr-2 shrink-0" />
                    <span className="text-slate-500">
                      Personalized study plans
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 bg-slate-800/50 text-slate-400"
                  disabled
                >
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* Weekly Plan */}
            <Card className="border-indigo-500/50 shadow-xl bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm relative">
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none">
                  POPULAR
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Weekly Access
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">$19.99</span>
                  <span className="text-slate-500 ml-1">/week</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Full question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Unlimited simulated BAR exams
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Advanced analytics & progress tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Personalized study plans
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-none"
                  onClick={() => handleSubscribe("weekly")}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedPlan === "weekly"
                    ? "Processing..."
                    : "Subscribe Weekly"}
                </Button>
              </CardFooter>
            </Card>

            {/* One-time Plan */}
            <Card className="border-slate-800 shadow-xl bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Full Access
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">$199</span>
                  <span className="text-slate-500 ml-1">/one-time</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Full question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Unlimited simulated BAR exams
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Advanced analytics & progress tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="text-slate-300">
                      Personalized study plans
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-400 mr-2 shrink-0" />
                    <span className="font-medium text-indigo-300">
                      Lifetime access
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-none"
                  onClick={() => handleSubscribe("one-time")}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedPlan === "one-time"
                    ? "Processing..."
                    : "Pay Once"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-slate-400">
              If you're not satisfied with your subscription within the first 7
              days, we'll provide a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
