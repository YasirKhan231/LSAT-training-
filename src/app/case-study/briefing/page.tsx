"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseBriefing from "@/components/case-study/CaseBriefing";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CaseBriefingPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const sampleCases = [
    {
      id: "case1",
      title: "Brown v. Board of Education",
      facts:
        "This landmark case challenged the constitutionality of racial segregation in public schools...",
      issue:
        "Does the racial segregation of children in public schools violate the Equal Protection Clause?",
      holding: "Yes, separate educational facilities are inherently unequal...",
      reasoning:
        "The Court found that segregation of public schools violated the 14th Amendment...",
    },
    // Add more cases
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/case-study">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Case Briefing Practice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Available Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleCases.map((caseItem) => (
                <Button
                  key={caseItem.id}
                  variant={selectedCase === caseItem.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCase(caseItem.id)}
                >
                  {caseItem.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {selectedCase ? (
            <CaseBriefing
              caseData={sampleCases.find((c) => c.id === selectedCase)!}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Select a case from the list to begin briefing
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
