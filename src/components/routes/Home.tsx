import { useLocomotiveScroll } from 'react-locomotive-scroll';
import Heading from '../Heading';
import InitialAnimation from '../InitialAnimation';

export default function Home() {
  return (
    <section data-scroll-section className="home" id="home">
      <InitialAnimation initialPosition="-100vh" className="home__motionDiv">
        <h1 className="heading heading--right">LUBOS TOMANDL</h1>
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
