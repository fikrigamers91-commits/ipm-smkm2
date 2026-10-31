"use client";

import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-9999 h-1 origin-left bg-[#0eec63]"
      style={{
        scaleX: scrollYProgress,
        width: "100%",
      }}
    />
  );
}