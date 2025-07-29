'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-globe-gen';

export default function Header() {
    const t = useTranslations('header');
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Left side - Language switcher */}
                <div className='flex items-center'>
                    <LanguageSwitcher />
                </div>

                {/* Center - Logo/Brand */}
                <div className='flex items-center'>
                    <h1 className='text-green-400 font-mono text-lg font-bold'>{t('title')}</h1>
                </div>

                {/* Right side - Wallet connect and menu */}
                <div className='flex items-center gap-3'>
                    <Button variant='outline' size='sm' className='bg-white text-black hover:bg-gray-100 border-white'>
                        {t('wallet')}
                    </Button>

                    <Button variant='ghost' size='icon' className='text-white hover:bg-white/10'>
                        <Menu className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </header>
    );
}
