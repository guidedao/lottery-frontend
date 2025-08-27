import type { Metadata } from 'next';

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
            <main className='relative min-h-screen bg-black overflow-hidden'>
                {/* Background Image */}
                <div
                    className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80'
                    style={{
                        backgroundImage: 'url(/images/background.png)'
                    }}
                />

                {/* Dark overlay for better text readability */}
                <div className='absolute inset-0 bg-black/40' />

                {/* Content */}
                <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
                    <div className='text-center'>
                        <Timer hours={0} minutes={55} seconds={3} />
                    </div>
                </div>
            </main>

            <Footer totalParticipants={22} winner='???' />
        </>
    );
}
