import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { RotateCcw, Timer } from "lucide-react";

interface PomodoroCounterProps {
  count?: number;
  onReset?: () => void;
}

const PomodoroCounter = ({
  count = 0,
  onReset = () => {},
}: PomodoroCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4 p-4 rounded-lg bg-background/95 backdrop-blur border border-border"
    >
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-primary" />
        <span className="font-medium">Completed Cycles:</span>
        <motion.span
          key={count}
          initial={{ scale: 1.2, color: "#22c55e" }}
          animate={{ scale: 1, color: "currentColor" }}
          className="text-lg font-bold"
        >
          {count}
        </motion.span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="text-muted-foreground hover:text-primary"
      >
        <RotateCcw size={16} />
      </Button>
    </motion.div>
  );
};

export default PomodoroCounter;
