import React from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useMap } from "./helper";

const MapComponent = ({ polygon }) => {
  const { center, isLoaded, containerStyle } = useMap();
  const MapValues = polygon.map((ele) => ({
    lat: ele.latitude,
    lng: ele.longitude,
  }));

  return isLoaded ? (
    <GoogleMap zoom={15} center={center} mapContainerStyle={containerStyle}>
      <Polygon paths={MapValues} />
    </GoogleMap>
  ) : null;
};

export default MapComponent;
