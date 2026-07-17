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
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {"""

pattern = re.compile(r"  useEffect\(\(\) => \{\n    if \(isPlaying && audioRef\.current\) \{\n      const playPromise = audioRef\.current\.play\(\);\n      if \(playPromise !== undefined\) \{\n        playPromise\.catch\(err => \{\n          console\.log\('Play prevented:', err\);\n          setIsPlaying\(false\);\n        \}\);\n      \}\n    \}\n  \}, \[currentTrackIndex\]\);\n\n  useEffect\(\(\) => \{")

content = pattern.sub(replacement, content)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
