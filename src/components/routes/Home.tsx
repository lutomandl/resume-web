import Heading from '../Heading';
import InitialAnimation from '../InitialAnimation';

export default function Home() {
  return (
    <section className="home">
      <InitialAnimation initialPosition="-100vh" className="home__motionDiv">
        <Heading align="right">LUBOS TOMANDL</Heading>
      </InitialAnimation>
      <InitialAnimation
        initialPosition="100vh"
        delay={1}
        className="home__motionDiv"
      >
        <Heading element="h2">FRONTEND DEVELOPER</Heading>
      </InitialAnimation>
      <InitialAnimation
        initialPosition="-100vh"
        delay={2}
        className="home__motionDiv"
      >
        <Heading element="h3" align="right">
          BERLIN, DE
        </Heading>
      </InitialAnimation>
    </section>
  );
}
