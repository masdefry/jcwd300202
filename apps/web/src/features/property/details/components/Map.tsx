// 'use client'

// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = () => {
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Check if geolocation is available in the browser
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // Get latitude and longitude from the position
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });

//           // Initialize the map
//           if (mapRef.current) {
//             const map = L.map(mapRef.current).setView([latitude, longitude], 13);

//             // Add OpenStreetMap tile layer
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//             // Add a marker for the user's location
//             L.marker([latitude, longitude])
//               .addTo(map)
//               .bindPopup('You are here!')
//               .openPopup();
//           }
//         },
//         (error) => {
//           console.error('Error getting location', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not available in your browser');
//     }
//   }, []);

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
