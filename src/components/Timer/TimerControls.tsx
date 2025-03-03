import React from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Clock, Coffee } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface TimerControlsProps {
  workDuration?: number;
  breakDuration?: number;
  currentPhase?: "work" | "break";
  onWorkDurationChange?: (value: number) => void;
  onBreakDurationChange?: (value: number) => void;
  onApplySettings?: () => void;
}

const DEFAULT_WORK_DURATION = 25;
const DEFAULT_BREAK_DURATION = 5;

const TimerControls = ({
  workDuration = 25,
  breakDuration = 5,
  currentPhase = "work",
  onWorkDurationChange = () => {},
  onBreakDurationChange = () => {},
  onApplySettings = () => {},
}: TimerControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border"
    >
      <div className="flex justify-center gap-4 mb-6">
        <Badge
          variant={currentPhase === "work" ? "default" : "secondary"}
          className="px-4 py-2"
        >
          <Clock className="w-4 h-4 mr-2" />
          Work
        </Badge>
        <Badge
          variant={currentPhase === "break" ? "default" : "secondary"}
          className="px-4 py-2"
        >
          <Coffee className="w-4 h-4 mr-2" />
          Break
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="work-duration">Work Duration</Label>
            <span className="text-sm text-muted-foreground">
              {workDuration} min
            </span>
          </div>
          <Slider
            id="work-duration"
            min={1}
            max={60}
            step={1}
            value={[workDuration]}
            onValueChange={(value) => onWorkDurationChange(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="break-duration">Break Duration</Label>
            <span className="text-sm text-muted-foreground">
              {breakDuration} min
            </span>
          </div>
          <Slider
            id="break-duration"
            min={1}
            max={30}
            step={1}
            value={[breakDuration]}
            onValueChange={(value) => onBreakDurationChange(value[0])}
            className="w-full"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onWorkDurationChange(DEFAULT_WORK_DURATION);
              onBreakDurationChange(DEFAULT_BREAK_DURATION);
              toast({
                title: "Settings Reset",
                description:
                  "Timer durations have been reset to default values.",
              });
            }}
          >
            Reset to Default
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onApplySettings();
              toast({
                title: "Settings Applied",
                description: "Your timer settings have been updated.",
              });
            }}
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TimerControls;
