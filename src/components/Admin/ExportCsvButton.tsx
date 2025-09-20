'use client';

import { Button } from '@/components/ui/button';
import type { ParticipantInfoRow } from '@/hooks/useParticipantsMulticall';
import { showErrorToast, showSuccessToast } from '@/lib/toast-utils';

import { DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-globe-gen';

type DecryptMap = Record<string, { value?: string | null; error?: string | null }>;

function csvCell(input: unknown): string {
    const v = input == null ? '' : String(input);
    const escaped = v.replace(/"/g, '""');
    return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

function buildCsv(participants: ParticipantInfoRow[], decMap: DecryptMap): string {
    const header = [
        'participantIndex',
        'address',
        'ticketsBought',
        'encryptedContactDetails',
        'decrypted',
        'error'
    ].join(',');

    const lines = participants.map((p) => {
        const d = decMap[p.address] || {};
        const cells = [
            p.participantIndex,
            p.address,
            p.ticketsBought,
            p.encryptedContactDetails,
            d.value ?? '',
            d.error ?? ''
        ].map(csvCell);
        return cells.join(',');
    });

    return [header, ...lines].join('\n');
}

function downloadCsv(filename: string, csv: string) {
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export default function ExportCsvButton({
    participants,
    decMap,
    lotteryNumber,
    disabled
}: {
    participants: ParticipantInfoRow[];
    decMap: DecryptMap;
    lotteryNumber?: number;
    disabled?: boolean;
}) {
    const t = useTranslations();
    const onClick = () => {
        try {
            const csv = buildCsv(participants, decMap);
            const name = `participants-lottery-${lotteryNumber ?? 'unknown'}.csv`;
            downloadCsv(name, csv);
            showSuccessToast(t('admin.exportSuccessToast', { filename: name }));
        } catch (error) {
            console.error('Export failed:', error);
            showErrorToast(t('admin.exportErrorToast'));
        }
    };

    return (
        <Button
            size='sm'
            variant='outline'
            className='hover:cursor-pointer'
            onClick={onClick}
            disabled={disabled || participants.length === 0}>
            <DownloadIcon className='size-4' />
            <span>{t('admin.exportCsv')}</span>
        </Button>
    );
}
