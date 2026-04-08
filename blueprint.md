# Jeju Trip 2026 Blueprint

## Project Overview
A React-based web application for managing a Jeju Island travel itinerary and budget. It features a responsive design, interactive map using Leaflet, and a clean UI for tracking daily events and expenses.

## Project Details
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Maps**: React-Leaflet (OpenStreetMap)
- **Deployment**: Wrangler (Cloudflare Pages)
- **Key Features**:
    - Daily itinerary view with event timeline.
    - Budget tracking by category.
    - Interactive map showing travel paths and markers.
    - Responsive mobile-first design.

## Features & Styles implemented
- **Itinerary**: Grouped by days (Day 1 to Day 4).
- **Map Integration**: Custom markers for each event, polyline paths between events.
- **UI/UX**: Bottom navigation, sticky headers, day selector.
- **Modern CSS**: Tailwind-based components with soft shadows and rounded corners.

## Completed Changes: Update April 26-27 Itinerary
The itinerary for April 26th and 27th has been updated with specific locations and coordinates.

### Steps Taken
1. **Researched Coordinates**:
    - 제주 뽈살집 한림: { lat: 33.4116, lng: 126.2642 }
    - 협재 아루미호텔: { lat: 33.3934, lng: 126.2415 }
2. **Updated `src/App.jsx`**:
    - Day 3 (April 26) evening dinner: Changed to '제주 뽈살집 한림'.
    - Day 3 (April 26) accommodation: Changed to '협재 아루미호텔'.
    - Day 4 (April 27) morning: Added '협재 아루미호텔' checkout at 10:00.
    - Updated all relevant coordinates for map markers.
3. **Verified**: The itinerary and map now correctly show the updated locations.
