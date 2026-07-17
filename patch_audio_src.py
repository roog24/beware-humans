import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

# Remove src={currentTrack.url}
content = content.replace('src={currentTrack.url}\n', '')

# Add initial src assignment
init_effect = """
  // Set initial src to prevent React from managing it and interrupting play
  useEffect(() => {
    if (audioRef.current && !audioRef.current.src) {
      audioRef.current.src = PLAYLIST[0].url;
    }
  }, []);
"""

# Insert right before the big useEffect
content = content.replace("  useEffect(() => {\n    const audio = audioRef.current;", init_effect + "  useEffect(() => {\n    const audio = audioRef.current;")

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

print("Removed src attribute and added init effect")
