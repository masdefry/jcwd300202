
// import React, { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import the Leaflet library (client-side only)
// const L = dynamic(() => import('leaflet'), { ssr: false });
// import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// const MapComponent = () => {
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const mapRef = useRef<HTMLDivElement>(null); // Ref for map container
//   const mapInstance = useRef<L.Map | null>(null); // Ref to the map instance

//   useEffect(() => {
//     // Check if geolocation is available in the browser
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // Get latitude and longitude from the position
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not available in your browser');
//     }
//   }, []);

//   useEffect(() => {
//     // Initialize the map only if location is available
//     if (location && mapRef.current && !mapInstance.current) {
//       // Initialize the map
//       mapInstance.current = L.map(mapRef.current).setView([location.lat, location.lng], 13);

//       // Add OpenStreetMap tile layer
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

//       // Add a marker for the user's location
//       L.marker([location.lat, location.lng])
//         .addTo(mapInstance.current)
//         .bindPopup('You are here!')
//         .openPopup();
//     }
//   }, [location]); // Re-run the effect when location changes

//   return (
//     <div>
//       <h1>My Location on Map</h1>
//       {/* Map container */}
//       <div
//         ref={mapRef}
//         style={{ height: '500px', width: '100%' }}
//       />
//       {/* Optionally, display latitude and longitude */}
//       {location && (
//         <p>
//           Latitude: {location.lat}, Longitude: {location.lng}
//         </p>
//       )}
//     </div>
//   );
// };

// export default MapComponent;