// components/Home.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import PomodoroCounter from "./PomodoroCounter";
import { motion } from "framer-motion";
import TimerCircle from "./Timer/TimerCircle";
import TimerControls from "./Timer/TimerControls";
import TaskList from "./Tasks/TaskList";
import PageContent from "./PageContent";
import { playNotificationSound, showNotification } from "@/lib/notification";
import { toast } from "@/components/ui/use-toast";

const Home = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"work" | "break">("work");
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [selectedWorkDuration, setSelectedWorkDuration] = useState(25);
  const [selectedBreakDuration, setSelectedBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const { theme, setTheme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const currentPhaseRef = useRef(currentPhase);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    currentPhaseRef.current = currentPhase;
  }, [currentPhase]);

  useEffect(() => {
    workerRef.current = new Worker("/timer-worker.js");

    workerRef.current.onmessage = (e) => {
      if (e.data.action === "tick") {
        setTimeLeft(e.data.timeLeft);
      } else if (e.data.action === "complete") {
        if (!isTransitioningRef.current) {
          isTransitioningRef.current = true;
          handleStep();
        }
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleStart = useCallback(() => {
    setIsRunning(true);
    workerRef.current?.postMessage({ action: "start", timeLeft });
  }, [timeLeft]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
    workerRef.current?.postMessage({ action: "stop" });
  }, []);

  const handleStep = useCallback(() => {
    const nextPhase = currentPhaseRef.current === "work" ? "break" : "work";
    const newDuration = nextPhase === "work" ? workDuration : breakDuration;
    setCurrentPhase(nextPhase);
    setTimeLeft(newDuration * 60);
    setIsRunning(true);

    if (currentPhaseRef.current === "work") {
      setPomodoroCount((prev) => prev + 1);
    }

    playNotificationSound(audioRef.current);
    showNotification(
      `Switching to ${nextPhase} Phase`,
      `Timer set for ${newDuration} minutes.`,
    );
    toast({
      title: `Switching to ${nextPhase} Phase`,
      description: `Timer set for ${newDuration} minutes.`,
    });

    workerRef.current?.postMessage({
      action: "reset",
      timeLeft: newDuration * 60,
    });
    workerRef.current?.postMessage({
      action: "start",
      timeLeft: newDuration * 60,
    });

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 100);
  }, [workDuration, breakDuration]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    workerRef.current?.postMessage({ action: "stop" });
    const resetDuration =
      currentPhase === "work" ? workDuration : breakDuration;
    setTimeLeft(resetDuration * 60);
    workerRef.current?.postMessage({
      action: "reset",
      timeLeft: resetDuration * 60,
    });
  }, [currentPhase, workDuration, breakDuration]);

  const handleApplySettings = useCallback(() => {
    const newWorkDuration = selectedWorkDuration;
    const newBreakDuration = selectedBreakDuration;

    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);

    // Calculate the new timeLeft based on the current phase and the new duration
    const newTimeLeft =
      currentPhase === "work" ? newWorkDuration * 60 : newBreakDuration * 60;

    // Update the timeLeft state
    setTimeLeft(newTimeLeft);

    // If the timer is running, stop it and restart with the new duration
    if (isRunning) {
      workerRef.current?.postMessage({ action: "stop" });
      workerRef.current?.postMessage({
        action: "start",
        timeLeft: newTimeLeft,
      });
    } else {
      // If the timer is not running, just reset it with the new duration
      workerRef.current?.postMessage({
        action: "reset",
        timeLeft: newTimeLeft,
      });
    }
  }, [selectedWorkDuration, selectedBreakDuration, currentPhase, isRunning]);

  return (
    <>
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
              <div className="w-10"></div>
              <h1 className="text-4xl font-bold tracking-tight flex-grow text-center">
                Pomodoro Timer
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10"
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
                />
              </motion.div>

              <PomodoroCounter
                count={pomodoroCount}
                onReset={() => setPomodoroCount(0)}
              />

              <TimerControls
                workDuration={workDuration}
                breakDuration={breakDuration}
                selectedWorkDuration={selectedWorkDuration}
                selectedBreakDuration={selectedBreakDuration}
                currentPhase={currentPhase}
                onWorkDurationChange={setWorkDuration}
                onBreakDurationChange={setBreakDuration}
                onSelectedWorkDurationChange={setSelectedWorkDuration}
                onSelectedBreakDurationChange={setSelectedBreakDuration}
                onApplySettings={handleApplySettings}
              />
            </div>

            <div className="lg:w-[600px]">
              <TaskList />
            </div>
          </div>
          <PageContent />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
