'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

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

    const getFlagForLocale = (locale: string) => {
        if (locale === 'en') {
            return (
                <Image
                    src='/images/flag-icon.png'
                    alt='English Flag'
                    width={20}
                    height={15}
                    className='h-auto'
                />
            );
        } else {
            return <span className='text-lg'>🇷🇺</span>;
        }
    };

    return (
        <div className='flex items-center gap-2'>
            {getFlagForLocale(activeLocale)}
            <Select value={activeLocale} onValueChange={handleLanguageChange}>
                <SelectTrigger className='w-[80px] bg-transparent border-none text-white hover:bg-white/10 cursor-pointer'>
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
        </div>
    );
}
