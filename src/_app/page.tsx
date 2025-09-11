import type { Metadata } from 'next';

import TicketTimer from '@/components/Main/Timer/TicketTimer';
import { TicketWidgets } from '@/components/Main/Widgets/TicketWidgets';

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
            <main className='relative overflow-x-hidden min-h-screen'>
                {/* Content */}
                <div className='container mx-auto relative z-10 flex flex-col px-4 pt-8 pb-12'>
                    <div className='flex flex-col gap-4 items-center'>
                        <h1 className='text-foreground text-[38px] lg:text-6xl font-extrabold text-shadow-lg'>
                            {'Win a GuideDAO Pass!'}
                        </h1>
                    </div>
                    <div className='flex lg:flex-row w-full flex-col lg:mt-12 mt-6 gap-6 items-start lg:gap-10'>
                        {/* Left: Timer  & lottery ticket */}
                        <TicketTimer />
                        {/* Right: Lottery state */}
                        <TicketWidgets />
                    </div>
                </div>
            </main>
        </>
    );
}
