import React, { useState, useEffect, useRef } from "react";
import "./Countdown.css";
import { CountdownProps } from "./Countdown.type";

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (time: number) => ({
    min: Math.floor(time / 60),
    sec: time % 60,
  });

  const { min, sec } = formatTime(timeLeft);

  return (
    <div className="countdown-container">
      <div className="countdown-item">
        <div className="time">{min?.toString()?.padStart(2, "0")}</div>
      </div>
      <div className="countdown-item">
        <div className="time">{sec?.toString()?.padStart(2, "0")}</div>
      </div>
    </div>
  );
};

export default Countdown;
