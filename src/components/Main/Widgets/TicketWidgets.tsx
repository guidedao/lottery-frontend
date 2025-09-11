'use client';

import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';

import { BuyTicketsModal } from '../Modals/BuyTicketsModal';
import { ReturnTicketsModal } from '../Modals/ReturnTicketsModal';
import { TicketWidget } from './TicketWidget';
import { useTranslations } from 'next-globe-gen';
import { formatEther } from 'viem';

export const TicketWidgets = () => {
    const t = useTranslations();
    const { lotteryState } = useLotteryState();
    const { userTicketsCount } = useParticipantStatus();
    const { participantsCount, ticketPrice, lastWinner } = lotteryState;

    const ticketPriceETH = formatEther(ticketPrice);
    const winner =
        lastWinner && lastWinner !== '0x0000000000000000000000000000000000000000'
            ? `${lastWinner.slice(0, 6)}...${lastWinner.slice(-4)}`
            : '???';

    return (
        <section className='flex flex-row flex-wrap gap-4 w-full lg:w-1/2'>
            <TicketWidget
                title={`${participantsCount} ${t('home.participants')}`}
                description={t('home.joined_for_now')}
                actionButton={<BuyTicketsModal />}
            />
            <TicketWidget
                title={`${userTicketsCount} ${t('home.tickets')}`}
                description={t('home.you_already_have')}
                actionButton={<ReturnTicketsModal />}
            />
            <TicketWidget title={`${ticketPriceETH} ETH`} description={t('home.ticket_price')} />

            <section className='surface-glass p-6 rounded-xl w-full mt-10 lg:mt-[120px]'>
                <h2 className='font-keania flex justify-between text-[28px] sm:text-[46px] font-medium text-foreground gap-6'>
                    <span>{t('home.winner')}:</span>
                    <span className='overflow-hidden text-ellipsis'>{winner}</span>
                </h2>
            </section>
        </section>
    );
};
