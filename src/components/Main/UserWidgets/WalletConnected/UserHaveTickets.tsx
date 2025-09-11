'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useBuyTickets from '@/hooks/useBuyTickets';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';
import { LotteryStatus } from '@/types/enums';

import ReturnTicketsPanel from './ReturnTicketsPanel';

export default function UserHaveTickets() {
    const [ticketsAmount, setTicketsAmount] = useState<number>(1);
    const { buyTickets, isLoading, isError, error, isSuccess } = useBuyTickets();
    const { lotteryState } = useLotteryState();
    const { isActualParticipant, userTicketsCount, refundAmount } = useParticipantStatus();

    const isRegistrationOpen = lotteryState.status === LotteryStatus.OpenedForRegistration;
    const totalCost = lotteryState.ticketPrice * BigInt(ticketsAmount);
    const totalTickets = Number(lotteryState.totalTicketsCount ?? 0);
    const yourTickets = isActualParticipant ? userTicketsCount : 0;
    const yourChance = totalTickets > 0 ? (yourTickets / totalTickets) * 100 : 0;
    const predictedTotal = totalTickets + (ticketsAmount || 0);
    const predictedYours = yourTickets + (ticketsAmount || 0);
    const predictedChance = predictedTotal > 0 ? (predictedYours / predictedTotal) * 100 : 0;
    const fmtPct = (v: number) => v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    function onBuy() {
        if (!isRegistrationOpen || isLoading) return;
        if (ticketsAmount <= 0) return;
        // For existing participants we do not send contact details
        buyTickets({ ticketsAmount, encryptedContactDetails: '0x' });
    }

    return (
        <section className='flex flex-col gap-4 w-full lg:w-1/2 lg:self-stretch'>
            <article className='surface-glass flex flex-col flex-1 h-full min-h-[220px] lg:min-h-[260px] basis-full p-6 rounded-xl gap-6'>
                <h2 className='text-2xl font-bold text-foreground'>Buy more lottery tickets</h2>

                <div className='surface-glass p-4 rounded-md'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-muted-foreground'>Your tickets:</span>
                        <span className='font-medium'>{userTicketsCount}</span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-muted-foreground'>Your refund:</span>
                        <span className='font-medium'>
                            {refundAmount ? `${Number(refundAmount) / 1e18} ETH` : '0 ETH'}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-muted-foreground'>Your win chance:</span>
                        <span className='font-medium'>{fmtPct(yourChance)}%</span>
                    </div>
                </div>

                <div className='space-y-4'>
                    <div>
                        <label
                            htmlFor='tickets-amount'
                            className='block text-sm font-medium text-muted-foreground mb-2'>
                            Number of Tickets
                        </label>
                        <Input
                            id='tickets-amount'
                            type='number'
                            min='1'
                            value={ticketsAmount}
                            onChange={(e) => {
                                const v = parseInt(e.target.value);
                                if (!Number.isNaN(v) && v > 0) setTicketsAmount(v);
                            }}
                            className='w-full'
                            disabled={!isRegistrationOpen || isLoading}
                        />
                    </div>

                    <div className='surface-glass p-4 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-muted-foreground'>Ticket price:</span>
                            <span className='font-medium'>
                                {lotteryState.ticketPrice
                                    ? `${Number(lotteryState.ticketPrice) / 1e18} ETH`
                                    : 'Loading...'}
                            </span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-muted-foreground'>Total cost:</span>
                            <span className='font-bold text-lg'>{`${Number(totalCost) / 1e18} ETH`}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-muted-foreground'>Chance after purchase:</span>
                            <span className='font-medium'>{fmtPct(predictedChance)}%</span>
                        </div>
                    </div>

                    {!isRegistrationOpen && (
                        <p className='text-sm text-destructive text-center'>Registration is currently closed</p>
                    )}

                    {isError && (
                        <p className='text-sm text-destructive text-center'>
                            Error: {error?.message || 'Failed to buy tickets'}
                        </p>
                    )}
                    {isSuccess && (
                        <p className='text-sm text-primary text-center'>Additional tickets purchased successfully!</p>
                    )}

                    <Button
                        onClick={onBuy}
                        disabled={!isRegistrationOpen || isLoading || ticketsAmount <= 0}
                        className='w-full cursor-pointer'
                        size='lg'>
                        {isLoading ? 'Processing…' : 'Buy more tickets'}
                    </Button>
                </div>
            </article>

            {/* Inline return tickets panel */}
            <ReturnTicketsPanel />
        </section>
    );
}
