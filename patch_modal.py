import re

with open('src/components/RecordingsModal.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { LYRICS } from '../lyrics';", "import { RECORDINGS } from '../recordings';")

old_render_content = """      const char = CHARACTERS.find(c => c.id === selectedCharId);
      const lyricsText = LYRICS[selectedCharId] || '녹취록이 없습니다.';
      
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => setSelectedCharId(null)}
              className="text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              ← 뒤로가기
            </button>
            <h3 className="text-xl font-bold">{char?.name} 녹취록</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-gray-700 font-medium">
              {lyricsText}
            </div>
          </div>
        </motion.div>
      );"""

new_render_content = """      const char = CHARACTERS.find(c => c.id === selectedCharId);
      const recordings = RECORDINGS[selectedCharId] || [];
      
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <button 
              onClick={() => setSelectedCharId(null)}
              className="text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              ← 뒤로가기
            </button>
            <h3 className="text-xl font-bold">{char?.name} 무전 녹취록</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-4">
            {recordings.length > 0 ? recordings.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.speaker === char?.name ? 'items-end' : 'items-start'}`}>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-600">{msg.speaker}</span>
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-medium leading-relaxed ${msg.speaker === char?.name ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-10 font-medium text-sm">
                해당 인물의 녹취록이 존재하지 않습니다.
              </div>
            )}
          </div>
        </motion.div>
      );"""

content = content.replace(old_render_content, new_render_content)

with open('src/components/RecordingsModal.tsx', 'w') as f:
    f.write(content)

print("Modal patched")
