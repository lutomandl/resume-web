import { motion } from 'framer-motion';
import Typography from './Typography';

export default function More() {
  return (
    <section className="more">
      <motion.div
        className="more__title"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ ease: 'anticipate', duration: 1.5 }}
        viewport={{ once: true }}
      >
        <Typography variant="heading-light">More coming soon</Typography>
      </motion.div>
      <motion.div
        className="more__text"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ ease: 'anticipate', duration: 1.5 }}
        viewport={{ once: true }}
      >
        <Typography>
          In the meantime, checkout my profile on{' '}
          <a href="https://www.linkedin.com/in/lubos-tomandl/" target="blank">
            LinkedIn
          </a>{' '}
          where you can also get in touch.
        </Typography>
      </motion.div>
    </section>
  );
}
