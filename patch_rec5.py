import re

with open('src/recordings.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the comma optional
content = re.sub(r"\s*\{\s*id:\s*'rec_owol'[\s\S]*?\]\s*\}(,?)", "", content)

# cleanup any trailing commas before closing bracket of array
content = re.sub(r",\s*\];", "\n];", content)

with open('src/recordings.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched 5")
