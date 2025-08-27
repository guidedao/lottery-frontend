export enum TanstackKeys {
    useLotteryState = 'useLotteryState'
}

export enum LotteryStatus {
    Closed = 0,
    OpenedForRegistration = 1,
    RegistrationEnded = 2,
    WaitingForReveal = 3,
    Invalid = 4
}
