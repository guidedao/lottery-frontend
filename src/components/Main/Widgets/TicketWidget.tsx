import { FC, JSX } from 'react';

interface Props {
    title: string;
    description: string;
    actionButton?: JSX.Element;
}

export const TicketWidget: FC<Props> = ({ title, description, actionButton }) => {
    return (
        <article className='flex flex-col flex-1 min-h-[220px] lg:min-h-[260px] basis-full lg:basis-[calc(50%-8px)] bg-white/25 p-6 rounded-xl gap-8'>
            <div>
                <h2 className='text-white text-[38px] lg:text-[32px] font-keania'>{title}</h2>
                <div className='text-white/75 text-[22px] font-light font-roboto'>{description}</div>
            </div>

            {actionButton}
        </article>
    );
};
