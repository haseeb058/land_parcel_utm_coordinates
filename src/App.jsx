import { useUploadSection } from "helper";
import MapComponent from "./components/map";

import style from "app.module.scss";

const App = () => {
  const {
    handleFileUpload,
    latLngCoordinates,
    center,
    zoomLevel,
    mapView,
    UTMcoordinates,
    isLoaded,
  } = useUploadSection();

  const tableRows = UTMcoordinates.map((item, index) => (
    <tr key={index}>
      <td>{item[0]}</td>
      <td>{item[1]}</td>
    </tr>
  ));

  return (
    <div className={style.container}>
      <div className={style.inputWrapper}>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <div className={style.listWrapper}>
          <table>
            <thead>
              <tr>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      <div className={style.mapWrapper}>
        <MapComponent
          polygon={latLngCoordinates}
          center={center}
          zoom={zoomLevel}
          mapView={mapView}
          isLoaded={isLoaded}
        />
      </div>
    </div>
  );
};

export default App;
