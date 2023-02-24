import Paragraph from './Paragraph';
import Typography from './Typography';

interface AboutProps {
  heading: string;
}

export default function About({ heading }: AboutProps) {
  return (
    <section className="about">
      <Typography element="h2" align="right" variant="heading-bold">
        {heading}
      </Typography>
      <Typography>
        Hey there, I&apos;m Luboš – a frontend engineer based in Berlin. I
        switched from business analysis to coding two years ago, starting with
        basic JavaScript and then building my first Svelte website. Currently,
        I&apos;m fully immersed in the world of React and loving every minute of
        it.
      </Typography>
      <Typography align="right">
        When I&apos;m not coding, I enjoy reading philosophy and theology,
        playing guitar (or trying to), and building Lego cars with my son.
        I&apos;ve also discovered the thrill of bouldering, which is the perfect
        way to unwind after a long day of coding.
      </Typography>
      <Typography>
        Thanks for stopping by my website! If you want to talk coding, good
        coffee (yes, I&apos;m a bit of a snob when it comes to coffee), or
        anything in between – just give me a shout!
      </Typography>
    </section>
  );
}