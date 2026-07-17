import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The item to move
item = """  {
    character: '신원 미상 2명',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EC%8B%A0%EC%9B%90%20%EB%AF%B8%EC%83%81%202%EB%AA%85%20-%20%EB%8B%A4%EC%B9%9C%EB%93%AF%ED%95%9C%20%EC%88%A8%EC%86%8C%EB%A6%AC%2B%EC%88%A8%EC%86%8C%EB%A6%AC%EA%B0%80%20%EB%A7%8E%EC%9D%B4%20%EA%B1%B0%EC%B9%9C%EB%8D%B0.MP3',
    subtitles: [
      { time: 0, text: '(다친듯한 숨소리)' },
      { time: 6, text: '......연결됐군요.' },
      { time: 11, text: '(도발하는 듯한 다른 목소리)\\n...숨소리가 많이 거친데' }
    ]
  },
"""

if item in content:
    content = content.replace(item, '')
    
    # insert before the closing bracket of RANDOM_TRANSMISSIONS
    # Note: '하남진' block is the last one
    last_item = """  {
    character: '하남진',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%ED%95%98%EB%82%A8%EC%A7%84%20-%20%ED%95%9C%EC%88%A8%20...%EB%AD%90%EB%83%90.MP3',
    subtitles: [
      { time: 0, text: '(한숨 소리)\\n...뭐냐.' }
    ]
  }
];"""

    new_last_item = """  {
    character: '하남진',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%ED%95%98%EB%82%A8%EC%A7%84%20-%20%ED%95%9C%EC%88%A8%20...%EB%AD%90%EB%83%90.MP3',
    subtitles: [
      { time: 0, text: '(한숨 소리)\\n...뭐냐.' }
    ]
  },
  {
    character: '신원 미상 2명',
    audioUrl: 'https://raw.githubusercontent.com/roog24/11/main/(%EB%AC%B4%EC%A0%84%EA%B8%B0)%20%EC%8B%A0%EC%9B%90%20%EB%AF%B8%EC%83%81%202%EB%AA%85%20-%20%EB%8B%A4%EC%B9%9C%EB%93%AF%ED%95%9C%20%EC%88%A8%EC%86%8C%EB%A6%AC%2B%EC%88%A8%EC%86%8C%EB%A6%AC%EA%B0%80%20%EB%A7%8E%EC%9D%B4%20%EA%B1%B0%EC%B9%9C%EB%8D%B0.MP3',
    subtitles: [
      { time: 0, text: '(다친듯한 숨소리)' },
      { time: 6, text: '......연결됐군요.' },
      { time: 11, text: '(도발하는 듯한 다른 목소리)\\n...숨소리가 많이 거친데' }
    ]
  }
];"""

    content = content.replace(last_item, new_last_item)
    
    with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done")
else:
    print("Item not found")

