with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'text-neutral-600 uppercase border-y-2 border-neutral-600',
    'text-gray-400 uppercase border-y-2 border-neutral-600'
)

content = content.replace(
    'bg-neutral-900 text-white font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-gray-200 transition-colors uppercase rounded-none border-2 border-transparent hover:border-neutral-600 active:bg-gray-400',
    'bg-white text-neutral-900 font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-gray-200 transition-colors uppercase rounded-none border-2 border-transparent active:bg-gray-300'
)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

