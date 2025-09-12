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
            if (!contactDetails.trim()) {
                setEncError('Please provide contact details before registering.');
                return;
            }
            if (!hasAdminPub) {
                setEncError('Encryption key is not configured.');
                return;
            }

            setIsEncrypting(true);
            const payload = await encryptWithAdminPub(contactDetails.trim());
            const encrypted = bytesToHex(payload);
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

                <div className='space-y-4'>
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
                            <label
                                htmlFor='contact-details'
                                className='block text-sm font-medium text-muted-foreground'>
                                Contact details (encrypted on submit)
                            </label>
                            <span className='text-xs text-muted-foreground'>
                                {Math.max(0, 80 - contactDetails.length)} left
                            </span>
                        </div>
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
                            <p className='text-xs text-destructive mt-1'>
                                Encryption key not configured (NEXT_PUBLIC_ADMIN_PUB_HEX).
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

                    <Button
                        onClick={onBuy}
                        disabled={
                            !isRegistrationOpen ||
                            isLoading ||
                            isEncrypting ||
                            ticketsAmount <= 0 ||
                            !contactDetails.trim() ||
                            !hasAdminPub
                        }
                        className='w-full cursor-pointer'
                        size='lg'>
                        {isLoading || isEncrypting ? 'Processing…' : 'Register & Buy Tickets'}
                    </Button>
                </div>
            </article>
        </section>
    );
}
