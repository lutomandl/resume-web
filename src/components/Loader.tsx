import { motion } from 'framer-motion';
import Typography from './Typography';

export default function Loader() {
  return (
    <div className="loader">
      <motion.div
        className="loader__circle"
        animate={{
          scale: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 2,
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
        }}
      >
        LT
      </motion.div>
    </div>
  );
}
