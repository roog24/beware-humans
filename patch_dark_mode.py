import os
import re

def remove_cracked_screen():
    with open('src/App.tsx', 'r') as f:
        content = f.read()
    
    content = re.sub(r"import CrackedScreenOverlay from '\./components/CrackedScreenOverlay';\n?", "", content)
    content = content.replace("<CrackedScreenOverlay />\n      ", "")
    
    with open('src/App.tsx', 'w') as f:
        f.write(content)

def remove_glitch_css():
    with open('src/index.css', 'r') as f:
        content = f.read()
    
    content = re.sub(r"@keyframes scanline.*", "", content, flags=re.DOTALL)
    
    # Add a global dark background to body just in case
    content += "\n\n@layer base {\n  body {\n    @apply bg-neutral-900 text-gray-100;\n  }\n}\n"
    
    with open('src/index.css', 'w') as f:
        f.write(content)

def convert_to_dark():
    replacements = {
        'bg-white': 'bg-neutral-900',
        'bg-[#f4f1ea]': 'bg-neutral-900',
        'bg-gray-50': 'bg-neutral-800',
        'bg-gray-100': 'bg-neutral-800',
        'bg-gray-200': 'bg-neutral-700',
        
        'text-gray-900': 'text-white',
        'text-gray-800': 'text-gray-100',
        'text-gray-700': 'text-gray-300',
        'text-gray-600': 'text-gray-400',
        'text-gray-500': 'text-gray-400',
        
        'text-neutral-900': 'text-white',
        'text-neutral-800': 'text-gray-300',
        'text-[#f4f1ea]': 'text-neutral-900', # For buttons that had bg-neutral-900
        
        'border-gray-100': 'border-neutral-800',
        'border-gray-200': 'border-neutral-700',
        'border-neutral-900': 'border-neutral-600',
        
        # Invert buttons
        'bg-neutral-900 text-[#f4f1ea]': 'bg-white text-neutral-900',
        'bg-neutral-900 text-white': 'bg-white text-neutral-900',
        'hover:bg-neutral-700': 'hover:bg-gray-200',
        'hover:border-neutral-900': 'hover:border-white',
        'hover:bg-neutral-800': 'hover:bg-gray-300',
        'active:bg-neutral-800': 'active:bg-gray-400',
    }

    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                # Careful replacements to avoid double replacing
                # We can replace whole words using regex
                
                # First handle specific compound classes
                content = content.replace('bg-neutral-900 text-[#f4f1ea]', 'bg-white text-neutral-900')
                content = content.replace('bg-neutral-900 text-white', 'bg-white text-neutral-900')
                
                for k, v in replacements.items():
                    if ' ' not in k:
                        content = re.sub(r'\b' + re.escape(k) + r'\b', v, content)
                
                with open(path, 'w') as f:
                    f.write(content)

remove_cracked_screen()
remove_glitch_css()
convert_to_dark()
print("Done")
