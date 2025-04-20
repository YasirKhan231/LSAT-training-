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
  LucideChevronLeft,
  LucideChevronRight,
  LucideCheck,
  LucideShield,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useToast } from "@/hooks/use-toast";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
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
import { cn } from "@/lib/utils";

// Add custom calendar styles to ensure dates are visible
const calendarStyles = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #333;
    --rdp-background-color: #f5f5f5;
    margin: 0;
  }
  .rdp-day {
    color: #000 !important;
    font-weight: 500;
  }
  .rdp-day_selected {
    background-color: #333 !important;
    color: white !important;
  }
  .rdp-day_today {
    font-weight: bold;
  }
  .rdp-caption_label {
    color: #000 !important;
    font-weight: 600;
    font-size: 1rem;
  }
  .rdp-head_cell {
    color: #000 !important;
    font-weight: 600;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .rdp-nav_button {
    color: #000 !important;
  }
  .calendar-wrapper {
    padding: 1rem;
  }
`;

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
  const [uuid, setUuid] = useState<string | null>(null);
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
        setUuid(user.uid);
      } else {
        console.error("User not authenticated");
        setUuid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    if (step === "exam-date") {
      console.log("Exam date selected:", formData.barExamTestDate);
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
          description: "Please select your BAR prep material",
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
          Authorization: `Bearer ${idToken}`,
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
        return "What BAR prep material do you have access to?";
      case "additional-info":
        return "Any additional information you'd like to share?";
      case "review":
        return "Review your information";
      default:
        return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case "exam-date":
        return <LucideCalendar className="h-6 w-6 text-gray-400" />;
      case "target-score":
        return <LucideTarget className="h-6 w-6 text-gray-400" />;
      case "current-score":
        return <LucideBarChart className="h-6 w-6 text-gray-400" />;
      case "study-hours":
        return <LucideClock className="h-6 w-6 text-gray-400" />;
      default:
        return <LucideShield className="h-6 w-6 text-gray-400" />;
    }
  };

  const steps: OnboardingStep[] = [
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
  ];

  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />
      <Card className="w-full max-w-md mx-auto shadow-md border border-gray-200 bg-white">
        <CardHeader className="pb-4 space-y-2">
          <div className="flex items-center justify-center mb-2">
            {getStepIcon()}
          </div>
          <CardTitle className="text-xl font-medium text-center text-gray-900">
            {getStepTitle()}
          </CardTitle>

          {/* Progress indicator */}
          <div className="flex mt-4 justify-between">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full flex-1 mx-0.5 transition-colors ${
                  currentStepIndex >= i
                    ? "bg-gradient-to-r from-gray-300 to-gray-400"
                    : "bg-gray-200"
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
                <Label htmlFor="exam-date" className="text-gray-900">
                  Exam Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-300 bg-white hover:bg-gray-100 text-gray-900 hover:text-black"
                      id="exam-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {formData.barExamTestDate ? (
                        formData.barExamTestDate.toLocaleDateString()
                      ) : (
                        <span>Select your exam date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-gray-200">
                    <div className="calendar-wrapper">
                      <DayPicker
                        mode="single"
                        selected={formData.barExamTestDate}
                        onSelect={(date) => {
                          console.log("Date selected:", date);
                          setFormData({
                            ...formData,
                            barExamTestDate: date || undefined,
                          });
                        }}
                        disabled={{ before: new Date() }}
                        className="custom-day-picker"
                        modifiersStyles={{
                          selected: { backgroundColor: "#333", color: "white" },
                          today: { fontWeight: "bold" },
                        }}
                        styles={{
                          caption: { color: "black" },
                          caption_label: { color: "black", fontWeight: "bold" },
                          head_cell: { color: "black", fontWeight: "bold" },
                          day: { color: "black" },
                          nav_button: { color: "black" },
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Step 2: Target Score */}
          {step === "target-score" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-score" className="text-gray-900">
                  Target Score (260-400)
                </Label>
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
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-gray-300"
                />
                {formData.targetScore &&
                  (Number(formData.targetScore) < 260 ||
                    Number(formData.targetScore) > 400) && (
                    <p className="text-sm text-red-400">
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
                <Label htmlFor="current-score" className="text-gray-900">
                  Current Score (260-400)
                </Label>
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
                  className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-gray-300"
                />
                {formData.currentScore &&
                  (Number(formData.currentScore) < 260 ||
                    Number(formData.currentScore) > 400) && (
                    <p className="text-sm text-red-400">
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
                <Label htmlFor="study-hours" className="text-gray-900">
                  Weekly Study Hours
                </Label>
                <Select
                  value={formData.studyHours}
                  onValueChange={(value) =>
                    setFormData({ ...formData, studyHours: value })
                  }
                >
                  <SelectTrigger
                    id="study-hours"
                    className="border-gray-300 bg-white text-gray-900"
                  >
                    <SelectValue placeholder="Select study hours" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-900">
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
                <Label className="text-gray-900">
                  Which section do you find most challenging?
                </Label>
                <RadioGroup
                  value={formData.challengingAreas[0] || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, challengingAreas: [value] })
                  }
                  className="space-y-2"
                >
                  {[
                    { value: "Constitutional", label: "Constitutional Law" },
                    { value: "Contracts", label: "Contracts" },
                    {
                      value: "Criminal Law & Procedure",
                      label: "Criminal Law & Procedure",
                    },
                    { value: "Civil Procedure", label: "Civil Procedure" },
                    { value: "Evidence", label: "Evidence" },
                    { value: "Real Property", label: "Real Property" },
                    { value: "Torts", label: "Torts" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className="border-gray-300 text-gray-600"
                      />
                      <Label
                        htmlFor={item.value}
                        className="text-gray-900 cursor-pointer w-full"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 6: Preferred Schedule */}
          {step === "preferred-schedule" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">
                  What is your preferred study schedule?
                </Label>
                <RadioGroup
                  value={formData.preferredSchedule}
                  onValueChange={(value) =>
                    setFormData({ ...formData, preferredSchedule: value })
                  }
                  className="space-y-2"
                >
                  {[
                    { value: "weekday", label: "Weekdays (Monday-Friday)" },
                    { value: "weekend", label: "Weekends (Saturday-Sunday)" },
                    { value: "everyday", label: "Every day" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className="border-gray-300 text-gray-600"
                      />
                      <Label
                        htmlFor={item.value}
                        className="text-gray-900 cursor-pointer w-full"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 7: Focus Areas */}
          {step === "focus-areas" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900">
                  Do you have any specific areas you want to focus on?
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: "constitutionalLaw", label: "Constitutional Law" },
                    { id: "contracts", label: "Contracts" },
                    { id: "criminalLaw", label: "Criminal Law and Procedure" },
                    { id: "evidence", label: "Evidence" },
                    { id: "realProperty", label: "Real Property" },
                    { id: "torts", label: "Torts" },
                    { id: "civilProcedure", label: "Civil Procedure" },
                  ].map((area) => (
                    <div
                      key={area.id}
                      className={cn(
                        "flex items-center space-x-2 p-3 rounded-md transition-colors cursor-pointer",
                        formData.focusAreas.includes(area.id)
                          ? "bg-gray-100 border border-gray-300/50"
                          : "hover:bg-gray-50 border border-gray-200"
                      )}
                      onClick={() => {
                        const updatedAreas = formData.focusAreas.includes(
                          area.id
                        )
                          ? formData.focusAreas.filter((a) => a !== area.id)
                          : [...formData.focusAreas, area.id];
                        setFormData({
                          ...formData,
                          focusAreas: updatedAreas,
                        });
                      }}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 flex items-center justify-center rounded border",
                          formData.focusAreas.includes(area.id)
                            ? "bg-gray-300 border-gray-300 text-gray-900"
                            : "border-gray-300"
                        )}
                      >
                        {formData.focusAreas.includes(area.id) && (
                          <LucideCheck className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <Label className="text-gray-900 cursor-pointer">
                        {area.label}
                      </Label>
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
                <Label
                  htmlFor="barExamPreparationMaterial"
                  className="text-gray-900"
                >
                  What BAR prep material do you have access to?
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
                  <SelectTrigger
                    id="barExamPreparationMaterial"
                    className="border-gray-300 bg-white text-gray-900"
                  >
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-900">
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
                <Label htmlFor="additional" className="text-gray-900">
                  Any additional information you'd like to share?
                </Label>
                <textarea
                  id="additional"
                  placeholder="E.g., specific challenges, learning style, etc."
                  className="w-full h-32 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-gray-300 focus:border-gray-300 focus:outline-none resize-none"
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
              <div className="space-y-3 text-sm rounded-md border border-gray-300 p-4 bg-gray-50">
                {[
                  {
                    label: "Exam Date",
                    value: formData.barExamTestDate
                      ? formData.barExamTestDate.toLocaleDateString()
                      : "Not set",
                  },
                  { label: "Target Score", value: formData.targetScore },
                  { label: "Current Score", value: formData.currentScore },
                  { label: "Weekly Study Hours", value: formData.studyHours },
                  {
                    label: "Challenging Areas",
                    value: formData.challengingAreas.join(", "),
                  },
                  {
                    label: "Preferred Schedule",
                    value: formData.preferredSchedule,
                  },
                  {
                    label: "Focus Areas",
                    value: formData.focusAreas.join(", "),
                  },
                  {
                    label: "BAR Prep Material",
                    value: formData.barExamPreparationMaterial,
                  },
                  {
                    label: "Additional Information",
                    value: formData.additionalInfo || "None provided",
                  },
                ].map((item, index, array) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex justify-between py-2",
                      index !== array.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    )}
                  >
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step !== "exam-date" ? (
              <Button
                variant="outline"
                className="border-gray-300 bg-white  text-gray-900"
                onClick={handleBack}
              >
                <LucideChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step !== "review" ? (
              <Button
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleNext}
                disabled={
                  (step === "current-score" &&
                    (!formData.currentScore ||
                      Number(formData.currentScore) < 260 ||
                      Number(formData.currentScore) > 400)) ||
                  (step === "target-score" &&
                    (!formData.targetScore ||
                      Number(formData.targetScore) < 260 ||
                      Number(formData.targetScore) > 400))
                }
              >
                Continue
                <LucideChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Plan...
                  </>
                ) : (
                  <>
                    Create Study Plan
                    <LucideShield className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
