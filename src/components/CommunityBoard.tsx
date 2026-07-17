import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, MessageSquare, ThumbsUp, MessageCircle, Eye, ShieldAlert } from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: "세이프존 3계급 갈 바엔 걍 데드존에서 물려 죽어라",
    author: "ㅇㅇ(118.23)",
    date: "2030.04.12 14:22",
    views: 1420,
    likes: 89,
    content: (
      <div className="space-y-4 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <p>내 동생 저번주에 세이프존 3계급으로 팔려갔는데 어제 브로커 통해서 몰래 연락옴.</p>
        <p>건축 노가다 뛰는 줄 알았더니 무슨 '미래 연구소'인가 거기로 끌려갔다더라.</p>
        <p>거기서 생체 실험한다는 찌라시 진짜인듯.<br />무슨 핑크 대가리에 눈깔 희번덕거리는 미친 연구원 새끼가 주사기 꽂고 다닌다는데, 지 몸에도 바이러스 꽂아서 반은 좀비라며?</p>
        <p>진짜 개좆같다. 세이프존 간다고 좋아했던 내 동생 어떡하냐...</p>
      </div>
    ),
    comments: [
      { author: "익명1", text: "헐 미친 나도 그 핑크머리 소문 들음. 매일 아침마다 약 쳐먹으면서 버틴다던데?" },
      { author: "익명2", text: "3계급 갈 바엔 깔끔하게 물리는게 낫지. 거기 검은 안경 쓴 연구원 하나 있는데 걔도 가식 떠는거 토나옴." },
      { author: "익명3", text: "걍 포기해라 거긴 들어가는 순간 바코드 찍히고 가축 됨." }
    ]
  },
  {
    id: 'post-2',
    title: "한국대(에덴) 쪽으로 넘어갈 사람? (※매드독 조심)",
    author: "생존전문가",
    date: "2030.04.12 11:05",
    views: 3204,
    likes: 156,
    content: (
      <div className="space-y-4 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <p>오늘 밤에 한국대 쪽으로 넘어갈 건데 같이 갈 팟 구함.</p>
        <p>거기 '에덴'이라고 한유환인가? 웬 교수 출신 호구형이 굴리는 캠프 있는데, 밥도 주고 노약자도 다 받아준다고 함.</p>
        <p>근데 가는 길에 폐건물 쪽은 무조건 돌아가라. '매드독' 씹새끼들 진 치고 있음.<br />특히 파란머리 야구잠바 입은 새끼, 여자만 보면 실실 쪼개면서 다가오는데 남자면 가차없이 칼빵 놓으니까 조심해.</p>
      </div>
    ),
    comments: [
      { author: "익명1", text: "에덴 밥 잘줌. 빨간머리 근육괴물이 문지기 하고 있어서 매드독도 쫄아서 못 옴 ㅋㅋㅋ" },
      { author: "익명2", text: "매드독에 그 금발 씹덕새끼 어제 혼자 나대다가 자기 쌍둥이 동생(섀도우 리더)한테 개쳐맞고 울었다며? 존나 찌질함 진짜" },
      { author: "익명3", text: "에덴 장발 상담쌤이 맨날 멘탈케어도 해주고 사람 냄새는 난다더라." }
    ]
  },
  {
    id: 'post-3',
    title: "방금 서울역 암시장에 세이프존 1계급 떴음 ㄷㄷ",
    author: "눈팅족",
    date: "2030.04.11 23:45",
    views: 5122,
    likes: 342,
    content: (
      <div className="space-y-4 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <p>와씨 방금 암시장에서 존나 소름돋는 거 봄.</p>
        <p>검은 정장 쫙 빼입은 미친 피지컬 경호원이 앞장서고, 뒤에 어떤 단정한 갈색머리 샌님이 내려왔음.<br />근데 암시장 약팔이 새끼가 갈색머리한테 어깨 부딪혔다고 쌍욕 박으니까, 갈색머리가 생글생글 쳐웃으면서 그 자리에서 약팔이 손목 꺾어버림;;</p>
        <p>근데 더 무서운 건 옆에 경호원은 눈 깜짝 안 하고 가만히 있더라. 진짜 그사세 미친놈들인듯.</p>
      </div>
    ),
    comments: [
      { author: "익명1", text: "서가네 도련님이네. 걔 원래도 눈깔 훼까닥한 사이코패스로 1계급에서도 유명했음." },
      { author: "익명2", text: "1계급은 시발 데드존 왜 쳐내려옴? 지들끼리 꿀빨것이지 퉤" },
      { author: "익명3", text: "섀도우 쪽에 돈 주면 뭐든 다 구해오는 백발 미친놈 있잖아. 걔가 1계급 VIP 물건 구한다고 깝치고 다니더니 걔랑 거래하러 온 거 아님?" }
    ]
  },
  {
    id: 'post-4',
    title: "섀도우 마트 오늘 영업함?",
    author: "물물교환러",
    date: "2030.04.11 18:30",
    views: 890,
    likes: 45,
    content: (
      <div className="space-y-4 text-neutral-300 leading-relaxed text-sm sm:text-base">
        <p>오늘 대형마트 쪽에 섀도우 애들 영업 하는지 아는 사람?</p>
        <p>식량 떨어져서 건전지랑 담배로 좀 바꾸려고 하는데, 거기 백발 양아치 새끼가 요새 물가 올랐다고 후려친다며?</p>
        <p>그리고 금발머리 문지기는 말 존나 안 통한다던데, 걔는 무슨 원칙충이라 뇌물도 안 통한다고 함.</p>
      </div>
    ),
    comments: [
      { author: "익명1", text: "백발 걔가 김연호임. 입털어서 남는 장사만 하니까 조심해. 그래도 물건은 확실히 구해옴." },
      { author: "익명2", text: "금발머리 건드리지 마라. 걔 눈 돌면 칼부터 뽑음." },
      { author: "익명3", text: "하남진 쌍둥이 형이 매드독에 있는 금발이라며? 둘이 사이 개나쁘다던데 ㅋㅋㅋ" }
    ]
  }
];

export default function CommunityBoard({ onClose }: { onClose: () => void }) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState<Record<string, number>>(() => 
    INITIAL_POSTS.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {})
  );
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const selectedPost = INITIAL_POSTS.find(p => p.id === selectedPostId);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPostId) return;
    
    if (likedPosts[selectedPostId]) {
      setLikesCount(prev => ({ ...prev, [selectedPostId]: prev[selectedPostId] - 1 }));
      setLikedPosts(prev => ({ ...prev, [selectedPostId]: false }));
    } else {
      setLikesCount(prev => ({ ...prev, [selectedPostId]: prev[selectedPostId] + 1 }));
      setLikedPosts(prev => ({ ...prev, [selectedPostId]: true }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex justify-center sm:p-8"
    >
      <div className="w-full max-w-3xl bg-[#111111] text-neutral-200 sm:rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-neutral-800">
        {/* Header */}
        <div className="bg-[#1a1a1a] p-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            {selectedPost ? (
              <button onClick={() => setSelectedPostId(null)} className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-neutral-400" />
              </button>
            ) : (
              <ShieldAlert className="w-5 h-5 text-red-500 ml-2" />
            )}
            <h2 className="text-lg font-bold tracking-tight">
              {selectedPost ? '게시글 보기' : '생존자 커뮤니티'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#0a0a0a] custom-scrollbar">
          <AnimatePresence mode="wait">
            {!selectedPost ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="divide-y divide-neutral-800/50"
              >
                <div className="p-4 bg-red-950/20 border-b border-red-900/30">
                  <p className="text-xs text-red-400 font-medium">※ 경고: 세이프존 통신망 감청 주의. IP 우회 필수.</p>
                </div>
                {INITIAL_POSTS.map(post => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className="w-full text-left p-4 hover:bg-neutral-900/50 transition-all flex flex-col gap-2"
                  >
                    <h3 className="text-base sm:text-lg font-medium text-neutral-100 line-clamp-2 leading-snug">{post.title}</h3>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views}</span>
                        <span className="flex items-center gap-1 text-red-400"><ThumbsUp className="w-3.5 h-3.5" />{likesCount[post.id]}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col"
              >
                {/* Post Header */}
                <div className="p-4 sm:p-6 border-b border-neutral-800 bg-[#141414]">
                  <h1 className="text-xl sm:text-2xl font-bold leading-tight text-neutral-100 mb-4">
                    {selectedPost.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-neutral-400 gap-y-2">
                    <div className="flex items-center gap-3 font-medium">
                      <span className="text-neutral-300">{selectedPost.author}</span>
                      <span className="text-neutral-600">|</span>
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />조회 {selectedPost.views}</span>
                      <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />댓글 {selectedPost.comments.length}</span>
                    </div>
                  </div>
                </div>

                {/* Post Body */}
                <div className="p-4 sm:p-6 min-h-[200px]">
                  {selectedPost.content}
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={handleLike}
                      className={`flex flex-col items-center gap-2 transition-colors group ${likedPosts[selectedPost.id] ? 'text-red-400' : 'text-neutral-500 hover:text-red-400'}`}
                    >
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${likedPosts[selectedPost.id] ? 'border-red-900/50 bg-red-950/50 scale-105' : 'border-neutral-800 bg-neutral-900/30 group-hover:bg-neutral-800'}`}>
                        <ThumbsUp className={`w-5 h-5 ${likedPosts[selectedPost.id] ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-xs font-bold">{likesCount[selectedPost.id]}</span>
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div className="border-t border-neutral-800 bg-[#0f0f0f]">
                  <div className="p-4 border-b border-neutral-800 font-bold text-sm text-neutral-300">
                    댓글 ({selectedPost.comments.length})
                  </div>
                  <div className="divide-y divide-neutral-800/50">
                    {selectedPost.comments.map((comment, idx) => (
                      <div key={idx} className="p-4 flex flex-col gap-1.5 hover:bg-[#141414] transition-colors">
                        <span className="text-xs font-bold text-neutral-400">{comment.author}</span>
                        <p className="text-sm text-neutral-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
