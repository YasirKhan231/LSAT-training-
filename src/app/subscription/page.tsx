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
      <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-black mb-4">
              Upgrade Your BAR Preparation
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-black">
              Get unlimited access to AI-powered BAR training tools and
              personalized study plans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-[#1a1a1f] bg-white  shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-black">Free</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-black">$0</span>
                  <span className="text-slate-500 ml-1">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Limited question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">1 simulated BAR exam</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Basic performance tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                    <span className="text-black">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                    <span className="text-black">Personalized study plans</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-[#1a1a1f]  text-white"
                  disabled
                >
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            {/* Weekly Plan */}
            <Card className="border-[#1a1a1f]/50 shadow-xl bg-white  backdrop-blur-sm relative">
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <Badge className="bg-gradient-to-r from-[#121218] to-[#1a1a1f] text-white border-none">
                  POPULAR
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Weekly Access
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-black">$19.99</span>
                  <span className="text-slate-500 ml-1">/week</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Full question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Unlimited simulated BAR exams
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Advanced analytics & progress tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">Personalized study plans</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full hover:from-[#1a1a1f] hover:to-[#1a1a1f] text-white border-none"
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
            <Card className="border-[#1a1a1f] bg-white  shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-black">
                  Full Access
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-black">$199</span>
                  <span className="text-slate-500 ml-1">/one-time</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Full question bank access
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-black">
                      Unlimited simulated BAR exams
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500  mr-2 shrink-0" />
                    <span className="text-black">
                      Advanced analytics & progress tracking
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500  mr-2 shrink-0" />
                    <span className="text-black">
                      AI explanations and tutoring
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500  mr-2 shrink-0" />
                    <span className="text-black">Personalized study plans</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500  mr-2 shrink-0" />
                    <span className="font-medium text-black">
                      Lifetime access
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-[#121218] to-[#1a1a1f] hover:from-[#1a1a1f] hover:to-[#1a1a1f] text-white border-none"
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
            <h2 className="text-2xl font-bold text-black mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-black">
              If you're not satisfied with your subscription within the first 7
              days, we'll provide a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
