import React, { useState } from 'react';
import TravelMap from './components/TravelMap';

const itinerary = [
  {
    date: '04월 24일 (금)',
    highlight: '✈️ 제주 도착 및 첫날 만찬',
    events: [
      { time: '17:10', title: '청주 공항 출발', location: '청주국제공항', details: '아시아나항공 이용', icon: 'plane', position: { lat: 36.7161, lng: 127.4988 } },
      { time: '18:20', title: '제주 공항 도착', location: '제주국제공항', details: null, icon: 'pin', position: { lat: 33.5113, lng: 126.4930 }, travel: { type: 'car', duration: '20분' } },
      { time: '19:30', title: '제주 팰리스 호텔 체크인', location: '제주 제주시 중앙로 9', details: '싱글트윈 객실', icon: 'hotel', position: { lat: 33.5152, lng: 126.5269 }, travel: { type: 'walk', duration: '5분' } },
      { time: '20:00', title: '저녁 식사', location: '제주 제주시 탑동 인근', details: '현지 식당 이용', icon: 'food', position: { lat: 33.5173, lng: 126.5245 } }
    ]
  },
  {
    date: '04월 25일 (토)',
    highlight: '💍 결혼식 참석 (메인 일정)',
    events: [
      { time: '08:00', title: '렌터카 인수', location: '자유렌터카', details: '대여 차량 확인 및 인수', icon: 'car', position: { lat: 33.5062, lng: 126.4935 }, travel: { type: 'car', duration: '10분' } },
      { time: '08:30', title: '이동 및 대기', location: '제주 시내', details: '식장 이동 전 준비', icon: 'users', position: { lat: 33.5065, lng: 126.4920 }, travel: { type: 'car', duration: '50분' } },
      { time: '10:00-18:00', title: '결혼식 참석 및 피로연', location: '서귀포시 예식장', details: '예식 참석 및 축하 인사 (종일 일정)', icon: 'heart', type: 'main', position: { lat: 33.2450, lng: 126.5620 }, travel: { type: 'car', duration: '5분' } },
      { time: '18:30', title: '더 퍼스트70 호텔 체크인', location: '서귀포시 명동로 46', details: '슈페리어 객실', icon: 'hotel', position: { lat: 33.2482, lng: 126.5645 } }
    ]
  },
  {
    date: '04월 26일 (일)',
    highlight: '🥪 산방산 뷰 브런치 & 서쪽 미식 투어',
    events: [
      { time: '10:00', title: '호텔 체크아웃', location: '서귀포 시내', details: '서쪽 안덕 방면으로 이동', icon: 'clock', position: { lat: 33.2482, lng: 126.5645 }, travel: { type: 'car', duration: '30분' } },
      { time: '10:30', title: '브런치: 위이 (wiee)', location: '서귀포시 안덕면 신화역사로682번길 12', details: '산방산 뷰 명당에서 즐기는 프렌치 토스트와 커피', icon: 'map', position: { lat: 33.2750, lng: 126.3450 }, travel: { type: 'car', duration: '45분' } },
      { time: '13:30', title: '점심: 수영밥상 (한림)', location: '제주시 한림읍 한림상로 123', details: '현지인들이 줄 서서 먹는 고사리 육개장 전문점', icon: 'food', position: { lat: 33.4110, lng: 126.2650 }, travel: { type: 'car', duration: '15분' } },
      { time: '16:00', title: '협재 해변 산책', location: '한림읍 협재리', details: '에메랄드빛 바다와 비양도 전망 감상', icon: 'pin', position: { lat: 33.3950, lng: 126.2420 }, travel: { type: 'car', duration: '10분' } },
      { time: '18:30', title: '저녁: 제주 뽈살집 한림', location: '제주시 한림읍 한림로 703', details: '특수부위 뽈살 전문점으로 한림에서 가장 유명한 로컬 맛집', icon: 'food', position: { lat: 33.4116, lng: 126.2642 }, travel: { type: 'car', duration: '10분' } },
      { time: '20:00', title: '협재 아루미호텔 체크인', location: '제주시 한림읍 한림로 341', details: '협재 해변 인근의 깔끔한 가성비 호텔', icon: 'hotel', position: { lat: 33.3934, lng: 126.2415 } }
    ]
  },
  {
    date: '04월 27일 (월)',
    highlight: '☕ 애월 해안도로 카페 드라이브',
    events: [
      { time: '10:00', title: '호텔 체크아웃', location: '협재 아루미호텔', details: '서쪽 애월 방면으로 드라이브 이동', icon: 'clock', position: { lat: 33.3934, lng: 126.2415 }, travel: { type: 'car', duration: '25분' } },
      { time: '11:00', title: '아점: 바다 속 고등어 쌈밥', location: '제주시 애월읍 일주서로', details: '현지인들이 인정하는 매콤달콤 고등어 조림', icon: 'food', position: { lat: 33.4750, lng: 126.3550 }, travel: { type: 'car', duration: '10분' } },
      { time: '13:00', title: '카페: 노을리 (애월)', location: '제주시 애월읍 애월해안로', details: '탁 트인 오션뷰와 시그니처 디저트 연탄빵', icon: 'map', position: { lat: 33.4820, lng: 126.3680 }, travel: { type: 'car', duration: '25분' } },
      { time: '15:30', title: '카페: 인그리드', location: '제주시 테우해안로 132', details: '이호테우 해변 앞 랜드마크 디자인 카페', icon: 'map', position: { lat: 33.4980, lng: 126.4520 }, travel: { type: 'car', duration: '15분' } },
      { time: '17:30', title: '막간 식사: 김희선 제주 몸국', location: '제주공항 인근', details: '여행의 마무리를 든든하게 해주는 진한 몸국', icon: 'food', position: { lat: 33.5100, lng: 126.4900 }, travel: { type: 'car', duration: '10분' } },
      { time: '19:45', title: '제주 공항 출발', location: '제주국제공항', details: '아시아나항공 이용', icon: 'plane', position: { lat: 33.5113, lng: 126.4930 } }
    ]
  }
];

const budgetItems = [
  { category: '항공', title: '청주 ↔ 제주 왕복 (2인)', amount: 284800, date: '04.24-04.27', icon: 'plane' },
  { category: '숙소', title: '숙박 총계 (3박, 1실 2인)', amount: 205611, date: '04.24-04.27', icon: 'hotel' },
  { category: '렌터카', title: '렌터카 대여 (4일)', amount: 85000, date: '04.25', icon: 'car' },
  { category: '식비', title: '예상 식비 (2인 4일)', amount: 350000, date: '04.24-04.27', icon: 'food' },
  { category: '기타', title: '유류비 및 기타 경비', amount: 50000, date: '04.24-04.27', icon: 'budget' },
];

const Icon = ({ name, className = "text-slate-500" }) => {
  const icons = {
    plane: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    hotel: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    car: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l1-2h12l1 2M3 10h18M4 14h1m12 0h1M4 10v7a1 1 0 001 1h14a1 1 0 001-1v-7M7 18v1m10-1v1" />
      </svg>
    ),
    walk: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    pin: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    food: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    heart: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    alert: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    itinerary: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    budget: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    map: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    share: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  };
  return icons[name] || icons.pin;
};

function App() {
  const [currentTab, setCurrentTab] = useState('itinerary');
  const [currentDay, setCurrentDay] = useState(0);

  const totalAmount = budgetItems.reduce((acc, item) => acc + item.amount, 0);

  const handleDaySelect = (dayIdx) => {
    setCurrentDay(dayIdx);
    setCurrentTab('itinerary');
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-slate-100 shrink-0 z-30">
        <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
              <Icon name="itinerary" className="text-white w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none mb-1">제주 트래블 캔버스</h1>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">2026.04.24 - 04.27 · 3박 4일</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setCurrentTab('itinerary')}
              className={`px-5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                currentTab === 'itinerary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              일정
            </button>
            <button
              onClick={() => setCurrentTab('budget')}
              className={`px-5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                currentTab === 'budget' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              경비
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/30">
        {currentTab === 'itinerary' ? (
          <>
            {/* Top Fixed Map Area */}
            <div className="h-[38vh] md:h-[42vh] w-full relative z-10 border-b border-slate-100/50">
              <TravelMap 
                itinerary={itinerary} 
                currentDay={currentDay} 
                showAllDays={false}
              />
              
              {/* Day Selector Overlay - Re-styled for better visibility */}
              <div className="absolute bottom-6 left-0 right-0 z-[400] px-4">
                <div className="flex gap-2.5 justify-center max-w-lg mx-auto bg-white/60 backdrop-blur-xl p-2 rounded-[24px] shadow-2xl border border-white/40">
                  {itinerary.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentDay(idx)}
                      className={`flex-shrink-0 px-6 py-2.5 rounded-[18px] text-[11px] font-black transition-all duration-300 ${
                        currentDay === idx
                          ? 'bg-slate-900 text-white shadow-xl scale-105'
                          : 'bg-white/40 text-slate-500 hover:bg-white/80'
                      }`}
                    >
                      DAY {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
              <div className="max-w-2xl mx-auto px-6 py-10 pb-40">
                <div className="mb-10 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100">
                    Day {currentDay + 1} Itinerary
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{itinerary[currentDay].date}</h2>
                  {itinerary[currentDay].highlight && (
                    <div className="inline-flex items-center gap-2 bg-slate-100/50 px-4 py-1.5 rounded-full border border-slate-100">
                      <Icon name="heart" className="w-3 h-3 text-pink-500" />
                      <p className="text-slate-500 text-[11px] font-bold tracking-tight">{itinerary[currentDay].highlight}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {itinerary[currentDay].events.map((event, idx) => (
                    <React.Fragment key={idx}>
                      <div className="group relative flex gap-6">
                        {/* Timeline Dot/Icon */}
                        <div className="relative z-10">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 border-4 border-white group-hover:scale-110 ${
                            event.type === 'main' 
                              ? 'bg-slate-900 text-white' 
                              : 'bg-slate-50 text-slate-500'
                          }`}>
                            <Icon name={event.icon} className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-black text-blue-500 tracking-tighter">
                              {event.time}
                            </span>
                            {event.type === 'main' && (
                              <span className="text-[9px] font-black text-slate-900 bg-amber-400 px-2.5 py-1 rounded-lg shadow-sm animate-bounce">MUST VISIT</span>
                            )}
                          </div>
                          <div className="bg-white p-5 rounded-[28px] border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                            <h3 className="text-base font-black text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                            {event.location && (
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3">
                                <Icon name="pin" className="w-3 h-3" />
                                <span className="font-semibold">{event.location}</span>
                              </div>
                            )}
                            {event.details && (
                              <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                                <p className="text-[11px] leading-relaxed text-slate-500 font-medium tracking-tight">
                                  {event.details}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Travel Info Indicator */}
                      {event.travel && (
                        <div className="ml-10 flex items-center gap-2 py-2">
                          <div className="w-px h-8 bg-slate-100 ml-[9px]"></div>
                          <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-1.5 rounded-full border border-blue-100/30">
                            <Icon name={event.travel.type === 'car' ? 'car' : 'walk'} className="w-3 h-3 text-blue-500" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                              약 {event.travel.duration} 이동
                            </span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Budget View (Full Screen Scroll) */
          <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50">
            <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
              <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Total Estimated Budget</p>
                <h2 className="text-4xl font-black mb-1 leading-none">{totalAmount.toLocaleString()}원</h2>
                <span className="inline-block bg-blue-500/20 text-blue-400 text-[10px] px-3 py-1 rounded-full font-bold">2인 기준 예상 경비</span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Category Details</h3>
                {budgetItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 shadow-inner">
                      <Icon name={item.icon} className="text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mb-0.5">{item.category}</p>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-slate-900">{item.amount.toLocaleString()}원</p>
                      <p className="text-[9px] text-slate-400 font-medium">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Quick Navigation (Optional) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-4 py-2 flex gap-4">
        <button className="p-3 text-slate-400 hover:text-blue-600 transition-colors">
          <Icon name="share" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default App;
