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
  },
};
