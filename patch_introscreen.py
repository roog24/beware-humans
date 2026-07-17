import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement = """  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Play audio directly in the click handler to satisfy iOS Safari user gesture requirements
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
    
    window.dispatchEvent(new CustomEvent('play-character-theme', {
      detail: { characterId: 'bgm' }
    }));
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
