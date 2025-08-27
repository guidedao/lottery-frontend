import type { Metadata } from 'next';

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
            <main className='relative bg-black overflow-x-hidden'>
                {/* Background Image */}
                <div
                    className='fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80'
                    style={{
                        backgroundImage: 'url(/images/background.png)'
                    }}
                />

                {/* Dark overlay for better text readability */}
                <div className='fixed inset-0 bg-black/40' />

                {/* Content */}
                <div className='relative z-10 flex flex-col items-center px-4 pt-20 pb-32'>
                    <div className='text-center mb-8'>
                        <Timer hours={0} minutes={55} seconds={3} />
                    </div>
                    <LotteryStatusDisplay />
                    <BuyTicketsTEMP />
                </div>
            </main>

            <Footer totalParticipants={22} winner='???' />
        </>
    );
}
