import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RouteTransitionProps {
  children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '-100vw' }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
