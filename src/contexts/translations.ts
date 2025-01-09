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
};

type Translations = {
  [key in LanguageEnum]: TranslationObject;
};

export const translations: Translations = {
  en: {
    menu: {
      about: 'about',
      //   experience: 'experience',
      //   projects: 'projects',
      //   contact: 'contact',
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
  },
  de: {
    menu: {
      about: 'über mich',
      //   experience: 'erfahrung',
      //   projects: 'projekte',
      //   contact: 'kontakt',
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
  },
  cs: {
    menu: {
      about: 'o mně',
      //   experience: 'zkušenosti',
      //   projects: 'projekty',
      //   contact: 'kontakt',
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
  },
};
