"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DOTS_COUNT = 150;

export function AnimatedBackground() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = Array.from({ length: DOTS_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
    }));
    setDots(newDots);

    const animateDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          x: (dot.x + dot.velocity.x + window.innerWidth) % window.innerWidth,
          y: (dot.y + dot.velocity.y + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const intervalId = setInterval(animateDots, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white dark:bg-gray-300 opacity-50"
          style={{
            width: dot.size,
            height: dot.size,
            x: dot.x,
            y: dot.y,
          }}
          animate={{ x: dot.x, y: dot.y }}
          transition={{ duration: 0.05, ease: "linear" }}
        />
      ))}
    </div>
  );
}
