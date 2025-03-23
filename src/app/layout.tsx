"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import MobileMenuButton from "@/components/MobileMenuButton";
import { UserProvider } from "@/lib/context/UserContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const noSidebarRoutes = [
    "/",
    "/login",
    "/Signup",
    "/subscription",
    "/onboarding",
  ];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <html lang="en" className={inter.className}>
      <UserProvider>
        <body className="min-h-screen bg-gray-900">
          {/* Mobile Navigation Bar */}
          {showSidebar && (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/5 shadow-md md:hidden flex items-center justify-between px-4 py-3">
              <span className="text-xl font-bold text-indigo-400">
                BAR Training
              </span>
              <button
                onClick={handleOpenSidebar}
                className="p-2 rounded-lg hover:bg-gray-700/10"
                aria-label="Open sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </nav>
          )}

          <div className="flex">
            {showSidebar && (
              <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                onOpen={handleOpenSidebar}
              />
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
