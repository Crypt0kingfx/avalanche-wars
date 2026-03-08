"use client";

import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function SnowBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="snow"
        init={particlesInit}
        options={{
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: {
      value: 120,
      density: { enable: true, area: 800 },
    },
    color: { value: ["#ffffff", "#00e5ff", "#93c5fd"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.3, max: 0.8 },
    },
    size: {
      value: { min: 1, max: 4 },
    },
    move: {
      enable: true,
      speed: { min: 0.5, max: 2 },
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