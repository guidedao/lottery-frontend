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
import { useTranslations } from 'next-globe-gen';
import { useAccount } from 'wagmi';

export default function BuyTicketsForm() {
    const t = useTranslations();
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

            await buyTickets({ ticketsAmount, encryptedContactDetails: encrypted });
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
    const totalTickets = Number(lotteryState.totalTicketsCount ?? 0);
    const yourTickets = isActualParticipant ? userTicketsCount : 0;
    const yourChance = totalTickets > 0 ? (yourTickets / totalTickets) * 100 : 0;
    const predictedTotal = totalTickets + (ticketsAmount || 0);
    const predictedYours = yourTickets + (ticketsAmount || 0);
    const predictedChance = predictedTotal > 0 ? (predictedYours / predictedTotal) * 100 : 0;
    const fmtPct = (v: number) => v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold text-gray-900'>
                {isActualParticipant ? t('home.buy_more_lottery_tickets') : t('home.buy_lottery_tickets')}
            </h2>

            {isActualParticipant && (
                <>
                    <div className='bg-blue-50 border border-blue-200 rounded-md p-3'>
                        <p className='text-sm text-blue-800'>{t('home.already_registered_in_this_lottery')}</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600'>{t('home.your_tickets')}:</span>
                            <span className='font-medium'>{userTicketsCount}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-gray-600'>{t('home.your_refund')}:</span>
                            <span className='font-medium'>
                                {refundAmount ? `${Number(refundAmount) / 1e18} ETH` : '0 ETH'}
                            </span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <span className='text-sm text-gray-600'>{t('home.your_win_chance')}:</span>
                            <span className='font-medium'>{fmtPct(yourChance)}%</span>
                        </div>
                    </div>
                </>
            )}

            <div className='space-y-4'>
                <div>
                    <label htmlFor='tickets-amount' className='block text-sm font-medium text-gray-700 mb-2'>
                        {t('home.number_of_tickets')}
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
                                {t('home.contact_details')}
                            </label>
                            <span className='text-xs text-gray-500'>
                                {Math.max(0, 80 - contactDetails.length)} left
                            </span>
                        </div>
                        <Input
                            id='contact-details'
                            type='text'
                            value={contactDetails}
                            onChange={(e) => setContactDetails(e.target.value)}
                            placeholder={t('home.contact_info_placeholder')}
                            className='w-full'
                            maxLength={80}
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
                        <span className='text-sm text-gray-600'>{t('home.ticket_price')}:</span>
                        <span className='font-medium'>
                            {lotteryState.ticketPrice ? `${Number(lotteryState.ticketPrice) / 1e18} ETH` : 'Loading...'}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-gray-600'>{t('home.total_cost')}:</span>
                        <span className='font-bold text-lg'>
                            {totalCost ? `${Number(totalCost) / 1e18} ETH` : t('home.Loading')}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-sm text-gray-600'>{t('home.chance_after_purchase')}:</span>
                        <span className='font-medium'>{fmtPct(predictedChance)}%</span>
                    </div>
                </div>

                {!isRegistrationOpen && (
                    <p className='text-sm text-red-600 text-center'>{t('home.registration_is_currently_closed')}</p>
                )}

                {(isError || encError) && (
                    <p className='text-sm text-red-600 text-center'>
                        {t('home.Error')}: {encError || error?.message || t('home.failed_to_buy_tickets')}
                    </p>
                )}

                {isSuccess && (
                    <p className='text-sm text-green-600 text-center'>
                        {isActualParticipant
                            ? t('home.additional_tickets_purchased_successfully')
                            : t('home.tickets_purchased_successfully')}
                    </p>
                )}

                <Button
                    onClick={handleBuyTickets}
                    disabled={
                        !isRegistrationOpen ||
                        isLoading ||
                        isEncrypting ||
                        ticketsAmount <= 0 ||
                        (!isActualParticipant && (!contactDetails.trim() || !hasAdminPub))
                    }
                    className='w-full cursor-pointer'
                    size='lg'>
                    {isLoading || isEncrypting
                        ? t('home.Processing')
                        : isActualParticipant
                          ? t('home.buy_more_tickets')
                          : t('home.register_&_buy_tickets')}
                </Button>
            </div>
        </div>
    );
}
