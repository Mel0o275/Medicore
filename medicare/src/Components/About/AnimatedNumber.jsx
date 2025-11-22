import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function AnimatedNumber({ to, suffix }) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    const controls = animate(count, to, { duration: 3 });
    return () => controls.stop();
  }, [to]);

  return (
    <motion.span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
