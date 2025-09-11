'use client';

import { Button } from '@/components/ui/button';

import { Wallet } from 'lucide-react';

type WalletControlsProps = {
    chain: {
        name?: string | null;
        hasIcon?: boolean;
        iconBackground?: string;
        iconUrl?: string | null;
    };
    account: {
        displayName: string;
        displayBalance?: string | null;
    };
    openChainModal: () => void;
    openAccountModal: () => void;
};

export default function WalletControls({ account, openAccountModal }: WalletControlsProps) {
    return (
        <div className='flex gap-2'>
            <Button
                onClick={openAccountModal}
                variant='ghost'
                size='sm'
                className='text-foreground bg-transparent border-none hover:bg-foreground/10 hover:text-foreground'>
                <Wallet className='h-4 w-4' />
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </Button>
        </div>
    );
}
