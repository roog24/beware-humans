import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """    const handleLoadStart = () => setIsLoading(true);

    const playCharacterTheme = (characterId: string, forcePlay: boolean = false) => {
      const trackIndex = PLAYLIST.findIndex(t => t.id === characterId);
      if (trackIndex !== -1) {
        if (trackIndex === currentTrackIndex) {
          if (forcePlay) {
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
    };

    // Expose to window for synchronous mobile Safari calls
    (window as any).playCharacterTheme = playCharacterTheme;

    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string, forcePlay?: boolean }>;
      playCharacterTheme(customEvent.detail.characterId, customEvent.detail.forcePlay);
    };"""

content = re.sub(r"    const handleLoadStart = \(\) => setIsLoading\(true\);\n    const handlePlayCharacterTheme = \(e: Event\) => \{.*?        \}\n      \}\n    \};", replacement, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement2 = """  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Direct synchronous call to AudioPlayer's exposed method
    if ((window as any).playCharacterTheme) {
        (window as any).playCharacterTheme('bgm', true);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', {
          detail: { characterId: 'bgm', forcePlay: true }
        }));
    }
    
    const audioEl = document.querySelector('audio');
    if (audioEl && audioEl.paused) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
    
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement2, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

print("Patched AudioPlayer and IntroScreen for global sync play")
