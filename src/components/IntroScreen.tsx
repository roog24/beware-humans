import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ((window as any).playGlobalAudio) {
        (window as any).playGlobalAudio('bgm', true);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', {
          detail: { characterId: 'bgm', forcePlay: true }
        }));
    }
    
    // Fallback for strict mobile browsers
    const audioEl = document.querySelector('audio');
    if (audioEl) {
        const p = audioEl.play();
        if (p !== undefined) p.catch(()=>{});
    }
    
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-white z-[100] overflow-y-auto p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-3xl mx-auto bg-gray-50 text-gray-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif shrink-0 mt-8 sm:mt-16 mb-8"
      >
        {/* News Header */}
        <div className="border-b-4 border-neutral-900 pb-4 mb-6 sm:mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900">
            THE DAILY CHRONICLE
          </h1>
          <div className="flex justify-between text-xs sm:text-sm font-bold text-gray-500 uppercase border-y-2 border-neutral-900 py-1.5 px-2">
            <span>Vol. 1</span>
            <span>January 1, 2030</span>
            <span>Special Edition</span>
          </div>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 tracking-tight text-center md:text-left">
            [속보] 전 세계 좀비 출현,<br className="sm:hidden" /> 인류 절반 감염
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-700 text-justify">
            2030년 새해, 전 세계 각지에서 동시다발적으로 원인 불명의 변이 바이러스가 발생했다. 감염자들은 이성을 잃고 공격적인 성향을 띠며, 현재 전 세계 인구수의 절반 이상이 일명 '좀비'로 변이된 것으로 확인되었다.
          </p>
        </motion.div>

        {/* Sub Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-8 sm:mt-10"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3 border-l-4 border-neutral-900 pl-3 md:pl-4">
            대한민국, 생존자 구역 분리
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-700 text-justify">
            정부는 즉각 비상사태를 선포하였으며, 현재 대한민국은 극도로 통제된 안전 구역인 <strong className="bg-white text-gray-900 px-1">세이프 존</strong>과 통제 불능의 비안전 구역 <strong className="bg-red-700 text-white px-1">데드 존</strong>으로 양분되어 생존자들의 험난한 사투가 이어지고 있다.
          </p>
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="pt-10 sm:pt-12 flex justify-center"
        >
          <button
            onClick={handleStart}
            className="px-12 py-3 sm:py-4 bg-neutral-900 text-white font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-neutral-800 transition-colors uppercase rounded-none border-2 border-transparent active:bg-neutral-700"
          >
            START
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
