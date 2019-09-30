const locale = navigator.language || 'en-US';

const shortDate = new Intl.DateTimeFormat(locale);
const longDate = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export { shortDate, longDate };
