import lazy from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// SVGs
import LoginIcon from "./icons/Login";
import SearchIcon from "./icons/Search";

import { IfPro } from "./ConditionalUserDataRender";
import IfUser from "./IfUser";
import UserAvatar from "./UserAvatar";

const ModalAction = lazy(() => import("./ModalAction"));

export default function Navbar() {
  return (
    <nav className="flex justify-between container p-6 md:p-8">
      <Link className="flex justify-center items-center text-center w-12 h-12 logo-gif" href="/">
        <Image src="/img/logo.svg" priority alt="logo" height={1025} width={1024} id="logo" />
        <Image src="/img/fire.gif" alt="fire background" height={443} width={377} id="logoBg" className="relative bottom-1 left-1" />
      </Link>
      <ul className="flex justify-center items-center">
        <IfPro>
          <li className="mx-2 md:mx-4 hover:scale-105 transition-transform">
            <Link
              href="/pro"
              className="text-base font-display text-green-500 border-green-400 border rounded-md px-2 py-1 hover:drop-shadow-[0_0_9px_rgba(34,197,94,0.9)]"
            >
              PRO
            </Link>
          </li>
        </IfPro>
        <li className="mx-2 md:mx-4 hover:scale-105 transition-transform">
          <Link href="/lessons" className="font-sans text-xl font-bold leading-none text-gray2 hover:text-white">
            labs
          </Link>
        </li>
        <li className="mx-2 md:mx-4 hover:scale-105 transition-transform">
          <Link href="/courses" className="font-sans text-xl font-bold leading-none text-gray2 gradient-slide">
            courses
          </Link>
        </li>
        <li className="ml-2">
          <ModalAction type="open" name="search">
            <button className="p-2 mr-2 hidden md:flex justify-between items-center bg-white bg-opacity-10 hover:bg-opacity-20 border border-gray4 hover:border-purple-500 shadow-xl hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all">
              <span className="text-gray2 w-4 mx-2">
                <SearchIcon />
              </span>
              <span className="mr-12">Search</span>
              <span className="mx-2 text-xs border border-gray4 rounded-md p-1 px-2">/</span>
            </button>
            <button className="flex md:hidden">
              <span className="text-gray2 w-6 mx-2" title="search">
                <SearchIcon />
              </span>
            </button>
          </ModalAction>
        </li>
        <li className="ml-2 mr-6 relative">
          <IfUser
            show={<UserAvatar />}
            fallback={
              <ModalAction name="signin" type="open">
                <button className="relative font-display hidden md:inline-block px-4 py-2 text-xl text-black hover:text-white bg-white hover:bg-purple-600 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300">
                  login
                </button>
                <button className="flex md:hidden">
                  <span className="text-gray2 w-6 mx-2">
                    <LoginIcon />
                  </span>
                </button>
              </ModalAction>
            }
          />
        </li>
      </ul>
    </nav>
  );
}
