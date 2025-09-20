'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import useBuyTickets from '@/hooks/useBuyTickets';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';
import useTicketPurchaseMath from '@/hooks/useTicketPurchaseMath';
import { showFormValidationToast } from '@/lib/toast-utils';
import { LotteryStatus } from '@/types/enums';

import ReturnTicketsPanel from './ReturnTicketsPanel';
import TicketPurchaseRow from './TicketPurchaseRow';
import { useTranslations } from 'next-globe-gen';

export default function UserHaveTickets() {
    const t = useTranslations();
    const [ticketsAmount, setTicketsAmount] = useState<number>(1);
    const { buyTickets, isLoading } = useBuyTickets();
    const { lotteryState } = useLotteryState();
    const { isActualParticipant, userTicketsCount } = useParticipantStatus();

    const isRegistrationOpen = lotteryState.status === LotteryStatus.OpenedForRegistration;
    const totalTickets = Number(lotteryState.totalTicketsCount ?? 0);
    const yourTickets = isActualParticipant ? userTicketsCount : 0;
    const { totalCost, yourChance, predictedChance } = useTicketPurchaseMath({
        ticketPrice: lotteryState.ticketPrice,
        totalTickets,
        yourTickets,
        ticketsAmount
    });

    function onBuy() {
        if (!isRegistrationOpen || isLoading) return;

        if (ticketsAmount <= 0) {
            showFormValidationToast(t('home.enter_valid_tickets'));
            return;
        }

        // For existing participants we do not send contact details
        buyTickets({ ticketsAmount, encryptedContactDetails: '0x', hasTickets: true });
    }

    return (
        <section className='flex flex-col gap-6 lg:gap-6 w-full lg:w-1/2 lg:self-stretch'>
            <article className='surface-glass flex flex-col flex-1 h-full min-h-[220px] lg:min-h-[260px] basis-full p-6 rounded-xl gap-6'>
                <h2 className='text-2xl font-bold text-foreground'>{t('home.buy_more_lottery_tickets')}</h2>

                <TicketPurchaseRow
                    ticketsAmount={ticketsAmount}
                    onChange={setTicketsAmount}
                    disabled={!isRegistrationOpen || isLoading}
                    yourTickets={yourTickets}
                    yourChancePct={yourChance}
                    predictedChancePct={predictedChance}
                    totalCostWei={totalCost}
                />

                <div className='space-y-4'>
                    {!isRegistrationOpen && (
                        <p className='text-sm text-destructive text-center'>
                            {t('home.registration_is_currently_closed')}
                        </p>
                    )}

                    <div className='flex justify-center'>
                        <Button
                            onClick={onBuy}
                            disabled={!isRegistrationOpen || isLoading || ticketsAmount <= 0}
                            className='cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-1 border-emerald-300 hover:border-emerald-100'
                            size='lg'>
                            {isLoading ? t('home.Processing') : t('home.buy_more_tickets')}
                        </Button>
                    </div>
                </div>
            </article>

            {/* Inline return tickets panel */}
            <ReturnTicketsPanel />
        </section>
    );
}
