import os
import re

def remove_dark_css():
    with open('src/index.css', 'r') as f:
        content = f.read()
    
    content = re.sub(r"@layer base \{[\s\S]*?\}", "", content)
    
    with open('src/index.css', 'w') as f:
        f.write(content)

def convert_to_white():
    replacements = {
        'bg-neutral-900': 'bg-white',
        'bg-neutral-800': 'bg-gray-50',
        'bg-neutral-700': 'bg-gray-100',
        
        'text-white': 'text-gray-900',
        'text-gray-100': 'text-gray-800',
        'text-gray-300': 'text-gray-700',
        'text-gray-400': 'text-gray-500',
        
        'border-neutral-800': 'border-gray-100',
        'border-neutral-700': 'border-gray-200',
        'border-neutral-600': 'border-neutral-900',
        
        'hover:bg-gray-200': 'hover:bg-neutral-800',
        'hover:border-white': 'hover:border-neutral-900',
        'hover:bg-gray-300': 'hover:bg-neutral-800',
        'active:bg-gray-400': 'active:bg-neutral-800',
        'active:bg-gray-300': 'active:bg-neutral-800',
    }

    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # Careful replacements to avoid double replacing
                content = content.replace('bg-white text-neutral-900', 'bg-neutral-900 text-[#f4f1ea]')
                
                for k, v in replacements.items():
                    if ' ' not in k:
                        content = re.sub(r'\b' + re.escape(k) + r'\b', v, content)
                
                with open(path, 'w') as f:
                    f.write(content)

remove_dark_css()
convert_to_white()
print("Done")
