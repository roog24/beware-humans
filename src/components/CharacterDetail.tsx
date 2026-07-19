import React, { useState, useEffect } from 'react';
import { Character, Relationship } from '../types';
import { CHARACTERS } from '../data';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Info, Lock, Quote, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CharacterThemePlayer from './CharacterThemePlayer';

interface Props {
  key?: React.Key;
  character: Character;
  onBack: () => void;
  onNavigateToCharacter: (id: string) => void;
}

export default function CharacterDetail({ character, onBack, onNavigateToCharacter }: Props) {
  const [activeRel, setActiveRel] = useState<Relationship | null>(null);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
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

  const allImages = [character.imageUrl, ...(character.gallery || [])].filter(Boolean) as string[];

  const getTargetImage = (id: string) => {
    const found = CHARACTERS.find(c => c.id === id);
    return found?.imageUrl;
  };

  const getTargetColor = (id: string) => {
    // If it's a generic target, give a default color, else find the char color
    const found = CHARACTERS.find(c => c.id === id);
    return found ? found.color : 'bg-gray-100 text-gray-700';
  };

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
        <h1 className="mx-auto font-semibold text-lg text-gray-900 pr-10">{character.name}</h1>
      </header>

      <div className="flex-1 p-4 pb-32">
        {/* Profile Image Area */}
        <div className="w-full flex justify-center mb-6">
          {character.imageUrl ? (
            <img 
              src={character.imageUrl} 
              alt={character.name} 
              className="max-w-full h-auto rounded-2xl shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
              style={{ maxHeight: '60vh' }} 
              referrerPolicy="no-referrer"
              onClick={() => {
                if (character.imageUrl) {
                  setSelectedImageIndex(0);
                  setShowOverlay(true);
                }
              }}
            />
          ) : (
            <div className={`w-32 h-32 rounded-full shadow-sm flex items-center justify-center text-4xl font-bold overflow-hidden ${character.color}`}>
              {getInitials(character.name)}
            </div>
          )}
        </div>

        {/* Theme Song Section */}
        {character.themeSongUrl && (
          <div className="mx-4">
            <CharacterThemePlayer 
              themeSongUrl={character.themeSongUrl} 
              themeSongName={character.themeSongName}
              characterName={character.name}
              characterId={character.id}
            />
          </div>
        )}

        {/* Quote Section */}
        <div className="mb-6 relative mx-4">
          <div className="absolute top-0 left-0 text-gray-200">
            <Quote className="w-10 h-10 fill-current opacity-50" />
          </div>
          <div className="relative z-10 pt-6 px-4 pb-2">
            <p className="text-gray-800 text-[15px] font-medium leading-relaxed text-center break-keep">
              {character.quote}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            인물 정보
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <span className="text-sm font-semibold text-gray-500">소속:</span> 
              <span className="ml-2 text-sm text-gray-900">{character.affiliation}</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {character.info.map((line, idx) => {
                const [label, value] = line.split(':');
                return (
                  <li key={idx} className="px-4 py-3 flex">
                    <span className="text-sm font-medium text-gray-500 w-16 flex-shrink-0">{label}:</span>
                    <span className="text-sm text-gray-900 ml-2">{value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Secret Info Section */}
        {character.secretInfo && character.secretInfo.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              기밀 정보
            </h2>
            {!isSecretUnlocked ? (
              <div 
                className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
                onClick={() => setIsSecretUnlocked(true)}
              >
                <div className="bg-red-50 text-red-500 p-3 rounded-full mb-3 shadow-sm border border-red-100">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="text-gray-500 font-bold text-sm tracking-wide">기밀 정보 열람하기</span>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm overflow-hidden"
              >
                <ul className="divide-y divide-gray-800">
                  {character.secretInfo.map((line, idx) => {
                    const [label, ...rest] = line.split(':');
                    const value = rest.join(':').trim();
                    return (
                      <li key={idx} className="px-4 py-4 flex flex-col sm:flex-row sm:items-start">
                        <span className="text-sm font-bold text-red-400 w-20 flex-shrink-0 mb-1 sm:mb-0">{label}:</span>
                        <span className="text-sm text-gray-200 leading-relaxed sm:ml-2">{value}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </div>
        )}

        {/* Relationship Map */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            인물 관계도
          </h2>
          <div className="flex flex-wrap gap-4 justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100">
            {character.relationships.map((rel, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setActiveRel(rel)}
              >
                <div className={`w-16 h-16 rounded-full shadow-md flex items-center justify-center text-lg font-bold border-2 border-white transition-transform transform group-hover:scale-105 overflow-hidden ${getTargetColor(rel.targetId)}`}>
                  {getTargetImage(rel.targetId) ? (
                    <img src={getTargetImage(rel.targetId)} alt={rel.targetName} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  ) : (
                    getInitials(rel.targetName)
                  )}
                </div>
                <div className="mt-2 text-xs font-semibold text-gray-700">{rel.targetName}</div>
                <div className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded-full mt-1 border border-gray-200">{rel.thought}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        {character.gallery && character.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              사진첩
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {character.gallery.map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-50 border border-gray-200"
                  onClick={() => {
                    const offset = character.imageUrl ? 1 : 0;
                    setSelectedImageIndex(idx + offset);
                    setShowOverlay(true);
                  }}
                >
                  <img src={imgUrl} alt={`${character.name} 사진 ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Relationship Modal */}
      <AnimatePresence>
        {activeRel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveRel(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold overflow-hidden ${getTargetColor(activeRel.targetId)}`}>
                  {getTargetImage(activeRel.targetId) ? (
                    <img src={getTargetImage(activeRel.targetId)} alt={activeRel.targetName} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  ) : (
                    getInitials(activeRel.targetName)
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{activeRel.targetName}</h3>
                  <p className="text-sm font-medium text-blue-500">{activeRel.thought}</p>
                </div>
              </div>
              <div className="relative mt-4">
                <div className="absolute top-0 left-0 text-blue-100 -translate-x-2 -translate-y-3 z-0">
                  <Quote className="w-10 h-10 fill-current opacity-60" />
                </div>
                <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 text-gray-800 leading-relaxed text-[15px] relative z-10 shadow-sm break-keep">
                  <p className="font-semibold text-center">{activeRel.quote}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveRel(null)}
                className="mt-6 w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                닫기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
