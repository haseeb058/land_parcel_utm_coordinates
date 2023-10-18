import { useJsApiLoader } from "@react-google-maps/api";
import { useRef, useState } from "react";

export const useMap = () => {
  const mapRef = useRef();
  const drawingManagerRef = useRef();
  const defaultCenter = {
    lat: 4.2105,
    lng: 101.9758,
  };
  const [polygons, setPolygons] = useState([]);
  const [center, setCenter] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA9NGaaYjYQvWCbqaVdYxMWiA8iIb0VwrI",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    strokeWeight: 2,
    draggable: true,
    editable: true,
  };

  const onLoadMap = (map) => {
    mapRef.current = map;
  };

  const onOverlayComplete = ($overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);

      setPolygons([...polygons, newPolygon]);
    }
  };

  const CalculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers

    return distance;
  };

  return {
    setCenter,
    onOverlayComplete,
    onLoadMap,
    CalculateDistance,
    polygonOptions,
    containerStyle,
    isLoaded,
    center,
  };
};
