import re

with open('src/recordings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "{ time: '14:33 PM', speaker: '시스템', text: '(책상이 덜덜 떨리는 듯한 잡음)' }",
    "{ time: '14:33 PM', speaker: '백현우', text: '(책상이 덜덜 떨리는 듯한 잡음)' }"
)

with open('src/recordings.ts', 'w', encoding='utf-8') as f:
    f.write(content)

