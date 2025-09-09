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

import BuyTicketsTEMP from '../Widgets/BuyTicketsForm';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-globe-gen';
import { useAccount } from 'wagmi';

export function BuyTicketsModal() {
    const t = useTranslations();
    const { address } = useAccount();
    const { status: authStatus } = useSession();
    const { canReturn } = useParticipantStatus();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {address && authStatus === 'authenticated' && (
                    <Button variant='outline' className='cursor-pointer mt-auto'>
                        {canReturn ? t('home.buy_more_tickets') : t('home.join')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-md shadow-md'>
                <DialogHeader className='sr-only'>
                    <DialogTitle>{t('home.buy_tickets')}</DialogTitle>
                </DialogHeader>
                <BuyTicketsTEMP />

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
