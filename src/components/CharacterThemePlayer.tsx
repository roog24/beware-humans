import React, { useState, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface CharacterThemePlayerProps {
  themeSongUrl: string;
  themeSongName?: string;
  characterName: string;
  characterId: string;
}

export default function CharacterThemePlayer({ themeSongName, characterName, characterId }: CharacterThemePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean, trackId: string }>;
      if (customEvent.detail.trackId === characterId) {
        setIsPlaying(customEvent.detail.isPlaying);
      } else {
        setIsPlaying(false);
      }
    };

    window.addEventListener('global-audio-state', handleAudioState);
    window.dispatchEvent(new CustomEvent('request-audio-state'));

    return () => {
      window.removeEventListener('global-audio-state', handleAudioState);
    };
  }, [characterId]);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ((window as any).playGlobalAudio) {
        (window as any).playGlobalAudio(characterId);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', { detail: { characterId } }));
    }
    
    // Fallback
    const audioEl = document.querySelector('audio');
    if (audioEl) {
        const p = audioEl.play();
        if (p !== undefined) p.catch(()=>{});
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
          <Music className="w-4 h-4 text-blue-500" />
          {isPlaying && (
            <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping opacity-20"></div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
            {themeSongName ? themeSongName : '캐릭터 테마곡'}
          </h3>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">{characterName}</p>
        </div>
      </div>
      <button 
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0 shadow-md"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
    </div>
  );
}
