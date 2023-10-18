import { useState } from "react";
import readXlsxFile from "read-excel-file";

import { toLatLon } from "utils/UTM_convertor";

export const useUploadSection = () => {
  const [latLngCoordinates, setLatLngCoordinates] = useState([]);

  const handleConvertUTMtoLatLng = (utmCoordinates) => {
    const convertedCoordinates = utmCoordinates.map((coord) => {
      const latLng = toLatLon(coord[0], coord[1], 48, "P");
      return latLng;
    });

    setLatLngCoordinates(convertedCoordinates);
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
  };
};
