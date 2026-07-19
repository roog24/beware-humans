import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix X button: text-gray-900/80 hover:text-gray-900
    content = content.replace("text-gray-900/80 hover:text-gray-900", "text-white hover:text-white/80")
    
    # Fix Chevron buttons: text-gray-900 p-3 rounded-full
    content = content.replace("hover:bg-black/60 text-gray-900 p-3", "hover:bg-black/60 text-white p-3")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.jsx')):
            fix_file(os.path.join(root, file))

