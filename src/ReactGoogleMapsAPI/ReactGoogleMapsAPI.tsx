import { GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api"
import './styles.css'
// import { useMemo } from "react";

const apiKey: string = 'AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U';

export function ReactGoogleMapsAPI() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey
  })

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithPolygon />;
}

// function MapWithMarker() {
//   const centerPosition = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <GoogleMap
//       zoom={10}
//       center={centerPosition}
//       mapContainerClassName="map-container"
//     >
//       <Marker position={centerPosition} />
//     </GoogleMap>
//   )
// }

function MapWithPolygon() {
  const center = { lat: 24.886, lng: -70.268 }

  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]

  const options = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }

  const onLoad = (polygon: object) => {
    console.log("polygon: ", polygon);
  }

  return (
    <GoogleMap
      id="marker-example"
      mapContainerClassName="map-container"
      zoom={5}
      center={center}
    >
      <Polygon
        onLoad={onLoad}
        paths={paths}
        options={options}
      />
    </GoogleMap>
  )
}