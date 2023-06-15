"use client";

import { useState } from "react";

import { MapPin } from "lucide-react";
import { SmilePlus } from "lucide-react";

import Accordion from "../accordion";
import BlurImage from "../blur-image";

const featuresItems = [
  {
    key: "SpotNPin",
    title: "Spot & Pin",
    description:
      "Identify litter hotspots in your area and mark them on our map – your first step towards a cleaner environment.",
    icon: <MapPin className="h-5 w-5" />,
    thumbnail: "/images/features/navigation-animate.svg",
  },
  {
    key: "join",
    title: "Join Nearby Events",
    description:
      "Discover clean-up events happening near you, sign up, and collaborate on the perfect date – your adventure begins here.",
    icon: <SmilePlus />,
    thumbnail: "/images/features/reforestation-animate.svg",
  },
  {
    key: "share",
    title: "Share & Celebrate",
    description:
      "Enjoy a community celebration post clean-up, share success stories, and earn rewards – make an impact and have fun doing it.",
    thumbnail: "/images/features/water-pollution-animate.svg",
  },
];

const Features = () => {
  const [openTab, setOpenTab] = useState(0);

  return (
    <section className="lg:px-[120px] px-4 lg:py-[60px] min-h-[96vh]">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-5 max-w-md sm:max-w-xl mx-auto items-center justify-center">
          <div className="">
            <h1 className="text-5xl font-bold text-center">
              Empowering Tools for <br></br>
              <span className=" bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent">
                Eco-Warriors
              </span>
            </h1>
            <h3 className="text-lg font-light mt-8 text-center">
              GreenPin is more than just a clean-up app. We&apos;ve assembled a
              set of dynamic features that enable you to drive environmental
              change and create a greener community, one pin at a time.
            </h3>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border rounded-md shadow-xl">
          <div className="grid grid-cols-1  lg:grid-cols-3">
            <Accordion
              open={openTab}
              setOpen={setOpenTab}
              items={featuresItems.map(({ key, title, description, icon }) => ({
                trigger: (
                  <div className="flex  items-center  space-x-3">
                    {icon}
                    <h3>{title}</h3>
                  </div>
                ),
                content: (
                  <div className="text-lg p-3">
                    <p>{description}</p>
                  </div>
                ),
              }))}
            />
            <div className="relative lg:col-span-2">
              {featuresItems.map(({ key, title, thumbnail }, index) => {
                if (index === openTab)
                  return (
                    <BlurImage key={key} src={thumbnail} alt={title} fill />
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
