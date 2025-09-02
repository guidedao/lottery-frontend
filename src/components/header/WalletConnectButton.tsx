'use client';

import { useEffect, useState } from 'react';

import TermsDialog from '@/components/header/TermsDialog';
import WalletControls from '@/components/header/WalletControls';
import { Button } from '@/components/ui/button';
import useTermsSignature from '@/hooks/useTermsSignature';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useTranslations } from 'next-globe-gen';
import { useAccount, useDisconnect } from 'wagmi';

export function WalletConnectButton() {
    const t = useTranslations();
    const { disconnect } = useDisconnect();
    const { hasSigned, signTerms, isSigning, error } = useTermsSignature();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [, /*unused*/ setPending] = useState(false);
    const { isConnected } = useAccount();

    // Open the Terms dialog right after connect if not signed
    useEffect(() => {
        if (isConnected && !hasSigned) {
            setDialogOpen(true);
        } else {
            setDialogOpen(false);
        }
    }, [isConnected, hasSigned]);

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
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                // Dialog visibility controlled by top-level effect (useAccount + hasSigned)

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' }
                        })}>
                        {(() => {
                            if (!connected) {
                                // Default connect button; signature prompt handled globally after connect
                                return (
                                    <Button
                                        onClick={() => {
                                            setPending(true);
                                            openConnectModal();
                                        }}
                                        variant='default'
                                        size='sm'
                                        className='text-black bg-green-400 hover:bg-green-500'>
                                        {t('wallet.connect')}
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal} variant='destructive' size='sm'>
                                        {t('wallet.wrongNetwork')}
                                    </Button>
                                );
                            }

                            // Connected: show network/account controls; terms dialog managed below

                            // Connected + terms satisfied
                            return (
                                <>
                                    <WalletControls
                                        chain={chain}
                                        account={account}
                                        openAccountModal={openAccountModal}
                                        openChainModal={openChainModal}
                                    />

                                    <TermsDialog
                                        open={dialogOpen}
                                        onOpenChange={setDialogOpen}
                                        isSigning={isSigning}
                                        errorMessage={error?.message ?? null}
                                        onSign={async () => {
                                            try {
                                                await signTerms();
                                            } catch {
                                                disconnect();
                                            }
                                        }}
                                        onDecline={() => {
                                            disconnect();
                                        }}
                                    />
                                </>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
