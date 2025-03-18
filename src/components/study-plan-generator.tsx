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
          specificAreas: focusAreas, // Map focusAreas to specificAreas
          barExamPreparationMaterial: materials, // Map materials to barExamPreparationMaterial
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
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Generate Your Personalized Study Plan</CardTitle>
        <CardDescription>
          Answer a few questions to help the AI create a customized Bar Exam
          study plan for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="exam-date">When is your Bar Exam?</Label>
              <div className="flex items-center gap-2">
                <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  id="exam-date"
                  value={barExamDate}
                  onChange={(e) => setBarExamDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-score">
                What is your target Bar Exam score?
              </Label>
              <div className="flex items-center gap-2">
                <LucideTarget className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={targetScore}
                  onValueChange={(value) => setTargetScore(value)}
                >
                  <SelectTrigger id="target-score">
                    <SelectValue placeholder="Select target score" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => 280 + i * 10).map(
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
              <Label htmlFor="current-score">
                What is your current Bar Exam score or practice test score?
              </Label>
              <div className="flex items-center gap-2">
                <LucideBarChart className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={currentScore}
                  onValueChange={(value) => setCurrentScore(value)}
                >
                  <SelectTrigger id="current-score">
                    <SelectValue placeholder="Select current score" />
                  </SelectTrigger>
                  <SelectContent>
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
              <Label>
                How many hours per week can you dedicate to Bar Exam
                preparation?
              </Label>
              <div className="flex items-center gap-2">
                <LucideClock className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-2">
                  <Slider
                    defaultValue={[weeklyHours]}
                    max={40}
                    step={1}
                    onValueChange={(value) => setWeeklyHours(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 hours</span>
                    <span>15 hours</span>
                    <span>40+ hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Which section do you find most challenging?</Label>
              <RadioGroup
                value={challengingAreas[0] || ""}
                onValueChange={(value) => setChallengingAreas([value])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="constitutional" id="constitutional" />
                  <Label htmlFor="constitutional">Constitutional Law</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contracts" id="contracts" />
                  <Label htmlFor="contracts">Contracts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="criminal" id="criminal" />
                  <Label htmlFor="criminal">Criminal Law & Procedure</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>What is your preferred study schedule?</Label>
              <RadioGroup
                value={preferredSchedule}
                onValueChange={(value) => setPreferredSchedule(value)}
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

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
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
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={area.id}>{area.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="materials">
                What Bar Exam prep materials do you have access to?
              </Label>
              <Select
                value={materials}
                onValueChange={(value) => setMaterials(value)}
              >
                <SelectTrigger id="materials">
                  <SelectValue placeholder="Select materials" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kaplan">Kaplan</SelectItem>
                  <SelectItem value="barbri">Barbri</SelectItem>
                  <SelectItem value="themis">Themis</SelectItem>
                  <SelectItem value="adaptibar">AdaptiBar</SelectItem>
                  <SelectItem value="multiple">Multiple Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional">
                Any additional information you'd like to share?
              </Label>
              <Input
                id="additional"
                placeholder="E.g., specific challenges, learning style, etc."
                className="h-20"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
            <p className="text-center text-muted-foreground">
              Generating your personalized study plan...
              <br />
              This will take just a moment.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <Button onClick={handleNext} disabled={!isFormValid() || isGenerating}>
          {step === 3 ? "Generate Plan" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
