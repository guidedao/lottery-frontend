import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

import { useAccount, useConfig } from 'wagmi';
import { readContract } from 'wagmi/actions';

export default function useParticipantStatus() {
    const config = useConfig();
    const { address } = useAccount();

    const { data: isActualParticipant, refetch } = useQuery({
        queryKey: [TanstackKeys.useParticipantStatus, address],
        queryFn: async () => {
            if (!address) {
                return false;
            }

            return readContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'isActualParticipant',
                args: [address]
            }) as Promise<boolean>;
        },
        enabled: !!address,
        refetchInterval: 1000 * 60 // Refetch every minute
    });

    return {
        isActualParticipant: isActualParticipant ?? false,
        refetch
    };
}
