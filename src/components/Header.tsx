import { motion } from 'framer-motion';
import Typography from './Typography';

export default function Header() {
  return (
    <section className="header" id="header">
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vh' }}
        transition={{ ease: 'anticipate', duration: 3 }}
      >
        <Typography element="h1" align="right" variant="heading-bold">
          Lubos Tomandl
        </Typography>
      </motion.div>
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '100vh' }}
        transition={{ ease: 'anticipate', duration: 3, delay: 1 }}
      >
        <Typography element="h1" variant="heading-regular">
          Frontend Developer
        </Typography>
      </motion.div>
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vh' }}
        transition={{ ease: 'anticipate', duration: 3, delay: 2 }}
      >
        <Typography element="h1" align="right" variant="heading-light">
          Berlin, DE
        </Typography>
      </motion.div>
    </section>
  );
}
