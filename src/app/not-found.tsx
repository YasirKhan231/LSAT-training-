"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-red-600">
          404 ERROR
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Page Not Found
        </h1>

        <p className="mb-12 text-xl text-gray-600">
          We couldn't find the page you're looking for. It might have been
          moved, deleted, or perhaps never existed.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Feature cards similar to the design */}
          <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <ArrowLeft className="h-6 w-6 text-black" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-black">
              Return to Previous Page
            </h2>
            <p className="mb-6 text-gray-600">
              Go back to the page you were viewing before encountering this
              error.
            </p>
            <Button onClick={() => window.history.back()} className="w-full">
              Go Back
            </Button>
          </div>

          <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black">
              <LayoutDashboard className="h-6 w-6 text-black" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-black">
              Go to Dashboard
            </h2>
            <p className="mb-6 text-gray-600">
              Navigate to the dashboard to access all available features and
              content.
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
