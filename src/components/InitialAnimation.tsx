import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InitialAnimationProps {
  children: ReactNode;
  initialPosition: '100vh' | '-100vh';
  delay?: number;
  className?: string;
}

export default function InitialAnimation({
  children,
  initialPosition,
  delay = 0,
  className,
}: InitialAnimationProps) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: initialPosition }}
      transition={{ ease: 'anticipate', duration: 3, delay }}
    >
      {children}
    </motion.div>
  );
}
