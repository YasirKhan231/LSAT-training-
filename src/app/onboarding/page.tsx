"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Default styling for react-day-picker
import { useToast } from "@/hooks/use-toast";
import { getAuth, getIdToken } from "firebase/auth"; // Firebase Auth

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OnboardingStep = "exam-date" | "target-score" | "study-hours" | "review";

export default function OnboardingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>("exam-date");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    examDate: undefined as Date | undefined,
    targetScore: "",
    studyHours: "",
  });

  const handleNext = () => {
    if (step === "exam-date") {
      if (!formData.examDate) {
        toast("Missing information", {
          description: "Please select an exam date",
          variant: "destructive",
        });
        return;
      }
      setStep("target-score");
    } else if (step === "target-score") {
      if (!formData.targetScore) {
        toast("Missing information", {
          description: "Please enter a target score",
          variant: "destructive",
        });
        return;
      }
      setStep("study-hours");
    } else if (step === "study-hours") {
      if (!formData.studyHours) {
        toast("Missing information", {
          description: "Please select your weekly study hours",
          variant: "destructive",
        });
        return;
      }
      setStep("review");
    }
  };

  const handleBack = () => {
    if (step === "target-score") {
      setStep("exam-date");
    } else if (step === "study-hours") {
      setStep("target-score");
    } else if (step === "review") {
      setStep("study-hours");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Get Firebase ID token
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }
      const idToken = await getIdToken(user);

      // Send data to backend
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Include the ID token in the request
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save onboarding data");
      }

      toast("Study Plan Created Successfully!", {
        description:
          "Your personalized LSAT study plan is now ready. You can access it from your dashboard.",
      });

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Onboarding submission error:", error);
      toast("Something went wrong", {
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "exam-date":
        return "When is your LSAT exam?";
      case "target-score":
        return "What's your target LSAT score?";
      case "study-hours":
        return "How many hours can you study weekly?";
      case "review":
        return "Review your information";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50/50">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100">
        <CardHeader className="pb-4 space-y-0">
          <CardTitle className="text-xl font-medium text-center">
            {getStepTitle()}
          </CardTitle>

          {/* Progress indicator */}
          <div className="flex mt-4 justify-between">
            {["exam-date", "target-score", "study-hours", "review"].map(
              (s, i) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full flex-1 mx-0.5 transition-colors ${
                    [
                      "exam-date",
                      "target-score",
                      "study-hours",
                      "review",
                    ].indexOf(step) >= i
                      ? "bg-blue-500"
                      : "bg-blue-100"
                  }`}
                />
              )
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          {/* Step 1: Exam Date */}
          {step === "exam-date" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam-date">Exam Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="exam-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.examDate ? (
                        formData.examDate.toLocaleDateString()
                      ) : (
                        <span>Select your exam date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DayPicker
                      mode="single"
                      selected={formData.examDate}
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          examDate: date || undefined,
                        })
                      }
                      disabled={{ before: new Date() }} // Disable past dates
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Step 2: Target Score */}
          {step === "target-score" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-score">Target Score (120-180)</Label>
                <Input
                  id="target-score"
                  type="number"
                  min="120"
                  max="180"
                  value={formData.targetScore}
                  onChange={(e) =>
                    setFormData({ ...formData, targetScore: e.target.value })
                  }
                  placeholder="Enter your target score"
                />
              </div>
            </div>
          )}

          {/* Step 3: Study Hours */}
          {step === "study-hours" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="study-hours">Weekly Study Hours</Label>
                <Select
                  value={formData.studyHours}
                  onValueChange={(value) =>
                    setFormData({ ...formData, studyHours: value })
                  }
                >
                  <SelectTrigger id="study-hours">
                    <SelectValue placeholder="Select study hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 hours</SelectItem>
                    <SelectItem value="6-10">6-10 hours</SelectItem>
                    <SelectItem value="11-15">11-15 hours</SelectItem>
                    <SelectItem value="16-20">16-20 hours</SelectItem>
                    <SelectItem value="20+">More than 20 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="space-y-3 text-sm rounded-md border p-4 bg-slate-50">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Exam Date</span>
                  <span className="font-medium">
                    {formData.examDate
                      ? formData.examDate.toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Target Score</span>
                  <span className="font-medium">{formData.targetScore}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">
                    Weekly Study Hours
                  </span>
                  <span className="font-medium">{formData.studyHours}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step !== "exam-date" ? (
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step !== "review" ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleNext}
              >
                Continue
              </Button>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Study Plan"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
