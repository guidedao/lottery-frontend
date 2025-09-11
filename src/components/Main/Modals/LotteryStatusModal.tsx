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

import { LotteryStatusDisplay } from '../Widgets/LotteryStatusPanel';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-globe-gen';

export function LotteryStatusModal() {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Info className='text-foreground cursor-pointer' />
            </DialogTrigger>
            <DialogContent className='sm:max-w-md surface-glass-md shadow-lg shadow-cyan-800/20 transition'>
                <DialogHeader>
                    <DialogTitle className='text-foreground sr-only'>Lottery contract raw status</DialogTitle>
                </DialogHeader>
                <LotteryStatusDisplay />

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
