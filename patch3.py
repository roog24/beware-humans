import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

replacement = """    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };"""

pattern = re.compile(r"    setCurrentTrackIndex\(index\);\n    setIsPlaying\(true\);\n    setTimeout\(\(\) => \{\n      if \(audioRef\.current\) \{\n        const playPromise = audioRef\.current\.play\(\);\n        if \(playPromise !== undefined\) \{\n          playPromise\.catch\(err => console\.log\('Play prevented:', err\)\);\n        \}\n      \}\n    \}, 50\);\n  \};", re.DOTALL)

if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open('src/components/AudioPlayer.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")

