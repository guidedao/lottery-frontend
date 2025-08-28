'use client';

import { useEffect, useRef, useState } from 'react';

import useLotteryState from '@/hooks/useLotteryState';
import { formatTime, getTimeLeft } from '@/lib/utils';

const LoadingTimer = ({ count = 3 }) => (
    <div className='flex'>
        {Array.from({ length: count }).map((_, idx, arr) => (
            <span key={idx}>
                <span className='animate-pulse'>--</span>
                {idx < arr.length - 1 && ':'}
            </span>
        ))}
    </div>
);

export function Timer() {
    const { lotteryState, isLoading } = useLotteryState();
    const { registrationEndTime } = lotteryState;
    const [timeLeft, setTimeLeft] = useState('');
    const reqAnimFrameId = useRef<number | null>(null);
    const prevSecond = useRef<number | null>(null);

    useEffect(() => {
        const endTimeMs = Number(registrationEndTime) * 1000;

        const updateTime = () => {
            const { hours, minutes, seconds } = getTimeLeft(endTimeMs);

            if (seconds !== prevSecond.current) {
                prevSecond.current = seconds;
                setTimeLeft(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);
            }

            if (hours > 0 || minutes > 0 || seconds > 0) {
                reqAnimFrameId.current = requestAnimationFrame(updateTime);
            }
        };

        reqAnimFrameId.current = requestAnimationFrame(updateTime);

        return () => {
            if (reqAnimFrameId.current) {
                cancelAnimationFrame(reqAnimFrameId.current);
            }
        };
    }, [registrationEndTime]);

    return (
        <div className='flex flex-col items-center justify-center min-h-[300px]'>
            <div
                className='text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider'
                style={{ fontFamily: 'monospace' }}>
                {isLoading ? <LoadingTimer /> : timeLeft}
            </div>
        </div>
    );
}
