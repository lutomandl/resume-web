import { motion } from 'framer-motion';
import { useStrapiContentContext } from '../contexts/StrapiContentProvider';
import Typography from './Typography';

export default function Header() {
  const { data } = useStrapiContentContext();
  const { name, profession, residence } = data?.header?.data?.attributes || {};
  return (
    <section className="header" id="header">
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vh' }}
        transition={{ ease: 'anticipate', duration: 2 }}
      >
        <Typography element="h1" align="right" variant="heading-bold">
          {name}
        </Typography>
      </motion.div>
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '100vh' }}
        transition={{ ease: 'anticipate', duration: 2, delay: 0.1 }}
      >
        <Typography element="h1" variant="heading-regular">
          {profession}
        </Typography>
      </motion.div>
      <motion.div
        className="header__motionDiv"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: '-100vh' }}
        transition={{ ease: 'anticipate', duration: 2, delay: 0.3 }}
      >
        <Typography element="h1" align="right" variant="heading-light">
          {residence}
        </Typography>
      </motion.div>
    </section>
  );
}
