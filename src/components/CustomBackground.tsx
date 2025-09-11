'use client';

import Waves from '@/components/ui/blocks/Backgrounds/Waves/Waves';

export default function SiteBackground() {
    return (
        <div className='fixed inset-0 -z-10 pointer-events-none'>
            {/* Base dark background */}
            <div className='absolute inset-0 bg-background' />

            {/* Waves canvas */}
            <Waves
                lineColor='rgba(255,255,255,0.35)'
                backgroundColor='transparent'
                waveSpeedX={0.01}
                waveSpeedY={0.01}
                waveAmpX={60}
                waveAmpY={40}
                friction={0.9}
                tension={0.01}
                maxCursorMove={40}
                xGap={12}
                yGap={36}
            />

            {/* Dark overlay for readability */}
            <div className='absolute inset-0 bg-background/40' />
        </div>
    );
}
