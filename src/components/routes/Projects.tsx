import Heading from '../Heading';

interface ProjectsProps {
  heading: string;
}

export default function Projects({ heading }: ProjectsProps) {
  return (
    <section className="projects">
      <Heading element="h1">{heading}</Heading>
      <p>Coming soon...</p>
    </section>
  );
}
