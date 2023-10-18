import { GoogleMap, DrawingManager, useLoadScript, LoadScript} from "@react-google-maps/api"
import './styles.css'
import { useState } from "react";

const apiKey: string = 'AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U';

export type Coordinate = {
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

  const [polys, setPolys] = useState<Array<Coordinate>>([]);

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: 'rgb(216, 191, 255)',
    strokeColor: 'rgb(47, 0, 114)',
    strokeWeight: 2,
    draggable: true,
    editable: true
}

const drawingManagerOptions = {
    drawingMode: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
        position: window.google?.maps?.ControlPosition?.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE
        ]
    },
    circleOptions: {
      fillColor: 'rgb(216, 191, 255)',
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: 'rgb(47, 0, 114)',
      clickable: true,
      editable: true,

    },

    polygonOptions: {
      fillOpacity: 0.3,
      fillColor: 'rgb(216, 191, 255)',
      strokeColor: 'rgb(47, 0, 114)',
      strokeWeight: 2,
      draggable: true,
      editable: true
      
    }


}

  const center = { lat: 52.52047739093263, lng: 13.36653284549709 }

  const onLoad = (d : any) => {
    console.log(d);
  }

  const onPolygonComplete = (polygon : google.maps.Polygon) => {
    const polyArray =  polygon.getPath().getArray();
    let va = [];
    
    polyArray.forEach((path: google.maps.LatLng) => {
      va.push({ lat: path.lat(), lng: path.lng });
    }) 

    console.log(paths);
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