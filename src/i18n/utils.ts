import ro from './ro.json';
import hu from './hu.json';
import en from './en.json';

const ui = {
    ro,
    hu,
    en,
} as const;

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: string) {
        // @ts-ignore
        return key.split('.').reduce((o, i) => o[i], ui[lang]) || key;
    };
}
