import React from 'react';
import { CHARACTERS } from '../data';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
  onSelect: (id: string) => void;
}

export default function CharacterList({ onBack, onSelect }: Props) {
  const getInitials = (name: string) => name.substring(0, 1);

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
        <h1 className="mx-auto font-semibold text-lg text-gray-900 pr-10">인물 프로필</h1>
      </header>

      <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
        {CHARACTERS.map(char => (
          <div 
            key={char.id} 
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onSelect(char.id)}
          >
            <div className={`w-full aspect-square rounded-2xl shadow-sm flex items-center justify-center text-3xl font-bold border border-black/5 transition-transform transform group-hover:scale-95 overflow-hidden ${char.color}`}>
              {char.imageUrl ? (
                <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              ) : (
                getInitials(char.name)
              )}
            </div>
            <div className="mt-2 text-sm font-semibold text-gray-800 text-center">
              {char.name}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
