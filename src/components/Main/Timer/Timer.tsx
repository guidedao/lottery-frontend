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
        {/* Modal for debugging */}
        {/* <LotteryStatusModal /> */}
    </div>
);

export function Timer() {
    const { lotteryState, isLoading, refetch } = useLotteryState();
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

            const isTimeOver = hours === 0 && minutes === 0 && seconds === 0;

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
    }, [registrationEndTime, refetch]);

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex text-foreground text-6xl sm:text-7xl md:text-8xl lg:text-7xl font-bold tracking-wider'>
                {isLoading ? <LoadingTimer /> : timeLeft}
            </div>
        </div>
    );
}
