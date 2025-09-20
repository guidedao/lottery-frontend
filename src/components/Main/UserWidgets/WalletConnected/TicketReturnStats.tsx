'use client';

import React from 'react';

import { useTranslations } from 'next-globe-gen';

type Props = {
    refundWei?: bigint; // optional, display-only
    maxReturnable: number;
    className?: string;
};

function fmtWeiToEth(wei?: bigint) {
    if (typeof wei === 'bigint') {
        try {
            return `${Number(wei) / 1e18} ETH`;
        } catch {
            return '0 ETH';
        }
    }
    return 'TODO';
}

export default function TicketReturnStats({ refundWei, maxReturnable, className }: Props) {
    const t = useTranslations();
    return (
        <div className={`surface-glass p-4 rounded-md w-full ${className ?? ''}`}>
            <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>{t('home.your_refund')}</span>
                <span className='font-medium'>{fmtWeiToEth(refundWei)}</span>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <span className='text-sm text-muted-foreground'>{t('home.Max')}</span>
                <span className='font-medium'>{maxReturnable}</span>
            </div>
        </div>
    );
}
