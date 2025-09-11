import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import SiteBackground from '@/components/CustomBackground';
import { Footer } from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Web3Provider } from '@/providers/Web3Provider';
import '@/styles/globals.css';

import { useLocale } from 'next-globe-gen';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-roboto'
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
        <html lang={locale} className='dark'>
            <body className={`${roboto.className} ${roboto.variable} antialiased`}>
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
