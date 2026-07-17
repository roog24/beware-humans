import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

# Make background container unclickable
content = content.replace(
    'className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto"',
    'className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto pointer-events-none select-none"'
)

# Make button clickable again
content = content.replace(
    'className="px-12 py-3 sm:py-4 bg-neutral-900 text-[#f4f1ea] font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-neutral-700 transition-colors uppercase rounded-none border-2 border-transparent hover:border-neutral-900 active:bg-neutral-800"',
    'className="pointer-events-auto px-12 py-3 sm:py-4 bg-neutral-900 text-[#f4f1ea] font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-neutral-700 transition-colors uppercase rounded-none border-2 border-transparent hover:border-neutral-900 active:bg-neutral-800"'
)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

print("Patched IntroScreen for pointer-events")
