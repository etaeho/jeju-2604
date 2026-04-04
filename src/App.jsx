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
    highlight: '🌊 제주 동쪽 해안 투어',
    events: [
      { time: '10:00', title: '호텔 체크아웃', location: '더 퍼스트70 로비', details: '정산 및 체크아웃 완료', icon: 'clock', position: { lat: 33.2482, lng: 126.5645 } },
      { time: '11:00', title: '정방폭포', location: '서귀포시 칠십리로', details: '바다로 직접 떨어지는 해안 폭포 감상', icon: 'pin', position: { lat: 33.2448, lng: 126.5718 } },
      { time: '13:00', title: '쇠소깍', location: '서귀포시 쇠소깍로', details: '민물과 바닷물이 만나는 비경 감상 및 조각배 체험', icon: 'map', position: { lat: 33.2520, lng: 126.6219 } },
      { time: '16:00', title: '성산 일출봉', location: '서귀포시 성산읍 일출로', details: '유네스코 세계자연유산 탐방 (왕복 50분)', icon: 'pin', position: { lat: 33.4585, lng: 126.9422 } },
      { time: '18:30', title: '성산 숙소 체크인', location: '성산읍 고성리 인근', details: '성산 뷰 호텔 또는 플레이스 캠프 제주', icon: 'hotel', position: { lat: 33.4500, lng: 126.9200 } }
    ]
  },
  {
    date: '04월 27일 (월)',
    highlight: '✈️ 해안도로 드라이브 및 귀가',
    events: [
      { time: '09:00', title: '섭지코지', location: '서귀포시 성산읍 섭지코지로', details: '4월 유채꽃과 푸른 바다 산책로', icon: 'pin', position: { lat: 33.4310, lng: 126.9284 } },
      { time: '11:00', title: '월정리 해변', location: '제주시 구좌읍 월정리', details: '에메랄드빛 바다와 카페 거리 드라이브', icon: 'map', position: { lat: 33.5550, lng: 126.7950 } },
      { time: '14:00', title: '함덕 해수욕장', location: '제주시 조천읍 함덕리', details: '서우봉 산책 및 마지막 바다 감상', icon: 'pin', position: { lat: 33.5432, lng: 126.6692 } },
      { time: '18:00', title: '렌터카 반납', location: '제주공항 인근 반납소', details: '차량 검수 및 셔틀 이용', icon: 'car', position: { lat: 33.5062, lng: 126.4935 } },
      { time: '19:45', title: '제주 공항 출발', location: '제주국제공항', details: '아시아나항공 이용', icon: 'plane', position: { lat: 33.5113, lng: 126.4930 } }
    ]
  }
];

const budgetItems = [
  { category: '항공', title: '청주 → 제주 (아시아나)', amount: 74700, date: '04.24', icon: 'plane' },
  { category: '항공', title: '제주 → 청주 (아시아나)', amount: 67700, date: '04.27', icon: 'plane' },
  { category: '숙소', title: '제주 팰리스 호텔 (1박)', amount: 76800, date: '04.24', icon: 'hotel' },
  { category: '숙소', title: '더 퍼스트70 호텔 (1박)', amount: 53811, date: '04.25', icon: 'hotel' },
  { category: '숙소', title: '성산 인근 숙소 (1박)', amount: 65000, date: '04.26', icon: 'hotel' },
  { category: '렌터카', title: '렌터카 대여 (4일)', amount: 85000, date: '04.25', icon: 'car' },
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
  const [showMiniMap, setShowMiniMap] = useState(false);

  const totalAmount = budgetItems.reduce((acc, item) => acc + item.amount, 0);

  const handleDaySelect = (dayIdx) => {
    setCurrentDay(dayIdx);
    setCurrentTab('itinerary');
  };

  return (
    <div className="bg-slate-50 text-slate-900 pb-24 min-h-screen">
      {/* Header */}
      <header className="bg-white px-6 pt-10 pb-6 border-b border-slate-200 sticky top-0 z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">제주도 여행</h1>
            <p className="text-slate-500 text-sm">2026.04.24 - 04.27 (3박 4일)</p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            예약 관리중
          </div>
        </div>

        {/* View: Itinerary Header */}
        {currentTab === 'itinerary' && (
          <div id="itinerary-header">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2" id="day-selector">
              {itinerary.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDay(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-all ${
                    currentDay === idx
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  Day {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View: Budget Header */}
        {currentTab === 'budget' && (
          <div id="budget-header">
            <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl shadow-lg mt-2">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">총 지출 (예약된 항목)</p>
                <h2 className="text-xl font-bold" id="total-amount-display">{totalAmount.toLocaleString()}원</h2>
              </div>
              <Icon name="budget" className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </div>
        )}

        {/* View: Map Header */}
        {currentTab === 'map' && (
          <div className="mt-2 bg-blue-50 p-3 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-700">전체 이동 경로</p>
            <p className="text-[10px] text-blue-500">각 경로 또는 마커를 클릭하여 해당 일차 일정을 확인하세요.</p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-2xl mx-auto" id="main-content">
        {currentTab === 'itinerary' && (
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold mb-1 text-slate-800">{itinerary[currentDay].date}</h2>
                {itinerary[currentDay].highlight && (
                  <div className="inline-block bg-pink-50 text-pink-600 text-[10px] px-2 py-0.5 rounded font-bold border border-pink-100">
                    {itinerary[currentDay].highlight}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setShowMiniMap(!showMiniMap)}
                className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Icon name="map" className="w-3.5 h-3.5" />
                {showMiniMap ? '일정 목록' : '지도 보기'}
              </button>
            </div>

            {showMiniMap ? (
              <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-inner border border-slate-200 mb-8">
                <TravelMap 
                  itinerary={itinerary} 
                  currentDay={currentDay} 
                  showAllDays={false}
                />
              </div>
            ) : (
              <div className="relative border-l-2 border-slate-200 ml-3 pl-8 space-y-10">
                {itinerary[currentDay].events.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                      event.type === 'main' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                    }`}>
                      <Icon name={event.icon} className={event.type === 'main' ? 'text-white' : 'text-slate-600'} />
                    </div>
                    <div className={`p-4 rounded-2xl border transition-all ${
                      event.type === 'main' ? 'bg-white border-slate-900 shadow-xl scale-[1.02]' : 'bg-white border-slate-100 shadow-sm'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-slate-400">{event.time}</span>
                        {event.type === 'warning' && (
                          <span className="bg-amber-50 text-amber-600 text-[8px] px-2 py-0.5 rounded-full font-bold">확인 필요</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 leading-tight">{event.title}</h3>
                      {event.location && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-2">
                          <Icon name="pin" className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.details && (
                        <p className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {event.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentTab === 'budget' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold mb-4">지출 내역</h2>
            {budgetItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <Icon name={item.icon} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-blue-500 mb-0.5">{item.category}</p>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[10px] text-slate-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${item.pending ? 'text-slate-400' : 'text-slate-900'}`}>
                    {item.amount > 0 ? `${item.amount.toLocaleString()}원` : '미정'}
                  </p>
                  {item.pending && <p className="text-[8px] text-amber-500 font-bold">예약 필요</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {currentTab === 'map' && (
          <div className="fixed inset-0 top-[180px] bottom-[80px]">
             <TravelMap 
              itinerary={itinerary} 
              showAllDays={true}
              onDaySelect={handleDaySelect}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-slate-200 px-8 py-3 flex justify-around items-center z-20">
        <button
          onClick={() => setCurrentTab('itinerary')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'itinerary' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Icon name="itinerary" className={currentTab === 'itinerary' ? 'text-blue-600' : 'text-slate-400'} />
          <span className="text-[10px] font-bold">일정</span>
        </button>
        <button
          onClick={() => setCurrentTab('budget')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'budget' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Icon name="budget" className={currentTab === 'budget' ? 'text-blue-600' : 'text-slate-400'} />
          <span className="text-[10px] font-bold">경비</span>
        </button>
        <button
          onClick={() => setCurrentTab('map')}
          className={`flex flex-col items-center gap-1 ${currentTab === 'map' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Icon name="map" className={currentTab === 'map' ? 'text-blue-600' : 'text-slate-400'} />
          <span className="text-[10px] font-bold">지도</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Icon name="share" className="text-slate-400" />
          <span className="text-[10px] font-bold">공유</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
