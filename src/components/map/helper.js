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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
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

  return {
    setCenter,
    onOverlayComplete,
    onLoadMap,
    polygonOptions,
    containerStyle,
    isLoaded,
    center,
  };
};
