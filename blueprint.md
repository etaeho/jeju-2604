# Jeju Trip 2026 Blueprint

## Project Overview
A React-based web application for managing a Jeju Island travel itinerary and budget. It features a responsive design, interactive map using Leaflet (with Google Maps tiles), and a clean UI for tracking daily events and expenses.

## Project Details
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Maps**: React-Leaflet (Google Maps Tiles)
- **Deployment**: Wrangler (Cloudflare Pages)
- **Key Features**:
    - **Google Travel Canvas UI**: Fixed top map with scrollable bottom itinerary.
    - **Dynamic Map Sync**: Map automatically adjusts bounds based on the selected day's events.
    - **Jeju-Only Map Filtering**: Only events within Jeju island coordinates are displayed on the map to focus on the main travel area.
    - **Flow Visualization**: Solid, high-visibility travel paths showing the travel sequence.
    - **Travel Time & Mode**: Estimated travel duration (car/walk) displayed between itinerary items.
    - **Modern Markers**: Numbered diamond markers with visual priority for main events.

## Features & Styles implemented
- **Canvas Layout**: 40vh fixed map area, 60vh scrollable content area.
- **Map Integration**: Google Maps tile layer for a familiar, professional look. Custom numbered markers.
- **Timeline with Travel Info**: Itinerary items are separated by travel path components showing transport mode and duration.
- **UI/UX**: Minimalist header, floating day selector, and clean, high-contrast typography.

## Completed Changes: Google Travel Canvas Enhancement
The application has been upgraded to match the "Google Travel" user experience more closely.

### Steps Taken
1.  **Map Upgrade**: Switched the tile layer to Google Maps Terrain/Road tiles for a standard look.
2.  **Travel Logic**: Added `travel` metadata to itinerary events and implemented a vertical travel path indicator in the timeline.
3.  **Refined Day Selector**: Redesigned the day selection bar with better shadows, backdrop filters, and active states.
4.  **Automatic Focusing**: The map now ignores non-Jeju points (like Cheongju Airport) when calculating bounds, ensuring Day 1 starts with a perfect view of Jeju.
5.  **Build Stability Fix**: Added `eslint.config.js` and resolved unused variable errors to ensure CI/CD pipeline success.
