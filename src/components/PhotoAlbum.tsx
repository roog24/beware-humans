import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
}

const CHAR_NAMES = [
  "서유하", "박도영", "정해운", "백현우", "한유환", "이태윤",
  "태호원", "청오월", "하남준", "김연호", "하남진"
];

const CUSTOM_PHOTOS = CHAR_NAMES.flatMap(name => 
  [1, 2, 3, 4, 5, 6].map(num => ({
    url: `https://raw.githubusercontent.com/roog24/11/refs/heads/main/${encodeURIComponent(name)}%20${num}.png`,
    characterName: name
  }))
);

let globalLoadedCount = 1;
let backgroundInterval: ReturnType<typeof setInterval> | null = null;

if (typeof window !== 'undefined' && !backgroundInterval) {
  backgroundInterval = setInterval(() => {
    if (globalLoadedCount < CUSTOM_PHOTOS.length) {
      globalLoadedCount++;
    }
  }, 800);
}

export default function PhotoAlbum({ onBack }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(globalLoadedCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadedImagesCount(globalLoadedCount);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  const allPhotos = CUSTOM_PHOTOS;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allPhotos.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev < allPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 bg-white min-h-screen z-10"
    >
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="font-semibold text-lg">과거 기록</h1>
        <div className="w-10"></div>
      </header>

      <div className="p-4 grid grid-cols-3 gap-2 pb-32">
        {allPhotos.map((photo, idx) => (
          <div 
            key={idx} 
            className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow relative"
            onClick={() => {
              setSelectedIndex(idx);
              setShowOverlay(true);
            }}
          >
            {idx < loadedImagesCount && (
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={photo.url} 
                alt={photo.characterName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => {
                  const nextCount = Math.max(loadedImagesCount, idx + 2);
                  globalLoadedCount = Math.max(globalLoadedCount, nextCount);
                  setLoadedImagesCount(prev => Math.max(prev, nextCount));
                }}
                onError={() => {
                  const nextCount = Math.max(loadedImagesCount, idx + 2);
                  globalLoadedCount = Math.max(globalLoadedCount, nextCount);
                  setLoadedImagesCount(prev => Math.max(prev, nextCount));
                }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Image Container */}
            <div className="absolute inset-0 flex items-center justify-center p-0 sm:p-4">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  src={allPhotos[selectedIndex].url}
                  alt={allPhotos[selectedIndex].characterName}
                  className="w-full h-full object-contain sm:rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOverlay(!showOverlay);
                  }}
                />
              </AnimatePresence>
            </div>

            {/* UI Overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Top Bar */}
                  <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
                    <div className="text-white font-medium text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
                      {allPhotos[selectedIndex].characterName} ({selectedIndex + 1} / {allPhotos.length})
                    </div>
                    <button 
                      className="text-white hover:text-white/80 bg-black/50 p-2 rounded-full backdrop-blur-md pointer-events-auto transition-colors"
                      onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Navigation Buttons */}
                  <button 
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-colors flex items-center justify-center w-12 h-12 shadow-lg pointer-events-auto"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                  </button>
                  
                  <button 
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-colors flex items-center justify-center w-12 h-12 shadow-lg pointer-events-auto"
                    onClick={handleNext}
                  >
                    <ChevronRight className="w-6 h-6 mr-[-2px]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
