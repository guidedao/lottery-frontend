'use client';

import { Button } from '@/components/ui/button';

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

export default function WalletControls({ chain, account, openChainModal, openAccountModal }: WalletControlsProps) {
    return (
        <div className='flex gap-2'>
            <Button onClick={openChainModal} variant='ghost' size='sm' className='text-white hover:bg-white/10'>
                {chain.hasIcon && (
                    <div
                        style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4
                        }}>
                        {chain.iconUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                            />
                        )}
                    </div>
                )}
                {chain.name}
            </Button>
            <Button onClick={openAccountModal} variant='ghost' size='sm' className='text-white hover:bg-white/10'>
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </Button>
        </div>
    );
}
