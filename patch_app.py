import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("import CommunityBoard from './components/CommunityBoard';", "import CommunityBoard from './components/CommunityBoard';\nimport RecordingsModal from './components/RecordingsModal';")

content = content.replace("FolderHeart, Map, Search, X, MapPin, MessageSquare", "FolderHeart, Map, Search, X, MapPin, MessageSquare, Mic")

content = content.replace("const [showCommunityBoard, setShowCommunityBoard] = useState(false);", "const [showCommunityBoard, setShowCommunityBoard] = useState(false);\n  const [showRecordings, setShowRecordings] = useState(false);")

modal_insert = "{showCommunityBoard && <CommunityBoard onClose={() => setShowCommunityBoard(false)} />}\n        {showRecordings && <RecordingsModal onClose={() => setShowRecordings(false)} />}"
content = content.replace("{showCommunityBoard && <CommunityBoard onClose={() => setShowCommunityBoard(false)} />}", modal_insert)

button_insert = """            <div className="flex gap-2">
              <button
                onClick={() => setShowRecordings(true)}
                className="px-3 py-1.5 text-xs font-bold bg-neutral-900 text-white rounded-md flex items-center gap-1.5 hover:bg-neutral-800 transition-colors uppercase tracking-wider"
              >
                <Mic className="w-4 h-4" />
                녹취록
              </button>
              <button
                onClick={() => setShowCommunityBoard(true)}
                className="px-3 py-1.5 text-xs font-bold bg-neutral-900 text-white rounded-md flex items-center gap-1.5 hover:bg-neutral-800 transition-colors uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                Alive
              </button>
            </div>"""

content = re.sub(
    r'<button\s+onClick=\{\(\) => setShowCommunityBoard\(true\)\}\s+className="[^"]+"\s*>\s*<MessageSquare className="w-4 h-4" />\s*Alive\s*</button>',
    button_insert,
    content
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

