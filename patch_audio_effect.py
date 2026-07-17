import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove autoPlay and onCanPlay from audio tag
old_audio = """            <audio 
              ref={audioRef}
              src={currentTransmission?.audioUrl || undefined}
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

new_audio = """            <audio 
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
            />"""

content = content.replace(old_audio, new_audio)

# Add useEffect for playing
old_effect = """  // Stop audio when modal unmounts or mode changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);"""

new_effect = """  // Stop audio when modal unmounts or mode changes
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
  }, [currentRandomIdx]);"""

content = content.replace(old_effect, new_effect)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Effect patched")
