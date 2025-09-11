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
    const { participantsCount, ticketPrice } = lotteryState;

    const ticketPriceETH = formatEther(ticketPrice);

    return (
        <section className='flex flex-row flex-wrap gap-4 w-full lg:w-1/2 lg:self-stretch'>
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
        </section>
    );
};
