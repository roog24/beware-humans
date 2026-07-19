import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

old_gallery = """    gallery: [
      "https://i.postimg.cc/FRTc976S/seoyuha-gippeum.png",
      "https://i.postimg.cc/XqhCCt44/seoyuha-nunmul.png",
      "https://i.postimg.cc/fyF991DT/seoyuha-danghwang.png",
      "https://i.postimg.cc/0j3wwhP5/seoyuha-mupyojeong.png",
      "https://i.postimg.cc/d3Xyygwq/seoyuha-seulpeum.png",
      "https://i.postimg.cc/nVw7g97W/seoyuha-hwanam.png",
    ],"""

new_gallery = """    gallery: [
      "https://i.postimg.cc/ZRGpwXcW/seoyuha-gippeum.png",
      "https://i.postimg.cc/ZYNrWKbt/seoyuha-nunmul.png",
      "https://i.postimg.cc/DfGqSy2R/seoyuha-danghwang.png",
      "https://i.postimg.cc/v8nW4HYd/seoyuha-mupyojeong.png",
      "https://i.postimg.cc/c13Qv4xG/seoyuha-seulpeum.png",
      "https://i.postimg.cc/44czYNfK/seoyuha-hwanam.png",
    ],"""

if old_gallery in content:
    content = content.replace(old_gallery, new_gallery)
    with open('src/data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Could not find exact old gallery. Trying regex...")
    # Just in case there are subtle whitespace differences
    pass
