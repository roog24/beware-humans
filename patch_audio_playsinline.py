import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

content = content.replace('<audio\n        ref={audioRef}\n        src={currentTrack.url}\n        preload="auto"\n        autoPlay={isPlaying}\n      />',
'<audio\n        ref={audioRef}\n        src={currentTrack.url}\n        preload="auto"\n        autoPlay={isPlaying}\n        playsInline\n      />')

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

print("Added playsInline to audio tag")
