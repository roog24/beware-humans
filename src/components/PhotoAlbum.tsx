import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
}

const CUSTOM_PHOTOS = [
  { url: "https://i.postimg.cc/QNpHdCnq/gim-yeonho-1.png", characterName: "김연호" },
  { url: "https://i.postimg.cc/zX83bNsr/gim-yeonho-2.png", characterName: "김연호" },
  { url: "https://i.postimg.cc/wTg3yzCz/gim-yeonho-3.png", characterName: "김연호" },
  { url: "https://i.postimg.cc/xTnqJQwf/gim-yeonho-4.png", characterName: "김연호" },
  { url: "https://i.postimg.cc/65tT2Kkt/gim-yeonho-5.png", characterName: "김연호" },
  { url: "https://i.postimg.cc/15BXDTS9/gim-yeonho-6.png", characterName: "김연호" },

  { url: "https://i.postimg.cc/SxtKvMJj/bagdoyeong-1.png", characterName: "박도영" },
  { url: "https://i.postimg.cc/0NMNRywp/bagdoyeong-2.png", characterName: "박도영" },
  { url: "https://i.postimg.cc/25b5RSZn/bagdoyeong-3.png", characterName: "박도영" },
  { url: "https://i.postimg.cc/mrzrfgHC/bagdoyeong-4.png", characterName: "박도영" },
  { url: "https://i.postimg.cc/R0605ZH7/bagdoyeong-5.png", characterName: "박도영" },
  { url: "https://i.postimg.cc/cJpLsG7q/bagdoyeong-6.png", characterName: "박도영" },

  { url: "https://i.postimg.cc/gjdcZyBs/baeghyeon-u-1.png", characterName: "백현우" },
  { url: "https://i.postimg.cc/6q0WL7ky/baeghyeon-u-2.png", characterName: "백현우" },
  { url: "https://i.postimg.cc/44bxTMm6/baeghyeon-u-3.png", characterName: "백현우" },
  { url: "https://i.postimg.cc/pVYLt7pD/baeghyeon-u-4.png", characterName: "백현우" },
  { url: "https://i.postimg.cc/NG7jwV54/baeghyeon-u-5.png", characterName: "백현우" },
  { url: "https://i.postimg.cc/sf9gR8v0/baeghyeon-u-6.png", characterName: "백현우" },

  { url: "https://i.postimg.cc/PrXrf4D1/seoyuha-1.png", characterName: "서유하" },
  { url: "https://i.postimg.cc/cL6xwLTF/seoyuha-2.png", characterName: "서유하" },
  { url: "https://i.postimg.cc/HkjYXk3N/seoyuha-3.png", characterName: "서유하" },
  { url: "https://i.postimg.cc/9QzmZQ1g/seoyuha-4.png", characterName: "서유하" },
  { url: "https://i.postimg.cc/FH1r3HG8/seoyuha-5.png", characterName: "서유하" },
  { url: "https://i.postimg.cc/nVvg6vSV/seoyuha-6.png", characterName: "서유하" },

  { url: "https://i.postimg.cc/cJndkkpP/itaeyun-1.png", characterName: "이태윤" },
  { url: "https://i.postimg.cc/LXk22Y65/itaeyun-2.png", characterName: "이태윤" },
  { url: "https://i.postimg.cc/ydhssgYZ/itaeyun-3.png", characterName: "이태윤" },
  { url: "https://i.postimg.cc/DZQnnJy4/itaeyun-4.png", characterName: "이태윤" },
  { url: "https://i.postimg.cc/W3mTTFbJ/itaeyun-5.png", characterName: "이태윤" },
  { url: "https://i.postimg.cc/wv5ggyTw/itaeyun-6.png", characterName: "이태윤" },

  { url: "https://i.postimg.cc/NG4BnHnf/jeonghaeun-1.png", characterName: "정해운" },
  { url: "https://i.postimg.cc/QxYs8rs4/jeonghaeun-2.png", characterName: "정해운" },
  { url: "https://i.postimg.cc/9FgVmjVL/jeonghaeun-3.png", characterName: "정해운" },
  { url: "https://i.postimg.cc/mgnxZmyw/jeonghaeun-4.png", characterName: "정해운" },
  { url: "https://i.postimg.cc/3Jf78H7z/jeonghaeun-5.png", characterName: "정해운" },
  { url: "https://i.postimg.cc/bwGPdFNB/jeonghaeun-6.png", characterName: "정해운" },

  { url: "https://i.postimg.cc/7L0ynGz1/cheong-owol-1.png", characterName: "청오월" },
  { url: "https://i.postimg.cc/hj0WNkp8/cheong-owol-2.png", characterName: "청오월" },
  { url: "https://i.postimg.cc/G2jw6Wqz/cheong-owol-3.png", characterName: "청오월" },
  { url: "https://i.postimg.cc/hj0WNkpb/cheong-owol-4.png", characterName: "청오월" },
  { url: "https://i.postimg.cc/Kz5SC6Jq/cheong-owol-5.png", characterName: "청오월" },
  { url: "https://i.postimg.cc/D0ykhxMB/cheong-owol-6.png", characterName: "청오월" },

  { url: "https://i.postimg.cc/brCXwQX1/taehowon-1.png", characterName: "태호원" },
  { url: "https://i.postimg.cc/2j2NGfq5/taehowon-2.png", characterName: "태호원" },
  { url: "https://i.postimg.cc/pVqMCt9h/taehowon-3.png", characterName: "태호원" },
  { url: "https://i.postimg.cc/nV0f2ts9/taehowon-4.png", characterName: "태호원" },
  { url: "https://i.postimg.cc/bY3fgjGy/taehowon-5.png", characterName: "태호원" },
  { url: "https://i.postimg.cc/QxCGnn5t/taehowon-6.png", characterName: "태호원" },

  { url: "https://i.postimg.cc/9Fk53tY5/hanamjun-1.png", characterName: "하남준" },
  { url: "https://i.postimg.cc/mrQ0Hxxw/hanamjun-2.png", characterName: "하남준" },
  { url: "https://i.postimg.cc/N01WHhhb/hanamjun-3.png", characterName: "하남준" },
  { url: "https://i.postimg.cc/xdKWzrr6/hanamjun-4.png", characterName: "하남준" },
  { url: "https://i.postimg.cc/g0vfZ99N/hanamjun-5.png", characterName: "하남준" },
  { url: "https://i.postimg.cc/76wj1Bwz/hanamjun-6.png", characterName: "하남준" },

  { url: "https://i.postimg.cc/vBX85xRN/hanamjin-1.png", characterName: "하남진" },
  { url: "https://i.postimg.cc/SRvyv0xr/hanamjin-2.png", characterName: "하남진" },
  { url: "https://i.postimg.cc/6qm9mspg/hanamjin-3.png", characterName: "하남진" },
  { url: "https://i.postimg.cc/XqzVzMYD/hanamjin-4.png", characterName: "하남진" },
  { url: "https://i.postimg.cc/2yKzKpSg/hanamjin-5.png", characterName: "하남진" },
  { url: "https://i.postimg.cc/y6QYdRy3/hanamjin-6.png", characterName: "하남진" },

  { url: "https://i.postimg.cc/2jc86W79/han-yuhwan-1.png", characterName: "한유환" },
  { url: "https://i.postimg.cc/pX3WQt7m/han-yuhwan-2.png", characterName: "한유환" },
  { url: "https://i.postimg.cc/g2k7Vy8n/han-yuhwan-3.png", characterName: "한유환" },
  { url: "https://i.postimg.cc/BQRS5GyP/han-yuhwan-4.png", characterName: "한유환" },
  { url: "https://i.postimg.cc/NfZs8wVH/han-yuhwan-5.png", characterName: "한유환" },
  { url: "https://i.postimg.cc/7Z7xmW83/han-yuhwan-6.png", characterName: "한유환" }
];

export default function PhotoAlbum({ onBack }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

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
            className="aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedIndex(idx);
              setShowOverlay(true);
            }}
          >
            <img 
              src={photo.url} 
              alt={photo.characterName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
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
                    <div className="text-white/90 font-medium text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-auto">
                      {allPhotos[selectedIndex].characterName} ({selectedIndex + 1} / {allPhotos.length})
                    </div>
                    <button 
                      className="text-white/80 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md pointer-events-auto transition-colors"
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
