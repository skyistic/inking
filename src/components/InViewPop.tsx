import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function InViewPop({ action, delay, children }: { action?: string, delay?: number, children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: action === "up" ? 20 : -20, scale: action === "up" ? 1 : 1.05 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : action === "up" ? 20 : -20, scale: isInView || action === "up" ? 1 : 1.05 }}
      transition={{ duration: 0.3, stiffness: 100, damping: 10, delay: delay ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}