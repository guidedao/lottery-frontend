import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { LotteryStatus, TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import { useConfig } from 'wagmi';
import { readContract } from 'wagmi/actions';

interface LotteryState {
    status: LotteryStatus;
    lotteryNumber: number;
    participantsCount: number;
    ticketPrice: bigint;
    registrationEndTime: bigint;
    lastWinner: string;
}

const DEFAULT_LOTTERY_STATE: LotteryState = {
    status: LotteryStatus.Closed,
    lotteryNumber: 0,
    participantsCount: 0,
    ticketPrice: 0n,
    registrationEndTime: 0n,
    lastWinner: '0x0000000000000000000000000000000000000000'
};

export default function useLotteryState() {
    const config = useConfig();

    const { data, refetch } = useQuery({
        queryKey: [TanstackKeys.useLotteryState],
        queryFn: async () => {
            const [status, lotteryNumber, participantsCount, ticketPrice, registrationEndTime, lastWinner] =
                await Promise.all([
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'status',
                        args: []
                    }),
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'lotteryNumber',
                        args: []
                    }),
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'participantsCount',
                        args: []
                    }),
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'ticketPrice',
                        args: []
                    }),
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'registrationEndTime',
                        args: []
                    }),
                    readContract(config, {
                        address: projectConfig.lotteryCA as `0x${string}`,
                        abi: lotteryABI,
                        functionName: 'lastWinner',
                        args: []
                    })
                ]);

            return {
                status: status as LotteryStatus,
                lotteryNumber: Number(lotteryNumber),
                participantsCount: Number(participantsCount),
                ticketPrice: ticketPrice as bigint,
                registrationEndTime: registrationEndTime as bigint,
                lastWinner: lastWinner as string
            } as LotteryState;
        },
        refetchInterval: 1000 * 120 // Refetch every 2 minutes
    });

    const lotteryState = (data as LotteryState) ?? DEFAULT_LOTTERY_STATE;

    return {
        lotteryState,
        refetch
    };
}
