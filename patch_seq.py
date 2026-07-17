import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change startRandomTransmission function
old_func = """  const startRandomTransmission = () => {
    const randomIdx = Math.floor(Math.random() * RANDOM_TRANSMISSIONS.length);
    setCurrentRandomIdx(randomIdx);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoading(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = RANDOM_TRANSMISSIONS[randomIdx].audioUrl;
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

new_func = """  const startRandomTransmission = () => {
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

content = content.replace(old_func, new_func)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
