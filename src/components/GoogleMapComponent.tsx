"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

type Poi = { key: string; location: google.maps.LatLngLiteral; color: string };
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const locations: Poi[] = [
  {
    key: "operaHouse",
    location: { lat: -33.8567844, lng: 151.213108 },
    color: getRandomColor(),
  },
  {
    key: "tarongaZoo",
    location: { lat: -33.8472767, lng: 151.2188164 },
    color: getRandomColor(),
  },
  {
    key: "manlyBeach",
    location: { lat: -33.8209738, lng: 151.2563253 },
    color: getRandomColor(),
  },
  {
    key: "hyderPark",
    location: { lat: -33.8690081, lng: 151.2052393 },
    color: getRandomColor(),
  },
  {
    key: "theRocks",
    location: { lat: -33.8587568, lng: 151.2058246 },
    color: getRandomColor(),
  },
  {
    key: "circularQuay",
    location: { lat: -33.858761, lng: 151.2055688 },
    color: getRandomColor(),
  },
  {
    key: "harbourBridge",
    location: { lat: -33.852228, lng: 151.2038374 },
    color: getRandomColor(),
  },
  {
    key: "kingsCross",
    location: { lat: -33.8737375, lng: 151.222569 },
    color: getRandomColor(),
  },
  {
    key: "botanicGardens",
    location: { lat: -33.864167, lng: 151.216387 },
    color: getRandomColor(),
  },
  {
    key: "museumOfSydney",
    location: { lat: -33.8636005, lng: 151.2092542 },
    color: getRandomColor(),
  },
  {
    key: "AAAAAAAAA",
    location: { lat: -36.8636005, lng: 151.2092542 },
    color: "#fff",
  },
];

const GoogleMapComponent = () => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        streetViewControl={false}
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        mapId="DEMO_MAP_ID"
        fullscreenControl={false}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      >
        <PoiMarkers pois={locations} />
      </Map>
    </APIProvider>
  );
};

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
        >
          <Pin
            background={poi.color}
            glyphColor={"#000"}
            borderColor={"#000"}
            glyph={"1"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default GoogleMapComponent;
