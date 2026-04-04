import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet 기본 마커 아이콘 설정 (웹팩/Vite에서 경로 문제 해결)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const dayColors = ['#2563eb', '#ef4444', '#10b981', '#f59e0b'];

// 지도 중심 및 줌 자동 조절 컴포넌트
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const TravelMap = ({ itinerary, currentDay, showAllDays, onDaySelect }) => {
  const mapData = useMemo(() => {
    if (showAllDays) {
      return itinerary.map((day, idx) => ({
        points: day.events.map(e => [e.position.lat, e.position.lng]).filter(p => p[0] && p[1]),
        color: dayColors[idx % dayColors.length],
        dayIndex: idx,
        events: day.events
      }));
    } else {
      const day = itinerary[currentDay];
      return [{
        points: day.events.map(e => [e.position.lat, e.position.lng]).filter(p => p[0] && p[1]),
        color: dayColors[currentDay % dayColors.length],
        dayIndex: currentDay,
        events: day.events
      }];
    }
  }, [itinerary, currentDay, showAllDays]);

  const allPoints = useMemo(() => {
    return mapData.flatMap(d => d.points);
  }, [mapData]);

  const center = useMemo(() => {
    if (allPoints.length === 0) return [33.35, 126.55];
    const lats = allPoints.map(p => p[0]);
    const lngs = allPoints.map(p => p[1]);
    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2
    ];
  }, [allPoints]);

  const zoom = showAllDays ? 10 : 11;

  // 번호가 표시된 커스텀 마커 아이콘 생성 함수
  const createNumIcon = (number, color) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color:${color}; color:white; width:24px; height:24px; border-radius:50%; display:flex; items-center; justify-content:center; font-size:12px; font-weight:bold; border:2px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.3); line-height:20px; text-align:center;">${number}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mapData.map((data, dIdx) => (
          <React.Fragment key={dIdx}>
            <Polyline
              positions={data.points}
              pathOptions={{ 
                color: data.color, 
                weight: 5, 
                opacity: 0.7,
                lineJoin: 'round'
              }}
              eventHandlers={{
                click: () => onDaySelect && onDaySelect(data.dayIndex),
              }}
            />
            {data.events.map((event, eIdx) => (
              event.position && (
                <Marker 
                  key={`${dIdx}-${eIdx}`} 
                  position={[event.position.lat, event.position.lng]}
                  icon={createNumIcon(eIdx + 1, data.color)}
                >
                  <Popup>
                    <div className="p-1">
                      <p className="text-[10px] font-bold text-blue-500 m-0">Day {data.dayIndex + 1}</p>
                      <h4 className="text-xs font-bold my-1 leading-tight">{event.title}</h4>
                      <p className="text-[10px] text-slate-500 m-0">{event.time} · {event.location}</p>
                      <button 
                        onClick={() => onDaySelect && onDaySelect(data.dayIndex)}
                        className="mt-2 text-[10px] bg-slate-900 text-white px-2 py-1 rounded block w-full border-none cursor-pointer"
                      >
                        일정 상세 보기
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* Zoom Control Overlay */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <button className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 border-b border-slate-100" onClick={() => window.dispatchEvent(new CustomEvent('map-zoom-in'))}>+</button>
          <button className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50" onClick={() => window.dispatchEvent(new CustomEvent('map-zoom-out'))}>-</button>
        </div>
      </div>
    </div>
  );
};

export default TravelMap;
