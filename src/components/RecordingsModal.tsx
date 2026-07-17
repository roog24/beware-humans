import React, { useState, useEffect, useRef } from 'react';
import { X, Radio, ArrowLeft, Play, Square, Loader2, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../data';
import { RECORDING_GROUPS } from '../recordings';

const RANDOM_TRANSMISSIONS = [
  {
    character: '박도영',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EB%B0%95%EB%8F%84%EC%98%81%20-%20...%EB%88%84%EA%B5%AC%EC%8B%9C%EC%A3%A0..MP3',
    subtitles: [
      { time: 0, text: '...누구시죠.' }
    ]
  },
  {
    character: '백현우',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EB%B0%B1%ED%98%84%EC%9A%B0%20-%20...%EC%97%AC%EB%B3%B4%EC%84%B8%EC%9A%94..MP3',
    subtitles: [
      { time: 0, text: '...여보세요?' }
    ]
  },
  {
    character: '이태윤',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EC%9D%B4%ED%83%9C%EC%9C%A4%20-%20...%EC%9D%B4%ED%83%9C%EC%9C%A4%EC%9E%85%EB%8B%88%EB%8B%A4..MP3',
    subtitles: [
      { time: 0, text: '...이태윤입니다.' }
    ]
  },
  {
    character: '하남준',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%ED%95%98%EB%82%A8%EC%A4%80%20-%20%EC%BD%94%EC%9B%83%EC%9D%8C%20%EB%AD%90%EB%83%90%20%EB%84%88.MP3',
    subtitles: [
      { time: 0, text: '(비웃는 듯한 코웃음 소리)\n..흥, 뭐냐 너?' }
    ]
  },
  {
    character: '하남진',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%ED%95%98%EB%82%A8%EC%A7%84%20-%20%ED%95%9C%EC%88%A8%20...%EB%AD%90%EB%83%90.MP3',
    subtitles: [
      { time: 0, text: '(한숨 소리)\n...뭐냐.' }
    ]
  },
  {
    character: '신원 미상 2명',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EC%8B%A0%EC%9B%90%20%EB%AF%B8%EC%83%81%202%EB%AA%85%20-%20%EB%8B%A4%EC%B9%9C%EB%93%AF%ED%95%9C%20%EC%88%A8%EC%86%8C%EB%A6%AC%2B%EC%88%A8%EC%86%8C%EB%A6%AC%EA%B0%80%20%EB%A7%8E%EC%9D%B4%20%EA%B1%B0%EC%B9%9C%EB%8D%B0.MP3',
    subtitles: [
      { time: 0, text: '(다친듯한 숨소리)' },
      { time: 6, text: '......연결됐군요.' },
      { time: 11, text: '(도발하는 듯한 다른 목소리)\n...숨소리가 많이 거친데' }
    ]
  }
];

interface Props {
  onClose: () => void;
}

export default function RecordingsModal({ onClose }: Props) {
  const [mode, setMode] = useState<'menu' | 'logs' | 'random'>('menu');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  
  // Random Transmission State
  const [currentRandomIdx, setCurrentRandomIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio when modal unmounts or mode changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle playing when idx changes
  useEffect(() => {
    if (currentRandomIdx >= 0 && audioRef.current) {
      setIsLoading(true);
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.error("Play error in effect:", err);
        setIsLoading(false);
        setIsPlaying(false);
      });
    }
  }, [currentRandomIdx]);

  const startRandomTransmission = () => {
    const nextIdx = currentRandomIdx === -1 ? 0 : (currentRandomIdx + 1) % RANDOM_TRANSMISSIONS.length;
    setCurrentRandomIdx(nextIdx);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoading(true);
    // We let the declarative <audio src={...} autoPlay> handle it.
  };

  const stopRandomTransmission = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const renderRandomMode = () => {
    const currentTransmission = currentRandomIdx >= 0 ? RANDOM_TRANSMISSIONS[currentRandomIdx] : null;
    
    // Find active subtitle
    let activeSubtitle = '';
    if (currentTransmission) {
      const pastSubtitles = currentTransmission.subtitles.filter(s => s.time <= currentTime);
      if (pastSubtitles.length > 0) {
        activeSubtitle = pastSubtitles[pastSubtitles.length - 1].text;
      }
    }

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <button 
            onClick={() => {
              stopRandomTransmission();
              setMode('menu');
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
              <h3 className="text-xl font-bold text-white">무전 시작</h3>
              <p className="text-xs text-green-500/80 font-mono mt-0.5">Random Frequency Connecting...</p>
          </div>
          {isPlaying && (
            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-mono uppercase tracking-widest animate-pulse shrink-0">
              Live
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 bg-[#0a0a0a] rounded-xl border border-neutral-800 flex flex-col items-center justify-center gap-8 relative font-mono shadow-inner text-center">
          {/* Scanline overlay effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-10"></div>
          
          <div className="z-20 w-full max-w-md bg-neutral-900/80 p-8 rounded-2xl border border-neutral-800 shadow-xl flex flex-col items-center">
            {currentTransmission ? (
              <>
                <div className="w-20 h-20 bg-neutral-950 rounded-full flex items-center justify-center border-2 border-neutral-800 mb-6 relative shadow-inner">
                  <Volume2 className={`w-8 h-8 ${isPlaying ? 'text-green-500 animate-pulse' : 'text-neutral-600'}`} />
                  {isPlaying && (
                    <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-20"></div>
                  )}
                </div>
                
                <h4 className="text-lg font-bold text-green-400 mb-2">{currentTransmission.character}</h4>
                <div className="h-20 flex items-center justify-center w-full px-4 text-center">
                  <p className="text-sm text-green-300/90 leading-relaxed font-medium transition-all duration-300 whitespace-pre-wrap">
                    {activeSubtitle || "..."}
                  </p>
                </div>
                

              </>
            ) : (
              <div className="flex flex-col items-center py-10">
                <Radio className="w-16 h-16 text-neutral-700 mb-6" />
                <p className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Ready to Connect</p>
                <p className="text-neutral-600 text-xs">주파수 스캔 준비 완료</p>
              </div>
            )}

            <audio 
              ref={audioRef}
              src={currentTransmission?.audioUrl || undefined}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
              onPlaying={() => { setIsPlaying(true); setIsLoading(false); }}
              onWaiting={() => setIsLoading(true)}
              onError={(e) => {
                console.error('Audio error:', e);
                setIsLoading(false);
                setIsPlaying(false);
              }}
            />
            <button
              onClick={startRandomTransmission}
              disabled={isLoading}
              className="mt-6 w-full py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Radio className="w-5 h-5" />
                  실시간 무전 연결
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderLogsMode = () => {
    if (selectedGroupId) {
      const group = RECORDING_GROUPS.find(g => g.id === selectedGroupId);
      if (!group) return null;
      
      const primarySpeaker = group.participants.length > 0 
        ? CHARACTERS.find(c => c.id === group.participants[0])?.name 
        : null;
      
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <button 
              onClick={() => setSelectedGroupId(null)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
                <p className="text-xs text-green-500/80 font-mono mt-0.5">{group.description}</p>
            </div>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-mono uppercase tracking-widest animate-pulse shrink-0">
              Archived
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 bg-[#0a0a0a] rounded-xl border border-neutral-800 flex flex-col gap-6 relative font-mono shadow-inner">
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-10"></div>
            
            {group.messages.length > 0 ? group.messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col relative z-20">
                <div className="flex items-center gap-3 mb-2 border-b border-neutral-800/80 pb-1">
                  <span className="text-green-500 font-bold text-xs uppercase tracking-wider">
                    {msg.speaker === primarySpeaker ? 'TX' : 'RX'} / {msg.speaker}
                  </span>
                  <span className="text-[10px] text-green-600/60">{msg.time}</span>
                  <span className="text-[10px] text-green-700/40 ml-auto">FREQ 144.{10 + idx}MHz</span>
                </div>
                <div className="text-green-400/90 text-sm font-medium leading-relaxed tracking-wide pl-2 border-l-2 border-green-500/30">
                  <span className="text-green-500/40 mr-2">{'>'}</span>
                  {msg.text}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-center z-20">
                <Radio className="w-12 h-12 text-neutral-700 mb-4" />
                <div className="text-neutral-500 font-medium text-sm tracking-widest uppercase">
                  No Transmission Found
                </div>
                <div className="text-neutral-600 text-xs mt-2">해당 그룹의 통신 기록이 없습니다.</div>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <button 
            onClick={() => setMode('menu')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
              <h3 className="text-xl font-bold text-white">무전 기록</h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">Archived Transmissions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto custom-scrollbar pb-4">
          {RECORDING_GROUPS.map(group => {
              const avatars = group.participants.map(pId => CHARACTERS.find(c => c.id === pId)).filter(Boolean);
              
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className="flex items-center p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-700/80 transition-all border border-neutral-700 text-left gap-4 group/btn"
                >
                  <div className="flex -space-x-4 shrink-0">
                    {avatars.length > 0 ? avatars.map((avatar, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-full overflow-hidden shadow-sm relative border-2 border-neutral-800 z-[10]">
                          {avatar?.imageUrl ? (
                              <img src={avatar.imageUrl} alt={avatar.name} className="w-full h-full object-cover grayscale opacity-80 group-hover/btn:grayscale-0 group-hover/btn:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                          ) : (
                              <div className={`w-full h-full ${avatar?.color} flex items-center justify-center font-bold text-lg grayscale opacity-80 group-hover/btn:grayscale-0 group-hover/btn:opacity-100 transition-all duration-300`}>
                                  {avatar?.name.charAt(0)}
                              </div>
                          )}
                      </div>
                    )) : (
                      <div className="w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center">
                          <Radio className="w-5 h-5 text-neutral-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm group-hover/btn:text-green-400 transition-colors truncate">{group.title}</div>
                    <div className="text-xs text-gray-400 mt-1 truncate group-hover/btn:text-gray-300">{group.description}</div>
                  </div>
                  <div className="shrink-0 text-neutral-600 group-hover/btn:text-green-500/50 transition-colors">
                      <Radio className="w-5 h-5" />
                  </div>
                </button>
              );
          })}
        </div>
      </motion.div>
    );
  };

  const renderMenuMode = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row gap-6 h-full items-center justify-center pb-10"
      >
        <button
          onClick={() => setMode('logs')}
          className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-blue-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group"
        >
          <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-neutral-800">
            <Radio className="w-8 h-8 text-blue-400" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">무전 기록</h3>
            <p className="text-sm text-gray-400">과거의 무전 기록</p>
          </div>
        </button>

        <button
          onClick={() => setMode('random')}
          className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-green-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group"
        >
          <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-neutral-800 relative">
            <Play className="w-8 h-8 text-green-400 ml-1" />
            <div className="absolute inset-0 border-2 border-green-500/0 group-hover:border-green-500/30 rounded-full animate-ping"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">무전 시작</h3>
            <p className="text-sm text-gray-400">실시간 무전 연결</p>
          </div>
        </button>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-neutral-900 w-full max-w-2xl h-[80vh] max-h-[800px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neutral-800 text-green-500 rounded-full flex items-center justify-center shrink-0 border border-neutral-700">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">무전기</h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5 tracking-widest uppercase">Radio Communication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-neutral-700 hover:text-white transition-colors shrink-0 border border-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 sm:p-6 flex-1 overflow-hidden flex flex-col">
          {mode === 'menu' && renderMenuMode()}
          {mode === 'logs' && renderLogsMode()}
          {mode === 'random' && renderRandomMode()}
        </div>
      </motion.div>
    </motion.div>
  );
}
