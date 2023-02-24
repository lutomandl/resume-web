interface ProjectsProps {
  heading: string;
}

export default function Projects({ heading }: ProjectsProps) {
  return (
    <section className="projects">
      <h2>{heading}</h2>
      <p>Coming soon...</p>
    </section>
  );
}
