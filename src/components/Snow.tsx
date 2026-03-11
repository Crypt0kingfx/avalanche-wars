"use client";

import { useEffect, useState } from "react";

export default function Snow() {
  const [flakes, setFlakes] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }));

    setFlakes(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-80"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}