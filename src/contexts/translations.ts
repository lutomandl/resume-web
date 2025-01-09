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
      title: 'Software Engineer',
      city: 'Berlin, DE',
    },
    about: {
      heading: 'About me',
      firstParagraph:
        'Hey there! My name is Lubos and I am a software engineer based in Berlin, Germany. I am happy you found your way to my website.',
      secondParagraph:
        'I focus on building modern web applications using React and TypeScript, but I also have experience with Svelte or Vue.',
      thirdParagraph:
        'Before becoming a developer, I worked for about six years as a business analyst, which provides me with a solid understanding of the software development lifecycle and agile workflows as well as insight into customer and user perspectives. I thrive in a collaborative environment and enjoy working with people from different backgrounds.',
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
      title: 'Software Engineer',
      city: 'Berlin, DE',
    },
    about: {
      heading: 'Über mich',
      firstParagraph:
        'Hallo! Ich bin Lubos und ich bin ein Software Engineer in Berlin, Deutschland. Ich bin froh, dass Sie den Weg zu meiner Website gefunden haben.',
      secondParagraph:
        'Ich konzentriere mich auf den Bau moderner Webanwendungen mit React und TypeScript, habe aber auch Erfahrung mit Svelte oder Vue.',
      thirdParagraph:
        'Vor meiner Tätigkeit als Entwickler habe ich etwa sechs Jahre als Business Analyst gearbeitet, was mir ein solides Verständnis des Softwareentwicklungszyklus und agiler Workflows sowie Einblicke in Kunden- und Benutzerperspektiven ermöglicht. Ich gedeihe in einer kollaborativen Umgebung und arbeite gerne mit Menschen aus verschiedenen Hintergründen zusammen.',
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
      title: 'Software Engineer',
      city: 'Berlín, DE',
    },
    about: {
      heading: 'O mně',
      firstParagraph:
        'Ahoj! Jmenuju se Luboš a jsem frontend engineer, momentálně žijící v Berlíně. Jsem rád, že jste našli cestu na můj web.',
      secondParagraph:
        'Zaměřuji se na vývoj moderních webových aplikací s využitím Reactu a TypeScriptu, ale mám také zkušenosti s Vue nebo Svelte.',
      thirdParagraph:
        'Předtím, než jsem se stal vývojářem, jsem pracoval asi šest let jako business analytik, což mi poskytuje přehled ve vývoje softwaru a agilních metodikách i schopnost vidět produkt očima zákazníku i uživatele. Jsem schopen dobře pracovat v týpu a rád dělám s lidmi z různých prostředí.',
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
