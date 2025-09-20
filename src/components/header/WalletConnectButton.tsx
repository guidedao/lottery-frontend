'use client';

import { useState } from 'react';

import WalletControls from '@/components/header/WalletControls';
import { Button } from '@/components/ui/button';
import { useWalletToasts } from '@/hooks/useWalletToasts';
import { showErrorToast } from '@/lib/toast-utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useTranslations } from 'next-globe-gen';

export function WalletConnectButton() {
    const t = useTranslations();
    const [, /*unused*/ setPending] = useState(false);

    useWalletToasts();

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain && authenticationStatus === 'authenticated';

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' }
                        })}>
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={() => {
                                            setPending(true);
                                            openConnectModal();
                                        }}
                                        variant='default'
                                        className='hover:cursor-pointer'
                                        size='sm'>
                                        {t('wallet.connect')}
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        onClick={() => {
                                            showErrorToast(t('wallet.wrongNetwork'));
                                            openChainModal();
                                        }}
                                        variant='destructive'
                                        size='sm'>
                                        {t('wallet.wrongNetwork')}
                                    </Button>
                                );
                            }

                            // Connected & authenticated: show network/account controls
                            return (
                                <WalletControls
                                    chain={chain}
                                    account={account}
                                    openAccountModal={openAccountModal}
                                    openChainModal={openChainModal}
                                />
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
