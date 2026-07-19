import React from 'react';
import { ChevronLeft, AlertTriangle, ShieldAlert, Eye, Skull, Ghost, Droplets, Moon, Map, Activity, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
}

const RULES = [
  {
    icon: <Moon className="w-5 h-5 text-indigo-400" />,
    title: "1. 수면은 에바참치",
    content: "어이, 밖에서 좀비들이 정모하고 있는데 잠이 오냐? 밤에는 절대 불 켜지 말고 짱박혀 있으라고. 미소녀가 문 열어달라고 해도 열어주면 넌 바로 배드 엔딩인 부분입니다만? (쑻)"
  },
  {
    icon: <Ghost className="w-5 h-5 text-gray-400" />,
    title: "2. 잼민이는 컷",
    content: "길가다 잼민이(아님)가 도와달라고 해도 절대 무시해라. 데드 존에 꼬맹이는 없다는 사실. 다가가면 바로 뚝배기 깨지니까 눈길도 주지 말고 빤스런 쳐라 www"
  },
  {
    icon: <Skull className="w-5 h-5 text-red-500" />,
    title: "3. 매드 독 형님들 ㄷㄷ",
    content: "야레야레... '매드 독' 청오월 그 녀석이랑 마주쳤다고? ㄹㅇㅋㅋ 넌 이제 끝난 거야. 그나마 그 자식이 무표정할 때 도게자 빡세게 박으면 0.1% 확률로 살려줄지도? 아님 말고~"
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-orange-500" />,
    title: "4. 마트 파밍 뉴비 절단기",
    content: "섀도우 구역에서 템 빵빵한 혜자 마트 발견했다고 좋아하지 마라 뉴비야. 하남진 그 쫌생이가 템을 남겨뒀을 리가 없잖아? 그거 100% 뉴비 낚시용 함정이니까 빨리 뒤로가기 눌러라 ㅋㅋㅋ"
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    title: "5. 뒤잡 조심",
    content: "누가 등 뒤에서 툭툭 치면 쫄지 말고 \"술 없다 임마\" 라고 질러라. 하남준이면 투덜대고 갈 텐데, 만약 크아아악 소리가 들린다면... 끝난 거지 뭐."
  },
  {
    icon: <Clock className="w-5 h-5 text-slate-500" />,
    title: "6. 취침 시 벽보기",
    content: "잘 때 벽 보고 자는 게 생존 국룰인 거 RGRG? 등 뒤에서 숨소리 들려도 절대 돌아보지 마라. 걔네들도 무반응이면 금방 노잼이라 하고 어그로 풀림 ㅇㅇ"
  }
];

export default function SurvivalGuide({ onBack }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-neutral-900 overflow-y-auto flex flex-col z-10"
    >
      <header className="sticky top-0 bg-neutral-900/90 backdrop-blur-md z-20 px-4 py-4 flex items-center justify-between border-b border-neutral-800">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-300" />
        </button>
        <h1 className="font-semibold text-lg text-red-500 tracking-wider">생존 가이드</h1>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 p-4 sm:p-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">절대 수칙 6선</h2>
            <p className="text-neutral-400 text-sm">크큭... 이 비급을 주운 녀석, 제법 운이 좋군.<br/>본좌가 특별히 전수하는 생존 공략집이다. 정독 안 하면 뚝배기 깨짐 ㅇㅇ</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {RULES.map((rule, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-800/50 border border-neutral-700/50 p-5 rounded-2xl shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-900/50"></div>
                <h3 className="font-bold text-neutral-100 flex items-center gap-3 mb-2 text-lg">
                  {rule.icon}
                  {rule.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed text-sm">
                  {rule.content}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 mb-8 text-center border-t border-neutral-800 pt-8">
            <p className="text-red-500/80 font-bold text-xl uppercase tracking-[0.2em] opacity-70">
              Good Luck
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
