'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';
import useReturnTickets from '@/hooks/useReturnTickets';
import { LotteryStatus } from '@/types/enums';

import TicketReturnStats from './TicketReturnStats';
import TicketStepper from './TicketStepper';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-globe-gen';
import { useAccount } from 'wagmi';

export default function ReturnTicketsPanel() {
    const t = useTranslations();
    const { isActualParticipant, userTicketsCount, refundAmount } = useParticipantStatus();
    const { returnTickets, isLoading, isError, error, isSuccess } = useReturnTickets();
    const { lotteryState } = useLotteryState();
    const { address } = useAccount();
    const { status: authStatus } = useSession();

    const [amount, setAmount] = useState<number>(1);
    // Timer UI removed per request; no countdown state kept

    const maxReturnable = userTicketsCount ?? 0;
    const canReturnSome = isActualParticipant && maxReturnable > 0;
    // Rely on on-chain status instead of local time arithmetic
    const isReturnAllowed = lotteryState.status === LotteryStatus.OpenedForRegistration;

    function handleReturnSelected() {
        const amt = Math.min(Math.max(1, amount || 0), maxReturnable);
        if (amt <= 0 || !isReturnAllowed) return;
        returnTickets({ amount: amt });
    }

    // After hooks: guard rendering
    if (!address || authStatus !== 'authenticated') return null;
    if (!canReturnSome) return null;

    return (
        <div className='surface-glass flex flex-col gap-6 rounded-md p-6'>
            <h2 className='text-2xl font-bold text-foreground'>{t('home.return_tickets')}</h2>

            <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                {/* Left: amount stepper */}
                <div className='flex-1 flex flex-col items-center justify-center text-center'>
                    <TicketStepper
                        value={amount}
                        onChange={(n) => setAmount(Math.max(1, Math.min(n, maxReturnable)))}
                        min={1}
                        max={maxReturnable}
                        disabled={isLoading || !isReturnAllowed}
                    />
                    {/* Max moved to TicketReturnStats on the right */}
                </div>

                {/* Right: return stats */}
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <TicketReturnStats refundWei={refundAmount} maxReturnable={maxReturnable} />
                </div>
            </div>

            {/* Bottom: action button */}
            <div className='flex justify-center'>
                <Button
                    onClick={handleReturnSelected}
                    disabled={isLoading || !isReturnAllowed || amount <= 0 || amount > maxReturnable}
                    variant='destructive'
                    className='cursor-pointer w-full sm:w-auto min-w-[12rem]'>
                    {isLoading ? t('home.returning') : t('home.return_selected')}
                </Button>
            </div>

            {!isReturnAllowed && <p className='text-xs text-muted-foreground'>{t('home.return_period_has_ended')}</p>}
            {isError && error && (
                <p className='text-xs text-destructive'>
                    {t('home.Error')}: {error.message}
                </p>
            )}
            {isSuccess && <p className='text-xs text-primary'>{t('home.tickets_returned_successfully')}</p>}
        </div>
    );
}
