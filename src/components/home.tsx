import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import PomodoroCounter from "./PomodoroCounter";
import { motion } from "framer-motion";
import TimerCircle from "./Timer/TimerCircle";
import TimerControls from "./Timer/TimerControls";
import TaskList from "./Tasks/TaskList";

const Home = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"work" | "break">("work");
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const { theme, setTheme } = useTheme();

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    if (currentPhase === "work") {
      setTimeLeft(workDuration * 60);
    } else {
      setTimeLeft(breakDuration * 60);
    }
  };

  const handleStep = () => {
    setIsRunning(false);
    setCurrentPhase(currentPhase === "work" ? "break" : "work");
    setTimeLeft(
      currentPhase === "work" ? breakDuration * 60 : workDuration * 60,
    );
  };

  const handleApplySettings = () => {
    setTimeLeft(
      currentPhase === "work" ? workDuration * 60 : breakDuration * 60,
    );
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      if (currentPhase === "work") {
        setPomodoroCount((prev) => prev + 1);
      }
      handleStep();
    }
  }, [timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gradient-to-b from-background to-background/80 p-8"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Pomodoro Timer
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay focused and productive with our modern Pomodoro timer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              layout
              className="relative"
              animate={{
                scale: isRunning ? 1 : 0.98,
                opacity: isRunning ? 1 : 0.9,
              }}
            >
              <TimerCircle
                duration={
                  currentPhase === "work"
                    ? workDuration * 60
                    : breakDuration * 60
                }
                isRunning={isRunning}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
                onStep={handleStep}
                phase={currentPhase}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
            </motion.div>

            <PomodoroCounter
              count={pomodoroCount}
              onReset={() => setPomodoroCount(0)}
            />

            <TimerControls
              workDuration={workDuration}
              breakDuration={breakDuration}
              currentPhase={currentPhase}
              onWorkDurationChange={setWorkDuration}
              onBreakDurationChange={setBreakDuration}
              onApplySettings={handleApplySettings}
            />
          </div>

          <div className="lg:w-[600px]">
            <TaskList />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
