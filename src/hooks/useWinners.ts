import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import useLotteryState from './useLotteryState';
import type { Abi } from 'viem';
import { useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const lotteryAbi = lotteryABI as Abi;

export interface LotteryWinnerRow {
    lotteryNumber: number;
    winnerAddress: string;
    isCurrentLottery: boolean;
    hasWinner: boolean;
}

export default function useWinners() {
    const config = useConfig();
    const { lotteryState } = useLotteryState();

    const currentLottery = lotteryState.lotteryNumber;

    const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
        enabled: currentLottery > 0,
        queryKey: [TanstackKeys.useWinners, currentLottery] as const,
        queryFn: async () => {
            if (currentLottery <= 0) return [] as LotteryWinnerRow[];

            const address = projectConfig.lotteryCA as `0x${string}`;

            const contracts = Array.from({ length: currentLottery }, (_, idx) => ({
                address,
                abi: lotteryAbi,
                functionName: 'lotteryWinner' as const,
                args: [BigInt(idx + 1)]
            }));

            const winners = (await readContracts(config, {
                allowFailure: false,
                contracts
            })) as unknown as string[];

            return winners.map((winnerAddress, idx) => {
                const lotteryNumber = idx + 1;
                const normalized = winnerAddress?.toLowerCase?.() ?? '';
                const hasWinner = normalized !== '' && normalized !== ZERO_ADDRESS;

                return {
                    lotteryNumber,
                    winnerAddress,
                    isCurrentLottery: lotteryNumber === currentLottery,
                    hasWinner
                } satisfies LotteryWinnerRow;
            });
        },
        refetchInterval: 60_000
    });

    const winners = Array.isArray(data)
        ? (data as LotteryWinnerRow[]).slice().sort((a, b) => a.lotteryNumber - b.lotteryNumber)
        : ([] as LotteryWinnerRow[]);

    return {
        winners,
        isLoading: isLoading || isFetching,
        isError,
        error,
        refetch
    } as const;
}
