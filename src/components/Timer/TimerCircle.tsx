import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface TimerCircleProps {
  duration?: number;
  isRunning?: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onStep?: () => void;
  phase?: "work" | "break";
  timeLeft?: number;
  setTimeLeft?: (value: number) => void;
}

const TimerCircle = ({
  duration = 1500, // 25 minutes in seconds
  isRunning = false,
  onStart = () => {},
  onPause = () => {},
  onReset = () => {},
  onStep = () => {},
  phase = "work",
  timeLeft = duration,
  setTimeLeft = () => {},
}: TimerCircleProps) => {
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / duration) * 100);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, duration]);

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
          phase === "work" ? "rgb(254, 202, 202)" : "rgb(191, 219, 254)",
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
      <div className="absolute inset-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted-foreground/20"
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
            fill="none"
            stroke="currentColor"
          />
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

      <motion.div
        className="relative flex flex-col items-center gap-6 text-center z-10"
        animate={{ scale: isRunning ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-6xl font-bold tracking-tighter"
          key={timeLeft}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {formatTime(timeLeft)}
        </motion.span>

        <span className="text-xl font-medium text-muted-foreground capitalize">
          {phase} Phase
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={isRunning ? onPause : onStart}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="outline" size="icon" onClick={onReset}>
            <RefreshCw size={20} />
          </Button>
          <Button variant="outline" size="icon" onClick={onStep}>
            <ArrowRight size={20} />
          </Button>
        </div>
      </motion.div>

      <Progress
        value={progress}
        className="absolute bottom-0 left-0 right-0 h-1 rounded-none opacity-20"
      />
    </motion.div>
  );
};

export default TimerCircle;
