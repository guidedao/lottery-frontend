import React from 'react';

import Image from 'next/image';

import LotteryStatus from './LotteryStatus';
import { Timer } from './Timer';

const TicketTimer = () => {
    return (
        <div className='flex w-full lg:w-[50%] flex-col-reverse lg:flex-col items-center justify-center gap-4 lg:gap-6'>
            <Image
                src='/images/lottery-ticket.webp'
                alt='guide dao lottery ticket'
                width={300}
                height={400}
                className='w-[90%] md:w-[80%] lg:w-full h-auto'
            />
            <Timer />
            <LotteryStatus />
        </div>
    );
};

export default TicketTimer;
