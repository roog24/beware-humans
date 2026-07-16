import React from 'react';
import { ZONES } from '../data';
import { ChevronLeft, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
  onSelect: (id: string) => void;
}

export default function ZoneList({ onBack, onSelect }: Props) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-gray-50 overflow-y-auto flex flex-col z-10 pb-32"
    >
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-4 py-3 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-600 font-medium">
          <ChevronLeft className="w-6 h-6 mr-1" />
          앨범
        </button>
        <h1 className="mx-auto font-semibold text-lg text-gray-900 pr-10">구역 설명</h1>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4">
        {ZONES.map(zone => (
          <div 
            key={zone.id} 
            className="flex flex-col cursor-pointer group"
            onClick={() => onSelect(zone.id)}
          >
            <div className={`w-full aspect-[4/3] rounded-2xl shadow-sm flex flex-col items-center justify-center border border-black/5 transition-transform transform group-hover:scale-95 overflow-hidden relative ${zone.color}`}>
              {zone.imageUrl ? (
                <img src={zone.imageUrl} alt={zone.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <MapPin className="w-10 h-10 opacity-70" />
              )}
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-800 px-1 text-center">
              {['세이프 존', '데드 존'].includes(zone.name) ? `${zone.name} - ${zone.type}` : zone.name}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
