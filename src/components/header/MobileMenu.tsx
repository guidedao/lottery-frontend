'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { Menu } from 'lucide-react';

export function MobileMenu() {
    return (
        <Sheet>
            {/* Burger button */}
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='text-white hover:bg-white/10 cursor-pointer'>
                    <Menu className='h-6 w-6' />
                </Button>
            </SheetTrigger>

            {/* Sidebar menu */}
            <SheetContent
                side='right'
                className='w-72 bg-[rgba(15,15,20,0.95)] backdrop-blur-xl border-l border-white/10 text-white p-6 flex flex-col justify-between'>
                <SheetHeader>
                    <SheetTitle className='sr-only'>Mobile Navigation menu</SheetTitle>
                </SheetHeader>

                {/* Navigation */}
                <nav className='flex flex-col space-y-6 text-lg font-medium'>
                    <a href='/' className='hover:text-cyan-400 transition-colors'>
                        Home
                    </a>
                    <a href='/about' className='hover:text-cyan-400 transition-colors'>
                        About
                    </a>
                    <a href='/faq' className='hover:text-cyan-400 transition-colors'>
                        FAQ
                    </a>
                </nav>

                {/* Bottom section */}
                <div className='mt-12 pt-6 border-t border-white/10 flex items-center justify-between'>
                    <span className='text-sm text-gray-400'>Language</span>
                    <LanguageSwitcher />
                </div>
            </SheetContent>
        </Sheet>
    );
}
