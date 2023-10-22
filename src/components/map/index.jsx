import React, { useState } from "react";
import { GoogleMap, InfoWindow, Polygon } from "@react-google-maps/api";

const MapComponent = ({ polygon, center, zoom, mapView, isLoaded }) => {
  const [InfoWindows, setInfoWindows] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  };

  // const onLoad = (onLoadPolygon) => {
  //   // Access the google.maps object

  //   const { google } = window;

  //   const windows = [];

  //   for (let i = 0; i < onLoadPolygon.getPath()?.getLength(); i++) {
  //     const pointA = onLoadPolygon.getPath().getAt(i);
  //     const pointB = onLoadPolygon
  //       .getPath()
  //       .getAt((i + 1) % onLoadPolygon.getPath().getLength());
  //     const distance = google.maps.geometry?.spherical.computeDistanceBetween(
  //       pointA,
  //       pointB
  //     );
  //     const midpoint = google.maps.geometry?.spherical.interpolate(
  //       pointA,
  //       pointB,
  //       0.5
  //     );

  //     windows.push({
  //       content: `${distance?.toFixed(2)} m`,
  //       position: midpoint,
  //     });
  //   }

  //   setInfoWindows(windows);
  // };

  return isLoaded ? (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={containerStyle}
      options={{
        mapTypeId: mapView,
      }}
    >
      {/* {polygon.length > 1 && ( */}
      <Polygon
        paths={polygon}
        // onLoad={onLoad}
        options={{
          strokeOpacity: 0.8,
          strokeColor: "#FFD580",
          fillColor: "#FFA500",
        }}
      />
      {/* )} 
      // {InfoWindows.length > 1 &&
      //   InfoWindows?.map((infoWindow, index) => (
      //     <InfoWindow
      //       key={`infowindow-${infoWindow.content}-${index}`}
      //       position={infoWindow.position}
      //       visible={false}
      //     >
      //       <div>{infoWindow.content}</div>
      //     </InfoWindow>
      //   ))}*/}
    </GoogleMap>
  ) : null;
};

export default MapComponent;
