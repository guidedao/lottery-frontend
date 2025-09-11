'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-globe-gen';

export function Footer() {
    const t = useTranslations();

    return (
        <footer
            className='
                relative z-50
                bg-black/20 backdrop-blur-xs
            '
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black 4px, black 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0, black 4px, black 100%)'
            }}>
            <div className='container mx-auto px-4 py-4 lg:py-5 text-white'>
                {/* Top: navigation */}
                <div className='flex flex-col items-center gap-3'>
                    <nav aria-label='Footer' className='flex items-center flex-wrap justify-center gap-2 text-sm'>
                        <Link
                            href='/'
                            className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                            Home
                        </Link>
                        <Link
                            href='/about'
                            className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                            {t('footer.about')}
                        </Link>
                        <Link
                            href='/faq'
                            className='inline-flex items-center h-8 rounded-md px-3 text-white hover:text-white hover:bg-white/10 transition-colors'>
                            {t('footer.faq')}
                        </Link>
                    </nav>

                    {/* Below: socials (icons only, including email) */}
                    <div className='flex items-center justify-center gap-2 sm:gap-3 text-white/85'>
                        <a
                            href='https://t.me/guidedao_eth'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Telegram'
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'>
                            <Image
                                src='/icons/telegram.svg'
                                alt='Telegram'
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://twitter.com/GuideDAO'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='X (Twitter)'
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'>
                            <Image
                                src='/icons/twitter-x.svg'
                                alt='X'
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://discord.gg/8X9P9r3udx'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Discord'
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'>
                            <Image
                                src='/icons/discord.svg'
                                alt='Discord'
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://github.com/guidedao'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='GitHub'
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'>
                            <Image
                                src='/icons/github.svg'
                                alt='GitHub'
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='mailto:yo@guidedao.xyz'
                            aria-label='Email'
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'>
                            <Image
                                src='/icons/envelope-fill.svg'
                                alt='Email'
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                    </div>
                </div>

                {/* Bottom: centered logo + copyright */}
                <div className='mt-4 pt-2 text-center text-xs sm:text-sm text-white/60 flex items-center justify-center gap-2'>
                    <Image src='/images/logo.svg' alt='Guide DAO' width={80} height={18} />
                    <span>© 2025 GuideDAO. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
