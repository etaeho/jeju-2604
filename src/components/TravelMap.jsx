import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet 기본 마커 아이콘 설정
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const dayColors = ['#0f172a', '#2563eb', '#10b981', '#f59e0b'];

// 제주도 범위 정의 (이 범위를 벗어나는 포인트는 무시)
const JEJU_BOUNDS = {
  minLat: 33.1,
  maxLat: 34.0,
  minLng: 126.0,
  maxLng: 127.0
};

const isInsideJeju = (lat, lng) => {
  return lat >= JEJU_BOUNDS.minLat && lat <= JEJU_BOUNDS.maxLat &&
         lng >= JEJU_BOUNDS.minLng && lng <= JEJU_BOUNDS.maxLng;
};

// 지도 뷰 조절 컴포넌트
function ChangeView({ points, currentDay, triggerRecenter }) {
  const map = useMap();
  
  const fitToPoints = useCallback(() => {
    if (points && points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14, animate: true });
    }
  }, [points, map]);

  useEffect(() => {
    fitToPoints();
  }, [points, currentDay, fitToPoints]);

  useEffect(() => {
    if (triggerRecenter > 0) {
      fitToPoints();
    }
  }, [triggerRecenter, fitToPoints]);

  return null;
}

const TravelMap = ({ itinerary, currentDay, showAllDays, onDaySelect }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);

  const mapData = useMemo(() => {
    const day = itinerary[currentDay];
    // 제주도 내에 있는 포인트만 필터링
    const filteredEvents = day.events.filter(e => 
      e.position && isInsideJeju(e.position.lat, e.position.lng)
    );
    
    return {
      points: filteredEvents.map(e => [e.position.lat, e.position.lng]),
      color: dayColors[currentDay % dayColors.length],
      dayIndex: currentDay,
      events: filteredEvents
    };
  }, [itinerary, currentDay]);

  // 번호가 표시된 모던한 커스텀 마커 아이콘
  const createNumIcon = (number, color, isMain) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${isMain ? '#0f172a' : 'white'}; 
          color: ${isMain ? 'white' : '#0f172a'}; 
          width: 26px; 
          height: 26px; 
          border-radius: 8px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 12px; 
          font-weight: 800; 
          border: 2px solid ${isMain ? 'white' : '#0f172a'}; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transform: rotate(45deg);
          transition: all 0.2s ease-in-out;
        ">
          <span style="transform: rotate(-45deg);">${number}</span>
        </div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  };

  return (
    <div className="w-full h-full relative z-0 group">
      <MapContainer 
        center={[33.35, 126.55]} 
        zoom={11} 
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', backgroundColor: '#f8fafc' }}
        zoomControl={false}
        whenReady={() => setMapLoaded(true)}
      >
        <ChangeView points={mapData.points} currentDay={currentDay} triggerRecenter={recenterTrigger} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* 이동 경로 (Flow) 시각화 - 더 선명한 실선으로 변경 */}
        <Polyline
          positions={mapData.points}
          pathOptions={{ 
            color: '#2563eb', 
            weight: 4, 
            opacity: 0.6,
            lineJoin: 'round',
            lineCap: 'round'
          }}
        />

        {mapData.events.map((event, eIdx) => (
          event.position && (
            <Marker 
              key={`${currentDay}-${eIdx}`} 
              position={[event.position.lat, event.position.lng]}
              icon={createNumIcon(eIdx + 1, mapData.color, event.type === 'main')}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[120px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">{event.time}</span>
                    <span className="text-[8px] font-bold text-slate-400">Step {eIdx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{event.title}</h4>
                  <p className="text-[10px] text-slate-500 m-0 font-medium">{event.location}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      {/* Floating UI Elements */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Jeju Focus</span>
        </div>
      </div>

      {/* Recenter Button */}
      <button 
        onClick={() => setRecenterTrigger(prev => prev + 1)}
        className="absolute bottom-16 right-4 z-[400] bg-white/95 backdrop-blur-md w-10 h-10 rounded-2xl shadow-xl border border-white/20 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all active:scale-95"
        title="동선 중앙으로 이동"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
};

export default TravelMap;
