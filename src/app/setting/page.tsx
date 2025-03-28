"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    displayName: string | null;
    email: string | null;
  } | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  const handleSubscriptionRedirect = () => {
    router.push("/subscription");
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
          <p className="text-slate-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Account Information */}
        <Card className="bg-white border-[#1a1a1f] text-black mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={user.displayName || ""}
                className="bg-white border-[#1a1a1f] text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={user.email || ""}
                readOnly
                className="bg-white border-[#1a1a1f] text-black cursor-default opacity-70"
              />
            </div>
            <Separator className="my-4 bg-[#1a1a1f]" />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-factor Authentication</Label>
                  <p className="text-sm text-slate-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-white border-[#1a1a1f] text-black mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-slate-500">
                  Use dark theme across the application
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="my-4 bg-[#1a1a1f]" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-sm text-slate-500">
                  Display more content with less spacing
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Subscription Section - Updated to match width */}
        <Card className="bg-white border-[#1a1a1f] text-black">
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-500">
              Upgrade to a premium plan for exclusive features.
            </p>
            <Button
              onClick={handleSubscriptionRedirect}
              className="w-full bg-[#1a1a1f] hover:bg-gray-600 text-white"
            >
              View Subscription Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
