import Heading from './Heading';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <article className="page">
      <motion.div
        className="motion-div"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vw' }}
        transition={{ ease: 'anticipate', duration: 3 }}
        exit={{ opacity: 0, x: '-100vw' }}
      >
        <Heading align="right">LUBOS TOMANDL</Heading>
      </motion.div>
      <motion.div
        className="motion-div"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '100vw' }}
        transition={{ ease: 'anticipate', delay: 1, duration: 3 }}
        exit={{ opacity: 0, x: '100vw' }}
      >
        <Heading element="h2">FRONTEND DEVELOPER</Heading>
      </motion.div>
      <motion.div
        className="motion-div"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vw' }}
        transition={{ ease: 'anticipate', delay: 2, duration: 3 }}
        exit={{ opacity: 0, x: '-100vw' }}
      >
        <Heading element="h3" align="right">
          BERLIN, DE
        </Heading>
      </motion.div>
    </article>
  );
}
