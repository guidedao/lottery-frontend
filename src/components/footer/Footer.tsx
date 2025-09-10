'use client';

import useLotteryState from '@/hooks/useLotteryState';

import { useTranslations } from 'next-globe-gen';

export function Footer() {
    const t = useTranslations();
    const { lotteryState } = useLotteryState();
    const { maxParticipantsNumber } = lotteryState;

    return (
        <footer className='fixed bottom-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm'>
            <div className='container mx-auto px-4 py-4 lg:py-6'>
                <div className='flex justify-between items-center text-white'>
                    {/* Left side - Navigation links */}
                    <div className='flex flex-col gap-2'>
                        <button className='text-white text-xl font-normal text-left hover:text-gray-300 transition-colors cursor-pointer'>
                            {t('footer.about')}
                        </button>
                        <button className='text-white text-xl font-normal text-left hover:text-gray-300 transition-colors cursor-pointer'>
                            {t('footer.faq')}
                        </button>
                    </div>

                    {/* Right side - Lottery info */}
                    <div className='flex flex-col gap-2 text-right'>
                        <div className='text-white text-xl font-normal'>
                            {t('footer.maxParticipants')}: {maxParticipantsNumber}
                        </div>
                        <div className='text-white text-xl font-normal'>{t('footer.winner')}: ???</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
