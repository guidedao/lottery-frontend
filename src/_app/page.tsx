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
                <div className='container mx-auto relative z-10 flex flex-col px-4 pt-16 pb-16 gap-8'>
                    <div className='flex lg:flex-row w-full flex-col lg:mt-[140px] mt-[48px] gap-10 sm:gap-12 items-start lg:gap-20'>
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
