import { toast } from 'sonner';

const BASE_TOAST_CLASSES = `
!relative
!bg-zinc-900/30
!backdrop-blur-sm
!border
!shadow-lg
!rounded-xl
!before:absolute
!before:inset-0
!before:rounded-xl
!before:bg-gradient-to-r
!before:to-transparent
!before:blur-lg
!before:-z-10
`;

const makeVariant = (color: string) => `
${BASE_TOAST_CLASSES}
!border-${color}-500/40
!text-${color}-300
!shadow-${color}-500/20
!before:from-${color}-500/20
`;

// Toast styling constants
export const TOAST_STYLES = {
    success: {
        richColors: true,
        duration: 4000,
        position: 'bottom-center' as const,
        className: makeVariant('emerald')
    },
    error: {
        richColors: true,
        duration: 6000,
        position: 'bottom-center' as const,
        className: makeVariant('rose')
    },
    warning: {
        richColors: true,
        duration: 5000,
        position: 'bottom-center' as const,
        className: makeVariant('amber')
    },
    info: {
        richColors: true,
        duration: 4000,
        position: 'bottom-center' as const,
        className: makeVariant('blue')
    }
} as const;

// Utility functions for common toast patterns
export const showSuccessToast = (message: string, options?: Partial<typeof TOAST_STYLES.success>) => {
    toast.success(message, { ...TOAST_STYLES.success, ...options });
};

export const showErrorToast = (message: string, options?: Partial<typeof TOAST_STYLES.error>) => {
    toast.error(message, { ...TOAST_STYLES.error, ...options });
};

export const showWarningToast = (message: string, options?: Partial<typeof TOAST_STYLES.warning>) => {
    toast.warning(message, { ...TOAST_STYLES.warning, ...options });
};

export const showInfoToast = (message: string, options?: Partial<typeof TOAST_STYLES.info>) => {
    toast.info(message, { ...TOAST_STYLES.info, ...options });
};

// Specific toast functions for common actions
export const showCopySuccessToast = () => {
    showSuccessToast('Copied to clipboard! 📋');
};

export const showCopyErrorToast = () => {
    showErrorToast('Failed to copy to clipboard');
};

export const showExportSuccessToast = (filename: string) => {
    showSuccessToast(`Exported successfully: ${filename} 📁`);
};

export const showExportErrorToast = () => {
    showErrorToast('Failed to export file');
};

export const showWalletConnectedToast = (address: string) => {
    showSuccessToast(`Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)} 🔗`);
};

export const showWalletDisconnectedToast = () => {
    showInfoToast('Wallet disconnected');
};

export const showNetworkSwitchedToast = (networkName: string) => {
    showSuccessToast(`Switched to ${networkName} network 🌐`);
};

export const showNetworkErrorToast = () => {
    showErrorToast('Please switch to the correct network');
};

export const showFormValidationToast = (message: string) => {
    showWarningToast(message);
};

export const showLoadingToast = (message: string) => {
    toast.loading(message, {
        ...TOAST_STYLES.info,
        duration: Infinity
    });
};

export const showDecryptionSuccessToast = () => {
    showSuccessToast('Decryption completed successfully 🔓');
};

export const showDecryptionErrorToast = (error: string) => {
    showErrorToast(`Decryption failed: ${error}`);
};

export const showTransactionPendingToast = (message: string) => {
    toast.loading(message, {
        ...TOAST_STYLES.info,
        duration: Infinity,
        id: 'transaction-pending'
    });
};

export const showTransactionSuccessToast = (message: string) => {
    toast.dismiss('transaction-pending');
    showSuccessToast(message);
};

export const showTransactionErrorToast = (message: string) => {
    toast.dismiss('transaction-pending');
    showErrorToast(message);
};

export const showDataRefreshedToast = () => {
    showInfoToast('Data refreshed successfully 🔄');
};
