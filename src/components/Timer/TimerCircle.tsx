import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface TimerCircleProps {
  duration: number; // Total duration of the timer in seconds
  isRunning: boolean; // Whether the timer is running
  onStart: () => void; // Callback to start the timer
  onPause: () => void; // Callback to pause the timer
  onReset: () => void; // Callback to reset the timer
  onStep: () => void; // Callback to manually step to the next phase
  phase: "work" | "break"; // Current phase of the timer
  timeLeft: number; // Time left in seconds
}

const TimerCircle: React.FC<TimerCircleProps> = ({
  duration,
  isRunning,
  onStart,
  onPause,
  onReset,
  onStep,
  phase,
  timeLeft,
}) => {
  const [progress, setProgress] = useState(100); // Progress percentage for the circular progress bar

  // Update progress whenever `timeLeft` or `duration` changes
  useEffect(() => {
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, duration]);

  // Format time (seconds) into MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{
        scale: 0.9,
        opacity: 0,
        backgroundColor:
          phase === "work" ? "rgb(254, 202, 202)" : "rgb(191, 219, 254)", // Different colors for work and break phases
      }}
      animate={{
        scale: 1,
        opacity: 1,
        backgroundColor:
          phase === "work" ? "rgb(254, 202, 202)" : "rgb(191, 219, 254)",
        transition: { duration: 0.5 },
      }}
      className="relative flex flex-col items-center justify-center w-[400px] h-[400px] rounded-full shadow-lg"
    >
      {/* Circular Progress Bar */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            className="text-muted-foreground/20"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
            fill="none"
            stroke="currentColor"
          />
          {/* Progress Circle */}
          <motion.circle
            className="text-primary"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Timer Content */}
      <motion.div
        className="relative flex flex-col items-center gap-6 text-center z-10"
        animate={{ scale: isRunning ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Time Left */}
        <motion.span
          className="text-6xl font-bold tracking-tighter"
          key={timeLeft}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {formatTime(timeLeft)}
        </motion.span>

        {/* Phase Label */}
        <span className="text-xl font-medium text-muted-foreground capitalize">
          {phase} Phase
        </span>

        {/* Control Buttons */}
        <div className="flex gap-2">
          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={isRunning ? onPause : onStart}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </Button>

          {/* Reset Button */}
          <Button variant="outline" size="icon" onClick={onReset}>
            <RefreshCw size={20} />
          </Button>

          {/* Step Button */}
          <Button variant="outline" size="icon" onClick={onStep}>
            <ArrowRight size={20} />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimerCircle;
