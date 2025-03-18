import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { UserProvider } from "@/lib/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LSAT Training",
  description: "Advanced LSAT preparation with AI assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <UserProvider>
        <body className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="">
            {children}
          </main>
          <footer className="bg-white mt-auto py-6 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
              <p>
                © {new Date().getFullYear()} LSAT Training. All rights reserved.
              </p>
            </div>
          </footer>
        </body>
      </UserProvider>
    </html>
  );
}
