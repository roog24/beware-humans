import re

with open('src/components/CharacterThemePlayer.tsx', 'r') as f:
    content = f.read()

replacement = """  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      const p = audioEl.play();
      if (p !== undefined) p.catch(() => {});
    }
    
    window.dispatchEvent(new CustomEvent('play-character-theme', { detail: { characterId } }));
  };"""

content = re.sub(r"  const togglePlay = \(e: React\.MouseEvent\) => \{.*?    window\.dispatchEvent\(new CustomEvent\('play-character-theme', \{ detail: \{ characterId \} \}\)\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/CharacterThemePlayer.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
