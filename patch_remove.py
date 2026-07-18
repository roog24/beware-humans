import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = """  {
    character: '이태윤',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EC%9D%B4%ED%83%9C%EC%9C%A4%20-%20...%EC%9D%B4%ED%83%9C%EC%9C%A4%EC%9E%85%EB%8B%88%EB%8B%A4..MP3',
    subtitles: [
      { time: 0, text: '...이태윤입니다.' }
    ]
  },
"""

content = content.replace(target, '')

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

