import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { LotteryStatus, TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import { useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

interface LotteryState {
    status: LotteryStatus;
    lotteryNumber: number;
    participantsCount: number;
    ticketPrice: bigint;
    registrationEndTime: bigint;
    lastWinner: string;
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
    lastWinner: '0x0000000000000000000000000000000000000000',
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
                lastWinner,
                maxParticipantsNumber,
                registrationDuration,
                refundWindow,
                totalTicketsCount
            ] = await readContracts(config, {
                allowFailure: false,
                contracts: [
                    { address, abi: lotteryABI, functionName: 'status' },
                    { address, abi: lotteryABI, functionName: 'lotteryNumber' },
                    { address, abi: lotteryABI, functionName: 'participantsCount' },
                    { address, abi: lotteryABI, functionName: 'ticketPrice' },
                    { address, abi: lotteryABI, functionName: 'registrationEndTime' },
                    { address, abi: lotteryABI, functionName: 'lastWinner' },
                    { address, abi: lotteryABI, functionName: 'MAX_PARTICIPANTS_NUMBER' },
                    { address, abi: lotteryABI, functionName: 'REGISTRATION_DURATION' },
                    { address, abi: lotteryABI, functionName: 'REFUND_WINDOW' },
                    { address, abi: lotteryABI, functionName: 'totalTicketsCount' }
                ]
            });

            return {
                status: status as unknown as LotteryStatus,
                lotteryNumber: Number(lotteryNumber),
                participantsCount: Number(participantsCount),
                ticketPrice: ticketPrice as unknown as bigint,
                registrationEndTime: registrationEndTime as unknown as bigint,
                lastWinner: lastWinner as unknown as string,
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
