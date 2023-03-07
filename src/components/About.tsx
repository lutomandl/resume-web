import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Typography from './Typography';
import { useStrapiContentContext } from '../contexts/StrapiContentProvider';

export default function About() {
  const { data } = useStrapiContentContext();
  const { firstParagraph, secondParagraph, thirdParagraph, image, heading } =
    data?.about?.data?.attributes || {};

  return (
    <section className="about" id={heading?.data?.attributes?.sectionId}>
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
          {heading?.data?.attributes?.heading}
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
            src={
              import.meta.env.VITE_STRAPI_URL +
              (image?.data?.attributes?.url || '')
            }
            alt={image?.data?.attributes?.alternativeText || 'me'}
          />
        </motion.div>
      </div>
    </section>
  );
}
