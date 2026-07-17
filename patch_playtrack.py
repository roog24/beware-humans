import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """  const playTrack = (index: number) => {
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
    
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].url;
      audioRef.current.load();
      setIsPlaying(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.log('Play prevented:', err);
            setIsPlaying(false);
        });
      }
    }
  };"""

content = re.sub(r"  const playTrack = \(index: number\) => \{.*?    setCurrentTrackIndex\(index\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

print("Patched playTrack")
