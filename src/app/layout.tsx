"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import { UserProvider } from "@/lib/context/UserContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar when switching to mobile view if it was open
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isSidebarOpen]);

  const noSidebarRoutes = [
    "/",
    "/login",
    "/Signup",
    "/subscription",
    "/onboarding",
  ];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      handleCloseSidebar();
    }
  }, [pathname, isMobile]);

  return (
    <html lang="en" className={inter.className}>
      <UserProvider>
        <body className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#121218]">
          {/* Mobile Navigation Bar */}
          {showSidebar && isMobile && (
            <nav className="fixed top-0 left-0 right-0 z-40 bg-[#121218]/50 backdrop-blur-md shadow-md md:hidden flex items-center justify-between px-4 py-3">
              <span className="text-xl font-bold text-indigo-400">
                BAR Training
              </span>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-[#0a0a0f]/10"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-gray-400" />
              </button>
            </nav>
          )}

          {/* Desktop Toggle Button - Fixed position with higher z-index */}
          {showSidebar && !isMobile && (
            <button
              onClick={toggleSidebar}
              className="fixed z-50 top-4 left-4 p-2 rounded-lg bg-[#1a1a1f] text-gray-300 hover:bg-[#2a2a2f] transition-colors duration-200 shadow-lg"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="flex">
            {showSidebar && (
              <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
            )}
            <main
              className={`flex-1 ${
                showSidebar ? "md:ml-64 pt-16 md:pt-0" : ""
              } min-h-screen transition-all duration-300`}
            >
              <div className="text-gray-100">{children}</div>
            </main>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
