import Heading from './Header';

interface ExperienceProps {
  heading: string;
}

export default function Experience({ heading }: ExperienceProps) {
  return (
    <section className="experience">
      <Heading element="h1">{heading}</Heading>
      <p>Coming soon...</p>
    </section>
  );
}
