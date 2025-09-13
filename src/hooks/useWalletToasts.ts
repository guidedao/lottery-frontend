'use client';

import { useEffect } from 'react';

import { showErrorToast, showSuccessToast } from '@/lib/toast-utils';

import { useSession } from 'next-auth/react';
import { useAccount, useConnect } from 'wagmi';

export function useWalletToasts() {
    const { address, chain } = useAccount();
    const { error: connectError } = useConnect();
    const { status: authStatus } = useSession();

    type ExtendedChain = typeof chain & { unsupported?: boolean };
    const extendedChain = chain as ExtendedChain;

    useEffect(() => {
        if (authStatus === 'authenticated' && address) {
            showSuccessToast(`Signed in as: ${address.slice(0, 6)}…${address.slice(-4)}`);
        }
    }, [authStatus, address]);

    useEffect(() => {
        if (connectError) {
            showErrorToast(connectError.message || 'Failed to connect wallet');
        }
    }, [connectError]);

    useEffect(() => {
        if (extendedChain?.unsupported) {
            showErrorToast('Unsupported network. Please switch to the correct network.');
        }
    }, [extendedChain]);
}
