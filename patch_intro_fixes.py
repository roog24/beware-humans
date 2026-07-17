import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto pointer-events-none select-none"',
    'className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto"'
)

content = content.replace(
    'className="pointer-events-auto px-12 py-3 sm:py-4 bg-neutral-900 text-[#f4f1ea] font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-neutral-700 transition-colors uppercase rounded-none border-2 border-transparent hover:border-neutral-900 active:bg-neutral-800"',
    'className="px-12 py-3 sm:py-4 bg-neutral-900 text-[#f4f1ea] font-sans font-bold text-lg sm:text-xl tracking-[0.2em] hover:bg-neutral-700 transition-colors uppercase rounded-none border-2 border-transparent hover:border-neutral-900 active:bg-neutral-800"'
)

replacement = """  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
    
    // Direct synchronous call to AudioPlayer's exposed method
    if ((window as any).playCharacterTheme) {
        (window as any).playCharacterTheme('bgm', true);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', {
          detail: { characterId: 'bgm', forcePlay: true }
        }));
    }
    
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

print("Fixed intro screen")
