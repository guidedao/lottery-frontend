'use client';

interface TimerProps {
    hours?: number;
    minutes?: number;
    seconds?: number;
}

export function Timer({ hours = 0, minutes = 55, seconds = 3 }: TimerProps) {
    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0');
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-[300px]'>
            <div
                className='text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider'
                style={{ fontFamily: 'monospace' }}>
                {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)}
            </div>
        </div>
    );
}
