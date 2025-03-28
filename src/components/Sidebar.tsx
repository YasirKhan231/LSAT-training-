"use client";
import { useEffect, useState } from "react";
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
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const pathname = usePathname();
  const {
    isLoggedIn: userLoggedIn,
    isSubscriptionActive,
    subscriptionTier,
  } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setShowLogoutConfirm(false);
    }
  };
  // Add this to your Sidebar component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
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
      href: "/practice/writing",
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
    { href: "/plan/ai-coach", label: "AI Coach", icon: GraduationCap },
    { href: "/setting", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Overlay (only for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white backdrop-blur-sm z-40 md:hidden"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-64 overflow-hidden flex flex-col border-r border-[#1a1a1f]`}
        style={{
          // Force re-render by adding a unique key based on isOpen
          // This is a nuclear option if transitions aren't working
          display: isOpen ? "flex" : "none",
        }}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-[#1a1a1f] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">Prep For Law</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Close button clicked"); // Debugging
              onClose?.(); // Safe call
            }}
            className="p-1 rounded-lg text-black hover:bg-[#1a1a1f] hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
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
                          ? "bg-[#1a1a1f]"
                          : "text-black hover:bg-[#1a1a1f] hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center flex-1"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.href);
                        }}
                        className="p-1 hover:bg-[#1a1a1f] rounded-lg text-black"
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
                                  : "text-black hover:bg-[#1a1a1f] hover:text-white"
                              }`}
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
                        : "text-black hover:bg-[#1a1a1f] hover:text-white"
                    }`}
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
                <p className="text-sm text-gray-400 truncate p-2 rounded">
                  {auth.currentUser?.email}
                </p>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
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
              >
                Login
              </Link>
              <Link
                href="/Signup"
                className="block w-full px-4 py-2 text-sm text-center text-white bg-[#1a1a1f] rounded-lg hover:bg-[#2a2a2f] transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#0a0a0f] via-[#121218] to-[#0a0a0f] p-6 rounded-lg border border-[#1a1a1f] shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white bg-[#1a1a1f] rounded-lg border border-[#2a2a2f] hover:bg-[#2a2a2f] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
