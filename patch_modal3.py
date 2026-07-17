import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove audio from inside the conditional block
audio_tag = """                <audio 
                  ref={audioRef}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleAudioEnded}
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                />"""

content = content.replace(audio_tag, "")

# Add it outside the conditional
target = """            <button
              onClick={startRandomTransmission}"""

new_content = """            <audio 
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
            />
            <button
              onClick={startRandomTransmission}"""

content = content.replace(target, new_content)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

