import { GoogleMap, DrawingManager, useLoadScript, LoadScript} from "@react-google-maps/api"
import './styles.css'
import { useState } from "react";

const apiKey: string = 'AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U';

export type Coordenate = {
  lat: number,
  lng: number,
}

export function ReactGoogleDrawingManager() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["drawing"],
  })

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithDrawingManager />;
}

function MapWithDrawingManager () {

  const [polys, setPolys] = useState<Array<Coordenate>>([]);

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: '#ff0000',
    strokeColor: '#ff0000',
    strokeWeight: 2,
    draggable: true,
    editable: true
}

const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
        position: window.google?.maps?.ControlPosition?.TOP_CENTER,
        drawingModes: [
            window.google?.maps?.drawing?.OverlayType?.POLYGON
        ]
    },
}

  const center = { lat: 52.52047739093263, lng: 13.36653284549709 }

  const onLoad = (d : any) => {
    console.log(d);
  }

  const onPolygonComplete = (polygon : google.maps.Polygon) => {
    const polyArray =  polygon.getPath().getArray();
    let paths = [];
    polyArray.forEach((path: google.maps.LatLng) => {
      paths.push({ lat: path.lat(), lng: path.lng });
    }) 
  }

  return (
    <GoogleMap
      id="marker-example"
      mapContainerClassName="map-container"
      zoom={12}
      center={center}
    >
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        options={drawingManagerOptions}
        />

    </GoogleMap>
  )
}