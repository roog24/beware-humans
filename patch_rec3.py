import re

with open('src/recordings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 물러서십시오. -> 삭제 (remove the entire message if empty)
content = re.sub(r"\s*\{\s*time:\s*'[^']+',\s*speaker:\s*'[^']+',\s*text:\s*'물러서십시오\.'\s*\},", "", content)

# 2. 인간은 어떻게든 나아가야 하니까요. -> 삭제
content = content.replace("저는 괜찮습니다. 인간은 어떻게든 나아가야 하니까요.", "저는 괜찮습니다.")

# 3. 난 빚지고는 못 사는 성격이라. -> 삭제
content = content.replace("좋아. 난 빚지고는 못 사는 성격이라. 다음에 또 보자고.", "좋아. 다음에 또 보자고.")

# 4. 형님, 매드 독 구역 쪽에서 목격됐다고 합니다. -> 매드 독 구역 쪽에서 목격됐다고 합니다.
content = content.replace("형님, 매드 독 구역 쪽에서 목격됐다고 합니다.", "매드 독 구역 쪽에서 목격됐다고 합니다.")

# 5. 당장 잡아와! -> 삭제
content = content.replace("하... 그 멍청한 새끼 진짜 골칫거리네. 당장 잡아와!", "하... 그 멍청한 새끼 진짜 골칫거리네.")

# 6, 7, 8. 삭제
content = re.sub(r"\s*\{\s*time:\s*'[^']+',\s*speaker:\s*'[^']+',\s*text:\s*'크하하! 여기 털면 물자가 한가득이겠는데\?'\s*\},", "", content)
content = re.sub(r"\s*\{\s*time:\s*'[^']+',\s*speaker:\s*'[^']+',\s*text:\s*'너 또 무슨 짓을 벌이려고\. 당장 안 멈춰\?'\s*\},", "", content)
content = re.sub(r"\s*\{\s*time:\s*'[^']+',\s*speaker:\s*'[^']+',\s*text:\s*'히이익! 혀, 형! 그게 아니라\.\.\.!'\s*\},", "", content)

# 9. 하남진 ↔ 하남준 -> 하남진 ↔ 소속원
content = content.replace("title: '하남진 ↔ 하남준'", "title: '하남진 ↔ 소속원'")
content = content.replace("participants: ['ha_namjin', 'ha_namjun']", "participants: ['ha_namjin']")

with open('src/recordings.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched!")
