"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useUser } from "@/lib/context/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PremiumFeatureProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function PremiumFeature({
  children,
  fallback,
}: PremiumFeatureProps) {
  const { isSubscriptionActive } = useUser();

  if (isSubscriptionActive) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Card className="p-6 text-center bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] border-[#1a1a1f]">
      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a1f]/20 mb-4">
        <Crown className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">Premium Feature</h3>
      <p className="text-gray-400 mb-4">
        This feature is available exclusively to premium subscribers.
      </p>
      <Link href="/subscription">
        <Button className="bg-[#1a1a1f] hover:bg-[#2a2a2f] text-white">
          Upgrade Now
        </Button>
      </Link>
    </Card>
  );
}
