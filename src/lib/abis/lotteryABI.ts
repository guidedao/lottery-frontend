export default [
    {
        inputs: [
            { internalType: 'address', name: '_organizer', type: 'address' },
            { internalType: 'address', name: '_nftFallbackRecipient', type: 'address' },
            { internalType: 'address', name: '_guideDAOToken', type: 'address' },
            { internalType: 'address', name: '_vrfCoordinator', type: 'address' },
            { internalType: 'uint256', name: '_subscriptionId', type: 'uint256' }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
    {
        inputs: [
            { internalType: 'address', name: 'account', type: 'address' },
            { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' }
        ],
        name: 'AccessControlUnauthorizedAccount',
        type: 'error'
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
    { inputs: [{ internalType: 'address', name: 'caller', type: 'address' }], name: 'HasCode', type: 'error' },
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
        name: 'IncorrectPaymentAmount',
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
    { inputs: [{ internalType: 'address', name: 'user', type: 'address' }], name: 'NoContactDetails', type: 'error' },
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
        inputs: [
            { internalType: 'uint256', name: 'receivedCurrentLotteryNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'minimumCurrentLotteryNumber', type: 'uint256' }
        ],
        name: 'TooEarlyToClearData',
        type: 'error'
    },
    { inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }], name: 'WithdrawFailed', type: 'error' },
    { inputs: [], name: 'ZeroAddress', type: 'error' },
    { inputs: [], name: 'ZeroLengthContactDetails', type: 'error' },
    { inputs: [], name: 'ZeroNftFallbackRecipientAddress', type: 'error' },
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
        name: 'NftFallbackRecipientChanged',
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
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
            { indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' }
        ],
        name: 'RoleAdminChanged',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' }
        ],
        name: 'RoleGranted',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { indexed: true, internalType: 'address', name: 'account', type: 'address' },
            { indexed: true, internalType: 'address', name: 'sender', type: 'address' }
        ],
        name: 'RoleRevoked',
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
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function'
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
        name: 'LOTTERY_OPERATOR_ROLE',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'LOTTERY_ORGANIZER_ROLE',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
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
        inputs: [{ internalType: 'address', name: '_newNftFallbackRecipient', type: 'address' }],
        name: 'changeNftFallbackRecipient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_newOrganizer', type: 'address' }],
        name: 'changeOrganizer',
        outputs: [],
        stateMutability: 'nonpayable',
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
        inputs: [
            { internalType: 'uint256', name: '_batchId', type: 'uint256' },
            { internalType: 'address', name: '_recipient', type: 'address' }
        ],
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
        inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
        name: 'getRoleAdmin',
        outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' }
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    { inputs: [], name: 'grantYourselfAllPermissions', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' }
        ],
        name: 'hasRole',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
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
        inputs: [{ internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' }],
        name: 'lotteryWinner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
        name: 'nftFallbackRecipient',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'organizer',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
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
            { internalType: 'uint256', name: 'lotteryNumber', type: 'uint256' },
            { internalType: 'address', name: 'user', type: 'address' }
        ],
        name: 'participantsInfo',
        outputs: [
            { internalType: 'uint256', name: 'ticketsBought', type: 'uint256' },
            { internalType: 'uint256', name: 'participantIndex', type: 'uint256' },
            { internalType: 'bytes', name: 'encryptedContactDetails', type: 'bytes' }
        ],
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
    {
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'callerConfirmation', type: 'address' }
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
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
        inputs: [
            { internalType: 'bytes32', name: 'role', type: 'bytes32' },
            { internalType: 'address', name: 'account', type: 'address' }
        ],
        name: 'revokeRole',
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
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
        inputs: [],
        name: 'totalTicketsCount',
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
    {
        inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
        name: 'userTicketsCount',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_recipient', type: 'address' }],
        name: 'withdrawOrganizerFunds',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
] as const;
