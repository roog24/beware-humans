import React, { useState, useEffect } from 'react';
import { CHARACTERS, ZONES } from './data';
import CharacterList from './components/CharacterList';
import ZoneList from './components/ZoneList';
import PhotoAlbum from './components/PhotoAlbum';
import { History } from 'lucide-react';
import CharacterDetail from './components/CharacterDetail';
import ZoneDetail from './components/ZoneDetail';
import AudioPlayer from './components/AudioPlayer';
import { FolderHeart, Map, Search, X, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

function ImagePreloader() {
  useEffect(() => {
    const urls = new Set<string>();
    CHARACTERS.forEach(c => {
      if (c.imageUrl) urls.add(c.imageUrl);
      if (c.gallery) {
        c.gallery.forEach(img => urls.add(img));
      }
    });
    ZONES.forEach(z => {
      if (z.imageUrl) urls.add(z.imageUrl);
    });
    
    Array.from(urls).forEach(url => {
      const img = new window.Image();
      img.referrerPolicy = "no-referrer";
      img.src = url;
    });
  }, []);
  
  return null;
}

type ViewState = 'home' | 'character_list' | 'zone_list' | 'character_detail' | 'zone_detail' | 'photo_album';

type HistoryState = { view: ViewState; id: string | null };

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation stack for back button to know where to return
  const [history, setHistory] = useState<HistoryState[]>([]);

  const navigateTo = (newView: ViewState, id: string | null = null) => {
    setHistory(prev => [...prev, { view, id: selectedId }]);
    setView(newView);
    if (id) setSelectedId(id);
    if (newView !== 'home') {
      setSearchQuery('');
    }
  };

  const navigateBack = () => {
    if (history.length === 0) return;
    const prevState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setView(prevState.view);
    setSelectedId(prevState.id);
  };

  const selectedCharacter = CHARACTERS.find(c => c.id === selectedId);
  const selectedZone = ZONES.find(z => z.id === selectedId);

  const searchResultsCharacters = CHARACTERS.filter(c => c.name.includes(searchQuery) || c.affiliation.includes(searchQuery));
  const searchResultsZones = ZONES.filter(z => z.name.includes(searchQuery) || z.description.includes(searchQuery));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 pb-32">
      <ImagePreloader />
      {/* Background Audio */}
      <AudioPlayer />
      
      {/* Home View */}
      <div className={`p-6 ${view !== 'home' ? 'hidden' : 'block'}`}>
        <header className="mb-8 mt-4">
          <h1 className="text-3xl font-bold tracking-tight mb-2">앨범</h1>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="사진, 사람, 장소 검색" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {searchQuery ? (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">검색 결과</h2>
            {searchResultsCharacters.length === 0 && searchResultsZones.length === 0 && (
              <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
            )}
            
            {searchResultsCharacters.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">인물</h3>
                <div className="flex flex-col gap-3">
                  {searchResultsCharacters.map(char => (
                    <div 
                      key={char.id}
                      onClick={() => navigateTo('character_detail', char.id)}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm">
                        {char.imageUrl ? (
                          <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className={`w-full h-full ${char.color} flex items-center justify-center font-bold text-lg`}>
                            {char.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{char.name}</div>
                        <div className="text-xs text-gray-500">{char.affiliation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchResultsZones.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">구역</h3>
                <div className="flex flex-col gap-3">
                  {searchResultsZones.map(zone => (
                    <div 
                      key={zone.id}
                      onClick={() => navigateTo('zone_detail', zone.id)}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center ${zone.imageUrl ? '' : zone.color}`}>
                        {zone.imageUrl ? (
                          <img src={zone.imageUrl} alt={zone.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <MapPin className="w-6 h-6 opacity-50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{zone.name}</div>
                        <div className="text-xs text-gray-500 truncate">{zone.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">나의 앨범</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Characters Folder */}
              <div 
                className="flex flex-col cursor-pointer group"
                onClick={() => navigateTo('character_list')}
              >
                <div className="bg-blue-50 aspect-square rounded-2xl p-4 flex items-center justify-center border border-blue-100 transition-transform transform group-hover:scale-[0.98]">
                  <FolderHeart className="w-16 h-16 text-blue-400" />
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-semibold text-sm text-gray-900">인물 프로필</h3>
                  <p className="text-xs text-gray-500">{CHARACTERS.length}개의 항목</p>
                </div>
              </div>

              {/* Zones Folder */}
              <div 
                className="flex flex-col cursor-pointer group"
                onClick={() => navigateTo('zone_list')}
              >
                <div className="bg-emerald-50 aspect-square rounded-2xl p-4 flex items-center justify-center border border-emerald-100 transition-transform transform group-hover:scale-[0.98]">
                  <Map className="w-16 h-16 text-emerald-400" />
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-semibold text-sm text-gray-900">구역 설명</h3>
                  <p className="text-xs text-gray-500">{ZONES.length}개의 항목</p>
                </div>
              </div>
              {/* Photo Album Folder */}
              <div 
                className="flex flex-col cursor-pointer group"
                onClick={() => navigateTo('photo_album')}
              >
                <div className="bg-purple-50 aspect-square rounded-2xl p-4 flex items-center justify-center border border-purple-100 transition-transform transform group-hover:scale-[0.98]">
                  <History className="w-16 h-16 text-purple-400" />
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-semibold text-sm text-gray-900">과거 기록</h3>
                  <p className="text-xs text-gray-500">돌아오지 않을 시간들</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Sub Views */}
      <AnimatePresence>
        {view === 'character_list' && (
          <CharacterList key="char_list" onBack={navigateBack} onSelect={(id) => navigateTo('character_detail', id)} />
        )}
        {view === 'photo_album' && (
          <PhotoAlbum key="photo_album" onBack={navigateBack} />
        )}
        {view === 'zone_list' && (
          <ZoneList key="zone_list" onBack={navigateBack} onSelect={(id) => navigateTo('zone_detail', id)} />
        )}
        {view === 'character_detail' && selectedCharacter && (
          <CharacterDetail 
            key={`char_detail_${selectedCharacter.id}`}
            character={selectedCharacter} 
            onBack={navigateBack} 
            onNavigateToCharacter={(id) => navigateTo('character_detail', id)}
          />
        )}
        {view === 'zone_detail' && selectedZone && (
          <ZoneDetail 
            key={`zone_detail_${selectedZone.id}`}
            zone={selectedZone} 
            onBack={navigateBack} 
            onNavigateToCharacter={(id) => navigateTo('character_detail', id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
