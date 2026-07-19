import React, { useState } from 'react';
import { ChevronLeft, Dna, ArrowRight, RotateCcw, Shield, Sword, Heart, Brain, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
}

type Archetype = 'eden' | 'shadow' | 'maddog' | 'safezone' | 'lab';

const QUESTIONS = [
  {
    q: "Q1. 눈앞에 좀비가 나타났다! 당신의 첫 행동은?",
    options: [
      { text: "일단 냅다 뛴다! 도망이 최고야 🏃💨", type: "safezone" },
      { text: "주변의 무기부터 줍는다 🔪", type: "shadow" },
      { text: "좀비의 약점과 동선을 분석한다 🧐", type: "lab" },
      { text: "옆사람의 다리를 걸어 미끼로 던진다 😈", type: "maddog" },
      { text: "도움이 필요한 사람이 없는지 살핀다 🆘", type: "eden" },
    ]
  },
  {
    q: "Q2. 버려진 편의점을 발견했다. 가장 먼저 챙길 것은?",
    options: [
      { text: "유통기한 긴 통조림과 식수 🥫", type: "eden" },
      { text: "어디든 쓸데있는 구급상자와 약 💊", type: "lab" },
      { text: "무기로 쓸만한 둔기나 식칼 🪓", type: "shadow" },
      { text: "담배, 술 등 기호식품 (응?) 🚬", type: "maddog" },
      { text: "문부터 잠그고 안전한지 확인한다 🔒", type: "safezone" },
    ]
  },
  {
    q: "Q3. 밤이 되자 멀리서 사이렌 소리가 들린다.",
    options: [
      { text: "소리가 안 나는 곳으로 조용히 숨는다 🤫", type: "safezone" },
      { text: "혹시 생존자가 있을까 확인하러 간다 🔦", type: "eden" },
      { text: "상황을 관망하며 대기한다 👀", type: "lab" },
      { text: "나대지 말고 파밍이나 계속한다 🎒", type: "shadow" },
      { text: "오히려 좋아! 소리나는 곳으로 돌진한다 🏍️", type: "maddog" },
    ]
  },
  {
    q: "Q4. 무리에 합류할 기회가 생겼다. 당신의 포지션은?",
    options: [
      { text: "\"다들 내 뒤로 숨어!\" 듬직한 탱커 🛡️", type: "eden" },
      { text: "\"내가 템 다 털어올게.\" 발 빠른 파밍러 👟", type: "shadow" },
      { text: "\"이건 이렇게 해결해야지.\" 작전 참모 🧠", type: "lab" },
      { text: "\"나만 믿어.\" (사실 아무것도 안함) 🛌", type: "safezone" },
      { text: "\"내 말 안 들으면 다 죽여버린다\" 🤬", type: "maddog" },
    ]
  },
  {
    q: "Q5. 믿었던 동료가 좀비에게 물렸다... 당신의 선택은?",
    options: [
      { text: "눈물을 머금고 직접 처리한다 🔫", type: "shadow" },
      { text: "치료제를 찾을 수 있을 거라 믿고 가둔다 🧬", type: "lab" },
      { text: "동료가 완전히 변하기 전에 미련 없이 뜬다 ✌️", type: "safezone" },
      { text: "\"어차피 죽을 거 템 다 내놔\" 🤑", type: "maddog" },
      { text: "끝까지 곁에 남아준다 🤝", type: "eden" },
    ]
  }
];

const RESULTS: Record<Archetype, {
  affiliation: string;
  role: string;
  weapon: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  imageUrl: string;
  bestPartner: { name: string; desc: string };
  worstPartner: { name: string; desc: string };
  survivalRate: number;
  stats: [number, number, number, number, number, number];
  chartFill: string;
  chartStroke: string;
}> = {
  eden: {
    affiliation: "에덴 (한국대학교)",
    role: "최후의 로맨티스트 (빛 그 자체)",
    weapon: "희망과 낭만 (그리고 튼튼한 방패)",
    desc: "당신은 이 절망적인 세상에서도 인간성을 잃지 않는 희귀한 생존자입니다. 남을 돕다가 위험에 처할 수도 있지만, 당신의 선함이 결국 사람들을 모이게 할 것입니다.",
    color: "bg-green-100 text-green-900 border-green-200",
    icon: <Heart className="w-12 h-12 text-green-500 mb-2" />,
    imageUrl: "https://i.postimg.cc/FR5Y4r6d/eden.png",
    bestPartner: { name: "김연호 (섀도우)", desc: "나의 부족한 전투력을 완벽하게 채워주는 영혼의 단짝" },
    worstPartner: { name: "청오월 (매드 독)", desc: "생각하는 방식부터 달라 눈만 마주쳐도 싸움나는 상성" },
    survivalRate: 65,
    stats: [60, 50, 80, 70, 50, 90],
    chartFill: "#86efac",
    chartStroke: "#22c55e"
  },
  shadow: {
    affiliation: "섀도우 (대형마트)",
    role: "실전 압축 서바이벌러",
    weapon: "소음기가 달린 권총과 다용도 나이프",
    desc: "철저한 기브 앤 테이크! 감정에 휘둘리지 않고 냉철하게 판단하는 당신은 데드 존에서 가장 오래 살아남을 확률이 높습니다. 하지만 가끔은 사람 냄새가 그리울지도?",
    color: "bg-zinc-800 text-zinc-100 border-zinc-700",
    icon: <Sword className="w-12 h-12 text-zinc-400 mb-2" />,
    imageUrl: "https://i.postimg.cc/gkrBCGb1/syaedou.png",
    bestPartner: { name: "백현우 (미래 연구소)", desc: "서로의 실력을 인정하는 완벽한 비즈니스 파트너" },
    worstPartner: { name: "박도영 (세이프 존)", desc: "짐만 되는 녀석이라 데리고 다니기엔 골치 아픈 타입" },
    survivalRate: 92,
    stats: [80, 85, 60, 90, 80, 70],
    chartFill: "#d4d4d8",
    chartStroke: "#a1a1aa"
  },
  maddog: {
    affiliation: "매드 독 (방랑)",
    role: "브레이크 고장난 8톤 트럭",
    weapon: "피 묻은 전기톱 (또는 빠루)",
    desc: "좀비 사태? 오히려 좋아! 억눌려있던 당신의 본성이 깨어났습니다. 거칠 것이 없는 당신은 좀비보다 사람이 더 두려워하는 존재입니다. 막나가다 훅 갈 수 있으니 조심하세요.",
    color: "bg-red-100 text-red-900 border-red-200",
    icon: <Flame className="w-12 h-12 text-red-500 mb-2" />,
    imageUrl: "https://i.postimg.cc/W3Lv3hT3/maedeu-dog.png",
    bestPartner: { name: "하남준 (매드 독)", desc: "서로의 똘끼를 인정하는 멈출 수 없는 광기의 듀오" },
    worstPartner: { name: "한유환 (에덴)", desc: "착한 척 하는 게 제일 역겨워서 못 봐주겠는 타입" },
    survivalRate: 45,
    stats: [95, 80, 50, 60, 40, 85],
    chartFill: "#fca5a5",
    chartStroke: "#ef4444"
  },
  safezone: {
    affiliation: "세이프 존",
    role: "프로 방구석러 (존버 마스터)",
    weapon: "컵라면 박스와 두꺼운 이불",
    desc: "위험한 짓은 절대 하지 않는 당신. 어쩌면 가장 현실적인 생존 전략일지도 모릅니다. 튼튼한 벽 안에서 구조대가 오기만을 기다리며, 오늘도 숨죽여 하루를 넘깁니다.",
    color: "bg-blue-100 text-blue-900 border-blue-200",
    icon: <Shield className="w-12 h-12 text-blue-500 mb-2" />,
    imageUrl: "https://i.postimg.cc/V6GBLcBb/seipeujon.png",
    bestPartner: { name: "서유하 (세이프 존)", desc: "나를 안전하게 지켜줄 수 있는 유일한 구원자" },
    worstPartner: { name: "정해운 (미래 연구소)", desc: "언제 나를 실험체로 쓸지 몰라 등골이 서늘한 타입" },
    survivalRate: 75,
    stats: [30, 40, 70, 85, 60, 50],
    chartFill: "#93c5fd",
    chartStroke: "#3b82f6"
  },
  lab: {
    affiliation: "미래 연구소",
    role: "매드 사이언티스트 유망주",
    weapon: "해부용 메스와 수상한 주사기",
    desc: "모두가 패닉에 빠졌을 때, 당신은 원인을 분석하고 해결책을 찾으려 합니다. 지적 호기심이 생존 본능을 이겨버리는 타입. 가끔 도덕적 선을 넘을 수 있으니 주의하세요.",
    color: "bg-slate-100 text-slate-800 border-slate-200",
    icon: <Brain className="w-12 h-12 text-slate-500 mb-2" />,
    imageUrl: "https://i.postimg.cc/Vv9MTrLw/milae-yeonguso.png",
    bestPartner: { name: "하남진 (섀도우)", desc: "내 연구 재료를 척척 구해오는 아주 유능한 조수" },
    worstPartner: { name: "청오월 (매드 독)", desc: "연구를 방해하고 물건만 부수는 무식한 타입" },
    survivalRate: 80,
    stats: [40, 50, 50, 70, 95, 80],
    chartFill: "#cbd5e1",
    chartStroke: "#64748b"
  }
};

const HexagonChart = ({ stats, chartFill, chartStroke }: { stats: number[], chartFill: string, chartStroke: string }) => {
  const size = 160;
  const center = size / 2;
  const radius = (size / 2) - 25;

  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI / 3) * index - (Math.PI / 2);
    const r = (value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const labels = ['전투력', '민첩성', '운', '생존력', '지력', '멘탈'];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
      {/* Background hexagons */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
        <polygon 
          key={i}
          points={labels.map((_, i) => getPoint(scale * 100, i)).join(' ')}
          fill="none"
          stroke="rgba(150,150,150,0.2)"
          strokeWidth="1"
        />
      ))}
      
      {/* Axes */}
      {labels.map((_, i) => {
        const point = getPoint(100, i);
        return (
          <line 
            key={i}
            x1={center} y1={center}
            x2={point.split(',')[0]} y2={point.split(',')[1]}
            stroke="rgba(150,150,150,0.2)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon 
        points={stats.map((val, i) => getPoint(val, i)).join(' ')}
        fill={chartFill}
        fillOpacity="0.5"
        stroke={chartStroke}
        strokeWidth="2"
      />

      {/* Labels */}
      {labels.map((label, i) => {
        const point = getPoint(135, i);
        const x = Number(point.split(',')[0]);
        const y = Number(point.split(',')[1]);
        return (
          <text 
            key={i}
            x={x} y={y + 1}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="9"
            fontWeight="bold"
            fill="currentColor"
            className="opacity-80"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export default function SurvivalTest({ onBack }: Props) {
  const [step, setStep] = useState(0); // 0: intro, 1~5: Qs, 6: loading, 7: result
  const [scores, setScores] = useState<Record<Archetype, number>>({
    eden: 0, shadow: 0, maddog: 0, safezone: 0, lab: 0
  });
  const [resultType, setResultType] = useState<Archetype | null>(null);

  const handleStart = () => {
    setStep(1);
    setScores({ eden: 0, shadow: 0, maddog: 0, safezone: 0, lab: 0 });
    setResultType(null);
  };

  const handleAnswer = (type: string) => {
    const arch = type as Archetype;
    const newScores = { ...scores, [arch]: scores[arch] + 1 };
    setScores(newScores);

    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6);
      setTimeout(() => {
        // Calculate max score
        let maxScore = 0;
        let finalType: Archetype = 'safezone';
        (Object.keys(newScores) as Archetype[]).forEach(k => {
          if (newScores[k] > maxScore) {
            maxScore = newScores[k];
            finalType = k;
          }
        });
        setResultType(finalType);
        setStep(7);
      }, 2000);
    }
  };

  const currentQ = QUESTIONS[step - 1];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-neutral-100 overflow-y-auto flex flex-col z-10"
    >
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="font-semibold text-lg text-gray-900 tracking-wider">나의 생존 유형은?</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-md w-full"
            >
              <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Dna className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">좀비 사태 생존 시뮬레이션</h2>
              <p className="text-gray-600 mb-8 leading-relaxed break-keep">
                만약 지금 당장 세상이 망한다면?<br/>당신은 어떤 무기를 들고, 어느 세력에 속하게 될까요?<br/>당신의 생존 본능을 테스트해보세요.
              </p>
              <button 
                onClick={handleStart}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95 transform"
              >
                테스트 시작하기
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step >= 1 && step <= 5 && (
            <motion.div 
              key={`q-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-md w-full"
            >
              <div className="mb-8">
                <div className="text-sm font-bold text-purple-600 mb-2 tracking-widest">QUESTION {step} / 5</div>
                <h2 className="text-xl font-bold text-gray-900 leading-snug break-keep">{currentQ.q}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.type)}
                    className="w-full text-left bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98] transform"
                  >
                    <span className="font-medium text-gray-800 break-keep">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-bold text-gray-900">당신의 성향을 분석 중입니다...</h2>
              <p className="text-gray-500 mt-2">무기 및 소속 배치 중</p>
            </motion.div>
          )}

          {step === 7 && resultType && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md"
            >
              <div className={`rounded-3xl p-6 shadow-xl border overflow-hidden relative ${RESULTS[resultType].color}`}>
                <div className="absolute -right-12 -top-12 opacity-10">
                  {RESULTS[resultType].icon}
                </div>
                
                <div className="flex flex-col items-center text-center mb-6 relative z-10">
                  {RESULTS[resultType].icon}
                  <div className="text-sm font-bold opacity-80 mb-1">당신의 생존 포지션</div>
                  <h2 className="text-2xl font-black mb-2">{RESULTS[resultType].role}</h2>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 relative z-10">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">추천 소속</div>
                  <div className="font-bold text-lg">{RESULTS[resultType].affiliation}</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 relative z-10">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">주무기</div>
                  <div className="font-bold text-lg">{RESULTS[resultType].weapon}</div>
                </div>

                <p className="leading-relaxed font-medium opacity-90 relative z-10 mb-6 break-keep">
                  {RESULTS[resultType].desc}
                </p>

                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 mb-6 relative z-10 flex flex-col items-center">
                  <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">좀비 사태 생존율</div>
                  <div className="text-4xl font-black mb-4">{RESULTS[resultType].survivalRate}%</div>
                  
                  <div className="w-48 h-48 sm:w-56 sm:h-56">
                    <HexagonChart 
                      stats={RESULTS[resultType].stats} 
                      chartFill={RESULTS[resultType].chartFill}
                      chartStroke={RESULTS[resultType].chartStroke}
                    />
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden aspect-video border-2 border-white/20 mb-6 shadow-lg">
                  <img src={RESULTS[resultType].imageUrl} alt="Affiliation" className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 relative z-10">
                  <div className="bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center">
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-2 flex items-center gap-1 whitespace-nowrap">
                      <Heart className="w-3 h-3 text-red-500" />
                      최고의 파트너
                    </div>
                    <div className="font-bold text-xs sm:text-sm mb-2 whitespace-nowrap">{RESULTS[resultType].bestPartner.name}</div>
                    <div className="text-[10px] sm:text-xs font-medium opacity-75 break-keep leading-relaxed">{RESULTS[resultType].bestPartner.desc}</div>
                  </div>
                  <div className="bg-black/10 backdrop-blur-sm p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center">
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-2 flex items-center gap-1 whitespace-nowrap">
                      <Sword className="w-3 h-3 text-gray-700" />
                      최악의 파트너
                    </div>
                    <div className="font-bold text-xs sm:text-sm mb-2 whitespace-nowrap">{RESULTS[resultType].worstPartner.name}</div>
                    <div className="text-[10px] sm:text-xs font-medium opacity-75 break-keep leading-relaxed">{RESULTS[resultType].worstPartner.desc}</div>
                  </div>
                </div>

                <button 
                  onClick={handleStart}
                  className="w-full bg-white/20 hover:bg-white/30 text-current font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 active:scale-95 transform"
                >
                  <RotateCcw className="w-5 h-5" />
                  다시 테스트하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
