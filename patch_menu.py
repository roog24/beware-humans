import re

with open('src/components/RecordingsModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix renderMenuMode container
old_container = """        className="flex flex-col md:flex-row gap-6 h-full items-center justify-center pb-10\""""
new_container = """        className="flex flex-col md:flex-row gap-4 sm:gap-6 h-full items-center justify-center pb-4 md:pb-10 overflow-y-auto custom-scrollbar\""""
content = content.replace(old_container, new_container)

# Fix button 1
old_btn1 = """className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-blue-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group\""""
new_btn1 = """className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] py-8 md:py-0 md:aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-blue-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group\""""
content = content.replace(old_btn1, new_btn1)

# Fix button 2
old_btn2 = """className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-green-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group\""""
new_btn2 = """className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2 max-w-[280px] py-8 md:py-0 md:aspect-square bg-neutral-800/40 border border-neutral-700 hover:border-green-500/50 hover:bg-neutral-800/80 rounded-3xl transition-all group\""""
content = content.replace(old_btn2, new_btn2)

with open('src/components/RecordingsModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Menu patched")
