import { LotteryStatus } from '@/types/enums';

import { showTransactionErrorToast } from './toast-utils';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Utility functions for working with LotteryStatus enum
export function getLotteryStatusText(status: LotteryStatus): string {
    switch (status) {
        case LotteryStatus.Closed:
            return 'Closed';
        case LotteryStatus.OpenedForRegistration:
            return 'Registration Open';
        case LotteryStatus.RegistrationEnded:
            return 'Registration Ended';
        case LotteryStatus.WaitingForReveal:
            return 'Waiting for Winner';
        case LotteryStatus.Invalid:
            return 'Invalid';
        default:
            return 'Unknown';
    }
}

export function getLotteryStatusColor(status: LotteryStatus): string {
    switch (status) {
        case LotteryStatus.Closed:
            return 'text-muted-foreground';
        case LotteryStatus.OpenedForRegistration:
            return 'text-green-500';
        case LotteryStatus.RegistrationEnded:
            return 'text-yellow-500';
        case LotteryStatus.WaitingForReveal:
            return 'text-blue-500';
        case LotteryStatus.Invalid:
            return 'text-red-500';
        default:
            return 'text-muted-foreground';
    }
}

export function isLotteryActive(status: LotteryStatus): boolean {
    return status === LotteryStatus.OpenedForRegistration;
}

export function canRegister(status: LotteryStatus): boolean {
    return status === LotteryStatus.OpenedForRegistration;
}

export const formatTime = (time: number) => `${time}`.padStart(2, '0');

/**
 * Returns days, hours, minutes, and seconds left until `endTimeMs`.
 * @param endTimeMs - timestamp in milliseconds
 */
export const getTimeLeft = (endTimeMs: number): { days: number; hours: number; minutes: number; seconds: number } => {
    const diffSec = Math.max(Math.floor((endTimeMs - Date.now()) / 1000), 0);

    const days = Math.floor(diffSec / 86400);
    const hours = Math.floor((diffSec % 86400) / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;

    return { days, hours, minutes, seconds };
};

function isViemErrorCause(obj: unknown): obj is { message?: string; shortMessage?: string; details?: string } {
    return typeof obj === 'object' && obj !== null;
}

export const handleTransactionError = (error: Error) => {
    if (isViemErrorCause(error.cause)) {
        const userCanceledTransaction =
            error.cause?.message?.includes('User rejected the request') ||
            error.cause?.shortMessage?.includes('User rejected the request') ||
            error.cause?.details?.includes('MetaMask Tx Signature: User denied transaction signature');

        if (userCanceledTransaction) {
            showTransactionErrorToast('Transaction cancelled by user.');
            console.error(error);
        }
        return;
    }

    showTransactionErrorToast(error?.message || 'Failed to buy tickets');
    console.error(error);
};
