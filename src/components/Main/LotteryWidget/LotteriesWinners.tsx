'use client';

import type { CSSProperties } from 'react';

import useWinners from '@/hooks/useWinners';

import { useTranslations } from 'next-globe-gen';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const formatAddress = (address: string) => {
    if (!address || address.toLowerCase() === ZERO_ADDRESS) {
        return address;
    }

    return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

const DUPLICATION_FACTOR = 2; // duplicate marquee content for smooth loop

type MarqueeStyle = CSSProperties & {
    '--marquee-duration'?: string;
};

function LotteriesWinners() {
    const t = useTranslations();
    const { winners, isLoading } = useWinners();

    const baseItems = winners.length
        ? winners.map((winner) => {
              if (!winner.hasWinner) {
                  return winner.isCurrentLottery
                      ? t('winnersMarquee.pendingCurrent', { n: winner.lotteryNumber })
                      : t('winnersMarquee.notDefinedPast', { n: winner.lotteryNumber });
              }

              return t('winnersMarquee.item', {
                  n: winner.lotteryNumber,
                  address: formatAddress(winner.winnerAddress)
              });
          })
        : ([] as string[]);

    const marqueeItems: string[] = [];
    if (baseItems.length === 0) {
        marqueeItems.push(t('winnersMarquee.empty'));
    } else {
        for (let i = 0; i < DUPLICATION_FACTOR; i += 1) {
            marqueeItems.push(...baseItems);
        }
    }

    const marqueeDuration = (() => {
        const baseCount = Math.max(baseItems.length, 1);
        const seconds = Math.min(Math.max(baseCount * 6, 18), 60);
        return `${seconds}s`;
    })();

    const marqueeStyle: MarqueeStyle = { '--marquee-duration': marqueeDuration };

    return (
        <div className='surface-glass w-full overflow-hidden rounded-xl'>
            <div className='flex items-center justify-between gap-4 border-b border-border/50 px-4 py-3'>
                <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>
                    {t('winnersMarquee.title')}
                </span>
                {isLoading && (
                    <span className='text-xs font-medium text-muted-foreground'>{t('winnersMarquee.loading')}</span>
                )}
            </div>
            <div className='relative overflow-hidden px-4 py-3'>
                <div
                    className='marquee-track flex min-w-max items-center gap-6 text-sm text-muted-foreground'
                    style={marqueeStyle}>
                    {marqueeItems.map((item, idx) => (
                        <span key={`winner-${idx}`} className='inline-flex items-center whitespace-nowrap'>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LotteriesWinners;
