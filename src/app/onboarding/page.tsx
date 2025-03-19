"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  Loader2,
  LucideCalendar,
  LucideClock,
  LucideTarget,
  LucideBarChart,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Default styling for react-day-picker
import { useToast } from "@/hooks/use-toast";
import { getAuth, getIdToken } from "firebase/auth"; // Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

type OnboardingStep =
  | "exam-date"
  | "target-score"
  | "current-score"
  | "study-hours"
  | "challenging-areas"
  | "preferred-schedule"
  | "focus-areas"
  | "barExamPreparationMaterial"
  | "additional-info"
  | "review";

export default function OnboardingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>("exam-date");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null); // State to store the UUID
  const [formData, setFormData] = useState({
    barExamTestDate: undefined as Date | undefined,
    targetScore: "",
    currentScore: "",
    studyHours: "",
    challengingAreas: [] as string[],
    preferredSchedule: "",
    focusAreas: [] as string[],
    barExamPreparationMaterial: "",
    additionalInfo: "",
  });

  // Fetch the authenticated user's UID when the component mounts
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUuid(user.uid); // Set the UUID
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    if (step === "exam-date") {
      if (!formData.barExamTestDate) {
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
      setStep("current-score");
    } else if (step === "current-score") {
      if (!formData.currentScore) {
        toast("Missing information", {
          description: "Please enter your current score",
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
      setStep("challenging-areas");
    } else if (step === "challenging-areas") {
      if (formData.challengingAreas.length === 0) {
        toast("Missing information", {
          description: "Please select the most challenging section",
          variant: "destructive",
        });
        return;
      }
      setStep("preferred-schedule");
    } else if (step === "preferred-schedule") {
      if (!formData.preferredSchedule) {
        toast("Missing information", {
          description: "Please select your preferred schedule",
          variant: "destructive",
        });
        return;
      }
      setStep("focus-areas");
    } else if (step === "focus-areas") {
      if (formData.focusAreas.length === 0) {
        toast("Missing information", {
          description: "Please select focus areas",
          variant: "destructive",
        });
        return;
      }
      setStep("barExamPreparationMaterial");
    } else if (step === "barExamPreparationMaterial") {
      if (!formData.barExamPreparationMaterial) {
        toast("Missing information", {
          description: "Please select your BAR prep barExamPreparationMaterial",
          variant: "destructive",
        });
        return;
      }
      setStep("additional-info");
    } else if (step === "additional-info") {
      setStep("review");
    }
  };

  const handleBack = () => {
    if (step === "target-score") {
      setStep("exam-date");
    } else if (step === "current-score") {
      setStep("target-score");
    } else if (step === "study-hours") {
      setStep("current-score");
    } else if (step === "challenging-areas") {
      setStep("study-hours");
    } else if (step === "preferred-schedule") {
      setStep("challenging-areas");
    } else if (step === "focus-areas") {
      setStep("preferred-schedule");
    } else if (step === "barExamPreparationMaterial") {
      setStep("focus-areas");
    } else if (step === "additional-info") {
      setStep("barExamPreparationMaterial");
    } else if (step === "review") {
      setStep("additional-info");
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

      // Send data to backend with UUID as a query parameter
      const response = await fetch(`/api/onboarding?uuid=${uuid}`, {
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
          "Your personalized BAR study plan is now ready. You can access it from your dashboard.",
      });

      // Redirect to plan page after a short delay
      setTimeout(() => {
        router.push("/plan");
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
        return "When is your BAR exam?";
      case "target-score":
        return "What's your target BAR score?";
      case "current-score":
        return "What's your current BAR score?";
      case "study-hours":
        return "How many hours can you study weekly?";
      case "challenging-areas":
        return "Which section do you find most challenging?";
      case "preferred-schedule":
        return "What is your preferred study schedule?";
      case "focus-areas":
        return "Do you have any specific areas you want to focus on?";
      case "barExamPreparationMaterial":
        return "What BAR prep barExamPreparationMaterial do you have access to?";
      case "additional-info":
        return "Any additional information you'd like to share?";
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
            {[
              "exam-date",
              "target-score",
              "current-score",
              "study-hours",
              "challenging-areas",
              "preferred-schedule",
              "focus-areas",
              "barExamPreparationMaterial",
              "additional-info",
              "review",
            ].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full flex-1 mx-0.5 transition-colors ${
                  [
                    "exam-date",
                    "target-score",
                    "current-score",
                    "study-hours",
                    "challenging-areas",
                    "preferred-schedule",
                    "focus-areas",
                    "barExamPreparationMaterial",
                    "additional-info",
                    "review",
                  ].indexOf(step) >= i
                    ? "bg-blue-500"
                    : "bg-blue-100"
                }`}
              />
            ))}
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
                      {formData.barExamTestDate ? (
                        formData.barExamTestDate.toLocaleDateString()
                      ) : (
                        <span>Select your exam date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DayPicker
                      mode="single"
                      selected={formData.barExamTestDate}
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          barExamTestDate: date || undefined,
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
                <Label htmlFor="target-score">Target Score (260-400)</Label>
                <Input
                  id="target-score"
                  type="number"
                  min="260"
                  max="400"
                  value={formData.targetScore}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, targetScore: value });
                  }}
                  placeholder="Enter your target score"
                />
                {/* Error message for invalid target score */}
                {formData.targetScore &&
                  (Number(formData.targetScore) < 260 ||
                    Number(formData.targetScore) > 400) && (
                    <p className="text-sm text-red-500">
                      Target score must be between 260 and 400.
                    </p>
                  )}
              </div>
            </div>
          )}

          {/* Step 3: Current Score */}
          {step === "current-score" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-score">Current Score (260-400)</Label>
                <Input
                  id="current-score"
                  type="number"
                  min="260"
                  max="400"
                  value={formData.currentScore}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, currentScore: value });
                  }}
                  placeholder="Enter your current score"
                />
                {/* Error message for invalid current score */}
                {formData.currentScore &&
                  (Number(formData.currentScore) < 260 ||
                    Number(formData.currentScore) > 400) && (
                    <p className="text-sm text-red-500">
                      Current score must be between 260 and 400.
                    </p>
                  )}
              </div>
            </div>
          )}

          {/* Step 4: Study Hours */}
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

          {/* Step 5: Challenging Areas */}
          {step === "challenging-areas" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Which section do you find most challenging?</Label>
                <RadioGroup
                  value={formData.challengingAreas[0] || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, challengingAreas: [value] })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Constitutional"
                      id="Constitutional"
                    />
                    <Label htmlFor="Constitutional">Constitutional Law</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Contracts" id="Contracts" />
                    <Label htmlFor="Contracts">Contracts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Criminal Law & Procedure"
                      id="Criminal Law & Procedure"
                    />
                    <Label htmlFor="Criminal Law & Procedure">
                      Criminal Law & Procedure
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Civil Procedure"
                      id="Civil Procedure"
                    />
                    <Label htmlFor="Civil Procedure">Civil Procedure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Evidence" id="Evidence" />
                    <Label htmlFor="Evidence">Evidence</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Real Property" id="Real Property" />
                    <Label htmlFor="Real Property">Real Property</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Torts" id="Torts" />
                    <Label htmlFor="Torts">Torts</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 6: Preferred Schedule */}
          {step === "preferred-schedule" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What is your preferred study schedule?</Label>
                <RadioGroup
                  value={formData.preferredSchedule}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredSchedule: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekday" id="weekday" />
                    <Label htmlFor="weekday">Weekdays (Monday-Friday)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekend" id="weekend" />
                    <Label htmlFor="weekend">Weekends (Saturday-Sunday)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="everyday" id="everyday" />
                    <Label htmlFor="everyday">Every day</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 7: Focus Areas */}
          {step === "focus-areas" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>
                  Do you have any specific areas you want to focus on?
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "constitutionalLaw", label: "Constitutional Law" },
                    { id: "contracts", label: "Contracts" },
                    { id: "criminalLaw", label: "Criminal Law and Procedure" },
                    { id: "evidence", label: "Evidence" },
                    { id: "realProperty", label: "Real Property" },
                    { id: "torts", label: "Torts" },
                    { id: "civilProcedure", label: "Civil Procedure" },
                  ].map((area) => (
                    <div key={area.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={area.id}
                        checked={formData.focusAreas.includes(area.id)}
                        onChange={(e) => {
                          const updatedAreas = e.target.checked
                            ? [...formData.focusAreas, area.id]
                            : formData.focusAreas.filter((a) => a !== area.id);
                          setFormData({
                            ...formData,
                            focusAreas: updatedAreas,
                          });
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={area.id}>{area.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 8: barExamPreparationMaterial */}
          {step === "barExamPreparationMaterial" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="barExamPreparationMaterial">
                  What BAR prep barExamPreparationMaterial do you have access
                  to?
                </Label>
                <Select
                  value={formData.barExamPreparationMaterial}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      barExamPreparationMaterial: value,
                    })
                  }
                >
                  <SelectTrigger id="barExamPreparationMaterial">
                    <SelectValue placeholder="Select barExamPreparationMaterial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="official">
                      Official BAR PrepTests
                    </SelectItem>
                    <SelectItem value="powerscore">
                      PowerScore Bibles
                    </SelectItem>
                    <SelectItem value="manhattan">Manhattan Prep</SelectItem>
                    <SelectItem value="kaplan">Kaplan</SelectItem>
                    <SelectItem value="princeton">Princeton Review</SelectItem>
                    <SelectItem value="multiple">Multiple Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 9: Additional Info */}
          {step === "additional-info" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additional">
                  Any additional information you'd like to share?
                </Label>
                <Input
                  id="additional"
                  placeholder="E.g., specific challenges, learning style, etc."
                  className="h-20"
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalInfo: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* Step 10: Review */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="space-y-3 text-sm rounded-md border p-4 bg-slate-50">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Exam Date</span>
                  <span className="font-medium">
                    {formData.barExamTestDate
                      ? formData.barExamTestDate.toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Target Score</span>
                  <span className="font-medium">{formData.targetScore}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Current Score</span>
                  <span className="font-medium">{formData.currentScore}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    Weekly Study Hours
                  </span>
                  <span className="font-medium">{formData.studyHours}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    Challenging Areas
                  </span>
                  <span className="font-medium">
                    {formData.challengingAreas.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    Preferred Schedule
                  </span>
                  <span className="font-medium">
                    {formData.preferredSchedule}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Focus Areas</span>
                  <span className="font-medium">
                    {formData.focusAreas.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">
                    barExamPreparationMaterial
                  </span>
                  <span className="font-medium">
                    {formData.barExamPreparationMaterial}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">
                    Additional Information
                  </span>
                  <span className="font-medium">{formData.additionalInfo}</span>
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
                disabled={
                  (step === "current-score" && // Validation for current score step
                    (!formData.currentScore ||
                      Number(formData.currentScore) < 260 ||
                      Number(formData.currentScore) > 400)) ||
                  (step === "target-score" && // Validation for target score step
                    (!formData.targetScore ||
                      Number(formData.targetScore) < 260 ||
                      Number(formData.targetScore) > 400))
                }
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
