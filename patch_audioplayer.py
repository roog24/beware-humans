import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Play prevented:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {"""

content = content.replace("  useEffect(() => {", replacement, 1)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
