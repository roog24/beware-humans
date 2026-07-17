import re

with open('src/components/CharacterThemePlayer.tsx', 'r') as f:
    content = f.read()

replacement = """  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if ((window as any).playCharacterTheme) {
        (window as any).playCharacterTheme(characterId);
    } else {
        window.dispatchEvent(new CustomEvent('play-character-theme', { detail: { characterId } }));
    }
    
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      const p = audioEl.play();
      if (p !== undefined) p.catch(() => {});
    }
  };"""

content = re.sub(r"  const togglePlay = \(e: React\.MouseEvent\) => \{.*?    window\.dispatchEvent\(new CustomEvent\('play-character-theme', \{ detail: \{ characterId \} \}\)\);\n  \};", replacement, content, flags=re.DOTALL)

with open('src/components/CharacterThemePlayer.tsx', 'w') as f:
    f.write(content)
print("Patched CharacterThemePlayer")
