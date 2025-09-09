'use client';

import { type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

import { CheckIcon, CopyIcon } from 'lucide-react';

async function copyToClipboard(text: string) {
    // Prefer the async Clipboard API when available and in a secure context (https or localhost)
    if (typeof window !== 'undefined' && window.isSecureContext && navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // fall through to prompt fallback
        }
    }
    // Fallback: show a prompt so the user can copy manually
    try {
        window.prompt('Copy to clipboard: Ctrl/Cmd+C, then Enter', text);
    } catch {
        // ignore
    }
    // We can't verify manual copy, so return false to avoid misleading UI
    return false;
}

export default function CopyIconButton({
    value,
    copiedMap,
    setCopiedMap,
    ariaLabel,
    titleIdle,
    titleCopied
}: {
    value: string;
    copiedMap: Record<string, boolean>;
    setCopiedMap: Dispatch<SetStateAction<Record<string, boolean>>>;
    ariaLabel: string;
    titleIdle: string;
    titleCopied: string;
}) {
    const copied = !!copiedMap[value];
    return (
        <Button
            size='icon'
            variant='ghost'
            className='text-muted-foreground hover:text-foreground'
            onClick={async () => {
                const ok = await copyToClipboard(value);
                if (ok) {
                    setCopiedMap((prev) => ({ ...prev, [value]: true }));
                    setTimeout(() => setCopiedMap((prev) => ({ ...prev, [value]: false })), 1300);
                }
            }}
            aria-label={ariaLabel}
            title={copied ? titleCopied : titleIdle}>
            {copied ? <CheckIcon className='size-4' /> : <CopyIcon className='size-4' />}
        </Button>
    );
}
