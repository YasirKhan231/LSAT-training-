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

  // List of routes where sidebar should be hidden
  const noSidebarRoutes = [
    "/",
    "/login",
    "/Signup",
    "/subscription",
    "/onboarding",
  ];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <html lang="en" className={inter.className}>
      <UserProvider>
        <body className="min-h-screen bg-gray-50">
          <div className="flex">
            {showSidebar && (
              <>
                <MobileMenuButton
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </>
            )}
            <main
              className={`flex-1 ${
                showSidebar ? "md:ml-64" : ""
              } min-h-screen transition-all duration-300`}
            >
              <div className="">{children}</div>
            </main>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
