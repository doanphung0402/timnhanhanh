import React, { useEffect, useState } from "react";
import { COLOR, REACT_APP_MAPBOX_ACCESS_TOKEN } from "../ultils/constant";
import mapicon from "../../src/assets/mapbox-marker-icon.png";
import ReactMapGL, { Marker } from "react-map-gl";
import Button from "./Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const Map = ({ coords }) => {
  let latitude = coords.lat;
  let longitude = coords.lng;
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 14,
    width: "100%",
    height: "100%",
  });
  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);
  const openGoogleMaps = () => {
    const destination = `${coords.lat},${coords.lng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
  };
  return (
    <>
      {coords.lat && coords.lng && (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(newViewport) => setViewport(newViewport)}
        >
          {/* Marker */}
          <Marker
            latitude={coords.lat}
            longitude={coords.lng}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <img style={{ fontSize: "16px" }} src={mapicon} alt="Ảnh mô tả" />
          </Marker>
        </ReactMapGL>
      )}
      <div className="w-full z-100 mb-4 flex justify-end mt-8">
        <Button
          onClick={openGoogleMaps}
          fontSize={"10px"}
          // size={"small"}
          text="Xem trong Google Maps"
          IcAfter={OpenInNewIcon}
          bgColor={"#F7151E"}
          textColor={COLOR.TEXT_WHITE_COLOR}
        ></Button>
      </div>
    </>
  );
};

export default Map;
