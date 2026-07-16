import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, X, ListMusic, Repeat, Repeat1, FileText, SkipBack, SkipForward } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CHARACTERS } from '../data';
import { LYRICS } from '../lyrics';

const PLAYLIST = [
  {
    id: 'bgm',
    title: '좀비보다 사람이 더 무서워',
    artist: '테마곡',
    url: 'https://raw.githubusercontent.com/roog24/11/main/2030%20-%20%EC%A2%80%EB%B9%84%EB%B3%B4%EB%8B%A4%20%EC%82%AC%EB%9E%8C%EC%9D%B4%20%EB%8D%94%20%EB%AC%B4%EC%84%9C%EC%9B%8C.mp3'
  },
  ...CHARACTERS.filter(c => c.themeSongUrl).map(c => ({
    id: c.id,
    title: c.themeSongName || '테마곡',
    artist: c.name,
    url: c.themeSongUrl!
  }))
];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState<'all' | 'one'>('all');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];
  const currentLyrics = LYRICS[currentTrack.id] || "가사가 등록되지 않은 곡입니다.";

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log('Play prevented:', err));
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    playTrack(nextIndex);
  };

  const playPrevTrack = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioRef.current && audioRef.current.currentTime >= 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIndex = currentTrackIndex === 0 ? PLAYLIST.length - 1 : currentTrackIndex - 1;
    playTrack(prevIndex);
  };

  const playTrack = (index: number) => {
    if (index === currentTrackIndex) {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          setIsPlaying(true);
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => console.log('Play prevented:', err));
          }
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
      return;
    }
    
    // If audio is currently playing, pause it first before changing the track
    // This helps prevent "The play() request was interrupted by a new load request"
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log('Play prevented:', err));
        }
      }
    }, 50);
  };

  const toggleRepeatMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRepeatMode(prev => prev === 'all' ? 'one' : 'all');
  };

  const handleProgressUpdate = (e: React.MouseEvent | React.PointerEvent) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;
      pos = Math.max(0, Math.min(1, pos));
      const newTime = pos * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handleProgressUpdate(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      handleProgressUpdate(e);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log("Play prevented:", err));
        }
      } else {
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        playTrack(nextIndex);
      }
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('global-audio-state', { detail: { isPlaying: false, trackId: PLAYLIST[currentTrackIndex].id } }));
    };
    const handlePlay = () => {
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('global-audio-state', { detail: { isPlaying: true, trackId: PLAYLIST[currentTrackIndex].id } }));
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    const handleRequestState = () => {
      window.dispatchEvent(new CustomEvent('global-audio-state', { detail: { isPlaying: !audio.paused, trackId: PLAYLIST[currentTrackIndex].id } }));
    };

    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string }>;
      const trackIndex = PLAYLIST.findIndex(t => t.id === customEvent.detail.characterId);
      if (trackIndex !== -1) {
        if (trackIndex === currentTrackIndex) {
          if (audio.paused) {
             const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log("Play prevented:", err));
        }
          } else {
             audio.pause();
          }
        } else {
          playTrack(trackIndex);
        }
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('request-audio-state', handleRequestState);
    window.addEventListener('play-character-theme', handlePlayCharacterTheme);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('request-audio-state', handleRequestState);
      window.removeEventListener('play-character-theme', handlePlayCharacterTheme);
    };
  }, [currentTrackIndex, repeatMode]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <audio
        ref={audioRef}
        src={currentTrack.url}
      />
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 w-[300px] max-w-[calc(100vw-48px)] max-h-[calc(100dvh-100px)] overflow-hidden flex flex-col text-white"
          >
            {/* Current Track Header */}
            <div className="p-4 border-b border-gray-800 bg-gray-800/50 shrink-0">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner">
                    <Music className="w-5 h-5 text-gray-300" />
                    {isPlaying && (
                      <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
                    )}
                </div>
                
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{currentTrack.artist}</span>
                  <span className="text-sm font-medium text-gray-100 truncate">{currentTrack.title}</span>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={playPrevTrack}
                    className="w-8 h-8 rounded-full text-gray-300 hover:text-white flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button 
                    onClick={playNextTrack}
                    className="w-8 h-8 rounded-full text-gray-300 hover:text-white flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar & Controls */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div 
                  ref={progressBarRef}
                  className="h-1.5 bg-gray-700 rounded-full cursor-pointer relative touch-none group"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm translate-x-1/2"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowLyrics(!showLyrics)}
                      className={`flex items-center gap-1 hover:text-white transition-colors ${showLyrics ? 'text-blue-400' : ''}`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={toggleRepeatMode}
                      className={`flex items-center gap-1 hover:text-white transition-colors ${repeatMode === 'one' ? 'text-blue-400' : ''}`}
                    >
                      {repeatMode === 'one' ? <Repeat1 className="w-3.5 h-3.5" /> : <Repeat className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Content: Playlist or Lyrics */}
            <div className="flex-1 min-h-0 max-h-[300px] overflow-y-auto py-2 custom-scrollbar">
              {showLyrics ? (
                <div className="px-5 py-4 whitespace-pre-wrap text-[13px] text-gray-300 leading-relaxed font-sans text-center">
                  {currentLyrics}
                </div>
              ) : (
                PLAYLIST.map((track, idx) => (
                  <div 
                    key={track.id}
                    onClick={() => playTrack(idx)}
                    className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                      idx === currentTrackIndex ? 'bg-gray-800/30' : ''
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      {idx === currentTrackIndex ? (
                        isPlaying ? (
                          <div className="flex gap-0.5 items-end h-3">
                            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-blue-400 rounded-full" />
                            <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-blue-400 rounded-full" />
                            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-blue-400 rounded-full" />
                          </div>
                        ) : (
                          <Music className="w-3.5 h-3.5 text-blue-400" />
                        )
                      ) : (
                        <span className="text-xs text-gray-500 font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs truncate ${idx === currentTrackIndex ? 'text-blue-400 font-medium' : 'text-gray-200'}`}>
                        {track.title}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate">{track.artist}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl border border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative"
      >
        {isExpanded ? <X className="w-5 h-5" /> : <ListMusic className="w-5 h-5" />}
        {!isExpanded && isPlaying && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-900"></span>
        )}
      </button>
    </div>
  );
}
