import { toast } from 'sonner';

const BASE_TOAST_CLASSES =
    '!bg-zinc-900/30 !backdrop-blur-sm !border !shadow-lg !rounded-xl !before:absolute !before:inset-0 !before:rounded-xl !before:bg-gradient-to-r !before:to-transparent !before:blur-lg !before:-z-10';

const VARIANT_COLORS = {
    emerald: {
        border: '!border-emerald-500/40',
        text: '!text-emerald-300',
        shadow: '!shadow-emerald-500/20',
        before: '!before:from-emerald-500/20'
    },
    rose: {
        border: '!border-rose-500/40',
        text: '!text-rose-300',
        shadow: '!shadow-rose-500/20',
        before: '!before:from-rose-500/20'
    },
    amber: {
        border: '!border-amber-500/40',
        text: '!text-amber-300',
        shadow: '!shadow-amber-500/20',
        before: '!before:from-amber-500/20'
    },
    blue: {
        border: '!border-blue-500/40',
        text: '!text-blue-300',
        shadow: '!shadow-blue-500/20',
        before: '!before:from-blue-500/20'
    }
};

const makeVariant = (color: keyof typeof VARIANT_COLORS) =>
    `${BASE_TOAST_CLASSES} ${VARIANT_COLORS[color].border} ${VARIANT_COLORS[color].text} ${VARIANT_COLORS[color].shadow} ${VARIANT_COLORS[color].before}`;

// Toast styling constants
export const TOAST_STYLES = {
    success: {
        richColors: true,
        duration: 4000,
        position: 'bottom-right' as const,
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
        position: 'bottom-right' as const,
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
    showSuccessToast(`Exported successfully: ${filename}`);
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

export const showDecryptionSuccessToast = (address: string) => {
    showSuccessToast(`Successfully decrypted address: ${address.slice(0, 6)}...${address.slice(-4)} 🔓`);
};

export const showDecryptionErrorToast = (error: string) => {
    showErrorToast(`Decryption failed: ${error}`);
};

export const showEcryptionErrorToast = (error: string) => {
    showErrorToast(`Encryption failed: ${error}`);
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
