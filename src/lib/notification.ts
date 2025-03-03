export const playNotificationSound = () => {
  const audio = new Audio("/notification.wav");
  audio.play().catch((error) => {
    console.error("Error playing notification sound:", error);
  });
};

export const showNotification = (title: string, body: string) => {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }

  // Check if permission is already granted
  if (Notification.permission === "granted") {
    createNotification(title, body);
  }
  // Otherwise, request permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        createNotification(title, body);
      }
    });
  }
};

const createNotification = (title: string, body: string) => {
  const notification = new Notification(title, {
    body: body,
    icon: "/pomodoro.png",
  });

  // Close the notification after 5 seconds
  setTimeout(() => notification.close(), 5000);
};
