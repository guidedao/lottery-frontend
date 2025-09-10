import React from 'react';

import Image from 'next/image';

import { Timer } from './Timer';

const TicketTimer = () => {
    return (
        <div className='flex w-full lg:w-[50%] flex-col-reverse lg:flex-col items-center justify-center gap-6 lg:gap-12'>
            <Image
                src='/images/lottery-ticket.png'
                alt='guide dao lottery ticket'
                width={300}
                height={400}
                className='w-[90%] md:w-[80%] lg:w-full h-auto'
            />
            <Timer />
        </div>
    );
};

export default TicketTimer;
