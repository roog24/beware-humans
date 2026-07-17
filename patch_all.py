import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = app_content.replace(
    '녹취록',
    '무전기'
)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_content)

print("App patched")
