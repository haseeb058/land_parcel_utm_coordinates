import { useUploadSection } from "helper";
import MapComponent from "./components/map";

import style from "app.module.scss";

const App = () => {
  const { handleFileUpload, latLngCoordinates, center, zoomLevel, mapView } =
    useUploadSection();

  return (
    <div className={style.container}>
      <div className={style.inputWrapper}>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      </div>
      <div className={style.mapWrapper}>
        <MapComponent
          polygon={latLngCoordinates}
          center={center}
          zoom={zoomLevel}
          mapView={mapView}
        />
      </div>
    </div>
  );
};

export default App;
