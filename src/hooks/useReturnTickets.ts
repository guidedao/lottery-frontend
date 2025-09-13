import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { showTransactionErrorToast, showTransactionPendingToast, showTransactionSuccessToast } from '@/lib/toast-utils';
import { handleTransactionError } from '@/lib/utils';
import { TanstackKeys } from '@/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTranslations } from 'next-globe-gen';
import { useConfig } from 'wagmi';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';

interface ReturnTicketsParams {
    amount: number;
}

export default function useReturnTickets() {
    const config = useConfig();
    const queryClient = useQueryClient();
    const t = useTranslations();

    const mutation = useMutation({
        mutationFn: async ({ amount }: ReturnTicketsParams) => {
            if (!Number.isFinite(amount) || amount <= 0) {
                throw new Error('Amount must be a positive number');
            }

            showTransactionPendingToast('Processing tickets return...');

            return writeContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'returnTickets',
                args: [BigInt(amount)]
            });
        },
        onSuccess: async (hash) => {
            // Wait for transaction to be confirmed before invalidating queries
            if (hash) {
                try {
                    await waitForTransactionReceipt(config, { hash });

                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useParticipantStatus] });
                    showTransactionSuccessToast(`${t('home.tickets_returned_successfully')} 🔁`);
                } catch (error) {
                    console.error('Error waiting for transaction confirmation:', error);
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useParticipantStatus] });
                    showTransactionErrorToast('Failed to return tickets');
                }
            }
        },
        onError: (error) => {
            handleTransactionError(error);
        }
    });

    return {
        returnTickets: mutation.mutate,
        returnTicketsAsync: mutation.mutateAsync,
        isLoading: mutation.isPending
    };
}
