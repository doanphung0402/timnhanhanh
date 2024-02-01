import React, { useEffect, useState, useRef } from "react";
import { Map, Draggable, Marker, ZoomControl } from "pigeon-maps";

export default function MapAddressRoom({ newAnchor }) {
  const [userLocation, setUserLocation] = useState(null);
  const [anchor, setAnchor] = useState(newAnchor);
  const [hue, setHue] = useState(0);

  const anchorRef = useRef(newAnchor);
  const [zoom, setZoom] = useState(15);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.log(`Error getting location: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = ({ latLng }) => {
    setAnchor(latLng);
  };

  useEffect(() => {
     if (newAnchor==[] || newAnchor==null || newAnchor == undefined){
        getCurrentPosition();
     }
  }, []);

  useEffect(() => {
    anchorRef.current = newAnchor;
    setAnchor(newAnchor);

    // Automatically move and zoom to the anchor position
    if (newAnchor) {
      setCenter(newAnchor);
      setZoom(18); // You can adjust the zoom level as needed
    }
  }, [newAnchor]);

  const handleViewChange = ({ center, zoom }) => {
    setZoom(zoom);
  };

  const setCenter = (position) => {
    // Set the center of the map to the specified position
    setZoom(18); // Set the initial zoom level
  };

  return (
    userLocation && (
      <div>
        <Map
          height={"300px"}
          width={"600px"}
          defaultCenter={userLocation}
          defaultZoom={10}
          center={userLocation}
          zoom={zoom}
          onClick={handleMapClick}
          onViewChange={handleViewChange}
        >
          <ZoomControl />
          <Draggable anchor={anchor} onDragEnd={setAnchor}>
            {anchor && (
              <Marker
                width={50}
                anchor={anchor}
                color={"red"}
                onClick={() => setHue(hue + 20)}
              />
            )}
          </Draggable>
        </Map>
      </div>
    )
  );
}
