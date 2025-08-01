'use client';

import { useTranslations } from 'next-globe-gen';

interface FooterProps {
  totalParticipants?: number;
  winner?: string;
}

export function Footer({ totalParticipants = 22, winner = '???' }: FooterProps) {
  const t = useTranslations();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center text-white">
          {/* Left side - Navigation links */}
          <div className="flex flex-col gap-2">
            <button className="text-white text-xl font-normal text-left hover:text-gray-300 transition-colors cursor-pointer">
              about
            </button>
            <button className="text-white text-xl font-normal text-left hover:text-gray-300 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          {/* Right side - Lottery info */}
          <div className="flex flex-col gap-2 text-right">
            <div className="text-white text-xl font-normal">
              всего участников: {totalParticipants}
            </div>
            <div className="text-white text-xl font-normal">
              победитель: {winner}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
