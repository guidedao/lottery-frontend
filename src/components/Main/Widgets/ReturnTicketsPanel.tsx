'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';
import useReturnTickets from '@/hooks/useReturnTickets';
import { LotteryStatus } from '@/types/enums';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-globe-gen';
import { useAccount } from 'wagmi';

export default function ReturnTicketsPanel() {
    const t = useTranslations();
    const { isActualParticipant, userTicketsCount } = useParticipantStatus();
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

    function handleReturnAll() {
        if (!isReturnAllowed) return;
        returnTickets({ amount: maxReturnable });
    }

    // After hooks: guard rendering
    if (!address || authStatus !== 'authenticated') return null;
    if (!canReturnSome) return null;

    return (
        <div className='flex flex-col gap-3 bg-white'>
            <h3 className='text-lg font-semibold text-gray-900'>{t('home.return_tickets')}</h3>
            <div className='flex items-end gap-2'>
                <div className='flex-1'>
                    <label htmlFor='return-amount' className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('home.amount')}
                    </label>
                    <Input
                        id='return-amount'
                        type='number'
                        min='1'
                        max={maxReturnable}
                        value={amount}
                        onChange={(e) => setAmount(Math.max(1, Math.min(Number(e.target.value) || 1, maxReturnable)))}
                        disabled={isLoading || !isReturnAllowed}
                        className='w-full'
                    />
                    <div className='text-xs text-gray-500 mt-1'>
                        {t('home.Max')}: {maxReturnable}
                    </div>
                </div>
            </div>

            {!isReturnAllowed && <p className='text-xs text-gray-600'>{t('home.return_period_has_ended')}</p>}
            {isError && error && (
                <p className='text-xs text-red-600'>
                    {t('home.Error')}: {error.message}
                </p>
            )}
            {isSuccess && <p className='text-xs text-green-600'>{t('home.tickets_returned_successfully')}</p>}

            <div className='flex gap-2'>
                <Button
                    onClick={handleReturnSelected}
                    disabled={isLoading || !isReturnAllowed || amount <= 0 || amount > maxReturnable}
                    variant='default'
                    className='cursor-pointer w-1/2'>
                    {isLoading ? t('home.returning') : t('home.return_selected')}
                </Button>
                <Button
                    onClick={handleReturnAll}
                    disabled={isLoading || !isReturnAllowed}
                    variant='destructive'
                    className='cursor-pointer w-1/2'>
                    {isLoading ? t('home.returning') : `${t('home.return_all')} (${maxReturnable})`}
                </Button>
            </div>
        </div>
    );
}
