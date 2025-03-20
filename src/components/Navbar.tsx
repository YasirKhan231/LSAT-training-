"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "../lib/context/UserContext";
import { Crown } from "lucide-react";
import { FileText, PenTool } from "lucide-react";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const {
    isLoggedIn: userLoggedIn,
    isSubscriptionActive,
    subscriptionTier,
  } = useUser();

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

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Crown className="h-5 w-5" />,
    },
    {
      title: "Practice",
      href: "/practise/mock-exam",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Logic Games",
      href: "/practise/logic-games",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Writing Practice",
      href: "/practise/writing",
      icon: <PenTool className="h-5 w-5" />,
      subItems: [
        {
          title: "Essay Practice",
          href: "/practise/writing/essay",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Performance Test",
          href: "/practise/writing/performance-test",
          icon: <FileText className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Plan",
      href: "/plan",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Question Bank",
      href: "/question-bank",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                BAR Training
              </span>
            </Link>
            {userLoggedIn && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === item.href
                          ? "border-blue-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>

                    {item.subItems && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm ${
                              pathname === subItem.href
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              {subItem.icon}
                              <span className="ml-2">{subItem.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </div>
                </Link>

                {item.subItems && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          pathname === subItem.href
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          {subItem.icon}
                          <span className="ml-2">{subItem.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
