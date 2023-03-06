import Typography from './Typography';
import '../../public/assets/IMG_9315.jpg';
import { useStrapiContentContext } from '../contexts/StrapiContentProvider';

export default function About() {
  const { data } = useStrapiContentContext();
  const { firstParagraph, secondParagraph, thirdParagraph, image, heading } =
    data?.about?.data?.attributes || {};

  return (
    <section className="about" id={heading?.data?.attributes?.sectionId}>
      <Typography
        className="about__heading"
        variant="heading-bold"
        element="h2"
        align="right"
      >
        {heading?.data?.attributes?.heading}
      </Typography>
      <div className="about__content">
        <article className="about__article">
          <Typography className="about__text">{firstParagraph}</Typography>
          <Typography className="about__text about__text--right" align="right">
            {secondParagraph}
          </Typography>
          <Typography className="about__text">{thirdParagraph}</Typography>
        </article>
        <div className="about__image-container">
          <img
            className="about__image"
            loading="lazy"
            src={
              import.meta.env.VITE_STRAPI_URL +
              (image?.data?.attributes?.url || '')
            }
            alt={image?.data?.attributes?.alternativeText || 'me'}
          />
        </div>
      </div>
    </section>
  );
}
