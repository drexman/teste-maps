import { Circle, CircleProps, GoogleMap, Polygon, useLoadScript } from "@react-google-maps/api"
import './styles.css'
import { useCallback, useRef, useState } from "react";

const apiKey: string = 'AIzaSyA-qm42bToshX0BMcK_57V33l9omMszx8U';

interface Coordinates {
  lat: number;
  lng: number;
}

const polygonOptions = {
  fillColor: "rgb(216, 191, 255)",
  fillOpacity: 1,
  strokeColor: "rgb(47, 0, 114)",
  strokeOpacity: .15,
  strokeWeight: 1,
  clickable: true,
  draggable: true,
  editable: true,
  geodesic: false,
  visible: true,
  zIndex: 1
} as const

const circleOptions = {
  strokeColor: 'rgb(47, 0, 114)',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: 'rgb(216, 191, 255)',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 9000,
  zIndex: 1
} as const

export function ReactGoogleMapsAPI() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey
  })

  if (!isLoaded) return <div>Loading...</div>;
  return <MapWithCircle />;
}

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

function MapWithPolygonV2() {
  const initialCenter: Coordinates = { lat: 24.886, lng: -70.268 };
  const initialPoints: Coordinates[] = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]

  const [center] = useState<Coordinates>(initialCenter);
  const [points, setPoints] = useState(initialPoints);

  const polygonRef = useRef<google.maps.Polygon>(null);
  const listenersRef = useRef([]);

  const onEdit = useCallback(() => {
    console.log("onEdit ->", polygonRef.current)
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((point: google.maps.LatLng) => {
          return { lat: point.lat(), lng: point.lng() }
        });
      setPoints(nextPath);
    }
  }, [setPoints])

  const onLoad = useCallback(
    (polygon: any) => {
      console.log("onLoad -> ", polygon)
      // polygonRef.current = polygon;
      // const path = polygon.getPath();
      // listenersRef.current.push(
      //   path.addListener("set_at", onEdit),
      //   path.addListener("insert_at", onEdit),
      //   path.addListener("remove_at", onEdit),
      // );
    }, [onEdit])

  const onUnmount = useCallback(() => {
    console.log("onUnmount ->", listenersRef.current)
    // listenersRef.current.forEach((lis: any) => lis.remove());
    // polygonRef.current = null;
  }, [])

  console.log("path state is")

  return (
    <GoogleMap
      id="marker-example"
      mapContainerClassName="map-container"
      zoom={6}
      center={center}
    >
      <Polygon
        paths={points}
        options={polygonOptions}
        onLoad={onLoad}
        onDrag={onEdit}
        onClick={onEdit}
        onUnmount={onUnmount}
        editable
        draggable
      />
    </GoogleMap>
  )
}

function MapWithCircle() {
  const initialCenter: Coordinates = { lat: -3.745, lng: -38.523 };
  const [center] = useState<Coordinates>(initialCenter);

  const onLoad = (circle: google.maps.Circle) => {
    console.log('Circle onLoad circle: ', circle)
  }

  const onUnmount = (circle: google.maps.Circle) => {
    console.log('Circle onUnmount circle: ', circle)
  }

  return (
    <GoogleMap
      id="marker-example"
      mapContainerClassName="map-container"
      zoom={6}
      center={center}
    >
      <Circle
        center={center}
        options={circleOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        editable
        draggable
      />
    </GoogleMap>
  )
}