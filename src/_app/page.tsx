import type { Metadata } from 'next';
import Image from 'next/image';

import Waves from '@/blocks/Backgrounds/Waves/Waves';
import BuyTicketsTEMP from '@/components/Main/BuyTicketsTEMP';
import { LotteryStatusDisplay } from '@/components/Main/LotteryStatusDisplayTEMP';
import { Timer } from '@/components/Main/Timer/Timer';
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
                <div className='container mx-auto relative z-10 flex items-center flex-col px-4 pt-20 pb-32'>
                    <div className='text-center'>
                        <Timer />
                    </div>

                    <LotteryStatusDisplay />
                    <BuyTicketsTEMP />
                </div>
            </main>

            <Footer totalParticipants={22} winner='???' />
        </>
    );
}
