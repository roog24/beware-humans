import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace startRandomTransmission
old_start = """  const startRandomTransmission = () => {
    const nextIdx = currentRandomIdx === -1 ? 0 : (currentRandomIdx + 1) % RANDOM_TRANSMISSIONS.length;
    setCurrentRandomIdx(nextIdx);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoading(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = RANDOM_TRANSMISSIONS[nextIdx].audioUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        setIsLoading(false);
      });
    }
  };"""

new_start = """  const startRandomTransmission = () => {
    const nextIdx = currentRandomIdx === -1 ? 0 : (currentRandomIdx + 1) % RANDOM_TRANSMISSIONS.length;
    setCurrentRandomIdx(nextIdx);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoading(true);
    // We let the declarative <audio src={...} autoPlay> handle it.
  };"""

content = content.replace(old_start, new_start)

# Replace the audio tag
old_audio = """            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
            />"""

new_audio = """            <audio 
              ref={audioRef}
              src={currentTransmission?.audioUrl || ''}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
              onPlaying={() => { setIsPlaying(true); setIsLoading(false); }}
              onWaiting={() => setIsLoading(true)}
              onError={(e) => {
                console.error('Audio error:', e);
                setIsLoading(false);
                setIsPlaying(false);
              }}
              onCanPlay={() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(e => console.error("Play error:", e));
                }
              }}
            />"""

content = content.replace(old_audio, new_audio)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

