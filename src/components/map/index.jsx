import React from "react";
import { GoogleMap, Marker, Polygon } from "@react-google-maps/api";

import { useMap } from "./helper";

const MapComponent = () => {
  const { center, isLoaded, containerStyle } = useMap();
  const polygon = [
    { lat: 3.1439, lng: 101.6869 }, // Kuala Lumpur
    { lat: 3.1538, lng: 101.7121 }, // Petaling Jaya
    { lat: 3.5649, lng: 101.6005 }, // Shah Alam
    { lat: 2.8264, lng: 101.6964 }, // Klang
  ];

  const onLoad = (polygon) => {
    // Access the google.maps object
    const { google } = window;

    for (let i = 0; i < polygon.getPath().getLength(); i++) {
      const pointA = polygon.getPath().getAt(i);
      const pointB = polygon
        .getPath()
        .getAt((i + 1) % polygon.getPath().getLength());

      const distance = google?.maps?.geometry?.spherical.computeDistanceBetween(
        pointA,
        pointB
      );
      const midpoint = google?.maps?.geometry?.spherical?.interpolate(
        pointA,
        pointB,
        0.5
      );

      // Display the distance in the middle of each line
      new google.maps.InfoWindow({
        content: `Distance: ${distance.toFixed(2)} meters`,
        position: midpoint,
      }).open(polygon.getMap());
    }
  };

  return isLoaded ? (
    <GoogleMap zoom={11} center={center} mapContainerStyle={containerStyle}>
      <Polygon onLoad={onLoad} paths={polygon} />
      {/* {polygons.map((polygon, index) => {
        for (let i = 0; i < polygon.length - 1; i++) {
          const coord1 = polygon[i];
          const coord2 = polygon[i + 1];

          const midpoint = {
            lat: (coord1.lat + coord2.lat) / 2,
            lng: (coord1.lng + coord2.lng) / 2,
          };

          const distance = CalculateDistance(
            coord1.lat,
            coord1.lng,
            coord2.lat,
            coord2.lng
          );

          return (
            <Marker
              key={`marker-${index}-${i}`}
              position={midpoint}
              label={`${distance.toFixed(2)} km`}
            />
          );
        }
        return null;
      })} */}
    </GoogleMap>
  ) : null;
};

export default MapComponent;
