'use client';

import React from 'react';

import TicketPurchaseStats from './TicketPurchaseStats';
import TicketStepper from './TicketStepper';

type Props = {
    ticketsAmount: number;
    onChange: (n: number) => void;
    disabled?: boolean;
    yourTickets: number;
    yourChancePct: number;
    predictedChancePct: number;
    totalCostWei: bigint;
    className?: string;
};

export default function TicketPurchaseRow({
    ticketsAmount,
    onChange,
    disabled,
    yourTickets,
    yourChancePct,
    predictedChancePct,
    totalCostWei,
    className
}: Props) {
    return (
        <div className={`flex flex-col gap-4 sm:flex-row ${className ?? ''}`}>
            <div className='flex-1 flex flex-col items-center justify-center text-center'>
                <TicketStepper value={ticketsAmount} onChange={onChange} min={1} disabled={disabled} />
            </div>
            <TicketPurchaseStats
                className='flex-1'
                yourTickets={yourTickets}
                yourChancePct={yourChancePct}
                predictedChancePct={predictedChancePct}
                totalCostWei={totalCostWei}
            />
        </div>
    );
}
