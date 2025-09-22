'use client';

import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import { Link, useTranslations } from 'next-globe-gen';

export function MobileMenu() {
    const t = useTranslations();

    return (
        <Sheet>
            {/* Burger button */}
            <SheetTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='text-foreground hover:bg-foreground/10 cursor-pointer'
                    aria-label={t('header.mobileMenuButton')}>
                    <Menu className='h-6 w-6' />
                </Button>
            </SheetTrigger>

            {/* Sidebar menu */}
            <SheetContent
                side='right'
                className='w-72 bg-popover/95 backdrop-blur-xl border-l border-border text-popover-foreground p-6 flex flex-col justify-between'>
                <SheetHeader>
                    <SheetTitle className='sr-only'>{t('header.mobileMenuTitle')}</SheetTitle>
                </SheetHeader>

                {/* Navigation */}
                <nav
                    className='flex flex-col space-y-6 text-lg font-medium'
                    role='navigation'
                    aria-label={t('header.ariaMainNav')}>
                    <Link
                        href='/'
                        className='hover:text-foreground transition-colors'
                        aria-label={t('header.goHomeAria')}>
                        {t('header.home')}
                    </Link>
                    <Link
                        href={{ pathname: '/', hash: 'about' }}
                        className='hover:text-foreground transition-colors'
                        aria-label={t('header.goAboutAria')}>
                        {t('header.about')}
                    </Link>
                </nav>

                {/* Bottom section */}
                <div className='mt-12 pt-6 border-t border-border flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground' id='language-label'>
                        {t('header.language')}
                    </span>
                    <LanguageSwitcher />
                </div>
            </SheetContent>
        </Sheet>
    );
}
