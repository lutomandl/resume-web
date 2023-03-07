import Typography from './Typography';

export default function More() {
  return (
    <section className="more">
      <Typography variant="heading-light" className="more__title">
        More coming soon
      </Typography>
      <Typography className="more__text">
        In the meantime, checkout my profile on{' '}
        <a href="https://www.linkedin.com/in/lubos-tomandl/" target="blank">
          LinkedIn
        </a>{' '}
        where you can also get in touch.
      </Typography>
    </section>
  );
}
