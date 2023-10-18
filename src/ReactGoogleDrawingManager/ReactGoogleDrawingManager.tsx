import { GoogleMap, DrawingManager, useLoadScript } from "@react-google-maps/api"
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

function MapWithDrawingManager() {

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

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const polyArray = polygon.getPath().getArray();

    console.log(polyArray);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: '100vh',
      width: '100vw' 
    }}>
      <div style={{ 
        position:'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}>
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
      </div>
      <div style={{ 
        backgroundColor: '#FFF',
        color: '#000',
        height: '100px',
        zIndex: 1
      }}>
        <button onClick={ () => alert('teste')}>Button</button>
      </div>
    </div>
  )
}