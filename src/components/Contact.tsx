import ContactForm from './ContactForm';
import Typography from './Typography';

export default function Contact() {
  return (
    <section className="contact">
      <Typography variant="heading-bold">Contact</Typography>
      <Typography>Feel free to send me a message!</Typography>
      <ContactForm />
    </section>
  );
}
