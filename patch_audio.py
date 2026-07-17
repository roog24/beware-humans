import re

with open('src/components/AudioPlayer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Main container text color
content = content.replace(
    "overflow-hidden flex flex-col text-gray-900\"",
    "overflow-hidden flex flex-col text-gray-100\""
)

# 2. Music icon color
content = content.replace(
    "<Music className=\"w-5 h-5 text-gray-700\" />",
    "<Music className=\"w-5 h-5 text-gray-400\" />"
)

# 3. Track title
content = content.replace(
    "className=\"text-sm font-medium text-gray-800 truncate\"",
    "className=\"text-sm font-medium text-white truncate\""
)

# 4. Skip buttons (prev and next)
content = content.replace(
    "rounded-full text-gray-700 hover:text-gray-900 flex items-center justify-center hover:bg-gray-700/50",
    "rounded-full text-gray-400 hover:text-white flex items-center justify-center hover:bg-gray-700/50"
)

# 5. Lyrics and Repeat buttons
content = content.replace(
    "className={`flex items-center gap-1 hover:text-gray-900 transition-colors ${showLyrics ? 'text-blue-400' : ''}`}",
    "className={`flex items-center gap-1 hover:text-white transition-colors ${showLyrics ? 'text-blue-400' : ''}`}"
)
content = content.replace(
    "className={`flex items-center gap-1 hover:text-gray-900 transition-colors ${repeatMode === 'one' ? 'text-blue-400' : ''}`}",
    "className={`flex items-center gap-1 hover:text-white transition-colors ${repeatMode === 'one' ? 'text-blue-400' : ''}`}"
)

# 6. Lyrics text
content = content.replace(
    "className=\"px-5 py-4 whitespace-pre-wrap text-[13px] text-gray-700 leading-relaxed font-sans text-center\"",
    "className=\"px-5 py-4 whitespace-pre-wrap text-[13px] text-gray-200 leading-relaxed font-sans text-center\""
)

# 7. Main floating button
content = content.replace(
    "className=\"w-12 h-12 rounded-full bg-gray-900 text-gray-900 shadow-xl border border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative\"",
    "className=\"w-12 h-12 rounded-full bg-gray-900 text-white shadow-xl border border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative\""
)

with open('src/components/AudioPlayer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("AudioPlayer patched")
