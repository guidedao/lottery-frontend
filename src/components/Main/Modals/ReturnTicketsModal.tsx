'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import useParticipantStatus from '@/hooks/useParticipantStatus';

import ReturnTicketsPanel from '../UserWidgets/ReturnTicketsPanel';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-globe-gen';
import { useAccount } from 'wagmi';

export function ReturnTicketsModal() {
    const t = useTranslations();
    const { address } = useAccount();
    const { status: authStatus } = useSession();
    const { canReturn } = useParticipantStatus();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {canReturn && address && authStatus === 'authenticated' && (
                    <Button variant='outline' className='cursor-pointer mt-auto' disabled={!canReturn}>
                        {t('home.return_tickets')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-md shadow-md'>
                <DialogHeader className='sr-only'>
                    <DialogTitle>{t('home.return_tickets')}</DialogTitle>
                </DialogHeader>
                <ReturnTicketsPanel />

                <DialogFooter className='sm:justify-start'>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary' className='w-full cursor-pointer'>
                            {t('home.close')}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
