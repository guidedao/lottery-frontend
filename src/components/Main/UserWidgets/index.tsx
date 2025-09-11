'use client';

import { TicketWidgets } from './TicketWidgets';
import WalletNotConnected from './WalletNotConnected';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

export default function UserWidgets() {
    const { address } = useAccount();
    const { status: authStatus } = useSession();

    if (!address || authStatus !== 'authenticated') return <WalletNotConnected />;

    return <TicketWidgets />;
}
