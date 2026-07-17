import re

with open('src/components/IntroScreen.tsx', 'r') as f:
    content = f.read()

replacement = """  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto cursor-pointer"
      onClick={handleStart}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-3xl bg-[#f4f1ea] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto shrink-0 cursor-pointer"
        onClick={handleStart}
      >"""

content = content.replace("""  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-neutral-900 z-[100] flex flex-col items-center p-4 sm:p-8 overflow-y-auto cursor-pointer"
      onClick={handleStart}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full max-w-3xl bg-[#f4f1ea] text-neutral-900 p-6 sm:p-10 md:p-12 shadow-2xl relative font-serif my-auto shrink-0 cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >""", replacement)

with open('src/components/IntroScreen.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
