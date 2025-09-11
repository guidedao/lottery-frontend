import type { Metadata } from 'next';
import { Geist, Geist_Mono, Keania_One, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import SiteBackground from '@/components/CustomBackground';
import { Footer } from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Web3Provider } from '@/providers/Web3Provider';
import '@/styles/globals.css';

import { useLocale } from 'next-globe-gen';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-roboto'
});

export const keaniaOne = Keania_One({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-keania-one'
});

export const agave = localFont({
    src: '../../public/fonts/Agave/Agave-Bold.woff',
    variable: '--font-agave'
});

export const metadata: Metadata = {
    title: { template: '%s | GuideDAO Lottery', default: 'GuideDAO Lottery' }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = useLocale();
    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${keaniaOne.variable} ${agave.variable} antialiased`}>
                <Web3Provider>
                    <SiteBackground />
                    <Header />
                    {children}
                    <Footer />
                </Web3Provider>
            </body>
        </html>
    );
}
