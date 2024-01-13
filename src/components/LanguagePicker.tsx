import clsx from 'clsx';
import { useTranslationsContext } from '../contexts/TranslationsProvider';

export default function LanguagePicker() {
  const { language, changeLanguage } = useTranslationsContext();

  return (
    <div className="languagePicker">
      <button
        className={clsx('languagePicker__button', {
          'languagePicker__button--active': language === 'en',
        })}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={clsx('languagePicker__button', {
          'languagePicker__button--active': language === 'de',
        })}
        onClick={() => changeLanguage('de')}
      >
        DE
      </button>
      <button
        className={clsx('languagePicker__button', {
          'languagePicker__button--active': language === 'cs',
        })}
        onClick={() => changeLanguage('cs')}
      >
        CS
      </button>
    </div>
  );
}
