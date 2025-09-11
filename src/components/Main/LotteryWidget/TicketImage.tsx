import React from 'react';

import Image from 'next/image';

const TicketImage = () => {
    return (
        <Image
            src='/images/lottery-ticket.webp'
            alt='guide dao lottery ticket'
            width={300}
            height={400}
            className='w-[90%] md:w-[80%] lg:w-full h-auto'
        />
    );
};

export default TicketImage;
