import { useState } from "react";
import readXlsxFile from "read-excel-file";

import { toLatLon } from "utils/UTM_convertor";

export const useUploadSection = () => {
  const [latLngCoordinates, setLatLngCoordinates] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(7);
  const [mapView, setMapView] = useState("roadmap");

  const [center, setCenter] = useState({
    lat: 11.562108,
    lng: 104.888535,
  });

  const handleConvertUTMtoLatLng = (utmCoordinates) => {
    const convertedCoordinates = utmCoordinates.map((coord) => {
      const latLng = toLatLon(coord[0], coord[1], 48, "P");
      return latLng;
    });
    console.log(convertedCoordinates);
    setLatLngCoordinates(convertedCoordinates);
    setZoomLevel(15);
    setCenter({
      lat: convertedCoordinates[0].latitude,
      lng: convertedCoordinates[0].longitude,
    });
    setMapView("satellite");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      readXlsxFile(file)
        .then((rows) => {
          handleConvertUTMtoLatLng(rows?.slice(1));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return {
    handleFileUpload,
    handleConvertUTMtoLatLng,
    latLngCoordinates,
    zoomLevel,
    center,
    mapView,
  };
};
