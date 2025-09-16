import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import SiteBackground from '@/components/CustomBackground';
import { Footer } from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Web3Provider } from '@/providers/Web3Provider';
import '@/styles/globals.css';

import { useLocale } from 'next-globe-gen';
import { Toaster } from 'sonner';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-roboto',
    display: 'swap'
});

export const metadata: Metadata = {
    title: { template: '%s | GuideDAO Lottery', default: 'GuideDAO Lottery' },
    description:
        'Win a GuideDAO Pass! Join our blockchain lottery with fair odds, transparent smart contract, and a chance to become a part of the astonishing DAO. Buy tickets, increase your chances, and participate in the decentralized lottery experience.',
    metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
    alternates: {
        languages: {
            en: '/en',
            ru: '/ru',
            'x-default': '/'
        }
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = useLocale();
    return (
        <html lang={locale} className='dark'>
            <body className={`${roboto.className} ${roboto.variable} antialiased min-h-screen`}>
                <Web3Provider>
                    <SiteBackground />
                    {/* App shell container ensures sticky footer regardless of background node */}
                    <div className='min-h-[100dvh] grid grid-rows-[auto_1fr_auto]'>
                        <Header />
                        <div className='overflow-x-auto'>{children}</div>
                        <Toaster />
                        <Footer />
                    </div>
                </Web3Provider>
            </body>
        </html>
    );
}
