import {
  GoogleMap,
  DrawingManager,
  useLoadScript,
  Polygon,
  Marker,
} from "@react-google-maps/api";
import "./styles.css";
import { useState } from "react";
import ReactDOMServer from 'react-dom/server';
// import { StoreIcon } from "../assets/StoreIcon";

import StoreIcon from "../assets/Store_icon.svg"

const apiKey: string = "AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U";

/**
 * Creates a circular area around a coordinate
 * @param { Array<number> } center Central point
 * @param { string | number } radius Radius of the area in Km. Ex: 9
 * @param { number } corners Number of points of the circle (the more corners, more rounded the circle will be, but more coordinates will have)
 * @returns Array with an array of numbers with a pair of coordinates, indicating longitude and latitude
 * @example [[long, lat], [long, lat], [long, lat]]
 */
export const createCircularArea = (
  center: Coordinate,
  radius: string | number,
  corners = 30
): Array<Coordinate> => {
  const sellerArea = [];
  const xCoords = [];
  const yCoords = [];
  const formattedRadius = Number(radius) / 100;
  const centerX = center.lat;
  const centerY = center.lng;

  // Generate the corrdinates x and y
  for (let i = 0; i < corners; i++) {
    xCoords.push(
      +Number(
        centerX + formattedRadius * Math.cos(2 * Math.PI * (i / corners))
      ).toFixed(7)
    );
    yCoords.push(
      +Number(
        centerY + formattedRadius * Math.sin(2 * Math.PI * (i / corners))
      ).toFixed(7)
    );
  }

  // Add the coordinates pair in only one location
  for (let i = 0; i < xCoords.length; i++) {
    sellerArea.push({ lat: xCoords[i], lng: yCoords[i] });
  }

  // Copy the first coordinate to final position to close the circle
  sellerArea.push(sellerArea[0]);
  return sellerArea;
};

export type Coordinate = {
  lat: number;
  lng: number;
};

export function ReactGoogleDrawingManager() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["drawing"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithDrawingManager />;
}

function MapWithDrawingManager() {
  const [polys, setPolys] = useState<Array<Coordinate>>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const polygonOptions: google.maps.PolygonOptions = {
    fillColor: "rgba(216,191,255,0.5)",
    strokeColor: "#2F0072",
    strokeWeight: 2,
    draggable: false,
    editable: isEdit,
  };

  const drawingManagerOptions: google.maps.drawing.DrawingManagerOptions = {
    // drawingMode: polygonOptions,
    drawingControl: false,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    circleOptions: {
      fillColor: "rgb(216, 191, 255)",
      fillOpacity: 0.3,
      strokeWeight: 2,
      strokeColor: "rgb(47, 0, 114)",
      clickable: true,
      editable: true,
    },
    polygonOptions: {
      fillOpacity: 0.3,
      fillColor: "rgb(216, 191, 255)",
      strokeColor: "rgb(47, 0, 114)",
      strokeWeight: 2,
      draggable: true,
      editable: true,
    },
  };

  const center = { lat: 13.72311, lng: -89.20623 };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const polyArray = polygon.getPath().getArray();

    console.log(polyArray);
  };

  const renderMarker = () => {
    const priceTag = document.createElement("div");

    return priceTag
  };

  const createCircule = () => {
    setPolys(createCircularArea(center, 9, 30));
  }

  const handleChange = (event: any) => {
    const val = event.target.value;
    if(val === 'view') {
      setIsEdit(false);
    } else if(val === 'edit') {
      setIsEdit(true);
    }
  } 

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: '20px',
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        <GoogleMap
          id="marker-example"
          mapContainerClassName="map-container"
          zoom={12}
          center={center}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
        >
          <DrawingManager
            onPolygonComplete={onPolygonComplete}
            options={drawingManagerOptions}
          />

          <Marker
            position={center}
            icon={{
              url: StoreIcon,
            }}
          />

          <Polygon
            paths={polys}
            options={polygonOptions}
            onDrag={console.log}
            onClick={console.log}
            editable={isEdit}
            draggable
          />
        </GoogleMap>
      </div>
      <div
        style={{
          backgroundColor: '#F3F3F3',
          opacity: 0.9,
          height: "300px",
          width: "150px",
          zIndex: 1,
          padding: '5px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <button style={{
          color: "#000",
        }}
          onClick={createCircule}>Criar nova area
          </button>
        <div style={{ marginTop:  '10px' }}>
        <input type="radio" id="view" name="mode" value="view" onChange={handleChange}/><label style={{ color: 'black', fontSize: 11 }}>Visualizar</label>
        </div>
        <div>
        <input type="radio" id="edit" name="mode" value="edit" onChange={handleChange}/><label style={{ color: 'black', fontSize: 11}}>Modo edição</label>
        </div>

      </div>
    </div>
  );
}
