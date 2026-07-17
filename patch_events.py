import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string, forcePlay?: boolean }>;
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
          } else if (audioRef.current && !audioRef.current.paused && !customEvent.detail.forcePlay) {
              audioRef.current.pause();
             setIsPlaying(false);
          }
        } else {
          playTrack(trackIndex);
        }
      }
    };"""

content = re.sub(r"    const handlePlayCharacterTheme = \(e: Event\) => \{.*?        \}\n      \}\n    \};", replacement, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)
print("Replaced AudioPlayer successfully")

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("detail: { characterId: 'bgm' }", "detail: { characterId: 'bgm', forcePlay: true }")

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)
print("Replaced IntroScreen successfully")

