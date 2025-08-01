"use client";

/* A client side component for showing the time to prevent showing server time due to SSR*/

import { format } from "date-fns";
import { useEffect, useState } from "react";

const Time = () => {
  const [isMounted, setisMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const time = format(currentTime, "h:mm a");
  const date = format(currentTime, "EEEE, MMMM dd, yyyy");

  useEffect(() => {
    setisMounted(true);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isMounted) return null; //prevent hyderation error

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#E0E0E0' }}>
          {time}
        </h1>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium" style={{ color: '#A0A0A0' }}>
          {date}
        </p>
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#1ABC9C' }}></div>
          <span className="text-xs font-medium" style={{ color: '#1ABC9C' }}>Live</span>
        </div>
      </div>
    </div>
  );
};

export default Time;

