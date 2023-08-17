import { useSocket } from "@/src/hooks/useSocket";
import React, { useEffect, useRef, useState } from "react";

interface Props {}

export const NotificationAdmin = ({}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const colors = [
    "bg-red-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-rose-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-purple-500",
  ];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const { newOrderData, setNewOrderOrderData } = useSocket();

  useEffect(() => {
    setOpen(!!newOrderData);
    setTimeout(() => playAudio(), 2000);
  }, [newOrderData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const playAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.log("Failed to play audio:", error);
      });
    }
  };
  return (
    <>
      {open ? (
        <div
          className={`${colors[currentColorIndex]} fixed z-50  w-full h-screen top-0 flex justify-center items-center`}
          onClick={() => {
            setOpen(false);
            setNewOrderOrderData("");
          }}
        >
          <h1 className="text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">
            Przyszło nowe zamówienie...
          </h1>
          <audio ref={audioRef} autoPlay>
            <source src={process.env.api1Url + "/audio"} type="audio/mpeg" />
          </audio>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
