import re

with open('src/components/AudioPlayer.tsx', 'r') as f:
    content = f.read()

# Remove autoPlay={isPlaying}
content = content.replace('autoPlay={isPlaying}\n', '')

with open('src/components/AudioPlayer.tsx', 'w') as f:
    f.write(content)

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement = """  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    window.dispatchEvent(new CustomEvent('play-character-theme', {
      detail: { characterId: 'bgm', forcePlay: true }
    }));
    
    onComplete();
  };"""

content = re.sub(r"  const handleStart = \(e: React\.MouseEvent\) => \{.*?    onComplete\(\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)

with open('src/components/CharacterThemePlayer.tsx', 'r') as f:
    content = f.read()

replacement2 = """  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    window.dispatchEvent(new CustomEvent('play-character-theme', { detail: { characterId } }));
  };"""

content = re.sub(r"  const togglePlay = \(e: React\.MouseEvent\) => \{.*?  \};", replacement2, content, flags=re.DOTALL)

with open('src/components/CharacterThemePlayer.tsx', 'w') as f:
    f.write(content)

print("Cleaned up audio logic")
