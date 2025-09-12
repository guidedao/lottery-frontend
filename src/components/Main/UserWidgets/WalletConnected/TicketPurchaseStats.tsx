'use client';

import React from 'react';

import { formatUnits } from 'viem';

type Props = {
    yourTickets: number;
    yourChancePct: number; // current chance in %
    predictedChancePct: number; // chance after purchase in %
    totalCostWei: bigint; // total purchase cost in wei
    className?: string;
};

function fmtPct(v: number) {
    return v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function TicketPurchaseStats({
    yourTickets,
    yourChancePct,
    predictedChancePct,
    totalCostWei,
    className
}: Props) {
    return (
        <div className={`surface-glass p-4 rounded-md ${className ?? ''}`}>
            <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Your tickets:</span>
                <span className='font-medium'>{yourTickets}</span>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-sm text-muted-foreground'>Your win chance:</span>
                <span className='font-medium'>{fmtPct(yourChancePct)}%</span>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-sm text-muted-foreground'>Total cost:</span>
                <span className='font-bold text-lg'>{formatUnits(totalCostWei, 18)} ETH</span>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-sm text-muted-foreground'>Chance after purchase:</span>
                <span className='font-medium'>{fmtPct(predictedChancePct)}%</span>
            </div>
        </div>
    );
}
