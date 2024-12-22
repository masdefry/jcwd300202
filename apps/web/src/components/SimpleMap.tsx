// 'use client'

// import React, { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import dynamic from "next/dynamic";
// import { Marker, Popup } from "react-leaflet";
// // const Map = dynamic(() => import('./MapComponent'), { ssr: false });

// const SimpleMap = ({ latitudeAndLongitude }: any) => {
//     const mapRef = useRef(null);
//     const [ latitude, setLatitude ] = useState(51.505);
//     const [ longitude, setLongitude ] = useState(-0.09);

//     useEffect(() => {
//       if(latitudeAndLongitude) {
//         setLatitude(latitudeAndLongitude[0])
//         setLongitude(latitudeAndLongitude[1])
//       }
//     }, [])
//     return ( 
//       // Make sure you set the height and width of the map container otherwise the map won't show
//         // <MapContainer center={latitudeAndLongitude as any} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
//         <MapContainer center={[latitude, longitude]} scrollWheelZoom={false} zoom={13} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={[latitude, longitude]}>
//             <Popup>
//               Location
//             </Popup>
//           </Marker>
//         </MapContainer>
//     );
//   };
  
//   export default SimpleMap;