import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api"
import './styles.css'
import { useState } from "react";

const apiKey: string = 'AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U';

export function ReactGoogleMapsAPI() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey
  })

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithPolygon />;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const polygonOptions = {
  fillColor: "#00000020",
  fillOpacity: 1,
  strokeColor: "#FF0000",
  strokeOpacity: .15,
  strokeWeight: 1,
  clickable: true,
  draggable: true,
  editable: true,
  geodesic: false,
  visible: true,
  zIndex: 1
} as const


function MapWithPolygon() {
  const initialCenter: Coordinates = { lat: 24.886, lng: -70.268 };
  const initialPoints: Coordinates[] = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]

  const [center] = useState<Coordinates>(initialCenter);
  const [points] = useState<Coordinates[]>(initialPoints);

  const onLoad = (polygon: object) => {
    console.log("polygon: ", polygon);
  }

  const onEdit = (data: object) => {
    console.log(data)
  }

  return (
    <GoogleMap
      id="marker-example"
      mapContainerClassName="map-container"
      zoom={6}
      center={center}
    >
      <Polygon
        onLoad={onLoad}
        paths={points}
        options={polygonOptions}
        onDrag={onEdit}
        onClick={onEdit}
        editable
        draggable
      />
    </GoogleMap>
  )
}