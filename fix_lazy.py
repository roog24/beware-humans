import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix img tags: / loading="lazy"> to loading="lazy" />
    content = content.replace('/ loading="lazy">', 'loading="lazy" />')
    
    # Fix arrow functions: () = loading="lazy"> { to () => {
    content = content.replace('() = loading="lazy"> {', '() => {')
    
    # Fix arrow functions with events: (e) = loading="lazy"> { to (e) => {
    content = content.replace('(e) = loading="lazy"> {', '(e) => {')
    content = content.replace('(e: React.MouseEvent) = loading="lazy"> {', '(e: React.MouseEvent) => {')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.jsx')):
            fix_file(os.path.join(root, file))

