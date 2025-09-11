'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Globe } from 'lucide-react';
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

    const getLanguageDisplay = (locale: string) => {
        return locale === 'en' ? 'EN' : 'RU';
    };

    return (
        <Select value={activeLocale} onValueChange={handleLanguageChange}>
            <SelectTrigger className='w-[94px] bg-transparent border-none text-white hover:bg-white/10 cursor-pointer'>
                <Globe className='h-4 w-4' />

                <SelectValue>{getLanguageDisplay(activeLocale)}</SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-[rgba(15,15,20,0.95)] text-white border-white/10 backdrop-blur-xl'>
                {schema.locales.map((locale) => (
                    <SelectItem
                        key={locale}
                        value={locale}
                        className='text-white/90 focus:bg-white/10 focus:text-white'>
                        {getLanguageDisplay(locale)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
