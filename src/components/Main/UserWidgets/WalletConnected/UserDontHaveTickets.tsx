'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useBuyTickets from '@/hooks/useBuyTickets';
import useLotteryState from '@/hooks/useLotteryState';
import useTicketPurchaseMath from '@/hooks/useTicketPurchaseMath';
import { encryptWithAdminPub } from '@/lib/xChaCha20/encrypt-cha';
import { LotteryStatus } from '@/types/enums';

import TicketPurchaseRow from './TicketPurchaseRow';

export default function UserDontHaveTickets() {
    const [ticketsAmount, setTicketsAmount] = useState<number>(1);
    const [contactDetails, setContactDetails] = useState<string>('');
    const [encError, setEncError] = useState<string | null>(null);
    const [isEncrypting, setIsEncrypting] = useState<boolean>(false);

    const { buyTickets, isLoading, isError, error, isSuccess } = useBuyTickets();
    const { lotteryState } = useLotteryState();

    const hasAdminPub = !!process.env.NEXT_PUBLIC_ADMIN_PUB_HEX;
    const isRegistrationOpen = lotteryState.status === LotteryStatus.OpenedForRegistration;

    const totalTickets = Number(lotteryState.totalTicketsCount ?? 0);
    const yourTickets = 0;
    const { totalCost, yourChance, predictedChance } = useTicketPurchaseMath({
        ticketPrice: lotteryState.ticketPrice,
        totalTickets,
        yourTickets,
        ticketsAmount
    });

    const bytesToHex = (bytes: Uint8Array): `0x${string}` =>
        `0x${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}` as `0x${string}`;

    async function onBuy() {
        if (!isRegistrationOpen || isLoading || isEncrypting) return;
        if (ticketsAmount <= 0) return;

        setEncError(null);

        try {
            setIsEncrypting(true);
            const raw = contactDetails.trim() || 'Contact details were not provided';
            let encrypted: `0x${string}` = '0x';
            if (hasAdminPub) {
                const payload = await encryptWithAdminPub(raw);
                encrypted = bytesToHex(payload);
            }
            await buyTickets({ ticketsAmount, encryptedContactDetails: encrypted });
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setEncError(`Encryption failed: ${msg}`);
        } finally {
            setIsEncrypting(false);
        }
    }

    return (
        <section className='flex flex-col gap-4 w-full lg:w-1/2 lg:self-stretch'>
            <article className='surface-glass flex flex-col flex-1 h-full min-h-[220px] lg:min-h-[260px] basis-full p-6 rounded-xl gap-6'>
                <h2 className='text-2xl font-bold text-foreground'>Register and buy tickets</h2>

                <div className='space-y-10'>
                    <TicketPurchaseRow
                        ticketsAmount={ticketsAmount}
                        onChange={setTicketsAmount}
                        disabled={!isRegistrationOpen || isLoading || isEncrypting}
                        yourTickets={yourTickets}
                        yourChancePct={yourChance}
                        predictedChancePct={predictedChance}
                        totalCostWei={totalCost}
                    />

                    <div>
                        <div className='flex items-baseline justify-between mb-2'>
                            <h3 className='text-lg font-semibold text-foreground'>
                                Contact details (encrypted on submit)
                            </h3>
                            <span className='text-xs text-muted-foreground'>
                                {Math.max(0, 80 - contactDetails.length)} left
                            </span>
                        </div>
                        {/* Keep accessible label for input */}
                        <label htmlFor='contact-details' className='sr-only'>
                            Contact details (encrypted on submit)
                        </label>
                        <Input
                            id='contact-details'
                            type='text'
                            value={contactDetails}
                            onChange={(e) => setContactDetails(e.target.value)}
                            placeholder='Email, Telegram, or other contact info'
                            className='w-full'
                            maxLength={80}
                            disabled={!isRegistrationOpen || isLoading || isEncrypting}
                        />
                        {!hasAdminPub && (
                            <p className='text-xs text-muted-foreground mt-1'>
                                Encryption key not configured (NEXT_PUBLIC_ADMIN_PUB_HEX). Your contact details, if
                                provided, will not be attached.
                            </p>
                        )}
                    </div>

                    {/* Ticket price kept implicit via total cost */}

                    {!isRegistrationOpen && (
                        <p className='text-sm text-destructive text-center'>Registration is currently closed</p>
                    )}

                    {(isError || encError) && (
                        <p className='text-sm text-destructive text-center'>
                            Error: {encError || error?.message || 'Failed to buy tickets'}
                        </p>
                    )}
                    {isSuccess && <p className='text-sm text-primary text-center'>Tickets purchased successfully!</p>}

                    <div className='flex justify-center'>
                        <Button
                            onClick={onBuy}
                            disabled={!isRegistrationOpen || isLoading || isEncrypting || ticketsAmount <= 0}
                            className='cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white'
                            size='lg'>
                            {isLoading || isEncrypting ? 'Processing…' : 'Register & Buy Tickets'}
                        </Button>
                    </div>
                    <section className='mt-6'>
                        <h3 className='text-lg font-semibold text-foreground mb-2'>Disclaimer</h3>
                        <p className='text-sm text-muted-foreground'>
                            Providing contact details is optional, but they are required to reach out the winner. The
                            data is securely encrypted with{' '}
                            <a
                                href='https://en.wikipedia.org/wiki/ChaCha20-Poly1305'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='underline'>
                                ChaCha20‑Poly1305
                            </a>{' '}
                            and is only accessible to the administrator.
                        </p>
                    </section>
                </div>
            </article>
        </section>
    );
}
