"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import { Geolocation } from "@/lib/types";

// Make sure to replace this with your own Mapbox access token.
// after all change this to env
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmlyZWNvZGUyMSIsImEiOiJjbGl1Nmw1bm0xa3hzM2xucTlkaG8xdGxuIn0.N1SQUe0YrBpfR4qnC0EWZA";

interface MapboxMapProps {
  zoom: number;
}
type MapLocation = {
  lat: number;
  lng: number;
};

const MainMap: React.FC<MapboxMapProps> = ({ zoom = 7 }) => {
  const [location, setLocation] = useState<MapLocation | null>(null);
  const [tiltAngle, setTiltAngle] = useState<number>(72);

  const rotationInterval = useRef<any | null>(null);

  const { lat, lng } = location || { lat: 52.2296, lng: 21.0067 };
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // If map was already created, return

    fetch("http://ip-api.com/json/")
      .then((response) => response.json())
      .then((data: Geolocation) =>
        setLocation({
          lat: data.lat,
          lng: data.lon,
        })
      )
      .then(() => {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

        map.current = new mapboxgl.Map({
          container: mapContainer.current as HTMLElement,
          style: "mapbox://styles/firecode21/cliu7tkof00ec01p7fu1p4mkl",
          attributionControl: false,
          center: [lng, lat],
          zoom: zoom,
          pitch: tiltAngle,
        });

        // Start the infinite rotation
        rotationInterval.current = setInterval(() => {
          let newBearing = map.current!.getBearing() + 1;
          map.current!.rotateTo(newBearing, { duration: 1000 });
        }, 100);

        // Add click event listener
        map.current!.on("click", () => {
          // Stop the rotation
          clearInterval(rotationInterval.current);

          // Reset pitch and bearing
          map.current!.easeTo({
            pitch: 0,
            bearing: 0,
            duration: 2000,
          });
        });
      });
  }, [lng, lat, zoom, tiltAngle]);

  return (
    <div
      className="relative inset-0 min-h-[96vh] lg:min-h-[90vh] shadow-xl"
      ref={mapContainer}
      style={{ width: "100%", height: "auto" }}
    >
      <div className="grid lg:grid-cols-12 lg:grid-rows-1 grid-cols-1 grid-rows-2 absolute inset-0 pointer-events-none">
        <div className="flex flex-col relative col-span-1 row-start-1 row-end-2 shadow-xl  lg:col-span-5 items-center  justify-center h-full backdrop-blur-sm lg:backdrop-blur  lg:pointer-events-auto ">
          <div className="flex text-center lg:text-start flex-col items-center justify-center lg:items-start px-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-black leading-10 drop-shadow-2xl">
              Welcome to GreenPin
            </h1>
            <h2 className="text-xl lg:text-2xl mt-4 font-light text-black leading-10 drop-shadow-2xl">
              Your Green Deed Starts Here
            </h2>
            <button className="px-8 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 pointer-events-auto">
              Get Started
            </button>
          </div>
          <div className="col-span-1 row-span-1 "></div>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
