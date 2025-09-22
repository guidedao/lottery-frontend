import Image from 'next/image';

import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { WalletConnectButton } from '@/components/header/WalletConnectButton';

import { MobileMenu } from './MobileMenu';
import { Link } from 'next-globe-gen';
import { useTranslations } from 'next-globe-gen';

export default function Header() {
    const t = useTranslations();
    return (
        <header
            className='
                relative w-full z-50
                bg-background/20 backdrop-blur-xs
                mask-b-from-[calc(100%-4px)] mask-b-to-[100%]
            '>
            <div className='container mx-auto px-4 py-3 grid items-center grid-cols-2 lg:grid-cols-[1fr_auto_1fr]'>
                {/* Left - Logo */}
                <div className='flex items-center justify-self-start'>
                    <Link href='/' aria-label={t('header.goHomeAria')} className='inline-flex items-center'>
                        <Image src='/images/logo.svg' alt={t('header.logoAlt')} width={80} height={18} priority />
                    </Link>
                </div>

                {/* Navigation (desktop only) */}
                <nav
                    className='hidden lg:flex items-center gap-2 text-sm justify-self-center lg:col-start-2'
                    aria-label={t('header.ariaMainNav')}>
                    <Link
                        href='/'
                        className='inline-flex items-center h-8 rounded-md px-3 text-foreground hover:text-foreground hover:bg-foreground/10 transition-colors'>
                        {t('header.home')}
                    </Link>
                    <Link
                        href={{ pathname: '/', hash: 'about' }}
                        className='inline-flex items-center h-8 rounded-md px-3 text-foreground hover:text-foreground hover:bg-foreground/10 transition-colors'>
                        {t('header.about')}
                    </Link>
                </nav>

                {/* Right - Language switcher, wallet button, mobile menu */}
                <div className='flex items-center gap-3 justify-self-end lg:col-start-3'>
                    <div className='hidden lg:flex'>
                        <LanguageSwitcher />
                    </div>
                    <WalletConnectButton />
                    <div className='lg:hidden'>
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}
