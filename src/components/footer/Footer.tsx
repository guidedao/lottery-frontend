'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-globe-gen';

export function Footer() {
    const t = useTranslations();

    return (
        <footer
            className='
                relative z-50 mt-16
                bg-background/20 backdrop-blur-xs
            '
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black 4px, black 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0, black 4px, black 100%)'
            }}>
            <div className='container mx-auto px-4 py-4 lg:py-5 text-foreground'>
                {/* Top: navigation */}
                <div className='flex flex-col items-center gap-3'>
                    <nav
                        aria-label={t('footer.ariaNav')}
                        className='flex items-center flex-wrap justify-center gap-2 text-sm'>
                        <Link
                            href='/'
                            className='inline-flex items-center h-8 rounded-md px-3 text-foreground hover:text-foreground hover:bg-foreground/10 transition-colors'>
                            {t('footer.home')}
                        </Link>
                        <Link
                            href='/#about'
                            className='inline-flex items-center h-8 rounded-md px-3 text-foreground hover:text-foreground hover:bg-foreground/10 transition-colors'>
                            {t('footer.about')}
                        </Link>
                    </nav>

                    {/* Below: socials (icons only, including email) */}
                    <div className='flex items-center justify-center gap-2 sm:gap-3 text-foreground/85'>
                        <a
                            href='https://t.me/guidedao_eth'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={t('footer.socials.telegram')}
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors'>
                            <Image
                                src='/icons/telegram.svg'
                                alt={t('footer.socials.telegram')}
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://twitter.com/GuideDAO'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={t('footer.socials.x')}
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors'>
                            <Image
                                src='/icons/twitter-x.svg'
                                alt={t('footer.socials.x')}
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://discord.gg/8X9P9r3udx'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={t('footer.socials.discord')}
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors'>
                            <Image
                                src='/icons/discord.svg'
                                alt={t('footer.socials.discord')}
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='https://github.com/guidedao'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={t('footer.socials.github')}
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors'>
                            <Image
                                src='/icons/github.svg'
                                alt={t('footer.socials.github')}
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                        <a
                            href='mailto:yo@guidedao.xyz'
                            aria-label={t('footer.socials.email')}
                            className='group inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors'>
                            <Image
                                src='/icons/envelope-fill.svg'
                                alt={t('footer.socials.email')}
                                width={16}
                                height={16}
                                className='invert opacity-80 transition-opacity group-hover:opacity-100'
                            />
                        </a>
                    </div>
                </div>

                {/* Bottom: centered logo + copyright */}
                <div className='mt-4 pt-2 text-center text-xs sm:text-sm text-foreground/60 flex items-center justify-center gap-2'>
                    <Image src='/images/logo.svg' alt={t('footer.logoAlt')} width={80} height={18} />
                    <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
                </div>
            </div>
        </footer>
    );
}
