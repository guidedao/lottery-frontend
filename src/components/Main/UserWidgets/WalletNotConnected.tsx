'use client';

export default function WalletNotConnected() {
    return (
        <section className='flex flex-row flex-wrap gap-4 w-full lg:w-1/2 lg:self-stretch'>
            <article className='surface-glass flex flex-col flex-1 h-full min-h-[220px] lg:min-h-[260px] basis-full p-6 rounded-xl gap-6 items-center justify-center text-center'>
                <h2 className='text-foreground text-2xl lg:text-3xl font-semibold'>
                    {'Connect your wallet to participate in the lottery'}
                </h2>
            </article>
        </section>
    );
}
