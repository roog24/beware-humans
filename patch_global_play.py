import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

# Instead of window.dispatchEvent, expose window.playGlobalAudio
replacement = """    const handleLoadStart = () => setIsLoading(true);

    // Expose directly to window to guarantee synchronous execution without event listener overhead
    (window as any).playGlobalAudio = (characterId: string, forcePlay: boolean = false) => {
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

    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string, forcePlay?: boolean }>;
      if ((window as any).playGlobalAudio) {
          (window as any).playGlobalAudio(customEvent.detail.characterId, customEvent.detail.forcePlay);
      }
    };"""

content = re.sub(r"    const handleLoadStart = \(\) => setIsLoading\(true\);\n    const handlePlayCharacterTheme = \(e: Event\) => \{.*?        \}\n      \}\n    \};", replacement, content, flags=re.DOTALL)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement2 = """  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ((window as any).playGlobalAudio) {
        (window as any).playGlobalAudio('bgm', true);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', {
          detail: { characterId: 'bgm', forcePlay: true }
        }));
    }
    
    // Fallback for strict mobile browsers
    const audioEl = document.querySelector('audio');
    if (audioEl) {
        const p = audioEl.play();
        if (p !== undefined) p.catch(()=>{});
    }
    
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement2, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

with open('src/components/CharacterThemePlayer.tsx', 'r') as f:
    content = f.read()

replacement3 = """  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if ((window as any).playGlobalAudio) {
        (window as any).playGlobalAudio(characterId);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', { detail: { characterId } }));
    }
    
    // Fallback
    const audioEl = document.querySelector('audio');
    if (audioEl) {
        const p = audioEl.play();
        if (p !== undefined) p.catch(()=>{});
    }
  };"""

content = re.sub(r"  const togglePlay = \(e: React\.MouseEvent\) => \{.*?  \};", replacement3, content, flags=re.DOTALL)

with open('src/components/CharacterThemePlayer.tsx', 'w') as f:
    f.write(content)

print("Applied global playAudio")
