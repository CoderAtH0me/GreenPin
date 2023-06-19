"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Link from "next/link";

import { Geolocation } from "@/lib/types";

import LoginModal from "./modals/login-modal";
import BlurImage from "./blur-image";

import { User } from "@prisma/client";

interface MapboxMapProps {
  zoom: number;
  user: User | null;
}
type MapLocation = {
  lat: number;
  lng: number;
};

const MainMap: React.FC<MapboxMapProps> = ({ user, zoom = 7 }) => {
  const [location, setLocation] = useState<MapLocation | null>(null);
  const [tiltAngle, setTiltAngle] = useState<number>(72);
  const [open, setOpen] = useState<boolean>(false);

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
        mapboxgl.accessToken =
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

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
        {!user ? (
          <div className="flex flex-col relative col-span-1 row-start-1 row-end-2 shadow-xl  lg:col-span-5 items-center  justify-center h-full backdrop-blur-sm lg:backdrop-blur  lg:pointer-events-auto ">
            <div className="flex text-center lg:text-start flex-col items-center justify-center lg:items-start px-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-10 drop-shadow-2xl">
                Welcome to GreenPin
              </h1>
              <h2 className="text-xl lg:text-2xl mt-4 font-light text-black leading-10 drop-shadow-2xl">
                Your Green Deed Starts Here
              </h2>
              <div className="relative">
                <LoginModal />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col relative col-span-1 row-start-1 row-end-2 shadow-xl lg:col-span-2 items-center justify-around h-full backdrop-blur-sm lg:backdrop-blur  lg:pointer-events-auto">
            <div className="flex flex-col items-center justify-center backdrop-blur-3xl p-10 rounded-md shadow-2xl">
              <BlurImage
                className="rounded-full drop-shadow-xl border"
                width={100}
                height={100}
                alt="profile"
                src={user?.image || ""}
              />

              <p>{user?.name}</p>
            </div>
            <Link
              className="text-xl bg-green-600 hover:bg-green-800 text-white py-2 px-8 rounded-md"
              href="/dashboard"
            >
              Make Pin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMap;
