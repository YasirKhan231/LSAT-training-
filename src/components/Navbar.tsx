"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "../lib/context/UserContext";
import { Crown } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn: userLoggedIn, isSubscriptionActive, subscriptionTier } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const subscriptionBadge = () => {
    if (!userLoggedIn) return null;
    
    if (isSubscriptionActive) {
      return (
        <Link 
          href="/subscription" 
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-amber-300 to-amber-500 text-white font-medium"
        >
          <Crown className="h-4 w-4 mr-1" />
          {subscriptionTier === "one-time" ? "Premium" : "Weekly Premium"}
        </Link>
      );
    }
    
    return (
      <Link 
        href="/subscription" 
        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
      >
        Upgrade
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                LSAT Training
              </Link>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Home
              </Link>
              {userLoggedIn && (
                <>
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/dashboard"
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/practise/mock-exam"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname.startsWith("/practise/mock-exam")
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Practice
                  </Link>
                  <Link
                    href="/practise/logic-games"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/practise/logic-games"
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Logic Games
                  </Link>
                  {/* Plan Link (Desktop) */}
                  <Link
                    href="/plan"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/plan"
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Plan
                  </Link>
                  {/* Question Bank Link (Desktop) */}
                  <Link
                    href="/question-bank"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/question-bank"
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Question Bank
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* Desktop Auth Links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {subscriptionBadge()}
            {userLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {auth.currentUser?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === "/"
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              Home
            </Link>
            {userLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === "/dashboard"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/practise/mock-exam"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname.startsWith("/practise/mock-exam")
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  Practice
                </Link>
                <Link
                  href="/practise/logic-games"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === "/practise/logic-games"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  Logic Games
                </Link>
                {/* Plan Link (Mobile) */}
                <Link
                  href="/plan"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === "/plan"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  Plan
                </Link>
                {/* Question Bank Link (Mobile) */}
                <Link
                  href="/question-bank"
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === "/question-bank"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  Question Bank
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {userLoggedIn ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {auth.currentUser?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {auth.currentUser?.displayName || "User"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {auth.currentUser?.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Logout</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
