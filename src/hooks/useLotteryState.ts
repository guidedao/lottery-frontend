import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { LotteryStatus, TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import type { Abi } from 'viem';
import { useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

const lotteryAbi = lotteryABI as Abi;

interface LotteryState {
    status: LotteryStatus;
    lotteryNumber: number;
    participantsCount: number;
    ticketPrice: bigint;
    registrationEndTime: bigint;
    maxParticipantsNumber: number;
    registrationDuration: bigint;
    refundWindow: bigint;
    totalTicketsCount: number;
}

const DEFAULT_LOTTERY_STATE: LotteryState = {
    status: LotteryStatus.Closed,
    lotteryNumber: 0,
    participantsCount: 0,
    ticketPrice: 0n,
    registrationEndTime: 0n,
    maxParticipantsNumber: 0,
    registrationDuration: 0n,
    refundWindow: 0n,
    totalTicketsCount: 0
};

export default function useLotteryState() {
    const config = useConfig();

    const { data, refetch, isLoading } = useQuery({
        queryKey: [TanstackKeys.useLotteryState],
        queryFn: async () => {
            const address = projectConfig.lotteryCA as `0x${string}`;

            const [
                status,
                lotteryNumber,
                participantsCount,
                ticketPrice,
                registrationEndTime,
                maxParticipantsNumber,
                registrationDuration,
                refundWindow,
                totalTicketsCount
            ] = await readContracts(config, {
                allowFailure: false,
                contracts: [
                    { address, abi: lotteryAbi, functionName: 'status' },
                    { address, abi: lotteryAbi, functionName: 'lotteryNumber' },
                    { address, abi: lotteryAbi, functionName: 'participantsCount' },
                    { address, abi: lotteryAbi, functionName: 'ticketPrice' },
                    { address, abi: lotteryAbi, functionName: 'registrationEndTime' },
                    { address, abi: lotteryAbi, functionName: 'MAX_PARTICIPANTS_NUMBER' },
                    { address, abi: lotteryAbi, functionName: 'REGISTRATION_DURATION' },
                    { address, abi: lotteryAbi, functionName: 'REFUND_WINDOW' },
                    { address, abi: lotteryAbi, functionName: 'totalTicketsCount' }
                ]
            });

            const currentLotteryNumber = lotteryNumber as unknown as bigint;

            return {
                status: Number(status) as LotteryStatus,
                lotteryNumber: Number(currentLotteryNumber),
                participantsCount: Number(participantsCount),
                ticketPrice: ticketPrice as unknown as bigint,
                registrationEndTime: registrationEndTime as unknown as bigint,
                maxParticipantsNumber: Number(maxParticipantsNumber),
                registrationDuration: registrationDuration as unknown as bigint,
                refundWindow: refundWindow as unknown as bigint,
                totalTicketsCount: Number(totalTicketsCount)
            } satisfies LotteryState;
        },
        refetchInterval: 1000 * 120 // Refetch every 2 minutes
    });

    const lotteryState = (data as LotteryState) ?? DEFAULT_LOTTERY_STATE;

    return {
        lotteryState,
        refetch,
        isLoading
    };
}
