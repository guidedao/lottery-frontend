'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

import { Minus, Plus } from 'lucide-react';

type Props = {
    value: number;
    onChange: (next: number) => void;
    min?: number; // default 1
    disabled?: boolean;
    className?: string;
};

export default function TicketStepper({ value, onChange, min = 1, disabled, className }: Props) {
    const dec = () => {
        const next = Math.max(min, (Number.isFinite(value) ? value : min) - 1);
        if (next !== value) onChange(next);
    };
    const inc = () => {
        const base = Number.isFinite(value) ? value : min;
        const next = base + 1; // no max limit
        onChange(next);
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (disabled) return;
        if (e.key === 'ArrowLeft' || e.key === '-') {
            e.preventDefault();
            dec();
        }
        if (e.key === 'ArrowRight' || e.key === '+') {
            e.preventDefault();
            inc();
        }
    };

    return (
        <div
            className={`inline-flex items-center gap-4 ${className ?? ''}`}
            role='group'
            aria-label='Select number of tickets'
            onKeyDown={onKeyDown}>
            <Button
                type='button'
                variant='outline'
                size='icon'
                className='!size-16 rounded-lg'
                aria-label='Decrease tickets'
                onClick={dec}
                disabled={disabled || value <= min}>
                <Minus className='size-5' />
            </Button>
            <div className='flex w-16 items-center justify-center text-5xl select-none tabular-nums' aria-live='polite'>
                {value}
            </div>
            <Button
                type='button'
                variant='outline'
                size='icon'
                className='!size-16 rounded-lg'
                aria-label='Increase tickets'
                onClick={inc}
                disabled={disabled}>
                <Plus className='size-5' />
            </Button>
        </div>
    );
}
