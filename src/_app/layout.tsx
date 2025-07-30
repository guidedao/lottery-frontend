import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/styles/globals.css';

import { useLocale } from 'next-globe-gen';
import { Web3Provider } from '@/components/providers/Web3Provider';

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
                <Web3Provider>{children}</Web3Provider>
            </body>
        </html>
    );
}
