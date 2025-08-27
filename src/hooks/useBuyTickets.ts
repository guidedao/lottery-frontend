import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAccount, useConfig } from 'wagmi';
import { readContract, writeContract } from 'wagmi/actions';

interface BuyTicketsParams {
    ticketsAmount: number;
    encryptedContactDetails?: string;
}

export default function useBuyTickets() {
    const config = useConfig();
    const { address } = useAccount();
    const queryClient = useQueryClient();

    const buyTicketsMutation = useMutation({
        mutationFn: async ({ ticketsAmount, encryptedContactDetails = '0x' }: BuyTicketsParams) => {
            if (!address) {
                throw new Error('Wallet not connected');
            }

            // Get ticket price from the contract
            const ticketPrice = await readContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'ticketPrice',
                args: []
            });

            const totalCost = (ticketPrice as bigint) * BigInt(ticketsAmount);

            return writeContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'enter',
                args: [BigInt(ticketsAmount), encryptedContactDetails as `0x${string}`],
                value: totalCost
            });
        },
        onSuccess: () => {
            // Invalidate and refetch lottery state after successful purchase
            queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
        }
    });

    return {
        buyTickets: buyTicketsMutation.mutate,
        buyTicketsAsync: buyTicketsMutation.mutateAsync,
        isLoading: buyTicketsMutation.isPending,
        isError: buyTicketsMutation.isError,
        error: buyTicketsMutation.error,
        isSuccess: buyTicketsMutation.isSuccess
    };
}
