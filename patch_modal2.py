import re

with open('src/components/RecordingsModal.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { RECORDINGS } from '../recordings';", "import { RECORDING_GROUPS } from '../recordings';")

old_render_content = """  const renderContent = () => {
    if (selectedCharId) {
      const char = CHARACTERS.find(c => c.id === selectedCharId);
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
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white flex-1">{char?.name}</h3>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-mono uppercase tracking-widest animate-pulse">
              Live
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 bg-[#0a0a0a] rounded-xl border border-neutral-800 flex flex-col gap-6 relative font-mono shadow-inner">
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-10"></div>
            
            {recordings.length > 0 ? recordings.map((msg, idx) => (
              <div key={idx} className="flex flex-col relative z-20">
                <div className="flex items-center gap-3 mb-2 border-b border-neutral-800/80 pb-1">
                  <span className="text-green-500 font-bold text-xs uppercase tracking-wider">
                    {msg.speaker === char?.name ? 'TX' : 'RX'} / {msg.speaker}
                  </span>
                  <span className="text-[10px] text-green-600/60">{msg.time}</span>
                  <span className="text-[10px] text-green-700/40 ml-auto">FREQ 144.{10 + idx}MHz</span>
                </div>
                <div className="text-green-400/90 text-sm font-medium leading-relaxed tracking-wide pl-2 border-l-2 border-green-500/30">
                  <span className="text-green-500/40 mr-2">{'>'}</span>
                  {msg.text}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-center z-20">
                <Radio className="w-12 h-12 text-neutral-700 mb-4" />
                <div className="text-neutral-500 font-medium text-sm tracking-widest uppercase">
                  No Transmission Found
                </div>
                <div className="text-neutral-600 text-xs mt-2">해당 인물의 통신 기록이 없습니다.</div>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto custom-scrollbar pb-4"
      >
        {CHARACTERS.map(char => (
          <button
            key={char.id}
            onClick={() => setSelectedCharId(char.id)}
            className="flex flex-col items-center p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-700/80 transition-all border border-neutral-700 text-center gap-3 group"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm relative">
              {char.imageUrl ? (
                <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
              ) : (
                <div className={`w-full h-full ${char.color} flex items-center justify-center font-bold text-xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}>
                  {char.name.charAt(0)}
                </div>
              )}
              {/* Radio wave indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/50 rounded-full transition-all"></div>
            </div>
            <div>
              <div className="font-bold text-white text-sm group-hover:text-green-400 transition-colors">{char.name}</div>
              <div className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover:text-gray-300">{char.affiliation}</div>
            </div>
          </button>
        ))}
      </motion.div>
    );
  };"""

new_render_content = """  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedGroupId) {
      const group = RECORDING_GROUPS.find(g => g.id === selectedGroupId);
      if (!group) return null;
      
      const primarySpeaker = group.participants.length > 0 
        ? CHARACTERS.find(c => c.id === group.participants[0])?.name 
        : null;
      
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <button 
              onClick={() => setSelectedGroupId(null)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
                <p className="text-xs text-green-500/80 font-mono mt-0.5">{group.description}</p>
            </div>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-mono uppercase tracking-widest animate-pulse shrink-0">
              Live
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 bg-[#0a0a0a] rounded-xl border border-neutral-800 flex flex-col gap-6 relative font-mono shadow-inner">
            {/* Scanline overlay effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 z-10"></div>
            
            {group.messages.length > 0 ? group.messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col relative z-20">
                <div className="flex items-center gap-3 mb-2 border-b border-neutral-800/80 pb-1">
                  <span className="text-green-500 font-bold text-xs uppercase tracking-wider">
                    {msg.speaker === primarySpeaker ? 'TX' : 'RX'} / {msg.speaker}
                  </span>
                  <span className="text-[10px] text-green-600/60">{msg.time}</span>
                  <span className="text-[10px] text-green-700/40 ml-auto">FREQ 144.{10 + idx}MHz</span>
                </div>
                <div className="text-green-400/90 text-sm font-medium leading-relaxed tracking-wide pl-2 border-l-2 border-green-500/30">
                  <span className="text-green-500/40 mr-2">{'>'}</span>
                  {msg.text}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-center z-20">
                <Radio className="w-12 h-12 text-neutral-700 mb-4" />
                <div className="text-neutral-500 font-medium text-sm tracking-widest uppercase">
                  No Transmission Found
                </div>
                <div className="text-neutral-600 text-xs mt-2">해당 그룹의 통신 기록이 없습니다.</div>
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto custom-scrollbar pb-4"
      >
        {RECORDING_GROUPS.map(group => {
            // Get avatars for participants
            const avatars = group.participants.map(pId => CHARACTERS.find(c => c.id === pId)).filter(Boolean);
            
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className="flex items-center p-4 bg-neutral-800/50 rounded-2xl hover:bg-neutral-700/80 transition-all border border-neutral-700 text-left gap-4 group/btn"
              >
                <div className="flex -space-x-4 shrink-0">
                  {avatars.length > 0 ? avatars.map((avatar, idx) => (
                    <div key={idx} className="w-12 h-12 rounded-full overflow-hidden shadow-sm relative border-2 border-neutral-800 z-[10]">
                        {avatar?.imageUrl ? (
                            <img src={avatar.imageUrl} alt={avatar.name} className="w-full h-full object-cover grayscale opacity-80 group-hover/btn:grayscale-0 group-hover/btn:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                        ) : (
                            <div className={`w-full h-full ${avatar?.color} flex items-center justify-center font-bold text-lg grayscale opacity-80 group-hover/btn:grayscale-0 group-hover/btn:opacity-100 transition-all duration-300`}>
                                {avatar?.name.charAt(0)}
                            </div>
                        )}
                    </div>
                  )) : (
                    <div className="w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center">
                        <Radio className="w-5 h-5 text-neutral-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm group-hover/btn:text-green-400 transition-colors truncate">{group.title}</div>
                  <div className="text-xs text-gray-400 mt-1 truncate group-hover/btn:text-gray-300">{group.description}</div>
                </div>
                <div className="shrink-0 text-neutral-600 group-hover/btn:text-green-500/50 transition-colors">
                    <Radio className="w-5 h-5" />
                </div>
              </button>
            );
        })}
      </motion.div>
    );
  };"""

content = content.replace(old_render_content, new_render_content)
content = content.replace("const [selectedCharId, setSelectedCharId] = useState<string | null>(null);", "")

with open('src/components/RecordingsModal.tsx', 'w') as f:
    f.write(content)

