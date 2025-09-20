import { Button } from '@/components/ui/button';

import { BookOpen, Github, Globe, ShieldCheck, Shuffle, Sliders, Timer, Trophy, Undo2 } from 'lucide-react';
import { getTranslations } from 'next-globe-gen';

type Feature = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    desc: string;
};

export default function About() {
    const t = getTranslations();

    const features: Feature[] = [
        { icon: ShieldCheck, title: t('aboutCards.open.title'), desc: t('aboutCards.open.desc') },
        { icon: Shuffle, title: t('aboutCards.vrf.title'), desc: t('aboutCards.vrf.desc') },
        { icon: Undo2, title: t('aboutCards.refund.title'), desc: t('aboutCards.refund.desc') },
        { icon: Trophy, title: t('aboutCards.nft.title'), desc: t('aboutCards.nft.desc') },
        { icon: Sliders, title: t('aboutCards.admin.title'), desc: t('aboutCards.admin.desc') },
        { icon: Timer, title: t('aboutCards.status.title'), desc: t('aboutCards.status.desc') }
    ];

    return (
        <section id='about' className='container mx-auto px-4 mt-16'>
            <div className='surface-glass rounded-xl p-6 lg:p-8'>
                <h2 className='text-2xl lg:text-3xl font-extrabold text-foreground mb-6 tracking-tight'>
                    {t('about.title')}
                </h2>

                <div className='grid gap-8 lg:grid-cols-3'>
                    {/* Left column: intro and links */}
                    <div className='flex flex-col gap-5 lg:col-span-1'>
                        <p className='text-lg leading-relaxed text-foreground/90'>{t('about.intro')}</p>

                        <div className='flex flex-wrap gap-3'>
                            <Button asChild variant='outline'>
                                <a href='https://www.guidedao.xyz' target='_blank' rel='noreferrer'>
                                    <Globe className='size-4 opacity-80' /> {t('about.link_guidedao')}
                                </a>
                            </Button>
                            <Button asChild variant='outline'>
                                <a href='https://github.com/guidedao/lottery-frontend' target='_blank' rel='noreferrer'>
                                    <Github className='size-4 opacity-80' /> {t('about.link_frontend')}
                                </a>
                            </Button>
                            <Button asChild variant='outline'>
                                <a href='https://github.com/guidedao/lottery-backend' target='_blank' rel='noreferrer'>
                                    <Github className='size-4 opacity-80' /> {t('about.link_backend')}
                                </a>
                            </Button>
                            <Button asChild variant='outline'>
                                <a
                                    href='https://github.com/guidedao/lottery-backend/wiki/%D0%9E%D0%B1%D1%89%D0%B0%D1%8F-%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F-%D0%BE-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B5'
                                    target='_blank'
                                    rel='noreferrer'>
                                    <BookOpen className='size-4 opacity-80' /> {t('about.link_wiki')}
                                </a>
                            </Button>
                        </div>

                        <p className='text-foreground/70 text-sm flex items-center gap-1'>* {t('about.note')}</p>
                    </div>

                    {/* Right column: features grid */}
                    <div className='lg:col-span-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className='surface-glass p-4 rounded-lg h-full'>
                                <div className='flex items-start gap-3'>
                                    <div className='rounded-md bg-primary/15 text-primary p-2'>
                                        <Icon className='size-5' />
                                    </div>
                                    <div>
                                        <h4 className='font-semibold text-foreground'>{title}</h4>
                                        <p className='text-sm text-foreground/80 leading-relaxed mt-1'>{desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
