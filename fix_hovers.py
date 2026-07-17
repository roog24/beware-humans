import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            # Revert hover states for list items
            content = content.replace('hover:bg-neutral-800', 'hover:bg-gray-100')
            # But the primary buttons should have hover:bg-gray-800 instead of hover:bg-gray-100
            content = content.replace('bg-neutral-900 text-white rounded-md flex items-center gap-1.5 hover:bg-gray-100', 'bg-neutral-900 text-white rounded-md flex items-center gap-1.5 hover:bg-gray-800')
            
            # Fix intro screen button
            content = content.replace('bg-white text-[#f4f1ea]', 'bg-neutral-900 text-white')
            content = content.replace('border-neutral-600', 'border-gray-200')
            
            with open(path, 'w') as f:
                f.write(content)

print("Fixed hovers")
