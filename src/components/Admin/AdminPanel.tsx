'use client';

import { useEffect, useMemo, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantsMulticall, { type ParticipantInfoRow } from '@/hooks/useParticipantsMulticall';

import CopyIconButton from './CopyIconButton';

type DecryptState = {
    value?: string | null;
    loading?: boolean;
    error?: string | null;
};

function shortHex(hex: string, take = 10) {
    if (!hex) return '';
    return hex.slice(0, take) + (hex.length > take ? '…' : '');
}

export default function AdminPanel() {
    const { lotteryState } = useLotteryState();
    const { lotteryNumber } = lotteryState;
    const { participants, isLoading, isError } = useParticipantsMulticall();

    const [decMap, setDecMap] = useState<Record<string, DecryptState>>({});
    const [copiedAddr, setCopiedAddr] = useState<Record<string, boolean>>({});
    const [copiedEnc, setCopiedEnc] = useState<Record<string, boolean>>({});

    const hasParticipants = participants?.length > 0;

    // Auto-decrypt on load for admin convenience
    useEffect(() => {
        if (!hasParticipants) return;

        let cancelled = false;

        const run = async () => {
            // Build list of those not yet decrypted
            const toDecrypt = participants.filter((p) => {
                const st = decMap[p.address];
                if (!st) return true;
                const hasValue = st.value !== undefined && st.value !== null; // allow empty string
                const isLoading = !!st.loading;
                const hasError = !!st.error;
                return !hasValue && !isLoading && !hasError;
            });
            if (!toDecrypt.length) return;

            // Mark loading
            setDecMap((prev) => {
                const next = { ...prev };
                for (const p of toDecrypt) next[p.address] = { ...(prev[p.address] || {}), loading: true, error: null };
                return next;
            });

            await Promise.all(
                toDecrypt.map(async (p) => {
                    try {
                        const res = await fetch('/api/admin/decrypt', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ payloadHex: p.encryptedContactDetails })
                        });
                        const data = (await res.json()) as { message?: string; error?: string; details?: string };
                        if (!res.ok) {
                            const base = data?.error || 'Decrypt failed';
                            const details = data?.details ? `: ${data.details}` : '';
                            const statusInfo = res.status ? ` [${res.status}]` : '';
                            throw new Error(`${base}${details}${statusInfo}`);
                        }
                        if (cancelled) return;
                        setDecMap((prev) => ({
                            ...prev,
                            [p.address]: { value: data.message ?? null, loading: false }
                        }));
                    } catch (e) {
                        if (cancelled) return;
                        const msg = e instanceof Error ? e.message : String(e);
                        setDecMap((prev) => ({ ...prev, [p.address]: { error: msg, loading: false } }));
                    }
                })
            );
        };

        run();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasParticipants, participants]);

    const rows = useMemo(() => participants ?? [], [participants]);

    return (
        <div className='container mx-auto px-4 py-28'>
            <h1 className='text-2xl font-bold mb-6'>Admin Panel</h1>

            <div className='mb-6'>
                <div className='text-sm text-muted-foreground'>Current lottery number</div>
                <div className='text-3xl font-semibold'>{lotteryNumber}</div>
            </div>

            {isError && (
                <div className='mb-4 text-sm text-red-500'>Failed to load participants. Check your connection.</div>
            )}

            {isLoading && <div className='text-sm text-muted-foreground'>Loading participants…</div>}

            {!isLoading && !hasParticipants && <div className='text-sm text-muted-foreground'>No participants.</div>}

            {hasParticipants && (
                <div className='rounded-md border overflow-hidden'>
                    <Table className='table-fixed'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-24'>User #</TableHead>
                                <TableHead className='w-[420px]'>Wallet address</TableHead>
                                <TableHead className='w-[320px]'>Encrypted payload</TableHead>
                                <TableHead className='w-[560px]'>Decrypted payload</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((p: ParticipantInfoRow) => {
                                const d = decMap[p.address] || {};
                                const enc = p.encryptedContactDetails as string;
                                return (
                                    <TableRow key={`${p.participantIndex}-${p.address}`}>
                                        <TableCell>{p.participantIndex}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-2'>
                                                <span className='font-mono whitespace-nowrap'>{p.address}</span>
                                                <CopyIconButton
                                                    value={p.address}
                                                    copiedMap={copiedAddr}
                                                    setCopiedMap={setCopiedAddr}
                                                    ariaLabel='Copy address'
                                                    titleIdle='Copy address'
                                                    titleCopied='Copied!'
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-2 max-w-[420px]'>
                                                <code className='font-mono text-xs break-all'>{shortHex(enc, 20)}</code>
                                                <CopyIconButton
                                                    value={enc}
                                                    copiedMap={copiedEnc}
                                                    setCopiedMap={setCopiedEnc}
                                                    ariaLabel='Copy payload'
                                                    titleIdle='Copy payload'
                                                    titleCopied='Copied!'
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {d.loading ? (
                                                <span className='text-muted-foreground'>Decrypting…</span>
                                            ) : d.error ? (
                                                <span className='text-red-500 text-sm font-mono whitespace-pre-wrap break-words'>
                                                    Error: {d.error}
                                                </span>
                                            ) : (
                                                <span className='text-sm whitespace-pre-wrap break-words'>
                                                    {d.value ?? '—'}
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
