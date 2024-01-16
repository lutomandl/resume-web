import clsx from 'clsx';
import { useTranslationsContext } from '../contexts/TranslationsProvider';
import Typography from './Typography';

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
        <Typography>EN</Typography>
      </button>
      <div className="languagePicker__separator" />
      <button
        className={clsx('languagePicker__button', {
          'languagePicker__button--active': language === 'de',
        })}
        onClick={() => changeLanguage('de')}
      >
        <Typography>DE</Typography>
      </button>
      <div className="languagePicker__separator" />
      <button
        className={clsx('languagePicker__button', {
          'languagePicker__button--active': language === 'cs',
        })}
        onClick={() => changeLanguage('cs')}
      >
        <Typography>CS</Typography>
      </button>
    </div>
  );
}
