import type { Metadata } from 'next';

import Waves from '@/blocks/Backgrounds/Waves/Waves';
import TicketTimer from '@/components/Main/Timer/TicketTimer';
import { TicketWidgets } from '@/components/Main/Widgets/TicketWidgets';
import { Footer } from '@/components/footer/Footer';

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
            <main className='relative bg-black overflow-x-hidden min-h-screen'>
                {/* Background Canvas Waves */}
                <Waves
                    lineColor='#fff'
                    backgroundColor='rgba(255, 255, 255, 0.1)'
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={0}
                    xGap={12}
                    yGap={36}
                />

                {/* Extra dark overlay for better text readability */}
                <div className='fixed inset-0 bg-black/40' />

                {/* Content */}
                <div className='container mx-auto relative z-10 flex flex-col px-4 pt-20 pb-32 gap-8'>
                    <div className='flex lg:flex-row w-full flex-col lg:mt-[140px] mt-[48px] gap-10 sm:gap-12 items-start lg:gap-20'>
                        {/* Left: Timer  & lottery ticket */}
                        <TicketTimer />
                        {/* Right: Lottery state */}
                        <TicketWidgets />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
