import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import useLotteryState from './useLotteryState';
import { useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

export interface ParticipantInfoRow {
    address: string;
    ticketsBought: number;
    participantIndex: number;
    encryptedContactDetails: `0x${string}` | string;
}

export default function useParticipantsMulticall() {
    const config = useConfig();
    const { lotteryState } = useLotteryState();

    const { lotteryNumber, participantsCount } = lotteryState;

    const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
        enabled: participantsCount > 0,
        queryKey: [TanstackKeys.useParticipantsMulticall, lotteryNumber, participantsCount],
        queryFn: async () => {
            const contractAddress = projectConfig.lotteryCA as `0x${string}`;

            // 1) Fetch all participant addresses by index
            const participantCalls = Array.from({ length: participantsCount }, (_, i) => ({
                address: contractAddress,
                abi: lotteryABI,
                functionName: 'participants' as const,
                args: [BigInt(lotteryNumber), BigInt(i)]
            }));

            const addresses = (await readContracts(config, {
                allowFailure: false,
                contracts: participantCalls
            })) as unknown as string[];

            if (!addresses.length) return [] as ParticipantInfoRow[];

            // 2) Fetch detailed info for each participant address
            const infoCalls = addresses.map((addr) => ({
                address: contractAddress,
                abi: lotteryABI,
                functionName: 'participantsInfo' as const,
                args: [BigInt(lotteryNumber), addr as `0x${string}`]
            }));

            const infos = (await readContracts(config, {
                allowFailure: false,
                contracts: infoCalls
            })) as unknown as [bigint, bigint, `0x${string}`][];

            const rows: ParticipantInfoRow[] = addresses.map((addr, idx) => {
                const [ticketsBought, participantIndex, encryptedContactDetails] = infos[idx] as unknown as [
                    bigint,
                    bigint,
                    `0x${string}`
                ];
                return {
                    address: addr,
                    ticketsBought: Number(ticketsBought),
                    participantIndex: Number(participantIndex),
                    encryptedContactDetails
                } satisfies ParticipantInfoRow;
            });

            // Ensure sorted by participantIndex ascending
            rows.sort((a, b) => a.participantIndex - b.participantIndex);
            return rows;
        },
        refetchInterval: 1000 * 60 // 1 minute
    });

    return {
        participants: (data as ParticipantInfoRow[] | undefined) ?? [],
        isLoading: isLoading || isFetching,
        isError,
        error,
        refetch
    };
}
