import { LanguageEnum, MenuItems } from '../types';

export type TranslationObject = {
  menu: MenuItems;
  header: {
    name: string;
    title: string;
    city: string;
  };
  about: {
    heading: string;
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
  };
  contactForm: {
    name: string;
    email: string;
    message: string;
    submit: string;
    generalError: string;
    successMessage: string;
    nameMissing: string;
    emailMissing: string;
    messageMissing: string;
    nameTooLong: string;
    emailInvalid: string;
    messageTooLong: string;
  };
};

type Translations = {
  [key in LanguageEnum]: TranslationObject;
};

export const translations: Translations = {
  en: {
    menu: {
      about: 'about',
      contact: 'contact',
      //   experience: 'experience',
      //   projects: 'projects',
    },
    header: {
      name: 'Lubos Tomandl',
      title: 'Frontend Engineer',
      city: 'Berlin, DE',
    },
    about: {
      heading: 'About me',
      firstParagraph:
        'Hey there! My name is Lubos and I am a frontend engineer based in Berlin, Germany. My main focus is on building modern web applications using React and TypeScript, but I also have experience with Svelte or Vue.',
      secondParagraph:
        'When I am not coding, I enjoy reading philosophy or theology or playing guitar. I have also recently discovered the thrill of bouldering. ',
      thirdParagraph:
        'Thanks for stopping by my website! If you want to talk coding, books, or have a coffee – just give me a shout!',
    },
    contactForm: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Submit',
      generalError: 'Something went wrong, please try again.',
      successMessage:
        'Thanks, your message was successfully sent. I will be in touch soon.',
      nameMissing: 'Please enter your name',
      emailMissing: 'Please enter your email',
      messageMissing: 'Please enter the message you want to send me',
      nameTooLong: 'Name is too long',
      emailInvalid: 'Email is not in the right format',
      messageTooLong: 'Message is too long',
    },
  },
  de: {
    menu: {
      about: 'über mich',
      contact: 'kontakt',
      //   experience: 'erfahrung',
      //   projects: 'projekte',
    },
    header: {
      name: 'Lubos Tomandl',
      title: 'Frontend Engineer',
      city: 'Berlin, DE',
    },
    about: {
      heading: 'Über mich',
      firstParagraph:
        'Hallo! Ich bin Lubos und ich bin ein Frontend Engineer in Berlin, Deutschland. Ich konzentriere mich auf den Bau moderner Webanwendungen mit React und TypeScript, habe aber auch Erfahrung mit Svelte oder Vue.',
      secondParagraph:
        'Wenn ich nicht programmiere, lese ich gerne Philosophie oder Theologie oder spiele Gitarre. Ich habe auch kürzlich den Nervenkitzel des Boulderns entdeckt.',
      thirdParagraph:
        'Vielen Dank, dass Sie meine Website besucht haben! Wenn Sie über Programmierung, Bücher sprechen oder einen Kaffee trinken möchten - melden Sie sich einfach!',
    },
    contactForm: {
      name: 'Name',
      email: 'Email',
      message: 'Nachricht',
      submit: 'Senden',
      generalError: 'Etwas ist schief gelaufen, bitte versuchen Sie es erneut.',
      successMessage:
        'Vielen Dank, Ihre Nachricht wurde erfolgreich gesendet. Ich werde mich bald bei Ihnen melden.',
      nameMissing: 'Bitte geben Sie Ihren Namen ein',
      emailMissing: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      messageMissing:
        'Bitte geben Sie die Nachricht ein, die Sie mir senden möchten',
      nameTooLong: 'Name ist zu lang',
      emailInvalid: 'E-Mail ist nicht im richtigen Format',
      messageTooLong: 'Nachricht ist zu lang',
    },
  },
  cs: {
    menu: {
      about: 'o mně',
      contact: 'kontakt',
      //   experience: 'zkušenosti',
      //   projects: 'projekty',
    },
    header: {
      name: 'Luboš Tomandl',
      title: 'Frontend Engineer',
      city: 'Berlín, DE',
    },
    about: {
      heading: 'O mně',
      firstParagraph:
        'Ahoj! Jmenuju se Luboš a jsem frontend engineer, momentálně žijící v Berlíně. Zaměřuju se na vývoj moderních webových aplikací pomocí Reactu a TypeScriptu, ale mám také zkušenosti se Svelte nebo Vue.',
      secondParagraph:
        'Když zrovna neprogramuju, rád čtu filozofii, teologii nebo hraju na kytaru. Nedávno jsem také objevil krásu boulderingu.',
      thirdParagraph:
        'Díky, že jste navštívili mojí webovou stránku! Pokud chcete pokecat o programování, knížkých nebo zajít na kafe - stačí mi dát vědět!',
    },
    contactForm: {
      name: 'Jméno',
      email: 'Email',
      message: 'Zpráva',
      submit: 'Odeslat',
      generalError: 'Něco se pokazilo, zkuste to prosím znovu.',
      successMessage: 'Díky, zpráva byla úspěšně odeslána. Brzy se ozvu.',
      nameMissing: 'Prosím vyplňte vaše jméno',
      emailMissing: 'Prosím vyplňte váš email',
      messageMissing: 'Prosím vyplňte zprávu, kterou mi chcete poslat',
      nameTooLong: 'Jméno je příliš dlouhé',
      emailInvalid: 'Email není ve správném formátu',
      messageTooLong: 'Zpráva je příliš dlouhá',
    },
  },
};
