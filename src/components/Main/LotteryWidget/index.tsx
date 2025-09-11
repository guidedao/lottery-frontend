import LotteryStatus from './LotteryStatus';
import TicketImage from './TicketImage';
import { Timer } from './Timer';

const LotteryWidget = () => {
    return (
        <div className='flex w-full lg:w-[50%] flex-col-reverse lg:flex-col items-center justify-center gap-4 lg:gap-6'>
            <TicketImage />
            <Timer />
            <LotteryStatus />
        </div>
    );
};

export default LotteryWidget;
