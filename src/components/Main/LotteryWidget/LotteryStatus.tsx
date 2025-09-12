'use client';

import React from 'react';

import useLotteryState from '@/hooks/useLotteryState';
import { getLotteryStatusText } from '@/lib/utils';

import { formatEther } from 'viem';

const formatNumber = (n: number) => n.toLocaleString();

const LotteryStatus: React.FC = () => {
    const { lotteryState } = useLotteryState();
    const { participantsCount, totalTicketsCount, ticketPrice, status } = lotteryState;

    const ticketPriceEth = ticketPrice ? formatEther(ticketPrice) : '0';

    return (
        <div className='surface-glass p-4 md:p-5 rounded-xl w-full'>
            {/* Top row: Lottery Status + Ticket Price */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-end'>
                {/* Status */}
                <div className='flex flex-col gap-1'>
                    <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>Lottery Status</span>
                    <span className='text-xl sm:text-2xl font-semibold leading-none'>
                        {getLotteryStatusText(status)}
                    </span>
                </div>
                {/* Ticket price */}
                <div className='flex flex-col gap-1'>
                    <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>Ticket ETH Price</span>
                    <span className='text-lg sm:text-2xl font-semibold leading-none whitespace-nowrap'>
                        {ticketPriceEth}
                    </span>
                </div>
            </div>
            {/* Divider */}
            <div className='my-4 h-px bg-border/60' />
            {/* Bottom row: Participants + Total Tickets */}
            <div className='grid grid-cols-2 gap-4 sm:gap-6 items-end'>
                {/* Participants */}
                <div className='flex flex-col gap-1'>
                    <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>Participants</span>
                    <span className='text-xl sm:text-2xl font-semibold leading-none'>
                        {formatNumber(participantsCount)}
                    </span>
                </div>
                {/* Total tickets */}
                <div className='flex flex-col gap-1'>
                    <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>Total Tickets</span>
                    <span className='text-xl sm:text-2xl font-semibold leading-none'>
                        {formatNumber(totalTicketsCount)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LotteryStatus;
