import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

import_statement = "import CrackedScreenOverlay from './components/CrackedScreenOverlay';\n"
content = content.replace("import IntroScreen from './components/IntroScreen';", "import IntroScreen from './components/IntroScreen';\n" + import_statement)

# Insert <CrackedScreenOverlay /> before <ImagePreloader />
content = content.replace("<ImagePreloader />", "<CrackedScreenOverlay />\n      <ImagePreloader />")

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Added CrackedScreenOverlay")
