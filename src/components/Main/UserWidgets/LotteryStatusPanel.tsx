'use client';

import useLotteryState from '@/hooks/useLotteryState';
import { canRegister, getLotteryStatusColor, getLotteryStatusText, isLotteryActive } from '@/lib/utils';
import { LotteryStatus } from '@/types/enums';

export function LotteryStatusDisplay() {
    const { lotteryState } = useLotteryState();
    const {
        status,
        participantsCount,
        lotteryNumber,
        ticketPrice,
        registrationEndTime,
        lastWinner,
        maxParticipantsNumber,
        registrationDuration,
        refundWindow,
        totalTicketsCount
    } = lotteryState;

    return (
        <div className='text-foreground'>
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

                {/* Max Participants */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Max Participants:</span>
                    <span className='text-lg font-bold text-green-300'>{maxParticipantsNumber}</span>
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

                {/* Registration Duration */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Registration Duration:</span>
                    <span className='text-lg font-bold text-orange-300'>
                        {registrationDuration ? `${Number(registrationDuration)} sec` : 'Not set'}
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

                {/* Total Tickets Count */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Total Tickets:</span>
                    <span className='text-lg font-bold text-purple-300'>{totalTicketsCount}</span>
                </div>

                {/* Refund Window */}
                <div className='flex items-center justify-between'>
                    <span className='text-lg font-medium'>Refund Window:</span>
                    <span className='text-lg font-bold text-pink-300'>
                        {refundWindow ? `${Number(refundWindow)} sec` : 'Not set'}
                    </span>
                </div>

                {/* Status Notices (no actions) */}
                <div className='pt-4'>
                    {status === LotteryStatus.WaitingForReveal && (
                        <div className='text-center text-yellow-400 font-medium'>
                            Waiting for winner to be revealed...
                        </div>
                    )}

                    {status === LotteryStatus.Closed && (
                        <div className='text-center text-muted-foreground font-medium'>Lottery is currently closed</div>
                    )}

                    {status === LotteryStatus.Invalid && (
                        <div className='text-center text-red-400 font-medium'>This lottery round was invalid</div>
                    )}
                </div>

                {/* Debug Info (remove in production) */}
                <div className='mt-4 pt-4 shadow'>
                    <div className='text-sm text-muted-foreground space-y-1'>
                        <div>Raw Status Value: {status}</div>
                        <div>Is Active: {isLotteryActive(status) ? 'Yes' : 'No'}</div>
                        <div>Can Register: {canRegister(status) ? 'Yes' : 'No'}</div>
                        <div>Raw Ticket Price: {ticketPrice?.toString() || '0'}</div>
                        <div>Raw Registration End Time: {registrationEndTime?.toString() || '0'}</div>
                        <div>Raw Last Winner: {lastWinner || '0x0000000000000000000000000000000000000000'}</div>
                        <div>Raw Max Participants: {maxParticipantsNumber}</div>
                        <div>Raw Registration Duration: {registrationDuration?.toString() || '0'}</div>
                        <div>Raw Refund Window: {refundWindow?.toString() || '0'}</div>
                        <div>Raw Total Tickets: {totalTicketsCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
