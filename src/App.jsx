import React, { useState } from 'react';
import TravelMap from './components/TravelMap';

const itinerary = [
  {
    date: '04월 24일 (금)',
    highlight: null,
    events: [
      { time: '17:10', title: '청주 공항 출발', location: '청주국제공항', details: '아시아나항공 이용', icon: 'plane', position: { lat: 36.7161, lng: 127.4988 } },
      { time: '18:20', title: '제주 공항 도착', location: '제주국제공항', details: null, icon: 'pin', position: { lat: 33.5113, lng: 126.4930 } },
      { time: '19:30', title: '제주 팰리스 호텔 체크인', location: '제주 제주시 중앙로 9', details: '싱글트윈 객실', icon: 'hotel', position: { lat: 33.5152, lng: 126.5269 } },
      { time: '20:00', title: '저녁 식사', location: '제주 제주시 탑동 인근', details: '현지 식당 이용', icon: 'food', position: { lat: 33.5173, lng: 126.5245 } }
    ]
  },
  {
    date: '04월 25일 (토)',
    highlight: '💍 결혼식 참석 (메인 일정)',
    events: [
      { time: '08:00', title: '렌터카 인수', location: '자유렌터카', details: '대여 차량 확인 및 인수', icon: 'car', position: { lat: 33.5062, lng: 126.4935 } },
      { time: '08:30', title: '이동 및 대기', location: '제주 시내', details: '식장 이동 전 준비', icon: 'users', position: { lat: 33.5065, lng: 126.4920 } },
      { time: '10:00-18:00', title: '결혼식 참석 및 피로연', location: '서귀포시 예식장', details: '예식 참석 및 축하 인사 (종일 일정)', icon: 'heart', type: 'main', position: { lat: 33.2450, lng: 126.5620 } },
      { time: '18:30', title: '더 퍼스트70 호텔 체크인', location: '서귀포시 명동로 46', details: '슈페리어 객실', icon: 'hotel', position: { lat: 33.2482, lng: 126.5645 } }
    ]
  },
  {
    date: '04월 26일 (일)',
    highlight: '🥪 산방산 뷰 브런치 & 서쪽 미식 투어',
    events: [
      { time: '10:00', title: '호텔 체크아웃', location: '서귀포 시내', details: '서쪽 안덕 방면으로 이동', icon: 'clock', position: { lat: 33.2482, lng: 126.5645 } },
      { time: '10:30', title: '브런치: 위이 (wiee)', location: '서귀포시 안덕면 신화역사로682번길 12', details: '산방산 뷰 명당에서 즐기는 프렌치 토스트와 커피', icon: 'map', position: { lat: 33.2750, lng: 126.3450 } },
      { time: '13:30', title: '점심: 수영밥상 (한림)', location: '제주시 한림읍 한림상로 123', details: '현지인들이 줄 서서 먹는 고사리 육개장 전문점', icon: 'food', position: { lat: 33.4110, lng: 126.2650 } },
      { time: '16:00', title: '협재 해변 산책', location: '한림읍 협재리', details: '에메랄드빛 바다와 비양도 전망 감상', icon: 'pin', position: { lat: 33.3950, lng: 126.2420 } },
      { time: '18:30', title: '저녁: 제주 뽈살집 한림', location: '제주시 한림읍 한림로 703', details: '특수부위 뽈살 전문점으로 한림에서 가장 유명한 로컬 맛집', icon: 'food', position: { lat: 33.4116, lng: 126.2642 } },
      { time: '20:00', title: '협재 아루미호텔 체크인', location: '제주시 한림읍 한림로 341', details: '협재 해변 인근의 깔끔한 가성비 호텔', icon: 'hotel', position: { lat: 33.3934, lng: 126.2415 } }
    ]
  },
  {
    date: '04월 27일 (월)',
    highlight: '☕ 애월 해안도로 카페 드라이브',
    events: [
      { time: '10:00', title: '호텔 체크아웃', location: '협재 아루미호텔', details: '서쪽 애월 방면으로 드라이브 이동', icon: 'clock', position: { lat: 33.3934, lng: 126.2415 } },
      { time: '11:00', title: '아점: 바다 속 고등어 쌈밥', location: '제주시 애월읍 일주서로', details: '현지인들이 인정하는 매콤달콤 고등어 조림', icon: 'food', position: { lat: 33.4750, lng: 126.3550 } },
      { time: '13:00', title: '카페: 노을리 (애월)', location: '제주시 애월읍 애월해안로', details: '탁 트인 오션뷰와 시그니처 디저트 연탄빵', icon: 'map', position: { lat: 33.4820, lng: 126.3680 } },
      { time: '15:30', title: '카페: 인그리드', location: '제주시 테우해안로 132', details: '이호테우 해변 앞 랜드마크 디자인 카페', icon: 'map', position: { lat: 33.4980, lng: 126.4520 } },
      { time: '17:30', title: '막간 식사: 김희선 제주 몸국', location: '제주공항 인근', details: '여행의 마무리를 든든하게 해주는 진한 몸국', icon: 'food', position: { lat: 33.5100, lng: 126.4900 } },
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
    <div className="bg-white text-slate-900 min-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-slate-100 shrink-0 z-30">
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">제주 트래블 캔버스</h1>
            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">2026.04.24 - 04.27 · 3박 4일</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentTab('itinerary')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentTab === 'itinerary' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              일정
            </button>
            <button
              onClick={() => setCurrentTab('budget')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentTab === 'budget' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              경비
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {currentTab === 'itinerary' ? (
          <>
            {/* Top Fixed Map Area */}
            <div className="h-[35vh] md:h-[45vh] w-full relative z-10 border-b border-slate-100 shadow-sm">
              <TravelMap 
                itinerary={itinerary} 
                currentDay={currentDay} 
                showAllDays={false}
              />
              
              {/* Day Selector Overlay */}
              <div className="absolute bottom-4 left-0 right-0 z-[400] px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 justify-center max-w-lg mx-auto">
                  {itinerary.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentDay(idx)}
                      className={`flex-shrink-0 px-5 py-2 rounded-2xl text-xs font-bold transition-all backdrop-blur-md shadow-lg border ${
                        currentDay === idx
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white/90 text-slate-600 border-white'
                      }`}
                    >
                      Day {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50">
              <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-600 font-black text-sm uppercase">Day {currentDay + 1}</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">{itinerary[currentDay].date}</h2>
                  {itinerary[currentDay].highlight && (
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">"{itinerary[currentDay].highlight}"</p>
                  )}
                </div>

                <div className="space-y-4">
                  {itinerary[currentDay].events.map((event, idx) => (
                    <div key={idx} className="group flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                          event.type === 'main' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-100'
                        }`}>
                          <Icon name={event.icon} className={event.type === 'main' ? 'text-white' : 'text-slate-500'} />
                        </div>
                        {idx !== itinerary[currentDay].events.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                            {event.time}
                          </span>
                          {event.type === 'main' && (
                            <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">KEY EVENT</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">{event.title}</h3>
                        {event.location && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                            <Icon name="pin" className="w-3 h-3 text-slate-400" />
                            <span className="font-medium">{event.location}</span>
                          </div>
                        )}
                        {event.details && (
                          <p className="text-[11px] leading-relaxed text-slate-500 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            {event.details}
                          </p>
                        )}
                      </div>
                    </div>
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
