"use client";

import Particles from "@tsparticles/react";

export default function SnowBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="snow"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: {
              value: 120,
              density: {
                enable: true,
              },
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.7,
            },
            size: {
              value: { min: 2, max: 5 },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "bottom",
              outModes: { default: "out" },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}