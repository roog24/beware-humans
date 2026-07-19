import React, { useState } from 'react';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  key?: React.Key;
  onBack: () => void;
}

interface DiaryEntry {
  id: string;
  date: string;
  content: string;
}

const HA_NAM_JUN_DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'entry_1',
    date: '2030년 1월 1일',
    content: `세상이 드디어 올바르게 돌아가기 시작했다
(페이지 전체에 시큼한 알코올 냄새와 오래된 땀 냄새가 배어 있다. 첫 줄은 손이 떨린 듯 글씨가 좌우로 심하게 삐뚤어져 있으나, 뒤로 갈수록 펜을 쥔 힘이 과하게 들어가 종이 뒷면까지 자국이 튀어나와 있다.)

방구석에서 애니나 본다고 나를 벌레 쳐다보듯 하던 인간들이 전부 고기 파티의 제물이 되었다. 이건 신의 심판이다. 아니, 나 같은 선택받은 자들을 위한 '각성 이벤트'라고 보는 게 맞겠지.

<strike>내가 문을 안 열어준 건... 아니 못 열어준 건... 문고리를 잡은 내 손이 너무 떨려서...</strike>
<red>약해빠진 것들은 도태되는 게 자연의 섭리다. 난 현명한 판단을 한 거다.</red>

하남진 그 건방진 새끼. 형을 형 대접도 안 하던 놈이 이제 와서 어쩔 건데? 가족? 그딴 게 무슨 소용이야. 먼저 뛰는 놈이 사는 세상인데. 내가 도망친 게 아니다. 나는 전략적인 후퇴를 한 거고, 새 시대의 주인공으로서 생존을 선택한 것뿐이다.

오늘 처음으로 챙겨 나온 양주를 병째로 마셨다. 목구멍이 타들어 가는 느낌이 아주 최고다. 구시대의 패배자였던 '하남준'은 죽었다.

(펜이 한 곳에 오래 머물러 잉크가 둥그렇게 번져 있다. 마치 펜을 쥐고 한참 동안 멈춰 있었던 것처럼)
죽었다. 진짜 죽은 건가? 죽었겠지. 죽어야만 해. 이제 이 지옥은 나의 낙원이다.`
  },
  {
    id: 'entry_2',
    date: '2030년 1월 7일',
    content: `(술에 젖어 쭈글쭈글해진 페이지. 글씨가 지렁이 기어가듯 갈겨져 있으며, 중간중간 펜촉이 종이를 찢은 흠집이 보인다.)

데드 존? 하, 이름 한번 좆같이 잘 지었네. 근데 여기가 내 왕국이다.
오늘 폐건물 구석에서 다리를 다친 아재 하나를 발견했다. 나한테 살려달라고, 집에 있는 딸을 봐야 한다고 빌더라. 구시대였으면 나한테 길을 물어보지도 않았을 콧대 높은 넥타이 샌님 관상이던데.

그 살려달라고 비는 꼴이... 덜덜 떨면서 손을 모으는 그 찌질한 꼴이 진짜 토가 나올 것 같아서 견딜 수가 없었다. 왜 저렇게 역겹게 굴지? 왜 저렇게 무력하게 엎드려서 남한테 구걸이나 하는 거야?!

그래서 내가 어떻게 했게?

(펜을 세게 꾹 눌러 쓴 글씨, 잉크가 번져 있다.)
가방만 챙기고 발로 차서 소리를 냈지.

저 멀리서 느릿한 발소리가 들릴 때 그 아재 표정이 진짜 예술이었는데! 사진으로 못 남긴 게 천추의 한이다. 나는 강하다. 이 무법지대에서 살아남고, 타인의 목숨까지 좌지우지하는 권력자다.

(페이지 중앙에 얼룩진 갈색 자국. 말라붙은 토사물 혹은 안주 부스러기 추정)
근데... 씨발, 왜 이렇게 밤마다 추운 거지? 술을 아무리 쳐마셔도 속이 텅 빈 것 같아서 잠을 잘 수가 없다. 다들 나를 부러워해서 피하는 거야. 난 절대......`
  },
  {
    id: 'entry_3',
    date: '2030년 1월 15일',
    content: `(비교적 정돈된 글씨체지만, 글자 끝마다 날카롭게 뻗어 나가는 신경질적인 필체. 페이지 오른쪽 위 모서리가 잘려 나가있다.)

매드 독에 들어왔다. 여기 놈들은 최소한 위선은 안 떨어져서 마음에 든다. 에덴인가 뭔가 하는 위선자 새끼들이나, 약탈이 나쁘다면서 징징대는 놈들보다 훨씬 현실적이지.

청오월 이 새끼는 진짜 웃기는 놈이다. 야구선수 출신이라 그런가 힘은 좀 쓰는데, 머리가 텅 비어있다니까? 여자만 보면 칠칠치 못하게 굴고 말이야. 나처럼 냉철하고 이성적인 알파 메일의 매력을 전혀 모른다.

"야 청오월, 오늘 약탈한 통조림 내놓고 가라." 하고 내가 딱 한마디 하니까 순순히 두고 가더라. 물론 그 새끼가 나를 안 쳐다보고 던지고 간 거긴 한데......

(작게 쓰려다 실패하고 마구 덧칠해 놓은 문장들)
왜 나를 그런 눈으로 봐? 너도 내가 찌질해 보여? 속으로는 날 욕하고 있냐? 야구선수면 다야? 잘생기면 다냐고. 나처럼 이성적이고 생존력 강한 알파 메일을 못 알아보는 무식한 새끼.

(잘게 떨리는 글씨로 작게 적힌 문단)
...오늘 밤엔 좀비 우는 소리가 유독 거슬리네. 저 새끼들이 꼭 내 이름을 부르면서 우는 것 같다. 너도 원래 우리랑 같은 벌레였잖아, 하고 조롱하는 것 같아서 미쳐버릴 것 같다. 소주를 두 병이나 깠는데도 손끝이 계속 떨린다. 난 매드 독의 하남준이다. 씨발, 나 무시하는 새끼들은 다 죽여버릴 거야. 진짜로. 내가 얼마나 대단한지 똑똑히 보여줄 거라고.`
  },
  {
    id: 'entry_4',
    date: '2030년 1월 24일',
    content: `하남진, 하남진, 씨발 하남진!!!!
(페이지 전체가 분노로 찢겨 나갈 듯이 펜이 깊게 파여 있다. '하남진'이라는 이름 위에 수십 번 칼질을 하듯 그어놓은 X자 낙서. 짙은 알코올 냄새와 함께 종이 한구석이 라이터 불에 그을려 있다.)

그 새끼가 살아있다고?
그것도 모자라 '섀도우'의 리더? 중립을 지키는 물자 탐색 팀의 영웅?

지랄 하지 마!! 지랄 하지 마라, 진짜!!!!

(광기에 차서 띄어쓰기조차 무시하고 휘갈긴 글씨들)
그새끼는그냥운이좋았을뿐이야내가그때집을나가지않았으면그새끼는벌써좀비밥이되었을걸?왜사람들은나를안쳐다보고그새끼이름만부르는건데?엄마도아빠도다그새끼만좋아했잖아왜?왜?왜?왜?왜?왜?왜?왜?왜?

(펜을 던진 듯 잉크가 번지다가, 다시 떨리는 글씨)
아니야, 내가 맞고 그 새끼가 틀린 거야!! 위선자 새끼. 내가 옳아. 날 버린 건 세상이고 너야. 내가 비겁한 게 아니라고...

오늘 청오월이 섀도우랑 마주쳤다는 얘기를 들었다. 금발에 밴드를 붙인 어린애가 리더 같더라면서, 묘하게 눈길이 간다나 뭐라나 헛소리를 지껄이길래 내가 소리를 꽥 질러버렸다. 그랬더니 오월이 놈이 픽 웃으면서 "왜 발작이야? 찔리냐?" 하고 가버리더라.

뭐가 찔려? 내가 뭘?! 내가 왜 부끄러워해야 하는데?! 난 살아남았잖아!! 살아남은 놈이 강한 거고, 내가 승리자라고!!

(페이지 맨 밑, 술인지 눈물인지 모를 액체에 흠뻑 젖어 종이가 우글우글하게 운 흔적.)
<strike>...남진아, 형이 잘못했어. 나 진짜 너무 무서워. 내가 왜 그랬을까. 나 진짜 살고 싶어서 그랬어...</strike>

(그리고 바로 그 밑에 검은 볼펜으로 시커멓게 짓이기듯 그어놓은 두꺼운 마침표와 최면 같은 한 문장)
구시대의 하남준은 죽었다. 난 행복하다. 난 존나 행복하다고. 씨발... 술이 더 필요해.`
  }
];

export default function SurvivalDiary({ onBack }: Props) {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const renderContent = (text: string) => {
    const parts = text.split(/(<strike>[\s\S]*?<\/strike>|<red>[\s\S]*?<\/red>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<strike>') && part.endsWith('</strike>')) {
        const innerText = part.slice(8, -9);
        return (
          <span 
            key={index} 
            className="text-[#2a221a] opacity-80 px-1"
            style={{
              backgroundImage: `
                linear-gradient(transparent 38%, rgba(26,21,16,0.9) 38%, rgba(26,21,16,0.9) 45%, transparent 45%),
                linear-gradient(transparent 48%, rgba(26,21,16,0.85) 48%, rgba(26,21,16,0.85) 56%, transparent 56%),
                linear-gradient(transparent 58%, rgba(26,21,16,0.9) 58%, rgba(26,21,16,0.9) 64%, transparent 64%)
              `
            }}
          >
            {innerText}
          </span>
        );
      }
      if (part.startsWith('<red>') && part.endsWith('</red>')) {
        const innerText = part.slice(5, -6);
        return (
          <span key={index} className="block text-[#a00000] font-bold mt-1 mb-2 text-[1.1rem] tracking-wide" style={{ textShadow: '1px 1px 0px rgba(160, 0, 0, 0.2)' }}>
            {innerText}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-neutral-100 z-10 overflow-hidden flex flex-col"
    >
      <header className="bg-white/80 backdrop-blur-md px-4 py-4 flex items-center shadow-sm z-20 shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold ml-2">하남준의 비밀 일기장</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f4ecd8] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
        <div className="max-w-3xl mx-auto" style={{ fontFamily: '"Gowun Batang", serif' }}>
          <AnimatePresence mode="wait">
            {!selectedEntry ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {HA_NAM_JUN_DIARY_ENTRIES.map(entry => (
                  <div 
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="bg-[#faf5eb] p-5 rounded-2xl shadow-md border border-[#e3d5b8] cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div className="w-10 h-10 bg-[#e3d5b8] text-[#5c4d3c] rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="text-lg font-bold text-[#8b6f52]">{entry.date}</div>
                    </div>
                    <p className="text-[#4a3b2c] text-sm line-clamp-3 leading-relaxed relative z-10 font-medium">
                      {entry.content.replace(/\([\s\S]*?\)/g, '').trim()}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#faf5eb] p-6 md:p-10 rounded-3xl shadow-xl border border-[#d4c3a3] min-h-[60vh] flex flex-col relative overflow-hidden"
                style={{ boxShadow: 'inset 0 0 60px rgba(139, 111, 82, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="absolute inset-0 opacity-50 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
                <button 
                  onClick={() => setSelectedEntry(null)}
                  className="absolute top-4 left-4 p-2 text-[#705e4b] hover:text-[#3a2e24] hover:bg-[#e3d5b8]/50 rounded-full transition-colors z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="text-center mb-8 mt-4 relative z-10">
                  <div className="inline-block px-4 py-2 bg-[#e3d5b8]/70 text-[#5c4d3c] font-bold text-lg rounded-full mb-4 shadow-inner border border-[#d4c3a3]">
                    {selectedEntry.date}
                  </div>
                </div>

                <div className="relative flex-1 z-10">
                  <div className="text-[#2a221a] text-lg leading-[32px] whitespace-pre-wrap relative z-10 py-1 font-medium tracking-tight">
                    {renderContent(selectedEntry.content)}
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
