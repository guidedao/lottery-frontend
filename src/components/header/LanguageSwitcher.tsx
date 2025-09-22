'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Globe } from 'lucide-react';
import { useLocale, useRoute, useSchema, useTranslations } from 'next-globe-gen';

export default function LanguageSwitcher() {
    const activeLocale = useLocale();
    const schema = useSchema();
    const route = useRoute();
    const t = useTranslations();

    const handleLanguageChange = (locale: string) => {
        if (locale !== activeLocale) {
            // Navigate to the same route with new locale
            window.location.href = `/${locale}${route}`;
        }
    };

    const getLanguageDisplay = (locale: string) => {
        const labels: Record<string, string> = {
            en: 'EN',
            ru: 'RU',
            de: 'DE',
            pl: 'PL',
            by: 'BY',
            ua: 'UA'
        };

        return labels[locale] ?? locale.toUpperCase();
    };

    return (
        <Select value={activeLocale} onValueChange={handleLanguageChange}>
            <SelectTrigger
                className='w-[94px] bg-transparent dark:bg-transparent border-none text-foreground hover:bg-transparent dark:hover:bg-transparent cursor-pointer shadow-none focus-visible:ring-0 focus-visible:border-transparent'
                aria-label={t('header.languageSelector')}
                role='combobox'
                aria-expanded='false'>
                <Globe className='h-4 w-4 text-foreground' />
                <SelectValue>{getLanguageDisplay(activeLocale)}</SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-background/10 border border-border/60 backdrop-blur-md shadow-none'>
                {schema.locales.map((locale) => (
                    <SelectItem
                        key={locale}
                        value={locale}
                        className='text-foreground/90 focus:bg-foreground/10 focus:text-foreground'
                        aria-label={`${t('header.languageSelector')}: ${getLanguageDisplay(locale)}`}>
                        {getLanguageDisplay(locale)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
