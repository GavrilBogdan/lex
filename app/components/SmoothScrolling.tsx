"use client";
import { ReactLenis } from "lenis/react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Learn settings:
        lerp: 0.1, // Inertia (lower = heavier/smoother)
        duration: 1.5, // How long the scroll takes to stop
        smoothWheel: true, // Enable for mouse wheel
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
