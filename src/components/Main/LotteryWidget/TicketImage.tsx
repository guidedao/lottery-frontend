import React from 'react';

import Image from 'next/image';

const TicketImage = () => {
    return (
        <div className='relative w-[90%] md:w-[80%] lg:w-full animate-glass-float overflow-hidden rounded-2xl'>
            <Image
                src='/images/lottery-ticket.webp'
                alt='guide dao lottery ticket'
                width={300}
                height={400}
                className='w-full h-auto rounded-2xl shadow-lg'
                priority
            />
            {/* Glass overlay */}
            <div className='glass-overlay rounded-xl'>
                <div className='glass-sheen' />
            </div>
        </div>
    );
};

export default TicketImage;
