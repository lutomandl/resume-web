import Heading from '../Heading';

export default function About() {
  return (
    <section className="about">
      <Heading element="h1" align="right">
        ABOUT
      </Heading>
      <article className="about__text">
        Hi, I'm Luboš! I'm a frontend engineer based in Berlin, with a passion
        for building dynamic and user-friendly web applications using React.
        When I'm not coding, I'm usually indulging in my other interests, like
        studying theology, playing guitar or bouldering. I'm also a bit of a
        coffee snob, always on the lookout for the perfect brew. Thanks for
        stopping by my website, and feel free to get in touch on{' '}
        <a href="https://www.linkedin.com/in/lubos-tomandl/" target="_blank">
          LinkedIn
        </a>
        .
      </article>
    </section>
  );
}
