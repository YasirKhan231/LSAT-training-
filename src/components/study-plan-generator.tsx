"use client";

import { useState } from "react";
import {
  LucideCalendar,
  LucideClock,
  LucideTarget,
  LucideBarChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface StudyPlanGeneratorProps {
  onClose: () => void;
  uuid: string; // Add UUID prop to identify the user
}

export function StudyPlanGenerator({ onClose, uuid }: StudyPlanGeneratorProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // State for each input field
  const [barExamDate, setBarExamDate] = useState("");
  const [targetScore, setTargetScore] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [challengingAreas, setChallengingAreas] = useState<string[]>([]);
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [materials, setMaterials] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Check if all required fields are filled
  const isFormValid = () => {
    if (step === 1) {
      return barExamDate && targetScore && currentScore;
    } else if (step === 2) {
      return (
        weeklyHours > 0 && challengingAreas.length > 0 && preferredSchedule
      );
    } else if (step === 3) {
      return focusAreas.length > 0 && materials;
    }
    return false;
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsGenerating(true);

      try {
        // Prepare the form data to send to the backend
        const formData = {
          barExamTestDate: barExamDate,
          targetScore,
          currentScore,
          weeklyHours,
          challengingAreas,
          preferredSchedule,
          specificAreas: focusAreas,
          barExamPreparationMaterial: materials,
          additionalInformation: additionalInfo,
        };

        // Send form data to the backend
        const response = await fetch(`/api/plan/generate-plan?uuid=${uuid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to generate study plan");
        }

        const data = await response.json();
        console.log("Generated Plan:", data.plan);

        // Close the modal or show success message
        onClose();
      } catch (error) {
        console.error("Error generating plan:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return (
    <Card className="mx-auto max-w-2xl bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">
          Generate Your Personalized Study Plan
        </CardTitle>
        <CardDescription className="text-gray-600">
          Answer a few questions to help the AI create a customized Bar Exam
          study plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="exam-date" className="text-gray-800">
                When is your Bar Exam?
              </Label>
              <div className="flex items-center gap-2">
                <LucideCalendar className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  id="exam-date"
                  value={barExamDate}
                  onChange={(e) => setBarExamDate(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-score" className="text-gray-800">
                What is your target Bar Exam score?
              </Label>
              <div className="flex items-center gap-2">
                <LucideTarget className="h-4 w-4 text-gray-500" />
                <Select
                  value={targetScore}
                  onValueChange={(value) => setTargetScore(value)}
                >
                  <SelectTrigger
                    id="target-score"
                    className="bg-white border-gray-300 text-gray-900"
                  >
                    <SelectValue placeholder="Select target score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-900">
                    {Array.from({ length: 13 }, (_, i) => 280 + i * 10).map(
                      (score) => (
                        <SelectItem key={score} value={score.toString()}>
                          {score}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-score" className="text-gray-800">
                What is your current Bar Exam score or practice test score?
              </Label>
              <div className="flex items-center gap-2">
                <LucideBarChart className="h-4 w-4 text-gray-500" />
                <Select
                  value={currentScore}
                  onValueChange={(value) => setCurrentScore(value)}
                >
                  <SelectTrigger
                    id="current-score"
                    className="bg-white border-gray-300 text-gray-900"
                  >
                    <SelectValue placeholder="Select current score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-gray-900">
                    <SelectItem value="0">
                      I haven't taken a practice test yet
                    </SelectItem>
                    {Array.from({ length: 11 }, (_, i) => 200 + i * 20).map(
                      (score) => (
                        <SelectItem key={score} value={score.toString()}>
                          {score}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-800">
                How many hours per week can you dedicate to Bar Exam
                preparation?
              </Label>
              <div className="flex items-center gap-2">
                <LucideClock className="h-4 w-4 text-gray-500" />
                <div className="flex-1 space-y-2">
                  <Slider
                    defaultValue={[weeklyHours]}
                    max={40}
                    step={1}
                    onValueChange={(value) => setWeeklyHours(value[0])}
                    className="bg-gray-100"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 hours</span>
                    <span>15 hours</span>
                    <span>40+ hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-800">
                Which section do you find most challenging?
              </Label>
              <RadioGroup
                value={challengingAreas[0] || ""}
                onValueChange={(value) => setChallengingAreas([value])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="constitutional"
                    id="constitutional"
                    className="border-gray-300"
                  />
                  <Label htmlFor="constitutional" className="text-gray-800">
                    Constitutional Law
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="contracts"
                    id="contracts"
                    className="border-gray-300"
                  />
                  <Label htmlFor="contracts" className="text-gray-800">
                    Contracts
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="criminal"
                    id="criminal"
                    className="border-gray-300"
                  />
                  <Label htmlFor="criminal" className="text-gray-800">
                    Criminal Law & Procedure
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-800">
                What is your preferred study schedule?
              </Label>
              <RadioGroup
                value={preferredSchedule}
                onValueChange={(value) => setPreferredSchedule(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="weekday"
                    id="weekday"
                    className="border-gray-300"
                  />
                  <Label htmlFor="weekday" className="text-gray-800">
                    Weekdays (Monday-Friday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="weekend"
                    id="weekend"
                    className="border-gray-300"
                  />
                  <Label htmlFor="weekend" className="text-gray-800">
                    Weekends (Saturday-Sunday)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="everyday"
                    id="everyday"
                    className="border-gray-300"
                  />
                  <Label htmlFor="everyday" className="text-gray-800">
                    Every day
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-800">
                Do you have any specific areas you want to focus on?
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "constitutional", label: "Constitutional Law" },
                  { id: "contracts", label: "Contracts" },
                  { id: "criminal", label: "Criminal Law & Procedure" },
                  { id: "evidence", label: "Evidence" },
                  { id: "realProperty", label: "Real Property" },
                  { id: "torts", label: "Torts" },
                ].map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={area.id}
                      checked={focusAreas.includes(area.id)}
                      onChange={(e) => {
                        const updatedAreas = e.target.checked
                          ? [...focusAreas, area.id]
                          : focusAreas.filter((a) => a !== area.id);
                        setFocusAreas(updatedAreas);
                      }}
                      className="rounded border-gray-300 bg-white text-primary focus:ring-primary h-4 w-4"
                    />
                    <Label htmlFor={area.id} className="text-gray-800">
                      {area.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials" className="text-gray-800">
                What Bar Exam prep materials do you have access to?
              </Label>
              <Select
                value={materials}
                onValueChange={(value) => setMaterials(value)}
              >
                <SelectTrigger
                  id="materials"
                  className="bg-white border-gray-300 text-gray-900"
                >
                  <SelectValue placeholder="Select materials" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300 text-gray-900">
                  <SelectItem value="kaplan">Kaplan</SelectItem>
                  <SelectItem value="barbri">Barbri</SelectItem>
                  <SelectItem value="themis">Themis</SelectItem>
                  <SelectItem value="adaptibar">AdaptiBar</SelectItem>
                  <SelectItem value="multiple">Multiple Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional" className="text-gray-800">
                Any additional information you'd like to share?
              </Label>
              <Input
                id="additional"
                placeholder="E.g., specific challenges, learning style, etc."
                className="h-20 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            <p className="text-center text-gray-600">
              Generating your personalized study plan...
              <br />
              This will take just a moment.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid() || isGenerating}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {step === 3 ? "Generate Plan" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
