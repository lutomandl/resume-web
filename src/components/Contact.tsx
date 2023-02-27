import Heading from './Header';

interface CuntactProps {
  heading: string;
}

export default function Contact({ heading }: CuntactProps) {
  return (
    <section className="contact">
      <h2>{heading}</h2>
      <p>Coming soon...</p>
    </section>
  );
}
