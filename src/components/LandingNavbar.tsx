"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10 bg-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">BAR Training</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign in
              </Button>
            </Link>
            <Link href="/Signup">
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
