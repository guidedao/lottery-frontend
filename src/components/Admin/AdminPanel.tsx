'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-globe-gen';

import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useLotteryState from '@/hooks/useLotteryState';
import useParticipantsMulticall, { type ParticipantInfoRow } from '@/hooks/useParticipantsMulticall';
import { showErrorToast, showInfoToast, showSuccessToast } from '@/lib/toast-utils';

import CopyIconButton from './CopyIconButton';
import ExportCsvButton from './ExportCsvButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    const t = useTranslations();
    const { lotteryState } = useLotteryState();
    const { lotteryNumber } = lotteryState;
    const [selectedLottery, setSelectedLottery] = useState<number>(lotteryNumber);
    useEffect(() => {
        // Initialize to current when data loads; clamp if over current
        if (selectedLottery === 0 && lotteryNumber > 0) setSelectedLottery(lotteryNumber);
        if (selectedLottery > lotteryNumber) setSelectedLottery(lotteryNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lotteryNumber]);

    const { participants, isLoading, isError } = useParticipantsMulticall({ lotteryNumber: selectedLottery });

    // Show error toast when data loading fails
     
    useEffect(() => {
        if (isError) {
            showErrorToast(t('admin.participantsLoadErrorToast'));
        }
    }, [isError, t]);

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
                            const base = data?.error || t('admin.decryptFailed');
                            const details = data?.details ? `: ${data.details}` : '';
                            const statusInfo = res.status ? ` [${res.status}]` : '';
                            throw new Error(`${base}${details}${statusInfo}`);
                        }
                        if (cancelled) return;
                        setDecMap((prev) => ({
                            ...prev,
                            [p.address]: { value: data.message ?? null, loading: false }
                        }));
                        const short = `${p.address.slice(0, 6)}...${p.address.slice(-4)}`;
                        showSuccessToast(t('admin.decryptSuccessToast', { addr: short }));
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
        <div className='container mx-auto px-4 py-12 pt-18'>
            <div className='surface-glass rounded-xl shadow-sm p-4'>
                <div className='mb-6 flex flex-col gap-3'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold leading-tight'>{t('admin.title')}</h1>
                        <div className='mt-2 text-sm text-muted-foreground'>{t('admin.currentLottery', { n: lotteryNumber })}</div>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                        <div className='text-sm text-muted-foreground'>{t('admin.viewLottery')}</div>
                        <div className='flex items-center gap-1'>
                            <button
                                type='button'
                                className='h-9 w-9 inline-flex items-center justify-center rounded-md border text-muted-foreground hover:text-foreground hover:bg-accent hover:cursor-pointer'
                                onClick={() => {
                                    const newLottery = Math.max(0, selectedLottery - 1);
                                    if (newLottery === selectedLottery) return;

                                    setSelectedLottery(newLottery);
                                    showInfoToast(t('admin.switchedToLottery', { n: newLottery }));
                                }}
                                aria-label={t('admin.prevLotteryAria')}>
                                <ChevronLeft className='size-4' />
                            </button>
                            <Input
                                type='number'
                                inputMode='numeric'
                                className='w-24 text-center'
                                min={0}
                                max={lotteryNumber}
                                value={selectedLottery}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    if (Number.isFinite(v)) {
                                        const newLottery = Math.max(0, Math.min(v, lotteryNumber));
                                        setSelectedLottery(newLottery);
                                        showInfoToast(t('admin.switchedToLottery', { n: newLottery }));
                                    }
                                }}
                            />
                            <button
                                type='button'
                                className='h-9 w-9 inline-flex items-center justify-center rounded-md border text-muted-foreground hover:text-foreground hover:bg-accent hover:cursor-pointer'
                                onClick={() => {
                                    const newLottery = Math.min(lotteryNumber, selectedLottery + 1);
                                    if (newLottery === selectedLottery) return;

                                    setSelectedLottery(newLottery);
                                    showInfoToast(t('admin.switchedToLottery', { n: newLottery }));
                                }}
                                aria-label={t('admin.nextLotteryAria')}>
                                <ChevronRight className='size-4' />
                            </button>
                        </div>
                        <ExportCsvButton
                            participants={rows}
                            decMap={decMap}
                            lotteryNumber={selectedLottery}
                            disabled={isLoading || !hasParticipants}
                        />
                    </div>
                </div>

                <div className='mb-6 text-sm text-muted-foreground'>
                    {t('admin.showingParticipants', { n: selectedLottery, count: participants?.length ?? 0 })}
                </div>

                {isError && (
                    <div className='mb-4 text-sm text-red-500'>{t('admin.participantsLoadErrorInline')}</div>
                )}

                {isLoading && <div className='text-sm text-muted-foreground'>{t('admin.loading')}</div>}

                {!isLoading && !hasParticipants && (
                    <div className='text-sm text-muted-foreground'>{t('admin.noParticipants')}</div>
                )}

                {hasParticipants && (
                    <div className='rounded-md border overflow-hidden bg-background/80 backdrop-blur-sm'>
                        <Table className='table-fixed'>
                            <TableHeader className='[&_th]:bg-background/80 [&_th]:backdrop-blur [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground'>
                                <TableRow>
                                    <TableHead className='w-24'>{t('admin.table.user')}</TableHead>
                                    <TableHead className='w-24 text-center'>{t('admin.table.tickets')}</TableHead>
                                    <TableHead className='w-[420px]'>{t('admin.table.address')}</TableHead>

                                    <TableHead className='w-[300px]'>{t('admin.table.encrypted')}</TableHead>
                                    <TableHead className='w-[560px]'>{t('admin.table.decrypted')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='[&_td]:bg-background/10'>
                                {rows.map((p: ParticipantInfoRow) => {
                                    const d = decMap[p.address] || {};
                                    const enc = p.encryptedContactDetails as string;
                                    return (
                                        <TableRow key={`${p.participantIndex}-${p.address}`}>
                                            <TableCell>{p.participantIndex}</TableCell>
                                            <TableCell className='text-center'>{p.ticketsBought}</TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-2'>
                                                    <span className='whitespace-nowrap font-mono text-[13px]'>
                                                        {p.address}
                                                    </span>
                                                    <CopyIconButton
                                                        value={p.address}
                                                        copiedMap={copiedAddr}
                                                        setCopiedMap={setCopiedAddr}
                                                        ariaLabel={t('admin.copy.addressAria')}
                                                        titleIdle={t('admin.copy.addressIdle')}
                                                        titleCopied={t('admin.copy.copied')}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-2 max-w-[420px]'>
                                                    <code className='text-xs break-all font-mono'>
                                                        {shortHex(enc, 20)}
                                                    </code>
                                                    <CopyIconButton
                                                        value={enc}
                                                        copiedMap={copiedEnc}
                                                        setCopiedMap={setCopiedEnc}
                                                        ariaLabel={t('admin.copy.payloadAria')}
                                                        titleIdle={t('admin.copy.payloadIdle')}
                                                        titleCopied={t('admin.copy.copied')}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {d.loading ? (
                                                    <span className='text-muted-foreground'>{t('admin.decrypting')}</span>
                                                ) : d.error ? (
                                                    <span className='text-red-500 text-sm whitespace-pre-wrap break-words'>
                                                        {t('admin.errorPrefix')}: {d.error}
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
        </div>
    );
}
