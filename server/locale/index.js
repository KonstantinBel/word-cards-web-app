const ru_RU = require('./ru_RU'); // eslint-disable-line
const en_US = require('./en_US'); // eslint-disable-line

const locales = {
  ru_RU,
  en_US,
  ru: ru_RU,
  en: en_US,
};

function getLocale(locale) {
  return locales[locale] || locales[locale.language] || locales.en_US;
}

module.exports = getLocale;
