import React, { useMemo, useEffect, useState } from 'react';
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

// 지도 뷰 조절 컴포넌트
function ChangeView({ points, currentDay }) {
  const map = useMap();
  
  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true });
    }
  }, [points, currentDay, map]);

  return null;
}

const TravelMap = ({ itinerary, currentDay, showAllDays, onDaySelect }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapData = useMemo(() => {
    const day = itinerary[currentDay];
    return {
      points: day.events.map(e => [e.position.lat, e.position.lng]).filter(p => p[0] && p[1]),
      color: dayColors[currentDay % dayColors.length],
      dayIndex: currentDay,
      events: day.events
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
          width: 28px; 
          height: 28px; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 13px; 
          font-weight: 800; 
          border: 2px solid ${isMain ? 'white' : '#0f172a'}; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transform: rotate(45deg);
        ">
          <span style="transform: rotate(-45deg);">${number}</span>
        </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
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
        <ChangeView points={mapData.points} currentDay={currentDay} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <Polyline
          positions={mapData.points}
          pathOptions={{ 
            color: '#0f172a', 
            weight: 3, 
            opacity: 0.4,
            dashArray: '8, 8',
            lineJoin: 'round'
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
                  <p className="text-[9px] font-black text-blue-600 uppercase mb-1 tracking-tighter">{event.time}</p>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{event.title}</h4>
                  <p className="text-[10px] text-slate-500 m-0">{event.location}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      {/* Floating Badge */}
      <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Live Canvas</span>
        </div>
      </div>
    </div>
  );
};

export default TravelMap;
