// public/timer-worker.js
let interval;
let timeLeft;
let isRunning = false;

self.onmessage = function (e) {
  if (e.data.action === "start") {
    timeLeft = e.data.timeLeft;
    isRunning = true;
    runTimer();
  } else if (e.data.action === "stop") {
    isRunning = false;
    clearInterval(interval);
  } else if (e.data.action === "reset") {
    timeLeft = e.data.timeLeft;
    self.postMessage({ action: "tick", timeLeft });
  }
};

function runTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (isRunning && timeLeft > 0) {
      timeLeft--;
      self.postMessage({ action: "tick", timeLeft });
    }
    if (timeLeft <= 0) {
      clearInterval(interval);
      isRunning = false;
      self.postMessage({ action: "complete" });
    }
  }, 1000);
}
