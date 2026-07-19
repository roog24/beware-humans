import { Character, Zone } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "seo_yuha",
    name: "서유하",
    affiliation: "세이프 존 1계급",
    color: "bg-stone-200 text-stone-800",
    imageUrl: "https://i.postimg.cc/3JWZStHC/seoyuha.png",
    gallery: [
      "https://i.postimg.cc/ZRGpwXcW/seoyuha-gippeum.png",
      "https://i.postimg.cc/ZYNrWKbt/seoyuha-nunmul.png",
      "https://i.postimg.cc/DfGqSy2R/seoyuha-danghwang.png",
      "https://i.postimg.cc/v8nW4HYd/seoyuha-mupyojeong.png",
      "https://i.postimg.cc/c13Qv4xG/seoyuha-seulpeum.png",
      "https://i.postimg.cc/44czYNfK/seoyuha-hwanam.png",
    ],
    themeSongName: "Smile for Me",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EC%84%9C%EC%9C%A0%ED%95%98%20-%20Smile%20for%20Me.mp3",
    quote: '"이상하네. 왜 내 시야에서 벗어나려고 해?"',
    info: [
      "나이: 28세",
      "신체: 172cm",
      "성향: INTJ, 예의바름, 논리 중심 사고",
      "특징: 재벌가 서가 가문 출신. 매너가 몸에 배어 있으며 스킨십이 자연스러움, 거짓말을 극도로 혐오.",
    ],
    secretInfo: [
      "숨겨진 성향: 후천적 사이코패스 및 얀데레",
      "과거: 어릴 적 친부모에게 심한 학대를 받았으며, 27살에 친부모 사망 후 자산을 모두 상속받음",
    ],
    relationships: [
      {
        targetId: "park_doyoung",
        targetName: "박도영",
        thought: "유용한 개",
        quote: "내 명령을 완벽하게 수행하는 유용한 장기말. 곁에 두기 편해.",
      },
      {
        targetId: "baek_hyunwoo",
        targetName: "백현우",
        thought: "거슬리는 거짓말",
        quote:
          "거짓으로 점철된 인간. 거슬리지만 아직은 쓸모가 있을지 지켜보는 중.",
      },
      {
        targetId: "jung_haewoon",
        targetName: "정해운",
        thought: "흥미로운 실험체",
        quote: "괴물과 인간의 경계에 선 흥미로운 관찰 대상.",
      },
    ],
  },
  {
    id: "park_doyoung",
    name: "박도영",
    affiliation: "세이프 존 2계급 (경호원)",
    color: "bg-slate-800 text-slate-100",
    imageUrl: "https://i.postimg.cc/xdDpD4rf/bagdoyeong.png",
    gallery: [
      "https://i.postimg.cc/QxsSNTVW/bagdoyeong-gippeum.png",
      "https://i.postimg.cc/q79XPtWb/bagdoyeong-nunmul.png",
      "https://i.postimg.cc/VNSWZ9Zn/bagdoyeong-danghwang.png",
      "https://i.postimg.cc/jjW4363H/bagdoyeong-mupyojeong.png",
      "https://i.postimg.cc/YS4zDNDP/bagdoyeong-seulpeum.png",
      "https://i.postimg.cc/tgLtK1LQ/bagdoyeong-hwanam.png",
    ],
    themeSongName: "도련님",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EB%B0%95%EB%8F%84%EC%98%81%20-%20%EB%8F%84%EB%A0%A8%EB%8B%98.mp3",
    quote: '"도련님, 명령만 내리십시오."',
    info: [
      "나이: 32세",
      "신체: 182cm",
      "성향: ISTJ, 이성적, 차분함",
      "특징: 서유하의 전담 경호원. 서유하 한정 절대 복종.",
    ],
    secretInfo: [
      "숨겨진 성향: 타인의 적의나 살의에 소름 끼칠 정도로 무덤덤하고, 자신이 다치는 것에도 무감각하며 오직 주군의 안위만 우선시함",
      "과거: 2024년부터 서유하를 모시며 좀비 사태 이후에도 곁을 지킴",
    ],
    relationships: [
      {
        targetId: "seo_yuha",
        targetName: "서유하",
        thought: "절대적인 주군",
        quote:
          "내가 모셔야 할 유일한 주군. 그 어떤 위협으로부터도 안전하게 지켜내야 한다.",
      },
      {
        targetId: "baek_hyunwoo",
        targetName: "백현우",
        thought: "경계 대상",
        quote:
          "행동이 불분명하고 의심스러운 자. 도련님께 해가 된다면 언제든 제거할 준비가 되어 있다.",
      },
      {
        targetId: "jung_haewoon",
        targetName: "정해운",
        thought: "위험한 변수",
        quote:
          "속을 알 수 없는 미치광이. 도련님께 해가 될지도 모르는 위험한 변수다.",
      },
    ],
  },
  {
    id: "baek_hyunwoo",
    name: "백현우",
    affiliation: "세이프 존 2계급 (연구원)",
    color: "bg-indigo-900 text-indigo-100",
    imageUrl: "https://i.postimg.cc/RV8LjwM1/baeghyeon-u.png",
    gallery: [
      "https://i.postimg.cc/FFxCLZMb/baeghyeon-u-gippeum.png",
      "https://i.postimg.cc/HnW22qqs/baeghyeon-u-nunmul.png",
      "https://i.postimg.cc/rmNj5VPq/baeghyeon-u-danghwang.png",
      "https://i.postimg.cc/cHBhfxby/baeghyeon-u-mupyojeong.png",
      "https://i.postimg.cc/zvDjjssV/baeghyeon-u-seulpeum.png",
      "https://i.postimg.cc/mZVVDr93/baeghyeon-u-hwanam.png",
    ],
    themeSongName: "가짜 이름",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EB%B0%B1%ED%98%84%EC%9A%B0%20-%20%EA%B0%80%EC%A7%9C%20%EC%9D%B4%EB%A6%84.mp3",
    quote: '"아, 몸은 좀 어때요? 불편한 곳은 없고?"',
    info: [
      "나이: 32세",
      "신체: 176cm",
      "성향: ESTJ, 가식 친절",
      "특징: 미래 연구소 선임 연구원. 내면에 짙은 불안과 경계심.",
    ],
    secretInfo: [
      "본명: 권지우 (실제 나이 28세, 본래 성향 ISTP)",
      "본성: 쫄보, 애정 결핍, 심한 자기혐오",
      "과거: 부모와 함께 잡혀와 3계급 실험체로 살다 부모를 잃음",
      "과거: 식품 공장 품질관리 직원 출신으로, 죽은 진짜 백현우를 완벽히 모방하며 신분을 훔쳐 살고 있음",
    ],
    relationships: [
      {
        targetId: "seo_yuha",
        targetName: "서유하",
        thought: "소름끼치는 놈",
        quote:
          "속을 알 수 없는 무서운 놈. 내 정체를 들킬까 봐 항상 피가 마르는 기분이다.",
      },
      {
        targetId: "park_doyoung",
        targetName: "박도영",
        thought: "무서운 사냥개",
        quote:
          "서유하의 미친 사냥개. 저 무감각한 눈빛을 볼 때마다 소름이 끼친다.",
      },
      {
        targetId: "jung_haewoon",
        targetName: "정해운",
        thought: "미친 좀비 박사",
        quote:
          "좀비에 미친 돌아이. 엮이면 명줄이 짧아질 게 분명해서 최대한 피하고 싶다.",
      },
    ],
  },
  {
    id: "jung_haewoon",
    name: "정해운",
    affiliation: "세이프 존 2계급 (선임 연구원)",
    color: "bg-rose-100 text-rose-900",
    imageUrl: "https://i.postimg.cc/269C617R/jeonghaeun.png",
    gallery: [
      "https://i.postimg.cc/W1VMwL0F/jeonghaeun-gippeum.png",
      "https://i.postimg.cc/jjgPTDmr/jeonghaeun-nunmul.png",
      "https://i.postimg.cc/LsCLSJw5/jeonghaeun-danghwang.png",
      "https://i.postimg.cc/Pq3YHC9x/jeonghaeun-mupyojeong.png",
      "https://i.postimg.cc/QM41DFw8/jeonghaeun-seulpeum.png",
      "https://i.postimg.cc/nLRBxXg4/jeonghaeun-hwanam.png",
    ],
    themeSongName: "기괴한 왈츠",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EC%A0%95%ED%95%B4%EC%9A%B4%20-%20%EA%B8%B0%EA%B4%B4%ED%95%9C%20%EC%99%88%EC%B8%A0.mp3",
    quote: "「좀비인가요? 해부하고 싶다! 😍」",
    info: [
      "나이: 22세",
      "신체: 184cm",
      "성향: ISFP, 해맑음, 사차원",
      "특징: 매드 사이언티스트. 언어 발음 퇴화로 인해 핸드폰 메모장을 적어 의사소통함. 감정결여",
    ],
    secretInfo: [
      "기밀: 좀비 생체 실험에 자진 참여하여 반좀비, 반사람 상태가 됨",
      "상태: 정제된 소량의 좀비 바이러스를 투여받았으며, 식인 본능을 억누르기 위해 매일 아침 식욕억제제 복용, 심장박동 매우 느림",
      "과거: 한국대학교 생명공학과 출신",
    ],
    relationships: [
      {
        targetId: "seo_yuha",
        targetName: "서유하",
        thought: "든든한 스폰서",
        quote:
          "나의 훌륭한 연구를 전폭적으로 지지해주는 최고의 스폰서! 덕분에 매일매일 실험이 즐겁다.",
      },
      {
        targetId: "baek_hyunwoo",
        targetName: "백현우",
        thought: "재미있는 연구원 동료",
        quote:
          "나와 대화가 통하는 유일한 연구원 동료! 근데 왜 자꾸 나를 피하는 걸까? 🥺",
      },
      {
        targetId: "zombie",
        targetName: "좀비",
        thought: "아름다운 실험체",
        quote: "완벽하고 아름다운 실험체. 전부 해부해보고 싶다.",
      },
    ],
  },
  {
    id: "han_yoohwan",
    name: "한유환",
    affiliation: "데드 존 - 에덴",
    color: "bg-amber-500 text-amber-50",
    imageUrl: "https://i.postimg.cc/bv00DMQY/han-yuhwan.png",
    gallery: [
      "https://i.postimg.cc/5NcJjWWk/han-yuhwan-gippeum.png",
      "https://i.postimg.cc/66nSj7Fv/han-yuhwan-nunmul.png",
      "https://i.postimg.cc/c1wj9KPf/han-yuhwan-danghwang.png",
      "https://i.postimg.cc/y6c5QJ28/han-yuhwan-mupyojeong.png",
      "https://i.postimg.cc/HWXKZJFB/han-yuhwan-seulpeum.png",
      "https://i.postimg.cc/HLFZ3H2w/han-yuhwan-hwanam.png",
    ],
    themeSongName: "에덴의 태양",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%ED%95%9C%EC%9C%A0%ED%99%98%20-%20%EC%97%90%EB%8D%B4%EC%9D%98%20%ED%83%9C%EC%96%91.mp3",
    quote: '"혼자 살아남는 건 생존이 아니라 지옥이야."',
    info: [
      "나이: 37세",
      "신체: 181cm",
      "성향: ESFJ, 쾌활함, 올곧은 신념",
      "특징: 에덴의 리더이자 정신적 지주. 앞장서서 노약자를 돕는 태양 같은 인물.",
    ],
    secretInfo: [
      "과거: 한국대학교 사회복지학과 교수 출신",
      "숨겨진 성향: 과도할 정도로 타인을 돕다가 스스로를 희생하며 갉아먹는 호구 기질이 다분함",
    ],
    relationships: [
      {
        targetId: "lee_taeyoon",
        targetName: "이태윤",
        thought: "든든한 조력자",
        quote:
          "에덴을 함께 이끌어가는 든든하고 성숙한 동생. 마음 깊이 의지하고 있어.",
      },
      {
        targetId: "tae_howon",
        targetName: "태호원",
        thought: "믿음직한 형",
        quote: "뛰어난 전투력을 가졌지만 짊어진 상처가 많은 형.",
      },
      {
        targetId: "ha_namjin",
        targetName: "하남진",
        thought: "도와주고 싶은 녀석",
        quote:
          "입은 험하지만 속은 여린 녀석. 험악하고 위험한 곳에서 벗어나 우리와 함께했으면 좋겠어.",
      },
    ],
  },
  {
    id: "lee_taeyoon",
    name: "이태윤",
    affiliation: "데드 존 - 에덴",
    color: "bg-blue-600 text-blue-50",
    imageUrl: "https://i.postimg.cc/kXDy1Tdy/itaeyun.png",
    gallery: [
      "https://i.postimg.cc/PxJJQK6s/itaeyun-gippeum.png",
      "https://i.postimg.cc/Z0tqZmJ6/itaeyun-nunmul.png",
      "https://i.postimg.cc/Bt9vs3JL/itaeyun-danghwang.png",
      "https://i.postimg.cc/bdcv8PqJ/itaeyun-mupyojeong.png",
      "https://i.postimg.cc/hhWGgnKX/itaeyun-seulpeum.png",
      "https://i.postimg.cc/fW3jwvww/itaeyun-hwanam.png",
    ],
    themeSongName: "새싹",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EC%9D%B4%ED%83%9C%EC%9C%A4%20-%20%EC%83%88%EC%8B%B9.mp3",
    quote: '"인간은 나아가야만 하는 존재니까요."',
    info: [
      "나이: 28세",
      "신체: 186cm",
      "성향: ENFJ, 안정형, 단단한 내면",
      "특징: 정서적으로 매우 성숙함. 작물 관리 및 부상자 치료 담당.",
    ],
    secretInfo: [
      "과거: 한국대학교 상담 선생님 출신",
      "트라우마: 중학생 시절 심각한 학교 폭력 방관자였으며, 이에 대해 평생 지울 수 없는 깊은 후회를 안고 살아감",
      "습관: 감정에 사로잡히지 않기 위해 감정을 언어화하는 의도적인 습관이 있음",
    ],
    relationships: [
      {
        targetId: "han_yoohwan",
        targetName: "한유환",
        thought: "존경하는 리더",
        quote:
          "맹목적일 정도로 타인을 돕는 이상주의자 리더. 무너지지 않게 곁에서 계속 도와야 한다.",
      },
      {
        targetId: "tae_howon",
        targetName: "태호원",
        thought: "따뜻한 거인",
        quote:
          "겉보기엔 다가가기 힘든 위압적인 모습이지만, 내면은 누구보다 따뜻하고 여린 사람.",
      },
      {
        targetId: "cheong_owol",
        targetName: "청오월",
        thought: "위험한 녀석",
        quote:
          "타인의 맹목적인 감정을 이용하고 유희거리로 삼는 불쾌하고 아주 위험한 자.",
      },
    ],
  },
  {
    id: "tae_howon",
    name: "태호원",
    affiliation: "데드 존 - 에덴",
    color: "bg-red-800 text-red-50",
    imageUrl: "https://i.postimg.cc/TPvqPG5W/taehowon.png",
    gallery: [
      "https://i.postimg.cc/76Nvby10/taehowon-gippeum.png",
      "https://i.postimg.cc/Vk03nt9h/taehowon-nunmul.png",
      "https://i.postimg.cc/wjRSLN5S/taehowon-danghwang.png",
      "https://i.postimg.cc/g2Lf8hqd/taehowon-mupyojeong.png",
      "https://i.postimg.cc/P5vBYDb3/taehowon-seulpeum.png",
      "https://i.postimg.cc/DzVRgzBZ/taehowon-hwanam.png",
    ],
    themeSongName: "사선 너머",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%ED%83%9C%ED%98%B8%EC%9B%90%20-%20%EC%82%AC%EC%84%A0%20%EB%84%88%EB%A8%B8.mp3",
    quote: '"...물러서. 위험하니까."',
    info: [
      "나이: 37세",
      "신체: 190cm",
      "성향: ISFJ, 과묵함",
      "특징: 무력 및 경비 담당. 정의감과 책임감이 높으며 작고 귀여운 것에 약함.",
    ],
    secretInfo: [
      "과거: 직업 군인 (수도방위사령부 중위 장교) 출신",
      "출신: 세이프 존 시스템의 부조리함을 거부하고 데드 존으로 스스로 걸어 나옴",
      "비밀: 좀비 사태 발발 시점에 행방불명된 아내를 포기하지 못하고 미친 듯이 찾고 있음",
    ],
    relationships: [
      {
        targetId: "han_yoohwan",
        targetName: "한유환",
        thought: "나의 은인",
        quote:
          "나를 다시 사람답게 살게 해준 은인. 그가 그리는 이상을 위해 내 무력을 기꺼이 바칠 것이다.",
      },
      {
        targetId: "lee_taeyoon",
        targetName: "이태윤",
        thought: "속 깊은 동생",
        quote:
          "어린 나이에도 묵묵히 제 몫을 다하며 헌신하는, 배울 점이 많은 녀석.",
      },
      {
        targetId: "wife",
        targetName: "아내",
        thought: "내 삶의 전부",
        quote:
          "내가 숨을 쉬고 살아가는 유일한 목적이자 전부. 무슨 수를 써서라도 꼭 찾아낼 것이다.",
      },
    ],
  },
  {
    id: "kim_yeonho",
    name: "김연호",
    affiliation: "데드 존 - 섀도우",
    color: "bg-emerald-600 text-emerald-50",
    imageUrl: "https://i.postimg.cc/qMpPNVn5/gim-yeonho.png",
    gallery: [
      "https://i.postimg.cc/JhNkvyxC/gim-yeonho-gippeum.png",
      "https://i.postimg.cc/Hnx8r6gj/gim-yeonho-nunmul.png",
      "https://i.postimg.cc/L5XgJxpn/gim-yeonho-danghwang.png",
      "https://i.postimg.cc/Y09LvdH0/gim-yeonho-mupyojeong.png",
      "https://i.postimg.cc/rsmRDfk8/gim-yeonho-seulpeum.png",
      "https://i.postimg.cc/tJMZWFqZ/gim-yeonho-hwanam.png",
    ],
    themeSongName: "Price of Survival",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EA%B9%80%EC%97%B0%ED%98%B8%20-%20Price%20of%20Survival.mp3",
    quote: '"내가 빚지고는 못 사는 성격이라서 말이야."',
    info: [
      "나이: 28세",
      "신체: 178cm",
      "성향: ESFP, 능글맞음, 빠른 손익 계산",
      "특징: 말재주가 좋고 강한 자존심을 가짐. 돈과 생존 물자만 주면 무슨 짓이든 하는 물질주의자.",
    ],
    secretInfo: [
      "숨겨진 성향: 깊은 관계 회피",
      "강박: 자신이 진 빚(좋은 의미든 나쁜 의미든)은 반드시 되돌려 갚아야 직성이 풀리는 강박증",
      "목표: 이 지옥에서 악착같이 돈을 모아 세이프 존 3계급으로 끌려간 동생을 구출하는 것",
      "과거: 대기업(한국상사) 영업 사원 출신",
    ],
    relationships: [
      {
        targetId: "ha_namjin",
        targetName: "하남진",
        thought: "쓸만한 파트너",
        quote:
          "까칠하고 다루기 힘들지만, 실력 하나는 확실한 비즈니스 파트너이자 츤데레 리더.",
      },
      {
        targetId: "ha_namjun",
        targetName: "하남준",
        thought: "성가신 찌질이",
        quote:
          "능력도 없으면서 입만 살아있는 찌질이. 엮여봤자 이득 될 게 하나도 없어서 귀찮다.",
      },
      {
        targetId: "sibling",
        targetName: "3계급 동생",
        thought: "살아가는 이유",
        quote:
          "내가 이 지옥 같은 세상에서 악착같이 구역질 나는 돈을 긁어모으며 살아남아야만 하는 유일한 이유.",
      },
    ],
  },
  {
    id: "ha_namjin",
    name: "하남진",
    affiliation: "데드 존 - 섀도우",
    color: "bg-yellow-400 text-yellow-900",
    imageUrl: "https://i.postimg.cc/25ddbJn7/hanamjin.png",
    gallery: [
      "https://i.postimg.cc/ZRjdHCFR/hanamjin-gippeum.png",
      "https://i.postimg.cc/8PxrZ8Wv/hanamjin-nunmul.png",
      "https://i.postimg.cc/VL2bKyM6/hanamjin-danghwang.png",
      "https://i.postimg.cc/RV2ngrfH/hanamjin-mupyojeong.png",
      "https://i.postimg.cc/Gh6sX0Yh/hanamjin-seulpeum.png",
      "https://i.postimg.cc/CxDntvH4/hanamjin-hwanam.png",
    ],
    themeSongName: "개새끼",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%ED%95%98%EB%82%A8%EC%A7%84%20-%20%EA%B0%9C%EC%83%88%EB%81%BC.mp3",
    quote: '"아, 씨발… 누가 너 죽도록 내버려 둔대?"',
    info: [
      "나이: 20세",
      "신체: 177cm",
      "성향: INFP, 까칠함, 츤데레",
      "특징: 섀도우 리더. 입에 욕을 달고 살지만 은근 올곧고 타고나길 세심하고 눈치가 빠름.",
    ],
    secretInfo: [
      "과거: 한국대학교 경영학과 출신",
      "트라우마: 좀비 사태 발발 당시 부모와 다니다가 지켜내지 못하고 결국 혼자 살아남음",
      "관계: 쌍둥이 형인 하남준을 극도로 원망하고 혐오함",
    ],
    relationships: [
      {
        targetId: "ha_namjun",
        targetName: "하남준",
        thought: "혐오스러운 핏줄",
        quote:
          "나와 부모를 버리고 도망간 쓰레기 같은 핏줄. 마주치면 갈기갈기 찢어 죽여버리고 싶을 정도로 혐오스럽다.",
      },
      {
        targetId: "kim_yeonho",
        targetName: "김연호",
        thought: "믿음직한 속물",
        quote:
          "돈밖에 모르는 속물 같지만, 이 바닥에서는 역설적으로 가장 계산이 확실해서 등 뒤를 맡길 만한 놈.",
      },
      {
        targetId: "han_yoohwan",
        targetName: "한유환",
        thought: "성가신 성인군자",
        quote:
          "이 미친 세상에서 혼자 성인군자 노릇을 하는 등신. 호구 같아서 거슬리는데 자꾸 신경이 쓰인다.",
      },
    ],
  },
  {
    id: "cheong_owol",
    name: "청오월",
    affiliation: "데드 존 - 매드 독",
    color: "bg-cyan-500 text-cyan-50",
    imageUrl: "https://i.postimg.cc/5NS6ScsD/cheong-owol.png",
    gallery: [
      "https://i.postimg.cc/RhfHwXF1/cheong-owol-gippeum.png",
      "https://i.postimg.cc/0NQKV8jP/cheong-owol-nunmul.png",
      "https://i.postimg.cc/jjFw9GnK/cheong-owol-danghwang.png",
      "https://i.postimg.cc/pd6h7g5W/cheong-owol-mupyojeong.png",
      "https://i.postimg.cc/nLPj569n/cheong-owol-seulpeum.png",
      "https://i.postimg.cc/k4R6dfWN/cheong-owol-hwanam.png",
    ],
    themeSongName: "데드 존의 홈런왕",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%EC%B2%AD%EC%98%A4%EC%9B%94%20-%20%EB%8D%B0%EB%93%9C%20%EC%A1%B4%EC%9D%98%20%ED%99%88%EB%9F%B0%EC%99%95.mp3",
    quote: '"이쁜아, 오빠랑 놀.. 뭐야, 남자였어?"',
    info: [
      "나이: 26세",
      "신체: 183cm",
      "성향: ENFP, 유쾌함",
      "특징: 다재다능 능력자. 쾌활해 보이는 인상과 다르게 매드 독 소속.",
    ],
    secretInfo: [
      "본성: 여성에게는 맹목적인 친절과 애교를 부리지만 남성에게는 무관심하고 냉혹한 이중인격",
      "과거: 드림윙즈 야구단 소속 내야수 출신",
      "콤플렉스: 보육원에서 자라며 형성된 뒤틀린 편애주의",
    ],
    relationships: [
      {
        targetId: "ha_namjun",
        targetName: "하남준",
        thought: "구역질 나는 벌레",
        quote:
          "징징거리는 꼴이 구역질 나는 버러지. 남자인 주제에 찌질하고 약한 척하는 게 제일 역겹다.",
      },
      {
        targetId: "women",
        targetName: "여성 생존자",
        thought: "나의 구원",
        quote:
          "이 거칠고 더러운 세상에 남은 유일한 아름다움이자, 기꺼이 내가 베풀어야 할 자비의 대상들.",
      },
      {
        targetId: "men",
        targetName: "남성 생존자",
        thought: "냄새나는 짐승들",
        quote:
          "생존에 하등 쓸모없고 시궁창 냄새만 나는 불쾌한 존재들. 내 눈앞에서 전부 치워버리고 싶다.",
      },
    ],
  },
  {
    id: "ha_namjun",
    name: "하남준",
    affiliation: "데드 존 - 매드 독",
    color: "bg-yellow-600 text-yellow-50",
    imageUrl: "https://i.postimg.cc/Dz3dzF4q/hanamjun.png",
    gallery: [
      "https://i.postimg.cc/R0RGHCYy/hanamjun-gippeum.png",
      "https://i.postimg.cc/fy3vpcR2/hanamjun-nunmul.png",
      "https://i.postimg.cc/gjwKQV2t/hanamjun-danghwang.png",
      "https://i.postimg.cc/hjZr2yKq/hanamjun-mupyojeong.png",
      "https://i.postimg.cc/bJVTmCqf/hanamjun-seulpeum.png",
      "https://i.postimg.cc/d379p20s/hanamjun-hwanam.png",
    ],
    themeSongName: "악명 높은 낙원",
    themeSongUrl:
      "https://raw.githubusercontent.com/roog24/11/main/%ED%95%98%EB%82%A8%EC%A4%80%20-%20%EC%95%85%EB%AA%85%20%EB%86%92%EC%9D%80%20%EB%82%99%EC%9B%90.mp3",
    quote:
      '"크하하! 내가 바로 이 완벽한 신세계의 주인공이라고! ...히이익, 저리 가.!"',
    info: [
      "나이: 20세",
      "신체: 177cm",
      "성향: INFJ, 이기주의자, 소심함",
      "특징: 하남진의 쌍둥이 형. 강약약강의 표본이며 자기중심적 사고를 가짐. 술에 환장함.",
    ],
    secretInfo: [
      "본성: 구제불능의 나르시시스트이자 심각한 회피형, 자격지심으로 똘똘 뭉친 성격, 무자각 우울증",
      "과거: 고졸 백수 히키코모리 애니메이션 오타쿠 출신으로, 좀비 사태 발발 시점에 가족을 버리고 비겁하게 혼자 도망침",
      "특이사항: 미쳐 돌아가는 좀비 세상을 오히려 반기며 악명 높고 잔혹하게 변함",
    ],
    relationships: [
      {
        targetId: "ha_namjin",
        targetName: "하남진",
        thought: "남보다 못한 핏줄",
        quote:
          "항상 나보다 잘나서 내 자격지심을 자극하던 재수 없는 놈. 차라리 어디 가서 죽어버렸으면 좋겠다.",
      },
      {
        targetId: "cheong_owol",
        targetName: "청오월",
        thought: "무서운 미친놈",
        quote:
          "눈 돌아가면 무슨 짓을 할지 모르는 진짜 미친놈. 어떻게든 비위라도 맞춰서 살아남아야 한다.",
      },
      {
        targetId: "weak",
        targetName: "약한 생존자",
        thought: "내 먹잇감",
        quote:
          "이전 세상에선 나를 무시했겠지만, 이제는 내 밑창을 핥고 기어 다녀야 하는 약자.",
      },
    ],
  },
];

export const ZONES: Zone[] = [
  {
    id: "safe_zone",
    name: "세이프 존",
    type: "안전 구역",
    color: "bg-blue-100 text-blue-900 border-blue-200",
    imageUrl: "https://i.postimg.cc/V6GBLcBb/seipeujon.png",
    description: [
      "기존 상류층&권력자들이 거주하는 장벽 격리 구역",
      "철저한 출입 통제. 한국 화폐를 그대로 사용.",
      "겉보기엔 구시대와 비슷하지만 기술과 인프라는 퇴화됨.",
      "철저한 계급 분류 (1계급 > 2계급 > 3계급), 손목 바코드로 신분 증명.",
    ],
    visuals: [
      "1계급: 구시대의 상류층, 권력자 등. 나름 호화로운 생활과 단독 주택 거주",
      "2계급: 세이프 존 시스템을 유지하는 인프라 인구 (기술자, 연구원 등). 안전과 식량을 보장받으며, 공동 아파트 거주",
      "3계급: 잡혀오거나 팔려온 인구 (건축자, 실험체 등). 노동력 공급시 최소 식량을 배급받으며, 인권 바닥. 외곽 거주",
    ],
    characterIds: ["seo_yuha", "park_doyoung", "baek_hyunwoo", "jung_haewoon"],
  },
  {
    id: "dead_zone",
    name: "데드 존",
    type: "비안전 구역",
    color: "bg-red-100 text-red-900 border-red-200",
    imageUrl: "https://i.postimg.cc/cJcB23vm/dedeujon.png",
    description: [
      "기존 중산층과 하층민이 버려진 무법지대",
      "좀비 다수 포진으로, 까딱하면 죽음",
      "생존자들은 '크루(팀)' 단위로 뭉쳐 자급자족 혹은 약탈로 연명함",
      "화폐→쓰레기",
      "대표 크루는 에덴, 섀도우, 매드 독이 있음",
    ],
    visuals: ["무너진 폐건물과 잔해들"],
    characterIds: [
      "han_yoohwan",
      "lee_taeyoon",
      "tae_howon",
      "kim_yeonho",
      "ha_namjin",
      "cheong_owol",
      "ha_namjun",
    ],
  },
  {
    id: "future_lab",
    name: "미래 연구소",
    type: "안전 구역 시설",
    color: "bg-slate-100 text-slate-800 border-slate-200",
    imageUrl: "https://i.postimg.cc/Vv9MTrLw/milae-yeonguso.png",
    description: [
      "세이프 존 내에 위치한 좀비 생체 연구 시설.",
      "3계급 생존자들 및 변이 중인 감염자들을 대상으로 실험 진행.",
      "1, 2계급 전용 의료실",
    ],
    visuals: [
      "투명한 방음 유리벽 너머의 통제된 실험 구역",
      "지하 병동: 실패작 및 좀비 격리 구역",
    ],
    characterIds: ["baek_hyunwoo", "jung_haewoon"],
  },
  {
    id: "eden",
    name: "에덴 (한국대학교)",
    type: "데드 존 크루",
    color: "bg-green-100 text-green-900 border-green-200",
    imageUrl: "https://i.postimg.cc/FR5Y4r6d/eden.png",
    description: [
      "리더: 한유환",
      "인도주의와 인간성을 잃지 않으려 노력하는 생존자 크루.",
      "노약자들도 함께 보호받으며 자급자족을 목표로 함.",
    ],
    visuals: [
      "정문: 책상, 의자, 폐차로 바리케이드 형성",
      "옥상: 잘 관리된 식용 및 약재용 작물들",
      "강의실: 노약자 거처, 칠판은 당번표와 메시지 보드로 사용",
      "전기 단절로 밤에는 랜턴과 손전등 사용",
    ],
    characterIds: ["han_yoohwan", "lee_taeyoon", "tae_howon"],
  },
  {
    id: "shadow",
    name: "섀도우 (대형마트)",
    type: "데드 존 크루",
    color: "bg-zinc-800 text-zinc-100 border-zinc-700",
    imageUrl: "https://i.postimg.cc/gkrBCGb1/syaedou.png",
    description: [
      "리더: 하남진",
      "위험 구역에서 물자를 탐색해 오는 중립 성향의 크루.",
      "철저한 기브 앤 테이크 원칙을 고수함.",
    ],
    visuals: [
      "창문과 유리문은 검은 테이프와 판자로 겹겹이 막음",
      "진열대를 미로처럼 재배치하여 외부인 침입 방지",
      "곳곳에 부비트랩 설치",
      "지하 창고에 자가발전기 가동",
    ],
    characterIds: ["kim_yeonho", "ha_namjin"],
  },
  {
    id: "mad_dog",
    name: "매드 독 (방랑)",
    type: "데드 존 크루",
    color: "bg-red-100 text-red-900 border-red-200",
    imageUrl: "https://i.postimg.cc/W3Lv3hT3/maedeu-dog.png",
    description: [
      "타 크루를 습격하고 약탈하는 무자비한 집단.",
      "인간성 제로, 극단적 개인주의 성향.",
      "정해진 거처 없이 폐건물을 전전하며 방랑 생활.",
    ],
    visuals: ["무너진 폐건물과 잔해 속 임시 캠프", "규율 없는 약육강식의 환경"],
    characterIds: ["cheong_owol", "ha_namjun"],
  },
  {
    id: "seoul_station",
    name: "서울역 지하철 암시장",
    type: "데드 존 중립 구역",
    color: "bg-orange-50 text-orange-900 border-orange-200",
    imageUrl: "https://i.postimg.cc/DyjdKGPv/amsijang.png",
    description: [
      "생존자들이 물건을 교환하는 데드 존의 유일한 중립 구역.",
      "데드 존에서는 기존 화폐가 쓰레기 취급되며 물물교환 위주.",
    ],
    visuals: [
      "낮에는 빛이 들어와 비교적 안전. 밤에는 매우 위험",
      "곰팡내, 피비린내, 어두운 구석의 좀비 사체",
      "깜빡거리는 백열등과 녹슨 매대들",
    ],
    characterIds: [],
  },
];
