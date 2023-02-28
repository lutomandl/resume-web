import Typography from './Typography';
import '../../public/assets/IMG_9315.jpg';

export default function About() {
  return (
    <section className="about">
      <Typography
        className="about__heading"
        variant="heading-bold"
        element="h2"
        align="right"
      >
        About
      </Typography>
      <div className="about__content">
        <article className="about__article">
          <Typography className="about__text">
            Hey there, I&apos;m Luboš – a frontend engineer based in Berlin. I
            switched from business analysis to coding two years ago, starting
            with basic JavaScript and then building my first Svelte website.
            Currently, I&apos;m fully immersed in the world of React and loving
            every minute of it.
          </Typography>
          <Typography className="about__text about__text--right" align="right">
            When I&apos;m not coding, I enjoy reading philosophy and theology,
            playing guitar (or trying to), and building Lego cars with my son.
            I&apos;ve also discovered the thrill of bouldering, which is the
            perfect way to unwind after a long day of coding.
          </Typography>
          <Typography className="about__text">
            Thanks for stopping by my website! If you want to talk coding, good
            coffee (yes, I&apos;m a bit of a snob when it comes to coffee), or
            anything in between – just give me a shout!
          </Typography>
        </article>
        <div className="about__image-container">
          <img
            className="about__image"
            loading="lazy"
            src="/assets/IMG_9315.jpg"
            alt="me"
          />
        </div>
      </div>
    </section>
  );
}
