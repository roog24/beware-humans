import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "src={currentTransmission?.audioUrl || ''}",
    "src={currentTransmission?.audioUrl || undefined}"
)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
