import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

# Change div to button for playlist items to guarantee user gesture
content = content.replace(
    '<div \n                    key={track.id}\n                    onClick={() => playTrack(idx)}\n                    className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 transition-colors ${',
    '<button \n                    key={track.id}\n                    onClick={() => playTrack(idx)}\n                    className={`w-full text-left px-4 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 transition-colors ${'
)

content = content.replace(
    '</span>\n                    </div>\n                  </div>\n                ))\n              )}',
    '</span>\n                    </div>\n                  </button>\n                ))\n              )}'
)

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

print("Changed playlist items to buttons")
