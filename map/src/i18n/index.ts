import { Strings } from './iface';
import en from './langs/en';
import ru from './langs/ru';

const STRINGS = {
  en,
  ru,
};

type Language = keyof typeof STRINGS;

const selectedLanguage = localStorage.getItem('selectedLanguage');

const queryLanguage = window.location.href.split('/')[3];

const browserLanguage = window.navigator.language.split('-')[0];

const isValidLanguage = (lang: string | null): lang is Language =>
  !!(lang && lang in STRINGS);

const getLanguage = (): Language => {
  if (isValidLanguage(selectedLanguage)) {
    return selectedLanguage;
  }
  if (isValidLanguage(queryLanguage)) {
    return queryLanguage;
  }
  if (isValidLanguage(browserLanguage)) {
    return browserLanguage;
  }
  return 'en';
};

export const t = (extract: (s: Strings) => string): string =>
  extract(STRINGS[getLanguage()]);
