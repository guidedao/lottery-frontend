import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import { useAccount, useConfig } from 'wagmi';
import { readContracts } from 'wagmi/actions';

interface ParticipantStatusData {
    isActualParticipant: boolean;
    userTicketsCount: number;
    refundAmount: bigint;
}

const DEFAULT_PARTICIPANT_STATUS: ParticipantStatusData = {
    isActualParticipant: false,
    userTicketsCount: 0,
    refundAmount: 0n
};

export default function useParticipantStatus() {
    const config = useConfig();
    const { address } = useAccount();

    const { data, refetch } = useQuery({
        queryKey: [TanstackKeys.useParticipantStatus, address],
        queryFn: async (): Promise<ParticipantStatusData> => {
            if (!address) return DEFAULT_PARTICIPANT_STATUS;

            const ca = projectConfig.lotteryCA as `0x${string}`;

            const [isActualParticipant, userTicketsCount, refundAmount] = await readContracts(config, {
                allowFailure: false,
                contracts: [
                    { address: ca, abi: lotteryABI, functionName: 'isActualParticipant', args: [address] },
                    { address: ca, abi: lotteryABI, functionName: 'userTicketsCount', args: [address] },
                    { address: ca, abi: lotteryABI, functionName: 'refundAmount', args: [address] }
                ]
            });

            return {
                isActualParticipant: isActualParticipant as unknown as boolean,
                userTicketsCount: Number(userTicketsCount),
                refundAmount: refundAmount as unknown as bigint
            };
        },
        enabled: !!address,
        refetchInterval: 1000 * 60 // Refetch every minute
    });

    const result = (data as ParticipantStatusData) ?? DEFAULT_PARTICIPANT_STATUS;

    return {
        isActualParticipant: result.isActualParticipant,
        userTicketsCount: result.userTicketsCount,
        refundAmount: result.refundAmount,
        refetch
    };
}
