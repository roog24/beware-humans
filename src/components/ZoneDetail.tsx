import React, { useState, useEffect } from 'react';
import { Zone } from '../types';
import { CHARACTERS } from '../data';
import { ChevronLeft, ChevronRight, MapPin, Users, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: React.Key;
  zone: Zone;
  onBack: () => void;
  onNavigateToCharacter: (id: string) => void;
}

export default function ZoneDetail({ zone, onBack, onNavigateToCharacter }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);
  const chars = zone.characterIds.map(id => CHARACTERS.find(c => c.id === id)).filter(Boolean);

  const allImages = [zone.imageUrl].filter(Boolean) as string[];

  const getInitials = (name: string) => name.substring(0, 1);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white overflow-y-auto flex flex-col z-10"
    >
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-4 py-3 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="flex items-center text-blue-500 hover:text-blue-600 font-medium">
          <ChevronLeft className="w-6 h-6 mr-1" />
          뒤로
        </button>
        <h1 className="mx-auto font-semibold text-lg text-gray-900 pr-10">{zone.name}</h1>
      </header>

      <div className="flex-1 p-4 pb-32">
        {/* Banner Area */}
        {zone.imageUrl ? (
          <div className="w-full flex justify-center mb-6">
            <img 
              src={zone.imageUrl} 
              alt={zone.name} 
              className="max-w-full h-auto rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity" 
              style={{ maxHeight: '50vh' }}
              referrerPolicy="no-referrer" 
              onClick={() => {
                if (zone.imageUrl) {
                  setSelectedImageIndex(0);
                  setShowOverlay(true);
                }
              }}
            />
          </div>
        ) : (
          <div className={`w-full h-40 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${zone.color}`}>
            <MapPin className="w-16 h-16 opacity-50" />
          </div>
        )}
        
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{zone.name}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${zone.color}`}>
            {zone.type}
          </span>
        </div>

        {/* Info Section */}
        <div className="mb-8 mt-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            구역 설명
          </h3>
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <ul className="space-y-2">
              {zone.description.map((desc, idx) => (
                <li key={idx} className="text-sm text-gray-700 leading-relaxed flex items-start">
                  <span className="text-gray-500 mr-2 mt-0.5">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visuals Section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            환경 및 특징
          </h3>
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <ul className="space-y-3">
              {zone.visuals.map((vis, idx) => (
                <li key={idx} className="text-sm text-gray-800 leading-relaxed pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  {vis}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Associated Characters */}
        {chars.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              소속 인물
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {chars.map((char: any) => (
                <div 
                  key={char.id} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => onNavigateToCharacter(char.id)}
                >
                  <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center text-lg font-bold border border-white transition-transform transform group-hover:scale-105 overflow-hidden ${char.color}`}>
                    {char.imageUrl ? (
                      <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                    ) : (
                      getInitials(char.name)
                    )}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 mt-2 truncate w-full text-center">
                    {char.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImageIndex(null)}
          >
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <button
                    className="absolute top-4 right-4 p-2 text-gray-900 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-[70] pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(null);
                    }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  {allImages.length > 1 && (
                    <>
                      <button 
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-gray-900 p-3 rounded-full backdrop-blur-md transition-colors flex items-center justify-center w-12 h-12 shadow-lg pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(prev => prev === null ? null : (prev === 0 ? allImages.length - 1 : prev - 1));
                        }}
                      >
                        <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                      </button>
                      
                      <button 
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-gray-900 p-3 rounded-full backdrop-blur-md transition-colors flex items-center justify-center w-12 h-12 shadow-lg pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(prev => prev === null ? null : (prev + 1) % allImages.length);
                        }}
                      >
                        <ChevronRight className="w-6 h-6 mr-[-2px]" />
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={allImages[selectedImageIndex]}
              alt="확대된 사진"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setShowOverlay(!showOverlay);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
