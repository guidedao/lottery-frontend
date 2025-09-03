'use client';

import { config } from '@/lib/web3-config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

interface Web3ProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

export function Web3Provider({ children, session }: Web3ProviderProps) {
    return (
        <WagmiProvider config={config}>
            <SessionProvider refetchInterval={0} session={session}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitSiweNextAuthProvider>
                        <RainbowKitProvider>
                            {children}
                        </RainbowKitProvider>
                    </RainbowKitSiweNextAuthProvider>
                </QueryClientProvider>
            </SessionProvider>
        </WagmiProvider>
    );
}
