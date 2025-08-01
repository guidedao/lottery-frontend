import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/styles/globals.css';

import { useLocale } from 'next-globe-gen';
import { Web3Provider } from '@/providers/Web3Provider';
import Header from '@/components/header/Header';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Web3Provider>
                    <Header />
                    {children}
                </Web3Provider>
            </body>
        </html>
    );
}
