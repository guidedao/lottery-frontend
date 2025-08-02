'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { WalletConnectButton } from '@/components/header/WalletConnectButton';
import Image from 'next/image';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-globe-gen';

export default function Header() {
    const t = useTranslations('header');
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* Left side - Flag icon and Language switcher */}
                <div className='flex items-center gap-3'>
                    <LanguageSwitcher />
                </div>

                {/* Center - Logo */}
                <div className='flex items-center justify-center'>
                    <h1 className='text-white text-2xl font-bold cursor-pointer'>
                        Guide DAO
                    </h1>
                </div>

                {/* Right side - Wallet connect and menu */}
                <div className='flex items-center gap-3'>
                    <WalletConnectButton />

                    <Button variant='ghost' size='icon' className='text-white hover:bg-white/10 cursor-pointer'>
                        <Menu className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </header>
    );
}
