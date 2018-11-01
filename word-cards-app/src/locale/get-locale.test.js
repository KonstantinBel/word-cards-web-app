import getLocale from './get-locale';

describe('get-locale.js', () => {
  it('отдает существующую локаль ru', () => {
    const locale = getLocale('ru');
    expect(locale.localeName).toBe('ru_RU');
  });
  it('отдает существующую локаль en', () => {
    const locale = getLocale('en');
    expect(locale.localeName).toBe('en_US');
  });
  it('отдает существующую локаль en_US', () => {
    const locale = getLocale('en_US');
    expect(locale.localeName).toBe('en_US');
  });
  it('отдает локаль браузера локаль, если передаваемая не найдена', () => {
    const locale = getLocale('qwe');
    expect(locale.localeName).toBe('en_US');
  });
  it('отдает локаль браузера локаль, если не передано значение', () => {
    const locale = getLocale();
    expect(locale.localeName).toBe('en_US');
  });
});
