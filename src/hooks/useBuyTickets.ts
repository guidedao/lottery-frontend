import { projectConfig } from '@/config/projectConfig';
import lotteryABI from '@/lib/abis/lotteryABI';
import { TanstackKeys } from '@/types/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAccount, useConfig } from 'wagmi';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';

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

            // Check if user is already a participant
            const isActualParticipant = await readContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'isActualParticipant',
                args: [address]
            });

            // Get ticket price from the contract
            const ticketPrice = await readContract(config, {
                address: projectConfig.lotteryCA as `0x${string}`,
                abi: lotteryABI,
                functionName: 'ticketPrice',
                args: []
            });

            const totalCost = (ticketPrice as bigint) * BigInt(ticketsAmount);

            // Call appropriate function based on participant status
            if (isActualParticipant) {
                // User is already a participant, use buyMoreTickets
                return writeContract(config, {
                    address: projectConfig.lotteryCA as `0x${string}`,
                    abi: lotteryABI,
                    functionName: 'buyMoreTickets',
                    args: [BigInt(ticketsAmount)],
                    value: totalCost
                });
            } else {
                // User is not a participant, use enter
                return writeContract(config, {
                    address: projectConfig.lotteryCA as `0x${string}`,
                    abi: lotteryABI,
                    functionName: 'enter',
                    args: [BigInt(ticketsAmount), encryptedContactDetails as `0x${string}`],
                    value: totalCost
                });
            }
        },
        onSuccess: async (hash) => {
            // Wait for transaction to be confirmed before invalidating queries
            if (hash) {
                try {
                    await waitForTransactionReceipt(config, { hash });
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useParticipantStatus] });
                } catch (error) {
                    console.error('Error waiting for transaction confirmation:', error);
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useLotteryState] });
                    queryClient.invalidateQueries({ queryKey: [TanstackKeys.useParticipantStatus] });
                }
            }
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
