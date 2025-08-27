export default [
    {
        inputs: [
            { internalType: 'address', name: 'organizer', type: 'address' },
            { internalType: 'uint256', name: '_ticketPrice', type: 'uint256' },
            { internalType: 'address', name: '_guideDAOToken', type: 'address' },
            { internalType: 'address', name: '_vrfCoordinator', type: 'address' },
            { internalType: 'uint256', name: '_subscriptionId', type: 'uint256' },
            { internalType: 'bytes32', name: '_keyHash', type: 'bytes32' },
            { internalType: 'uint32', name: '_callbackGasLimit', type: 'uint32' },
            { internalType: 'uint16', name: '_requestConfirmations', type: 'uint16' }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    { inputs: [{ internalType: 'address', name: 'caller', type: 'address' }], name: 'AlreadyHasToken', type: 'error' },
    {
        inputs: [{ internalType: 'address', name: 'participant', type: 'address' }],
        name: 'AlreadyRegistered',
        type: 'error'
    },
    { inputs: [{ internalType: 'address', name: 'callable', type: 'address' }], name: 'CallFailed', type: 'error' },
    {
        inputs: [
            { internalType: 'uint256', name: 'total', type: 'uint256' },
            { internalType: 'uint256', name: 'allowed', type: 'uint256' }
        ],
        name: 'ExtensionTooLong',
        type: 'error'
    },
    { inputs: [{ internalType: 'address', name: 'caller', type: 'address' }], name: 'HasNotRegistered', type: 'error' },
    {
        inputs: [
            { internalType: 'enum Types.LotteryStatus', name: 'received', type: 'uint8' },
            { internalType: 'enum Types.LotteryStatus', name: 'expected', type: 'uint8' }
        ],
        name: 'IncorrectLotteryStatus',
        type: 'error'
    },
    {
        inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'uint256', name: 'sent', type: 'uint256' },
            { internalType: 'uint256', name: 'needed', type: 'uint256' }
        ],
        name: 'InsufficientFunds',
        type: 'error'
    },
    {
        inputs: [
            { internalType: 'address', name: 'caller', type: 'address' },
            { internalType: 'uint256', name: 'has', type: 'uint256' },
            { internalType: 'uint256', name: 'requested', type: 'uint256' }
        ],
        name: 'InsufficientTicketsNumber',
        type: 'error'
    },
    { inputs: [], name: 'NoExpiredRefunds', type: 'error' },
    {
        inputs: [
            { internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'fromParticipantIndex', type: 'uint256' }
        ],
        name: 'NothingToClear',
        type: 'error'
    },
    {
        inputs: [
            { internalType: 'address', name: 'have', type: 'address' },
            { internalType: 'address', name: 'want', type: 'address' }
        ],
        name: 'OnlyCoordinatorCanFulfill',
        type: 'error'
    },
    {
        inputs: [
            { internalType: 'address', name: 'have', type: 'address' },
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'coordinator', type: 'address' }
        ],
        name: 'OnlyOwnerOrCoordinator',
        type: 'error'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'limit', type: 'uint256' }],
        name: 'ParticipantsLimitExceeded',
        type: 'error'
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'receivedCurrentLotteryNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'minimumCurrentLotteryNumber', type: 'uint256' }
        ],
        name: 'TooEarlyToClearData',
        type: 'error'
    },
    { inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }], name: 'WithdrawFailed', type: 'error' },
    { inputs: [], name: 'ZeroAddress', type: 'error' },
    { inputs: [], name: 'ZeroOrganizerAddress', type: 'error' },
    { inputs: [], name: 'ZeroOrganizerBalance', type: 'error' },
    {
        inputs: [{ internalType: 'address', name: 'caller', type: 'address' }],
        name: 'ZeroRefundBalance',
        type: 'error'
    },
    { inputs: [], name: 'ZeroTicketPrice', type: 'error' },
    {
        inputs: [{ internalType: 'address', name: 'caller', type: 'address' }],
        name: 'ZeroTicketsRequested',
        type: 'error'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'address', name: 'vrfCoordinator', type: 'address' }],
        name: 'CoordinatorSet',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'batchId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'ExpiredRefundsCollected',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'closeTime', type: 'uint256' }
        ],
        name: 'InvalidLotteryClosed',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'fromParticipantIndex', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'toParticipantIndex', type: 'uint256' }
        ],
        name: 'LotteryDataCleared',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' }
        ],
        name: 'LotteryStarted',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'MoneyRefunded',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' }
        ],
        name: 'OrganizerChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }],
        name: 'OrganizerFundsWithdrawn',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' }
        ],
        name: 'OwnershipTransferRequested',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'duration', type: 'uint256' }
        ],
        name: 'RegistrationTimeExtended',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'from', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'to', type: 'uint256' }
        ],
        name: 'TicketPriceChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'TicketsBought',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
        ],
        name: 'TicketsReturned',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: true, internalType: 'uint256', name: 'requestId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'requestTime', type: 'uint256' }
        ],
        name: 'WinnerRequested',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'winner', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'revealTime', type: 'uint256' }
        ],
        name: 'WinnerRevealed',
        type: 'event'
    },
    {
        inputs: [],
        name: 'GUIDE_DAO_TOKEN',
        outputs: [{ internalType: 'contract IGuideDAOToken', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'LOTTERY_DATA_FRESHNESS_INTERVAL',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'MAX_EXTENSION_TIME',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'MAX_PARTICIPANTS_NUMBER',
        outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'MAX_PARTICIPANTS_TO_CLEAR',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'REFUND_WINDOW',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'REGISTRATION_DURATION',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'TARGET_PARTICIPANTS_NUMBER',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function'
    },
    { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
        name: 'buyMoreTickets',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'uint256', name: '_lotteryNumberToClear', type: 'uint256' },
            { internalType: 'uint256', name: '_fromParticipantIndex', type: 'uint256' }
        ],
        name: 'clearLotteryData',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'closeInvalidLottery', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'uint256', name: '_batchId', type: 'uint256' }],
        name: 'collectExpiredRefunds',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'endRegistration', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [
            { internalType: 'uint256', name: '_ticketsAmount', type: 'uint256' },
            { internalType: 'bytes', name: '_encryptedContactDetails', type: 'bytes' }
        ],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: '_duration', type: 'uint256' }],
        name: 'extendRegistrationTime',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
        name: 'isActualParticipant',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'lastWinner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
        name: 'latestContactDetails',
        outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'lotteryNumber',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'nextRefundBatchId',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'organizerFunds',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'index', type: 'uint256' }
        ],
        name: 'participants',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'participantsCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'requestId', type: 'uint256' },
            { internalType: 'uint256[]', name: 'randomWords', type: 'uint256[]' }
        ],
        name: 'rawFulfillRandomWords',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'refund', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
        name: 'refundAmount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'participant', type: 'address' },
            { internalType: 'uint256', name: '', type: 'uint256' }
        ],
        name: 'refundBatchIds',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'batchId', type: 'uint256' }],
        name: 'refundBatches',
        outputs: [
            { internalType: 'uint256', name: 'refundAssignmentTime', type: 'uint256' },
            { internalType: 'uint256', name: 'totalUnclaimedFunds', type: 'uint256' }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'registrationEndTime',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    { inputs: [], name: 'requestWinner', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
        name: 'returnTickets',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 's_vrfCoordinator',
        outputs: [{ internalType: 'contract IVRFCoordinatorV2Plus', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_vrfCoordinator', type: 'address' }],
        name: 'setCoordinator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_newOrganizer', type: 'address' }],
        name: 'setOrganizer',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: '_newTicketPrice', type: 'uint256' }],
        name: 'setTicketPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'start', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [],
        name: 'status',
        outputs: [{ internalType: 'enum Types.LotteryStatus', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'ticketPrice',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'withdrawOrganizerFunds', outputs: [], stateMutability: 'nonpayable', type: 'function' }
] as const;
