import ro from './ro.json';
import hu from './hu.json';
import en from './en.json';

const ui = {
    ro,
    hu,
    en,
} as const;

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: string): string {
        try {
            // @ts-ignore
            const result = key.split('.').reduce((o, i) => (o ? o[i] : undefined), ui[lang]);
            return typeof result === 'string' ? result : key;
        } catch (e) {
            return key;
        }
    };
}
