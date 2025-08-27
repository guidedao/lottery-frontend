import { LotteryStatus } from '@/types/enums';

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
            return 'text-gray-500';
        case LotteryStatus.OpenedForRegistration:
            return 'text-green-500';
        case LotteryStatus.RegistrationEnded:
            return 'text-yellow-500';
        case LotteryStatus.WaitingForReveal:
            return 'text-blue-500';
        case LotteryStatus.Invalid:
            return 'text-red-500';
        default:
            return 'text-gray-400';
    }
}

export function isLotteryActive(status: LotteryStatus): boolean {
    return status === LotteryStatus.OpenedForRegistration;
}

export function canRegister(status: LotteryStatus): boolean {
    return status === LotteryStatus.OpenedForRegistration;
}
