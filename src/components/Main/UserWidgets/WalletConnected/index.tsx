'use client';

import useParticipantStatus from '@/hooks/useParticipantStatus';

import UserDontHaveTickets from './UserDontHaveTickets';
import UserHaveTickets from './UserHaveTickets';

export default function WalletConnected() {
    const { isActualParticipant } = useParticipantStatus();
    return isActualParticipant ? <UserHaveTickets /> : <UserDontHaveTickets />;
}
