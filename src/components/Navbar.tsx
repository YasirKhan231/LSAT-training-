"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useUser } from "../lib/context/UserContext";
import { Crown, FileText, PenTool, X, Menu } from "lucide-react";

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
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-amber-800 to-amber-600 text-amber-300 font-medium"
        >
          <Crown className="h-4 w-4 mr-1" />
          {subscriptionTier === "one-time" ? "Premium" : "Weekly Premium"}
        </Link>
      );
    }

    return (
      <Link
        href="/subscription"
        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#1a1a1f] text-gray-300 font-medium hover:bg-[#2a2a2f]"
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
      href: "/practice/mock-exam",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Logic Games",
      href: "/practice/logic-games",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Writing Practice",
      href: "/practice/writing",
      icon: <PenTool className="h-5 w-5" />,
      subItems: [
        {
          title: "Essay Practice",
          href: "/practice/writing/essay",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Performance Test",
          href: "/practice/writing/performance-test",
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
    <nav className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] shadow-sm border-b border-[#1a1a1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Prep For Law</span>
            </Link>
            {userLoggedIn && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigationItems.map((item) => (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === item.href
                          ? "border-gray-500 text-white"
                          : "border-transparent text-gray-400 hover:border-[#2a2a2f] hover:text-gray-300"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>

                    {item.subItems && (
                      <div className="absolute left-0 mt-2 w-48 bg-[#121218] rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-[#1a1a1f]">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm ${
                              pathname === subItem.href
                                ? "bg-[#1a1a1f] text-gray-300"
                                : "text-gray-300 hover:bg-[#1a1a1f]"
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
          <div className="flex items-center">
            {subscriptionBadge()}
            <div className="ml-4 sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-[#1a1a1f]"
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
                      ? "bg-[#1a1a1f] text-gray-300"
                      : "text-gray-300 hover:bg-[#1a1a1f]"
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
                            ? "bg-[#1a1a1f] text-gray-300"
                            : "text-gray-400 hover:bg-[#1a1a1f]"
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
