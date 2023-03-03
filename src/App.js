/*global google*/

import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
  HeatmapLayerF,
} from "@react-google-maps/api";

import { getTrafficCounts } from "./data/data";

function App() {
  // const google = window.google;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_gm_api,
    libraries: ["visualization"],
  });

  const [trafficData, setTrafficData] = useState([]);
  const [maxTraffic, setMaxTraffic] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getTrafficCounts().then((data) => {
      let max = data.reduce((prev, current) =>
        Number(prev.ev_aadt_tot) > Number(current.ev_aadt_tot) ? prev : current
      );
      console.log(data);
      setMaxTraffic(max);
      setTrafficData(data);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="App">
      {isLoaded && dataLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "800px",
            height: "800px",
          }}
          center={{ lat: 39.843864, lng: -75.01911 }}
          zoom={10}
        >
          <HeatmapLayerF
            data={trafficData.map((data) => {
              return {
                location: new google.maps.LatLng(
                  Number(data.si_lat),
                  Number(data.si_lon)
                ),
                weight: Number(data.ev_aadt_tot) / maxTraffic,
              };
            })}
            options={{
              radius: 15,
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
