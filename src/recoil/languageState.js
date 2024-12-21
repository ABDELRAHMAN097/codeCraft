import { atom } from 'recoil';

export const languageState = atom({
  key: 'languageState', 
  default: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
  effects: [
    ({ onSet }) => {
      onSet((newLang) => {
        localStorage.setItem('language', newLang);
      });
    },
  ],
});