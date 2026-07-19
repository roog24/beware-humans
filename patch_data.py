import re
with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We can remove lines with '-1.png', '-2.png', ..., '-6.png'
content = re.sub(r"\s*'https://i\.postimg\.cc/[a-zA-Z0-9]+/[a-zA-Z0-9_-]+-[1-6]\.png',\n?", "", content)
content = re.sub(r"\s*,\s*'https://i\.postimg\.cc/[a-zA-Z0-9]+/[a-zA-Z0-9_-]+-[1-6]\.png'\s*", "", content)

# Also there might be a trailing comma like `    ,` before the numbered images
content = re.sub(r"'\s*,\s*'https://i\.postimg\.cc/[a-zA-Z0-9]+/[a-zA-Z0-9_-]+-[1-6]\.png'", "'", content)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
