export enum TanstackKeys {
    useLotteryState = 'useLotteryState',
    useParticipantStatus = 'useParticipantStatus',
    useParticipantsMulticall = 'useParticipantsMulticall',
    useWinners = 'useWinners'
}

export enum LotteryStatus {
    Closed = 0,
    OpenedForRegistration = 1,
    RegistrationEnded = 2,
    WaitingForReveal = 3,
    Invalid = 4
}
