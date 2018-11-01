import ru_RU from './ru_RU' // eslint-disable-line
import en_US from './en_US' // eslint-disable-line

const locales = {
  ru_RU,
  en_US,
  ru: ru_RU,
  en: en_US,
};

function getLocale(locale) {
  let localeObj;

  if (locale) localeObj = locales[locale];

  if (!localeObj) {
    navigator.languages.some((val) => {
      localeObj = locales[val];
      return !!localeObj;
    });
  }

  if (!localeObj) localeObj = locales.en_US;
  return localeObj;
}

export default getLocale;
