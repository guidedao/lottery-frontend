'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

import { Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-globe-gen';

type Props = {
    value: number;
    onChange: (next: number) => void;
    min?: number; // default 1
    max?: number; // optional upper bound
    disabled?: boolean;
    className?: string;
};

export default function TicketStepper({ value, onChange, min = 1, max, disabled, className }: Props) {
    const t = useTranslations();
    const dec = () => {
        const next = Math.max(min, (Number.isFinite(value) ? value : min) - 1);
        if (next !== value) onChange(next);
    };
    const inc = () => {
        const base = Number.isFinite(value) ? value : min;
        const next = base + 1;
        const clamped = typeof max === 'number' ? Math.min(next, max) : next;
        if (clamped !== value) onChange(clamped);
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
            aria-label={t('home.select_number_of_tickets')}
            onKeyDown={onKeyDown}>
            <Button
                type='button'
                variant='outline'
                size='icon'
                className='!size-16 rounded-lg cursor-pointer'
                aria-label={t('home.decrease_tickets')}
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
                className='!size-16 rounded-lg cursor-pointer'
                aria-label={t('home.increase_tickets')}
                onClick={inc}
                disabled={disabled || (typeof max === 'number' && value >= max)}>
                <Plus className='size-5' />
            </Button>
        </div>
    );
}
