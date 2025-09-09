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

type UseParticipantsOptions = { lotteryNumber?: number };

export default function useParticipantsMulticall(opts?: UseParticipantsOptions) {
    const config = useConfig();
    const { lotteryState } = useLotteryState();

    const currentLottery = lotteryState.lotteryNumber;
    const selectedLottery = opts?.lotteryNumber ?? currentLottery;
    const isCurrentLottery = selectedLottery === currentLottery;
    const currentCount = lotteryState.participantsCount;
    const maxParticipants = lotteryState.maxParticipantsNumber || 0;

    // Build a stable query that can serve both current and historical lotteries
    const queryKey = [
        TanstackKeys.useParticipantsMulticall,
        selectedLottery,
        isCurrentLottery ? currentCount : 'historical'
    ] as const;

    const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
        enabled: isCurrentLottery ? currentCount > 0 : selectedLottery >= 0,
        queryKey,
        queryFn: async () => {
            const contractAddress = projectConfig.lotteryCA as `0x${string}`;

            const zeroAddressRe = /^0x0+$/i;
            const CHUNK = 128;

            const fetchAddressesCurrent = async (): Promise<string[]> => {
                if (currentCount <= 0) return [];
                const calls = Array.from({ length: currentCount }, (_, i) => ({
                    address: contractAddress,
                    abi: lotteryABI,
                    functionName: 'participants' as const,
                    args: [BigInt(selectedLottery), BigInt(i)]
                }));
                const res = (await readContracts(config, {
                    allowFailure: false,
                    contracts: calls
                })) as unknown as string[];
                return res;
            };

            const fetchAddressesHistorical = async (): Promise<string[]> => {
                const limit = Math.max(0, maxParticipants);
                if (limit === 0) return [];
                const out: string[] = [];
                for (let start = 0; start < limit; start += CHUNK) {
                    const end = Math.min(limit, start + CHUNK);
                    const calls = Array.from({ length: end - start }, (_, j) => ({
                        address: contractAddress,
                        abi: lotteryABI,
                        functionName: 'participants' as const,
                        args: [BigInt(selectedLottery), BigInt(start + j)]
                    }));
                    const res = (await readContracts(config, {
                        allowFailure: true,
                        contracts: calls
                    })) as unknown as Array<{ result?: string }>;

                    let stop = false;
                    for (const item of res) {
                        const addr = item?.result as string | undefined;
                        if (!addr || zeroAddressRe.test(addr)) {
                            stop = true;
                            break;
                        }
                        out.push(addr);
                    }
                    if (stop) break;
                }
                return out;
            };

            const addresses = isCurrentLottery ? await fetchAddressesCurrent() : await fetchAddressesHistorical();

            if (addresses.length === 0) return [] as ParticipantInfoRow[];

            // Pull per-user info
            const infoCalls = addresses.map((addr) => ({
                address: contractAddress,
                abi: lotteryABI,
                functionName: 'participantsInfo' as const,
                args: [BigInt(selectedLottery), addr as `0x${string}`]
            }));

            const infos = (await readContracts(config, {
                allowFailure: !isCurrentLottery, // be strict for current lottery; tolerant for historical
                contracts: infoCalls
            })) as unknown as Array<[bigint, bigint, `0x${string}`] | { result?: [bigint, bigint, `0x${string}`] }>;

            const rows: ParticipantInfoRow[] = addresses.map((addr, idx) => {
                // Handle both allowFailure=false tuple and allowFailure=true object shapes
                const item = infos[idx] as
                    | [bigint, bigint, `0x${string}`]
                    | { result?: [bigint, bigint, `0x${string}`] };
                const tuple = Array.isArray(item) ? item : item?.result;
                const fallback: [bigint, bigint, `0x${string}`] = [0n, BigInt(idx), '0x' as `0x${string}`];
                const [ticketsBought, participantIndex, encryptedContactDetails] = tuple || fallback;
                return {
                    address: addr,
                    ticketsBought: Number(ticketsBought),
                    participantIndex: Number(participantIndex),
                    encryptedContactDetails
                } satisfies ParticipantInfoRow;
            });

            rows.sort((a, b) => a.participantIndex - b.participantIndex);
            return rows;
        },
        refetchInterval: 1000 * 60
    });

    return {
        participants: (data as ParticipantInfoRow[] | undefined) ?? [],
        isLoading: isLoading || isFetching,
        isError,
        error,
        refetch
    };
}
