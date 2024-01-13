import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Typography from './Typography';
import {
  EMAIL_REGEX,
  NAME_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
} from '../utils/constants';
import { useTranslationsContext } from '../contexts/TranslationsProvider';

const emailJsService = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const { translations } = useTranslationsContext();
  const {
    name,
    email,
    message,
    submit,
    successMessage,
    generalError,
    nameMissing,
    emailMissing,
    messageMissing,
    nameTooLong,
    emailInvalid,
    messageTooLong,
  } = translations.contactForm;

  const validateForm = () => {
    setFormError('');

    if (!formValues.name) {
      setFormError(nameMissing);
      return false;
    }

    if (!formValues.email) {
      setFormError(emailMissing);
      return false;
    }

    if (!formValues.message) {
      setFormError(messageMissing);
      return false;
    }

    if (formValues.name.length > NAME_MAX_LENGTH) {
      setFormError(nameTooLong);
      return false;
    }

    if (EMAIL_REGEX.test(formValues.email) === false) {
      setFormError(emailInvalid);
      return false;
    }

    if (formValues.message.length > MESSAGE_MAX_LENGTH) {
      setFormError(messageTooLong);
      return false;
    }

    return true;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const clearFormState = () => {
    setFormValues({
      name: '',
      email: '',
      message: '',
    });
    setFormError('');
    setFormSuccess(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    emailjs
      .sendForm(
        emailJsService,
        emailJsTemplate,
        form.current as HTMLFormElement,
        emailJsPublicKey
      )
      .then(
        () => {
          setFormSuccess(true);
        },
        (error) => {
          setFormError(generalError);
          throw error;
        }
      );
  };

  return (
    <section className="contactForm">
      <form onSubmit={handleSubmit} noValidate ref={form}>
        <label htmlFor="name" className="contactForm__label">
          <Typography variant="label">{name}</Typography>
          <input
            type="text"
            id="name"
            name="name"
            className="contactForm__input"
            onChange={handleChange}
            onFocus={formSuccess ? clearFormState : undefined}
          />
        </label>
        <label htmlFor="email" className="contactForm__label">
          <Typography variant="label">{email}</Typography>
          <input
            type="email"
            id="email"
            name="email"
            className="contactForm__input"
            onChange={handleChange}
            onFocus={formSuccess ? clearFormState : undefined}
          />
        </label>
        <label htmlFor="message" className="contactForm__label">
          <Typography variant="label">{message}</Typography>
          <textarea
            id="message"
            name="message"
            className="contactForm__input"
            onChange={handleChange}
            onFocus={formSuccess ? clearFormState : undefined}
          />
        </label>
        {formError && <Typography variant="label">{formError}</Typography>}
        {formSuccess && (
          <Typography variant="label">{successMessage}</Typography>
        )}
        <button className="contactForm__button" type="submit">
          {submit}
        </button>
      </form>
    </section>
  );
}
