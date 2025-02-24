import React from "react";

const PageContent: React.FC = () => {
  return (
    <section className="pomodoro-explanation mt-12 bg-card rounded-lg p-6 shadow-md">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/pomodoro.png"
          alt="Pomodoro Timer"
          className="w-20 h-20 object-cover rounded shadow-md"
        />
        <h2 className="text-2xl font-bold mb-4 text-center">
          Unlock Your Productivity with the Pomodoro Technique
        </h2>
        <p className="text-lg text-center mt-4">
          A simple yet powerful time management method to boost your focus and
          productivity.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        What is the Pomodoro Technique? A Time Management Mastery Guide
      </h2>
      <p className="mb-4">
        The Pomodoro Technique is a powerful time management method developed by
        Francesco Cirillo in the late 1980s. This productivity hack uses a timer
        to break work into focused intervals, typically 25 minutes in length,
        called "pomodoros," separated by short breaks.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        Benefits of the Pomodoro Technique for Productivity:
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            1
          </span>
          Enhances focus and concentration, leading to increased productivity
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            2
          </span>
          Reduces mental fatigue and prevents burnout by incorporating regular
          breaks
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            3
          </span>
          Makes large projects less daunting by breaking them into manageable
          chunks
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            4
          </span>
          Improves time management skills and awareness of how you spend your
          time
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            5
          </span>
          Helps overcome procrastination and boosts motivation
        </li>
      </ul>

      <p className="mb-4">
        By incorporating the Pomodoro Technique into your daily routine, you can
        master time management, beat procrastination, and significantly boost
        your productivity in various professional tasks.
      </p>

      <h3 className="text-xl font-semibold mb-2">
        How the Pomodoro Technique Works:
      </h3>
      <ol className="list-decimal list-inside mb-4">
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            1
          </span>
          Choose a task to focus on
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            2
          </span>
          Set the Pomodoro timer for 25 minutes
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            3
          </span>
          Work on the task with laser-sharp focus until the timer rings
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            4
          </span>
          Take a short 5-minute break to recharge
        </li>
        <li className="flex items-start mb-2">
          <span className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mr-2">
            5
          </span>
          After completing four pomodoros, take a longer 15-30 minute break
        </li>
      </ol>

      <p className="text-lg text-center mt-8">
        By incorporating the Pomodoro Technique into your daily routine, you can
        master time management, beat procrastination, and significantly boost
        your productivity in various professional tasks.
      </p>

      <div className="flex justify-center mt-8">
        <button
          onClick={goToTop}
          className="bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 font-bold py-2 px-4 rounded transition duration-200"
        >
          Start Your First Pomodoro Session Now!
        </button>
      </div>
    </section>
  );
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default PageContent;
