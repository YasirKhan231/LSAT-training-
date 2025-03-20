"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white ">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-800">
              BAR Training
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/login"
              className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-blue-800 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-blue-800 hover:bg-blue-600 hover:text-white"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/Signup">
              <Button className="bg-white text-blue-800 hover:bg-blue-600 hover:text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
