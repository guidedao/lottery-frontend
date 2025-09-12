export default function useTicketPurchaseMath(params: {
    ticketPrice: bigint;
    totalTickets: number;
    yourTickets: number;
    ticketsAmount: number;
}) {
    const { ticketPrice, totalTickets, yourTickets, ticketsAmount } = params;

    const safeAmount = Math.max(0, Number.isFinite(ticketsAmount) ? ticketsAmount : 0);
    const totalCost = ticketPrice * BigInt(safeAmount);

    const yourChance = totalTickets > 0 ? (yourTickets / totalTickets) * 100 : 0;
    const predictedTotal = totalTickets + safeAmount;
    const predictedYours = yourTickets + safeAmount;
    const predictedChance = predictedTotal > 0 ? (predictedYours / predictedTotal) * 100 : 0;

    return {
        totalCost,
        yourChance,
        predictedTotal,
        predictedYours,
        predictedChance
    } as const;
}
