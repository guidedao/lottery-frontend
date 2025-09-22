import type { Metadata } from 'next';

import About from '@/components/Main/InfoBlocks/About';
import TicketTimer from '@/components/Main/LotteryWidget';
import UserWidgets from '@/components/Main/UserWidgets';

import { getTranslations } from 'next-globe-gen';

export function generateMetadata(): Metadata {
    const t = getTranslations();
    return {
        title: t('title'),
        description: t('description', { company: 'GuideDAO' })
    };
}

export default function Home() {
    return (
        <>
            <div id='home' className='relative overflow-x-hidden'>
                {/* Content */}
                <div className='container mx-auto relative z-10 flex flex-col px-4 pt-8'>
                    <div className='flex flex-col gap-4 items-center'>
                        <h1 className='text-foreground text-[38px] lg:text-6xl font-extrabold text-shadow-lg'>
                            {'Win a GuideDAO Pass!'}
                        </h1>
                    </div>
                    <div className='flex lg:flex-row w-full flex-col lg:mt-12 mt-6 gap-6 items-start lg:items-stretch'>
                        {/* Left: Timer  & lottery ticket */}
                        <TicketTimer />
                        {/* Right: User widgets or wallet connect prompt */}
                        <UserWidgets />
                    </div>
                </div>
            </div>
            {/* Info Blocks */}
            <About />
        </>
    );
}
