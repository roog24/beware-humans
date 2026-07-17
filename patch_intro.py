import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement = """    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-3xl bg-[#f4f1ea] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto shrink-0"
      >"""

pattern = re.compile(r"    <motion\.div\n      initial=\{\{ opacity: 1 \}\}\n      exit=\{\{ opacity: 0 \}\}\n      transition=\{\{ duration: 1 \}\}\n      className=\"fixed inset-0 bg-neutral-900 z-\[100\] flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto\"\n    >\n      <motion\.div\n        initial=\{\{ opacity: 0, y: 20 \}\}\n        animate=\{\{ opacity: 1, y: 0 \}\}\n        transition=\{\{ delay: 0\.5, duration: 1 \}\}\n        className=\"w-full max-w-3xl bg-\[#f4f1ea\] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto\"\n      >", re.DOTALL)

if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open('src/components/IntroScreen.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Pattern not found")
