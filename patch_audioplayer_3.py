import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

# Remove the useEffect that calls play()
content = re.sub(r"  useEffect\(\(\) => \{\n    if \(isPlaying && audioRef\.current\) \{\n      const playPromise = audioRef\.current\.play\(\);\n      if \(playPromise !== undefined\) \{\n        playPromise\.catch\(err => \{\n          console\.log\('Play prevented:', err\);\n          setIsPlaying\(false\);\n        \}\);\n      \}\n    \}\n  \}, \[currentTrackIndex, isPlaying\]\);\n", "", content)

# Modify playTrack to set src synchronously
def replace_play_track(match):
    return """  const playTrack = (index: number) => {
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
    
    if (audioRef.current) {
      audioRef.current.pause();
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
    
    setCurrentTrackIndex(index);
  };"""

content = re.sub(r"  const playTrack = \(index: number\) => \{.*?(?=  const toggleRepeatMode)  };", replace_play_track, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
