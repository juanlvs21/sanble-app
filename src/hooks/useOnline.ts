import { useEffect, useState } from "react";

export const useOnline = () => {
  const [online, setOnline] = useState(navigator.onLine);

  const handleOnline = () => {
    console.log("We are online!");
    setOnline(true);
  };

  const handleOffline = () => {
    console.log("We are offline!");
    setOnline(false);
  };

  // Register the event listeners
  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return {
    online,
  };
};
