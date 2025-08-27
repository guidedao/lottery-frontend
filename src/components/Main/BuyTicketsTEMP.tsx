'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useBuyTickets from '@/hooks/useBuyTickets';
import useLotteryState from '@/hooks/useLotteryState';
import { LotteryStatus } from '@/types/enums';

import { useAccount } from 'wagmi';

export default function BuyTicketsTEMP() {
    const [ticketsAmount, setTicketsAmount] = useState<number>(1);
    const { buyTickets, isLoading, isError, error, isSuccess } = useBuyTickets();
    const { lotteryState } = useLotteryState();
    const { address } = useAccount();

    // Don't render component if wallet is not connected
    if (!address) {
        return null;
    }

    const handleBuyTickets = () => {
        if (ticketsAmount > 0) {
            buyTickets({
                ticketsAmount,
                encryptedContactDetails: '0x' // Placeholder
            });
        }
    };

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
            <h2 className='text-2xl font-bold text-gray-900'>Buy Lottery Tickets</h2>

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
                    disabled={!isRegistrationOpen || isLoading || ticketsAmount <= 0}
                    className='w-full'
                    size='lg'>
                    {isLoading ? 'Processing...' : 'Buy Tickets'}
                </Button>

                {!isRegistrationOpen && (
                    <p className='text-sm text-red-600 text-center'>Registration is currently closed</p>
                )}

                {isError && (
                    <p className='text-sm text-red-600 text-center'>
                        Error: {error?.message || 'Failed to buy tickets'}
                    </p>
                )}

                {isSuccess && <p className='text-sm text-green-600 text-center'>Tickets purchased successfully!</p>}
            </div>
        </div>
    );
}
