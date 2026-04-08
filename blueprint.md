# Jeju Trip 2026 Blueprint

## Project Overview
A React-based web application for managing a Jeju Island travel itinerary and budget. It features a responsive design, interactive map using Leaflet, and a clean UI for tracking daily events and expenses.

## Project Details
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Maps**: React-Leaflet (OpenStreetMap/CartoDB Voyager)
- **Deployment**: Wrangler (Cloudflare Pages)
- **Key Features**:
    - **Google Travel Canvas UI**: Fixed top map with scrollable bottom itinerary.
    - **Dynamic Map Sync**: Map automatically adjusts bounds based on the selected day's events.
    - **Modern Markers**: Numbered diamond markers with visual priority for main events.
    - **Responsive Design**: Mobile-first layout optimized for travel use.

## Features & Styles implemented
- **Canvas Layout**: 40vh fixed map area, 60vh scrollable content area.
- **Map Integration**: CartoDB Voyager tiles for a cleaner, modern look. Custom numbered markers.
- **UI/UX**: Minimalist header, floating day selector, and clean timeline.

## Completed Changes: Google Travel Canvas UI Implementation
The entire application layout was restructured to provide a modern, map-centric experience.

### Steps Taken
1.  **Restructured `App.jsx`**:
    - Implemented a two-pane vertical layout (Map top, List bottom).
    - Removed 'Map View' toggle as the map is now always visible for itineraries.
    - Updated typography to a bolder, more modern style (Black/ExtraBold).
2.  **Enhanced `TravelMap.jsx`**:
    - Added `ChangeView` component using `map.fitBounds` for smooth transitions between days.
    - Implemented custom SVG/CSS diamond markers with rotation.
    - Switched to CartoDB Voyager tiles for better aesthetic alignment with "Travel" apps.
3.  **Automated Deployment**:
    - Updated `wrangler.jsonc` for better Cloudflare Pages integration.
    - Ensured every change is pushed to the remote repository to trigger CI/CD.
