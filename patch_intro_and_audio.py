import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

# Remove onClick and cursor-pointer from wrappers
content = re.sub(r'className="fixed inset-0 bg-neutral-900 z-\[100\] flex flex-col items-center p-4 sm:p-8 overflow-y-auto cursor-pointer"\s+onClick=\{handleStart\}',
                 'className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto"',
                 content)

content = re.sub(r'className="w-full max-w-3xl bg-\[#f4f1ea\] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto shrink-0 cursor-pointer"\s+onClick=\{handleStart\}',
                 'className="w-full max-w-3xl bg-[#f4f1ea] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto shrink-0"',
                 content)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string, forcePlay?: boolean }>;
      const trackIndex = PLAYLIST.findIndex(t => t.id === customEvent.detail.characterId);
      if (trackIndex !== -1) {
        if (trackIndex === currentTrackIndex) {
          if (customEvent.detail.forcePlay) {
             setIsPlaying(true);
             if (audioRef.current) {
                 const playPromise = audioRef.current.play();
                 if (playPromise !== undefined) {
                     playPromise.catch(err => {
                         console.log("Play prevented:", err);
                         setIsPlaying(false);
                     });
                 }
             }
          } else {
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
          }
        } else {
          playTrack(trackIndex);
        }
      }
    };"""

content = re.sub(r"    const handlePlayCharacterTheme = \(e: Event\) => \{.*?        \}\n      \}\n    \};", replacement, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

print("Patched both successfully")
