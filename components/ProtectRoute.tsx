"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";

const publicRoutes = ["/login", "/signup"]; // Pages that don’t require authentication

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !publicRoutes.includes(pathname)) {
        router.push("/login"); // Redirect if not logged in and not on a public page
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) return <p>Loading...</p>; // Show loading state

  return <>{children}</>;
}
