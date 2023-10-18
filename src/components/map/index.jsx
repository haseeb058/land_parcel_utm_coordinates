import React from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useMap } from "./helper";

const MapComponent = ({ polygon, center, zoom, mapView }) => {
  const { isLoaded, containerStyle } = useMap();

  const MapValues = polygon.map((ele) => ({
    lat: ele.latitude,
    lng: ele.longitude,
  }));

  return isLoaded ? (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
      options={{
        mapTypeId: mapView,
      }}
    >
      <Polygon
        paths={MapValues}
        options={{
          strokeOpacity: 0.8,
          strokeColor: "#FFD580",
          fillColor: "#FFA500",
        }}
      />
    </GoogleMap>
  ) : null;
};

export default MapComponent;
