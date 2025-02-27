import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import PomodoroCounter from "./PomodoroCounter";
import { motion } from "framer-motion";
import TimerCircle from "./Timer/TimerCircle";
import TimerControls from "./Timer/TimerControls";
import TaskList from "./Tasks/TaskList";
import { Helmet } from "react-helmet-async";
import PageContent from "./PageContent";

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
    if (currentPhase === "work") {
      setPomodoroCount((prev) => prev + 1);
    }
    handleStart();
  };

  const handleApplySettings = () => {
    setTimeLeft(
      currentPhase === "work" ? workDuration * 60 : breakDuration * 60,
    );
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      handleStep();
    }
  }, [timeLeft]);

  return (
    <>
      <Helmet>
        <title>
          Pomodoro Timer — Optimize Your Time
        </title>
        <meta
          name="description"
          content="Unlock your productivity potential with the Pomodoro Technique. Learn how to manage time effectively, increase focus, and achieve more in less time. Start your journey to success today!"
        />
        <meta
          name="keywords"
          content="Pomodoro Technique, Pomodoro Timer, time management, productivity, focus, work efficiency, procrastination, task management, time blocking, work-life balance"
        />
        <meta
          property="og:title"
          content="Pomodoro Timer — Optimize Your Time"
        />
        <meta
          property="og:description"
          content="Discover how the Pomodoro Technique can revolutionize your work habits. Boost focus, manage time effectively, and accomplish more. Perfect for professionals, students, and anyone looking to optimize their productivity in 2025."
        />
        <meta
          name="twitter:title"
          content="Pomodoro Timer — Optimize Your Time"
        />
        <meta
          name="twitter:description"
          content="Learn the secrets of time management with the Pomodoro Technique. Enhance focus, beat procrastination, and skyrocket your productivity. Start your efficiency journey now!"
        />
      </Helmet>
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
          <PageContent />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
