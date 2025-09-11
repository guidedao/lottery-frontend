import Image from 'next/image';
import Link from 'next/link';

import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { WalletConnectButton } from '@/components/header/WalletConnectButton';

import { MobileMenu } from './MobileMenu';

export default function Header() {
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Left - Logo */}
                <div className='flex items-center'>
                    <Link href='/' aria-label='Go to homepage' className='inline-flex items-center'>
                        <Image src='/images/logo.svg' alt='Guide DAO' width={80} height={18} priority />
                    </Link>
                </div>

                {/* Right - Language switcher, wallet button, mobile menu */}
                <div className='flex items-center gap-3'>
                    <LanguageSwitcher />
                    <WalletConnectButton />
                    <div className='lg:hidden'>
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}
