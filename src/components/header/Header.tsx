import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { WalletConnectButton } from '@/components/header/WalletConnectButton';

import { MobileMenu } from './MobileMenu';

export default function Header() {
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Left side - Flag icon and Language switcher */}
                <div className='hidden lg:flex items-center gap-3'>
                    <LanguageSwitcher />
                </div>

                {/* Center - Logo */}
                <div className='flex items-center justify-center'>
                    <h1 className='text-white text-2xl font-bold cursor-pointer'>Guide DAO</h1>
                </div>

                {/* Right side - Wallet connect and menu */}
                <div className='flex items-center gap-3'>
                    <WalletConnectButton />
                    <div className='lg:hidden'>
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}
