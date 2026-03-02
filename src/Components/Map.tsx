import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function FixMapSize() {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 50);
    }, [map]);

    return null;
}

const MyMap = () => {
    const position: [number, number] = [11.325, 75.935];

    return (
        <MapContainer
            center={position}
            zoom={19}
            maxZoom={22}
            scrollWheelZoom
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={22}
                attribution="&copy; OpenStreetMap contributors"
                keepBuffer={8}
            />
            <FixMapSize />
            <Marker position={position}>
                <Popup>Zoom now works correctly 🚀</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MyMap;
