import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement = """  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    window.dispatchEvent(new CustomEvent('play-character-theme', {
      detail: { characterId: 'bgm', forcePlay: true }
    }));
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

print("Removed manual audioEl.play() from IntroScreen")
