"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUser } from "../lib/context/UserContext";
import {
  Home,
  BookOpen,
  BarChart,
  Brain,
  GraduationCap,
  LogOut,
  X,
  Scale,
  ScrollText,
  Crown,
  ChevronDown,
  ChevronRight,
  FileText,
  PenTool,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Sidebar({ isOpen, onClose, onOpen }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const {
    isLoggedIn: userLoggedIn,
    isSubscriptionActive,
    subscriptionTier,
  } = useUser();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/practice/mock-exam", label: "Mock Exams", icon: BarChart },
    { href: "/question-bank", label: "Question Bank", icon: BookOpen },
    {
      href: "/practice/writing", // Direct link to Writing Practice
      label: "Writing Practice",
      icon: PenTool,
    },
    {
      href: "/case-study",
      label: "Case Studies",
      icon: Scale,
      children: [
        {
          href: "/case-study/briefing",
          label: "Case Briefing",
          icon: ScrollText,
        },
        { href: "/case-study/analysis", label: "Legal Analysis", icon: Brain },
      ],
    },
    { href: "/plan", label: "Study Plan", icon: Brain },
    { href: "/plan/ai-coach", label: "AI Coach", icon: GraduationCap },
    {
      href: "/subscription",
      label: "Payment",
      icon: CreditCard,
    },
  ];

  const overlay = isMobile && isOpen && (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={onClose}
    />
  );

  return (
    <>
      {overlay}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 overflow-hidden flex flex-col border-r border-[#1a1a1f]`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-[#1a1a1f]">
          {/* Mobile Header (hidden on md and above) */}
          <div className="flex items-center justify-between md:hidden">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={isMobile ? onClose : undefined}
            >
              <span className="text-xl font-bold text-white">BAR Training</span>
            </Link>
            {isMobile && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#1a1a1f]"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
          {/* Desktop Header (visible on md and above) */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">BAR Training</span>
            </Link>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <div>
                    <div
                      className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-[#1a1a1f] text-white"
                          : "text-gray-300 hover:bg-[#1a1a1f]"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center flex-1"
                        onClick={isMobile ? onClose : undefined}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.href);
                        }}
                        className="p-1 hover:bg-[#1a1a1f] rounded-lg"
                      >
                        {expandedItems.includes(item.href) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {expandedItems.includes(item.href) && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                pathname === child.href
                                  ? "bg-[#1a1a1f] text-white"
                                  : "text-gray-300 hover:bg-[#1a1a1f]"
                              }`}
                              onClick={isMobile ? onClose : undefined}
                            >
                              <child.icon className="h-4 w-4 mr-3" />
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      pathname === item.href
                        ? "bg-[#1a1a1f] text-white"
                        : "text-gray-300 hover:bg-[#1a1a1f]"
                    }`}
                    onClick={isMobile ? onClose : undefined}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[#1a1a1f] p-4">
          {isSubscriptionActive && (
            <div className="mb-4">
              <div className="flex items-center px-4 py-2 bg-[#1a1a1f] rounded-lg border border-[#2a2a2f]">
                <Crown className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-white">
                  {subscriptionTier === "one-time"
                    ? "Premium"
                    : "Weekly Premium"}
                </span>
              </div>
            </div>
          )}

          {userLoggedIn ? (
            <div className="space-y-3">
              <div className="px-4 py-2">
                <p className="text-sm text-gray-400 truncate bg-[#1a1a1f] p-2 rounded">
                  {auth.currentUser?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-center bg-[#1a1a1f] text-white rounded-lg transition-colors duration-200 hover:bg-red-900 hover:text-white border border-[#2a2a2f]"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="text-center">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="block w-full px-4 py-2 text-sm text-center text-white bg-[#1a1a1f] border border-[#2a2a2f] rounded-lg hover:bg-[#2a2a2f] transition-colors duration-200"
                onClick={isMobile ? onClose : undefined}
              >
                Login
              </Link>
              <Link
                href="/Signup"
                className="block w-full px-4 py-2 text-sm text-center text-white bg-[#1a1a1f] rounded-lg hover:bg-[#2a2a2f] transition-colors duration-200"
                onClick={isMobile ? onClose : undefined}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
