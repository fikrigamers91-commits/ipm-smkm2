"use client";

import { motion } from "framer-motion";

type Props = {
  variant?: "light" | "dark";
};

export default function DecorShapes({
  variant = "light",
}: Props) {
  const blue =
    variant === "dark"
      ? "bg-ipm-blue/25"
      : "bg-ipm-blue/10";

  const green =
    variant === "dark"
      ? "bg-ipm-green/25"
      : "bg-ipm-green/10";

  const yellow =
    variant === "dark"
      ? "bg-[#F4C430]/20"
      : "bg-[#F4C430]/15";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Hexagon kecil */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -8, 0],
        }}
        transition={{
          rotate: {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className={`absolute left-6 top-10 h-16 w-16 ${blue}`}
        style={{
          clipPath:
            "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
        }}
      />

      {/* Hexagon besar */}
      <motion.div
        animate={{
          rotate: -360,
          y: [0, 12, 0],
        }}
        transition={{
          rotate: {
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          },
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className={`absolute left-24 top-24 h-40 w-40 ${green}`}
        style={{
          clipPath:
            "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
        }}
      />

      {/* Blob kanan */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -right-10 top-20 h-56 w-56 rounded-full ${blue} blur-[90px]`}
      />

      {/* Blob kuning */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -12, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute bottom-10 right-16 h-32 w-32 rounded-full ${yellow} blur-[70px]`}
      />

      {/* Titik dekor */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute right-1/3 top-1/2 h-10 w-10 rounded-full ${green}`}
      />

    </div>
  );
}