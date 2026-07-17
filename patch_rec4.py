import json

with open('src/recordings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We will just do a regex replace to remove those blocks
import re

content = re.sub(r"\s*\{\s*id:\s*'rec_owol'[\s\S]*?\]\s*\},", "", content)
content = re.sub(r"\s*\{\s*id:\s*'rec_taeyoon'[\s\S]*?\]\s*\},", "", content)
# Since rec_yuha_doyoung is the first element, let's be careful with commas
content = re.sub(r"\s*\{\s*id:\s*'rec_yuha_doyoung'[\s\S]*?\]\s*\},", "", content)

# Check if there's a leading comma issue for the array (if first element was removed and comma left)
content = re.sub(r"\[\s*,", "[", content)

with open('src/recordings.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched 4")
