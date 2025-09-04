'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useBuyTickets from '@/hooks/useBuyTickets';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantStatus from '@/hooks/useParticipantStatus';
import { encryptWithAdminPub } from '@/lib/xChaCha20/encrypt-cha';
import { LotteryStatus } from '@/types/enums';

import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

export default function BuyTicketsTEMP() {
    const [ticketsAmount, setTicketsAmount] = useState<number>(1);
    const [contactDetails, setContactDetails] = useState<string>('');
    const [encError, setEncError] = useState<string | null>(null);
    const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
    const { buyTickets, isLoading, isError, error, isSuccess } = useBuyTickets();
    const { lotteryState } = useLotteryState();
    const { isActualParticipant, userTicketsCount, refundAmount } = useParticipantStatus();
    const { address } = useAccount();
    const { status: authStatus } = useSession();

    // env is statically replaced at build; no need for a hook
    const hasAdminPub = !!process.env.NEXT_PUBLIC_ADMIN_PUB_HEX;

    const bytesToHex = (bytes: Uint8Array): `0x${string}` =>
        `0x${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}` as `0x${string}`;

    async function handleBuyTickets() {
        if (ticketsAmount <= 0) return;

        setEncError(null);

        try {
            let encrypted: `0x${string}` = '0x';

            // For first-time entry, require contact details and encrypt
            if (!isActualParticipant) {
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
                encrypted = bytesToHex(payload);
            }

            buyTickets({ ticketsAmount, encryptedContactDetails: encrypted });
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            setEncError(`Encryption failed: ${msg}`);
        } finally {
            setIsEncrypting(false);
        }
    }

    // Don't render component if wallet is not connected or not SIWE-authenticated
    if (!address || authStatus !== 'authenticated') {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setTicketsAmount(value);
        }
    };

    const isRegistrationOpen = lotteryState.status === LotteryStatus.OpenedForRegistration;
    const totalCost = lotteryState.ticketPrice * BigInt(ticketsAmount);

    return (
        <div className='flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-gray-900'>
                {isActualParticipant ? 'Buy More Lottery Tickets' : 'Buy Lottery Tickets'}
            </h2>

            {isActualParticipant && (
                <>
                    <div className='bg-blue-50 border border-blue-200 rounded-md p-3'>
                        <p className='text-sm text-blue-800'>
                            You are already registered in this lottery. You can buy additional tickets.
                        </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600'>Your Tickets:</span>
                            <span className='font-medium'>{userTicketsCount}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-gray-600'>Your Refund:</span>
                            <span className='font-medium'>
                                {refundAmount ? `${Number(refundAmount) / 1e18} ETH` : '0 ETH'}
                            </span>
                        </div>
                    </div>
                </>
            )}

            <div className='space-y-4'>
                <div>
                    <label htmlFor='tickets-amount' className='block text-sm font-medium text-gray-700 mb-2'>
                        Number of Tickets
                    </label>
                    <Input
                        id='tickets-amount'
                        type='number'
                        min='1'
                        value={ticketsAmount}
                        onChange={handleInputChange}
                        className='w-full'
                        disabled={!isRegistrationOpen || isLoading}
                    />
                </div>

                {!isActualParticipant && (
                    <div>
                        <div className='flex items-baseline justify-between mb-2'>
                            <label htmlFor='contact-details' className='block text-sm font-medium text-gray-700'>
                                Contact Details (encrypted on submit)
                            </label>
                            <span className='text-xs text-gray-500'>
                                {Math.max(0, 60 - contactDetails.length)} left
                            </span>
                        </div>
                        <Input
                            id='contact-details'
                            type='text'
                            value={contactDetails}
                            onChange={(e) => setContactDetails(e.target.value)}
                            placeholder='Email, Telegram, or other contact info'
                            className='w-full'
                            maxLength={60}
                            disabled={!isRegistrationOpen || isLoading || isEncrypting}
                        />
                        {!hasAdminPub && (
                            <p className='text-xs text-red-600 mt-1'>
                                Encryption key not configured (NEXT_PUBLIC_ADMIN_PUB_HEX).
                            </p>
                        )}
                    </div>
                )}

                <div className='bg-gray-50 p-4 rounded-md'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-600'>Ticket Price:</span>
                        <span className='font-medium'>
                            {lotteryState.ticketPrice ? `${Number(lotteryState.ticketPrice) / 1e18} ETH` : 'Loading...'}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-gray-600'>Total Cost:</span>
                        <span className='font-bold text-lg'>
                            {totalCost ? `${Number(totalCost) / 1e18} ETH` : 'Loading...'}
                        </span>
                    </div>
                </div>

                <Button
                    onClick={handleBuyTickets}
                    disabled={
                        !isRegistrationOpen ||
                        isLoading ||
                        isEncrypting ||
                        ticketsAmount <= 0 ||
                        (!isActualParticipant && (!contactDetails.trim() || !hasAdminPub))
                    }
                    className='w-full'
                    size='lg'>
                    {isLoading || isEncrypting
                        ? 'Processing...'
                        : isActualParticipant
                          ? 'Buy More Tickets'
                          : 'Register & Buy Tickets'}
                </Button>

                {!isRegistrationOpen && (
                    <p className='text-sm text-red-600 text-center'>Registration is currently closed</p>
                )}

                {(isError || encError) && (
                    <p className='text-sm text-red-600 text-center'>
                        Error: {encError || error?.message || 'Failed to buy tickets'}
                    </p>
                )}

                {isSuccess && (
                    <p className='text-sm text-green-600 text-center'>
                        {isActualParticipant
                            ? 'Additional tickets purchased successfully!'
                            : 'Tickets purchased successfully!'}
                    </p>
                )}
            </div>
        </div>
    );
}
