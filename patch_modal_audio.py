import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove onWaiting and onPlaying
old_audio = """            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
            />"""

new_audio = """            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
            />"""

content = content.replace(old_audio, new_audio)

# Change button text
content = content.replace(
    '주파수 스캔 및 연결',
    '실시간 무전 연결'
)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Audio patched")
