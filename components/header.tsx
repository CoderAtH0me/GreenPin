"use client";

import Link from "next/link";
import Logo from "./logo";
import MainMap from "./main-map-mapbox";

import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

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

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header>
      <nav className="z-30 backdrop-blur-md  fixed w-full drop-shadow-2xl border-b-[1px] border-neutral-650">
        <ul className="grid grid-cols-3 justify-items-center gap-x-10 py-2 ">
          <li>
            <Link className="" href={"/"}>
              <Logo />
            </Link>
          </li>
          <NavItems />
          <div className=" border-l-2 flex items-center justify-center border-neutral-300">
            <button className=" text-black px-4   border-neutral-400 hover:text-green-600">
              To Account
            </button>
            {user && (
              <button
                onClick={() => signOut()}
                className=" text-black px-4   border-neutral-400 hover:text-green-600"
              >
                Sign Out
              </button>
            )}
          </div>
        </ul>
      </nav>
      <MainMap user={user} zoom={6} />
    </header>
  );
};

export default Header;
