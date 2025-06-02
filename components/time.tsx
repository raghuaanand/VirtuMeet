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
    <div className="flex flex-col items-center gap-3 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl animate-pulse">
        {time}
      </h1>
      <p className="text-sm md:text-lg lg:text-2xl font-medium text-gray-200/90 tracking-wide">
        {date}
      </p>
      {/* Decorative dots */}
      <div className="flex gap-2 mt-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default Time;
