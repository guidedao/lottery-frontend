'use client';

import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useTranslations } from 'next-globe-gen';

export function WalletConnectButton() {
    const t = useTranslations();

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
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }
                        })}>
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={openConnectModal}
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

                            return (
                                <div className='flex gap-2'>
                                    <Button
                                        onClick={openChainModal}
                                        variant='ghost'
                                        size='sm'
                                        className='text-white hover:bg-white/10'>
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

                                    <Button
                                        onClick={openAccountModal}
                                        variant='ghost'
                                        size='sm'
                                        className='text-white hover:bg-white/10'>
                                        {account.displayName}
                                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
