"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  return (
    <motion.div
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`reveal ${inView ? "is-revealed" : ""} ${className}`.trim()}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
