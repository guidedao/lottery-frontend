import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useConfig } from 'wagmi';
import { writeContract } from 'wagmi/actions';

interface ReturnTicketsParams {
    amount: number;
}

export default function useReturnTickets() {
    const config = useConfig();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ amount }: ReturnTicketsParams) => {
            if (!Number.isFinite(amount) || amount <= 0) {
                throw new Error('Amount must be a positive number');
            }

            return writeContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'returnTickets',
                args: [BigInt(amount)]
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
            queryClient.invalidateQueries({ queryKey: [TanstackKeys.useParticipantStatus] });
        }
    });

    return {
        returnTickets: mutation.mutate,
        returnTicketsAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess
    };
}
