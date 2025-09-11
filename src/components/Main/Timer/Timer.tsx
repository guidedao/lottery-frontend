'use client';

import { useEffect, useRef, useState } from 'react';

import useLotteryState from '@/hooks/useLotteryState';
import { formatTime, getTimeLeft } from '@/lib/utils';

import { useTranslations } from 'next-globe-gen';

const LoadingTimer = () => {
    const t = useTranslations();
    return (
        <div className='flex gap-3'>
            <span className='animate-pulse'>00{t('timer.d')}</span>
            <span className='animate-pulse'>00{t('timer.h')}</span>
            <span className='animate-pulse'>00{t('timer.m')}</span>
            <span className='animate-pulse'>00{t('timer.s')}</span>
        </div>
    );
};

export function Timer() {
    const t = useTranslations();
    const { lotteryState, isLoading, refetch } = useLotteryState();
    const { registrationEndTime } = lotteryState;
    const [timeLeft, setTimeLeft] = useState('');
    const reqAnimFrameId = useRef<number | null>(null);
    const prevSecond = useRef<number | null>(null);

    useEffect(() => {
        const endTimeMs = Number(registrationEndTime) * 1000;

        const updateTime = () => {
            const { days, hours, minutes, seconds } = getTimeLeft(endTimeMs);

            if (seconds !== prevSecond.current) {
                prevSecond.current = seconds;
                setTimeLeft(
                    `${days}${t('timer.d')} ${formatTime(hours)}${t('timer.h')} ${formatTime(minutes)}${t('timer.m')} ${formatTime(seconds)}${t('timer.s')}`
                );
            }

            const isTimeOver = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

            if (isTimeOver) {
                refetch();
            } else {
                reqAnimFrameId.current = requestAnimationFrame(updateTime);
            }
        };

        reqAnimFrameId.current = requestAnimationFrame(updateTime);

        return () => {
            if (reqAnimFrameId.current) {
                cancelAnimationFrame(reqAnimFrameId.current);
            }
        };
    }, [registrationEndTime, refetch, t]);

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex text-foreground text-5xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-bold tracking-wider'>
                {isLoading ? <LoadingTimer /> : timeLeft}
            </div>
        </div>
    );
}
