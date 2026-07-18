import os
import re

def add_lazy_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match <img ... /> or <motion.img ... />
    # We want to add loading="lazy" if it doesn't already have it
    new_content = re.sub(r'(<(?:motion\.)?img\b[^>]*)(>)', lambda m: m.group(0) if 'loading=' in m.group(0) else m.group(1) + ' loading="lazy"' + m.group(2), content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.jsx')):
            add_lazy_to_file(os.path.join(root, file))

