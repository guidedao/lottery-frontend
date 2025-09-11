import Image from 'next/image';
import Link from 'next/link';

import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { WalletConnectButton } from '@/components/header/WalletConnectButton';

import { MobileMenu } from './MobileMenu';

export default function Header() {
    return (
        <header
            className='
                relative w-full z-50
                bg-black/20 backdrop-blur-xs
                mask-b-from-[calc(100%-4px)] mask-b-to-[100%]
            '>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Left - Logo */}
                <div className='flex items-center'>
                    <Link href='/' aria-label='Go to homepage' className='inline-flex items-center'>
                        <Image src='/images/logo.svg' alt='Guide DAO' width={80} height={18} priority />
                    </Link>
                </div>

                {/* Navigation (desktop only) */}
                <nav className='hidden lg:flex items-center gap-2 text-sm'>
                    <Link
                        href='/'
                        className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                        Home
                    </Link>
                    <Link
                        href='/about'
                        className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                        About
                    </Link>
                    <Link
                        href='/faq'
                        className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                        FAQ
                    </Link>
                </nav>

                {/* Right - Language switcher, wallet button, mobile menu */}
                <div className='flex items-center gap-3'>
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
