'use client';

import { projectConfig } from '@/config/projectConfig';
import { config } from '@/lib/web3-config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { type GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

interface Web3ProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

export function Web3Provider({ children, session }: Web3ProviderProps) {
    const getSiweMessageOptions: GetSiweMessageOptions = () => ({
        statement: projectConfig.messageToSign
    });
    return (
        <WagmiProvider config={config}>
            <SessionProvider refetchInterval={0} session={session}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
                        <RainbowKitProvider>{children}</RainbowKitProvider>
                    </RainbowKitSiweNextAuthProvider>
                </QueryClientProvider>
            </SessionProvider>
        </WagmiProvider>
    );
}
