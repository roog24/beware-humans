import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the text
content = content.replace(
    "{ time: 11, text: '(도발하는 듯한 다른 목소리) 숨소리가 많이 거친데' }",
    "{ time: 11, text: '(도발하는 듯한 다른 목소리)\\n...숨소리가 많이 거친데' }"
)

content = content.replace(
    "{ time: 0, text: '(비웃는 듯한 코웃음 소리) ..흥, 뭐냐 너?' }",
    "{ time: 0, text: '(비웃는 듯한 코웃음 소리)\\n..흥, 뭐냐 너?' }"
)

content = content.replace(
    "{ time: 0, text: '(한숨 소리) ...뭐냐.' }",
    "{ time: 0, text: '(한숨 소리)\\n...뭐냐.' }"
)

# Add whitespace-pre-wrap to the p tag
content = content.replace(
    'className="text-sm text-green-300/90 leading-relaxed font-medium transition-all duration-300"',
    'className="text-sm text-green-300/90 leading-relaxed font-medium transition-all duration-300 whitespace-pre-wrap"'
)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Subtitles patched!")
