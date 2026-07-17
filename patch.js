const fs = require('fs');
let code = fs.readFileSync('src/components/AudioPlayer.tsx', 'utf8');

const target = `    const handlePlayCharacterTheme = (e: Event) => {
      const customEvent = e as CustomEvent<{ characterId: string }>;
      const trackIndex = PLAYLIST.findIndex(t => t.id === customEvent.detail.characterId);
      if (trackIndex !== -1) {
        if (trackIndex === currentTrackIndex) {
          if (audio.paused) { 
             const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log("Play prevented:", err));
        }
          } else { 
             audio.pause();
          }
        } else {
          playTrack(trackIndex);
        }
      }
    };`;

const replacement = `    const handlePlayCharacterTheme = (e: Event) => {
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
    };`;

if (code.includes(target)) {
  fs.writeFileSync('src/components/AudioPlayer.tsx', code.replace(target, replacement));
  console.log("Replaced successfully!");
} else {
  console.log("Target not found. Let's find it with regex.");
  const regex = /const handlePlayCharacterTheme = \(e: Event\) => \{[\s\S]*?\n    \};/;
  if (regex.test(code)) {
     fs.writeFileSync('src/components/AudioPlayer.tsx', code.replace(regex, replacement));
     console.log("Replaced with regex successfully!");
  } else {
     console.log("Still not found.");
  }
}
