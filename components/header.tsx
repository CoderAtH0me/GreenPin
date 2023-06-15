"use client";

import Link from "next/link";
import Logo from "./logo";
import MainMap from "./main-map-mapbox";
import BlurImage from "./blur-image";
import Image from "next/image";

function NavItems() {
  return (
    <ul className="flex items-center justify-end space-x-10 ">
      <li className="hover:text-green-600">
        <Link href={"/pin"}>Make Pin</Link>
      </li>
      <li className="hover:text-green-600">
        <Link href={"/about"}>About</Link>
      </li>
      <li className="hover:text-green-600">
        <Link href={"/changelog"}>Changelog</Link>
      </li>
    </ul>
  );
}

const Header: React.FC = () => {
  return (
    <header>
      <nav className="z-30 backdrop-blur-md  fixed w-full drop-shadow-2xl border-b-[1px] border-neutral-650">
        <ul className="grid grid-cols-3 justify-items-center gap-x-10 py-2 ">
          <li>
            <Link className="" href={"/"}>
              <Image
                src="/logos/logo-2.svg"
                width={100}
                className=""
                height={35}
                alt="logo"
              />
            </Link>
          </li>
          <NavItems />
          <div className=" border-l-2 flex items-center justify-center border-neutral-300">
            <button className=" text-black px-4   border-neutral-400 hover:text-green-600">
              To Account
            </button>
          </div>
        </ul>
      </nav>
      <MainMap zoom={7} />
    </header>
  );
};

export default Header;
