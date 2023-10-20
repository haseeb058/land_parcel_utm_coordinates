import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import readXlsxFile from "read-excel-file";

import { toLatLon } from "utils/UTM_convertor";

export const useUploadSection = () => {
  const [latLngCoordinates, setLatLngCoordinates] = useState([]);
  const [UTMcoordinates, setUTMcoordinates] = useState([]);

  const [zoomLevel, setZoomLevel] = useState(7);
  const [mapView, setMapView] = useState("roadmap");

  const [center, setCenter] = useState({
    lat: 11.562108,
    lng: 104.888535,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const handleConvertUTMtoLatLng = async (utmCoordinates) => {
    const convertedCoordinates = await utmCoordinates.map((coord) => {
      const latLng = toLatLon(coord[0], coord[1], 48, "P");
      return latLng;
    });

    setLatLngCoordinates(
      convertedCoordinates.map((ele) => ({
        lat: ele.latitude,
        lng: ele.longitude,
      }))
    );

    setCenter({
      lat: convertedCoordinates[0].latitude,
      lng: convertedCoordinates[0].longitude,
    });

    setZoomLevel(15);
    setMapView("satellite");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      readXlsxFile(file)
        .then((rows) => {
          setUTMcoordinates(rows?.slice(1));
          handleConvertUTMtoLatLng(rows?.slice(1));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return {
    handleConvertUTMtoLatLng,
    handleFileUpload,
    latLngCoordinates,
    UTMcoordinates,
    zoomLevel,
    isLoaded,
    mapView,
    center,
  };
};
