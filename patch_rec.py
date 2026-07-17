with open('src/recordings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "경비조 태호원. 배급소 주변 특이사항 없습니다.",
    "경비조 태호원. 배급소 주변 특이사항 없음."
)

content = content.replace(
    "수고가 많군. 하지만 방심하지 마. 언제 어디서 무너질지 모르는 세상이니까.",
    "수고가 많아. 하지만 방심하지 마. 언제 어디서 무너질지 모르는 세상이니까."
)

import re
# Remove the line containing "상황이 어떤가, 호원?"
content = re.sub(r"\s*\{\s*time:\s*'[^']+',\s*speaker:\s*'[^']+',\s*text:\s*'상황이 어떤가, 호원\?'\s*\},", "", content)

# Remove " 위험합니다. 저희가 처리하겠습니다."
content = content.replace(
    "물러서십시오. 위험합니다. 저희가 처리하겠습니다.",
    "물러서십시오."
)

with open('src/recordings.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Recordings updated")
