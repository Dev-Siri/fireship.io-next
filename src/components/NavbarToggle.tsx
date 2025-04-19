"use client";
import type { PropsWithChildren, ReactNode } from "react";

import useGlobalStore from "@/store/globalData";

interface Props extends PropsWithChildren {
  icon: ReactNode;
}

export default function NavbarToggle({ children, icon }: Props) {
  const { showNavbar } = useGlobalStore();

  return showNavbar ? (
    <>
      <div className="p-2 mr-4 flex justify-between">
        <span
          onClick={() => useGlobalStore.setState({ showNavbar: false })}
          className="border text-xs border-gray4 border-solid rounded-md p-1 px-2 cursor-pointer text-white hidden md:inline"
        >
          {icon}
          {/* <svg className="w-2 mx-1 relative top-[1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
          </svg> */}
          <span className="text">ctrl+b</span>
        </span>
      </div>
      {children}
    </>
  ) : (
    <>
      <div className="p-2 mr-4 flex justify-between">
        <span
          onClick={() => useGlobalStore.setState({ showNavbar: true })}
          className="border text-xs border-gray4 border-solid rounded-md p-1 px-2 cursor-pointer text-white hidden md:inline"
        >
          {/* <svg className="w-2 mx-1 relative top-[1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg> */}
          {icon}
        </span>
      </div>
      <span onClick={() => useGlobalStore.setState({ showNavbar: true })}>{children}</span>
    </>
  );
}
