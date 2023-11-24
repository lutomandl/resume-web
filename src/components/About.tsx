import { motion } from 'framer-motion';
import Typography from './Typography';
import { useTranslationsContext } from '../contexts/TranslationsProvider';

export default function About() {
  const { translations } = useTranslationsContext();
  const { firstParagraph, secondParagraph, thirdParagraph, heading } =
    translations.about;

  return (
    <section className="about" id="about">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ ease: 'anticipate', duration: 1.5 }}
        viewport={{ once: true }}
      >
        <Typography
          className="about__heading"
          variant="heading-bold"
          element="h2"
          align="right"
        >
          {heading}
        </Typography>
      </motion.div>
      <div className="about__content">
        <article className="about__article">
          <motion.div
            className="about__text"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ease: 'anticipate', duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Typography>{firstParagraph}</Typography>
          </motion.div>
          <motion.div
            className="about__text about__text--right"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ease: 'anticipate', duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Typography align="right">{secondParagraph}</Typography>
          </motion.div>
          <motion.div
            className="about__text"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ ease: 'anticipate', duration: 1.5 }}
            viewport={{ once: true }}
          >
            <Typography>{thirdParagraph}</Typography>
          </motion.div>
        </article>
        <motion.div
          className="about__image-container"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'anticipate', duration: 1.5 }}
          viewport={{ once: true }}
        >
          <img
            className="about__image"
            loading="lazy"
            src="/assets/about_image.webp"
            alt="me and my son"
          />
        </motion.div>
      </div>
    </section>
  );
}
