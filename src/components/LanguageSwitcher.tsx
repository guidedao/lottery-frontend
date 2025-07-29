'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useLocale, useRoute, useSchema } from 'next-globe-gen';

export default function LanguageSwitcher() {
    const activeLocale = useLocale();
    const schema = useSchema();
    const route = useRoute();

    const handleLanguageChange = (locale: string) => {
        if (locale !== activeLocale) {
            // Navigate to the same route with new locale
            window.location.href = `/${locale}${route}`;
        }
    };

    return (
        <Select value={activeLocale} onValueChange={handleLanguageChange}>
            <SelectTrigger className='w-[80px] bg-transparent border-none text-white hover:bg-white/10'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {schema.locales.map((locale) => (
                    <SelectItem key={locale} value={locale}>
                        {locale === 'en' ? 'ENG' : 'RU'}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
