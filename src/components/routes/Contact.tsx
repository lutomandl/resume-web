import Heading from '../Heading';

interface CuntactProps {
  heading: string;
}

export default function Contact({ heading }: CuntactProps) {
  return (
    <section className="contact">
      <Heading element="h1">{heading}</Heading>
      <p>Coming soon...</p>
    </section>
  );
}
