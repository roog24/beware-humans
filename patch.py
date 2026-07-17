import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string }>;
      const trackIndex = PLAYLIST.findIndex(t => t.id === customEvent.detail.characterId);
      if (trackIndex !== -1) {
        if (trackIndex === currentTrackIndex) {
          if (audioRef.current && audioRef.current.paused) { 
             setIsPlaying(true);
             const playPromise = audioRef.current.play();
             if (playPromise !== undefined) {
               playPromise.catch(err => {
                 console.log("Play prevented:", err);
                 setIsPlaying(false);
               });
             }
          } else if (audioRef.current && !audioRef.current.paused) { 
             audioRef.current.pause();
             setIsPlaying(false);
          }
        } else {
          playTrack(trackIndex);
        }
      }
    };"""

pattern = re.compile(r"    const handlePlayCharacterTheme = \(e: Event\) => \{.*?\n    \};", re.DOTALL)
if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open('src/components/AudioPlayer.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")

