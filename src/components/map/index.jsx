import React from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";

import { useMap } from "./helper";

const MapComponent = () => {
  const { center, isLoaded, containerStyle } = useMap();

  return isLoaded ? (
    <GoogleMap zoom={4} center={center} mapContainerStyle={containerStyle}>
      <Polygon
        options={{
          strokeColor: "#FF0000",
          strokeWeight: 2,
        }}
        paths={[
          { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
          { lat: 3.0538, lng: 101.7121 }, // Petaling Jaya
          { lat: 3.0649, lng: 101.6005 }, // Shah Alam
          { lat: 2.9264, lng: 101.6964 }, // Klang
        ]}
      />
      <Polygon
        options={{
          strokeColor: "#FF0000",
          strokeWeight: 2,
        }}
        paths={[
          { lat: 3.1439, lng: 101.6869 }, // Kuala Lumpur
          { lat: 3.1538, lng: 101.7121 }, // Petaling Jaya
          { lat: 3.5649, lng: 101.6005 }, // Shah Alam
          { lat: 2.8264, lng: 101.6964 }, // Klang
        ]}
      />
    </GoogleMap>
  ) : null;
};

export default MapComponent;
