'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { TERMS_STORAGE_PREFIX, TERMS_TITLE, TERMS_URL, TERMS_VERSION } from '@/config/termsConfig';

import { useAccount, useChainId, useSignMessage } from 'wagmi';

type TermsSignatureRecord = {
    address: string;
    signature: string;
    message: string;
    version: string;
    timestamp: string; // ISO
    nonce: string; // 0x...
    chainId: number;
    domain: string;
};

function toHex(bytes: Uint8Array) {
    return '0x' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function storageKey(address: string | undefined) {
    if (!address) return '';
    return `${TERMS_STORAGE_PREFIX}:v${TERMS_VERSION}:${address.toLowerCase()}`;
}

export default function useTermsSignature() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { signMessageAsync, isPending } = useSignMessage();
    const [error, setError] = useState<Error | null>(null);

    const key = useMemo(() => storageKey(address), [address]);

    const getRecord = useCallback((): TermsSignatureRecord | null => {
        if (!key) return null;
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as TermsSignatureRecord) : null;
        } catch {
            return null;
        }
    }, [key]);

    const [record, setRecord] = useState<TermsSignatureRecord | null>(null);

    useEffect(() => {
        if (!isConnected || !address) {
            setRecord(null);
            return;
        }
        setRecord(getRecord());
    }, [isConnected, address, getRecord]);

    const hasSigned = !!record?.signature;

    const buildMessage = useCallback(() => {
        const domain = typeof window !== 'undefined' ? window.location.host : 'localhost';
        const ts = new Date().toISOString();
        const nonce = toHex(crypto.getRandomValues(new Uint8Array(16)));

        const lines = [
            TERMS_TITLE,
            '',
            `Address: ${address}`,
            `Domain: ${domain}`,
            `Chain ID: ${chainId}`,
            `Version: ${TERMS_VERSION}`,
            `Terms: ${TERMS_URL}`,
            `Nonce: ${nonce}`,
            `Timestamp: ${ts}`,
            '',
            'By signing this message, I agree to the Terms of Service.',
            'This signature does not perform a blockchain transaction.'
        ];

        return { message: lines.join('\n'), nonce, timestamp: ts, domain };
    }, [address, chainId]);

    const signTerms = useCallback(async () => {
        setError(null);
        if (!address) throw new Error('Wallet not connected');
        const { message, nonce, timestamp, domain } = buildMessage();
        try {
            const signature = await signMessageAsync({ message });
            const rec: TermsSignatureRecord = {
                address,
                signature,
                message,
                version: TERMS_VERSION,
                timestamp,
                nonce,
                chainId,
                domain
            };
            if (key) localStorage.setItem(key, JSON.stringify(rec));
            setRecord(rec);
            return rec;
        } catch (e) {
            const err = e as Error;
            setError(err);
            throw err;
        }
    }, [address, chainId, signMessageAsync, buildMessage, key]);

    const clearSignature = useCallback(() => {
        if (key) localStorage.removeItem(key);
        setRecord(null);
    }, [key]);

    return {
        hasSigned,
        record,
        signTerms,
        clearSignature,
        isSigning: isPending,
        error
    };
}
