import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="auto"
        autoPlay={isPlaying}
      />"""

pattern = re.compile(r"      <audio\n        ref={audioRef}\n        src={currentTrack\.url}\n        preload=\"auto\"\n      />", re.DOTALL)
if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open('src/components/AudioPlayer.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")

