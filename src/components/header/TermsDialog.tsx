'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { TERMS_URL } from '@/config/termsConfig';

import { useTranslations } from 'next-globe-gen';

type TermsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSign: () => Promise<void> | void;
    onDecline: () => void;
    isSigning?: boolean;
    errorMessage?: string | null;
};

export default function TermsDialog({
    open,
    onOpenChange,
    onSign,
    onDecline,
    isSigning,
    errorMessage
}: TermsDialogProps) {
    const t = useTranslations();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('terms.link')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('terms.banner')}{' '}
                        <a className='underline' target='_blank' rel='noreferrer' href={TERMS_URL}>
                            {t('terms.link')}
                        </a>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            onOpenChange(false);
                            onDecline();
                        }}>
                        {t('terms.later')}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            await onSign();
                            onOpenChange(false);
                        }}>
                        {isSigning ? t('terms.signing') : t('terms.sign')}
                    </AlertDialogAction>
                </AlertDialogFooter>
                {errorMessage && <div className='text-xs text-red-500 mt-2'>{errorMessage}</div>}
            </AlertDialogContent>
        </AlertDialog>
    );
}
