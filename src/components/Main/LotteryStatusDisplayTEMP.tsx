'use client';

import useLotteryState from '@/hooks/useLotteryState';
import { canRegister, getLotteryStatusColor, getLotteryStatusText, isLotteryActive } from '@/lib/utils';
import { LotteryStatus } from '@/types/enums';

export function LotteryStatusDisplay() {
    const { lotteryState } = useLotteryState();
    const { status, participantsCount, lotteryNumber, ticketPrice, registrationEndTime, lastWinner } = lotteryState;

    return (
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white'>
            <div className='space-y-4'>
                {/* Status Display */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Lottery Status:</span>
                    <span className={`text-lg font-bold ${getLotteryStatusColor(status)}`}>
                        {getLotteryStatusText(status)}
                    </span>
                </div>

                {/* Lottery Number */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Lottery #:</span>
                    <span className='text-lg font-bold text-blue-400'>{lotteryNumber}</span>
                </div>

                {/* Participants Count */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Participants:</span>
                    <span className='text-lg font-bold text-green-400'>{participantsCount}</span>
                </div>

                {/* Ticket Price */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Ticket Price:</span>
                    <span className='text-lg font-bold text-purple-400'>
                        {ticketPrice ? `${Number(ticketPrice) / 1e18} ETH` : '0 ETH'}
                    </span>
                </div>

                {/* Registration End Time */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Registration Ends:</span>
                    <span className='text-lg font-bold text-orange-400'>
                        {registrationEndTime
                            ? new Date(Number(registrationEndTime) * 1000).toLocaleString()
                            : 'Not set'}
                    </span>
                </div>

                {/* Last Winner */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Last Winner:</span>
                    <span className='text-lg font-bold text-yellow-400'>
                        {lastWinner && lastWinner !== '0x0000000000000000000000000000000000000000'
                            ? `${lastWinner.slice(0, 6)}...${lastWinner.slice(-4)}`
                            : 'No winner yet'}
                    </span>
                </div>

                {/* Action Buttons based on Status */}
                <div className='pt-4'>
                    {canRegister(status) && (
                        <button className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors'>
                            Register for Lottery
                        </button>
                    )}

                    {status === LotteryStatus.WaitingForReveal && (
                        <div className='text-center text-yellow-400 font-medium'>
                            Waiting for winner to be revealed...
                        </div>
                    )}

                    {status === LotteryStatus.Closed && (
                        <div className='text-center text-gray-400 font-medium'>Lottery is currently closed</div>
                    )}

                    {status === LotteryStatus.Invalid && (
                        <div className='text-center text-red-400 font-medium'>This lottery round was invalid</div>
                    )}
                </div>

                {/* Debug Info (remove in production) */}
                <div className='mt-4 pt-4 border-t border-white/20'>
                    <div className='text-sm text-gray-400 space-y-1'>
                        <div>Raw Status Value: {status}</div>
                        <div>Is Active: {isLotteryActive(status) ? 'Yes' : 'No'}</div>
                        <div>Can Register: {canRegister(status) ? 'Yes' : 'No'}</div>
                        <div>Raw Ticket Price: {ticketPrice?.toString() || '0'}</div>
                        <div>Raw Registration End Time: {registrationEndTime?.toString() || '0'}</div>
                        <div>Raw Last Winner: {lastWinner || '0x0000000000000000000000000000000000000000'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
