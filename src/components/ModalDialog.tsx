"use client";
import useGlobalData from "@/store/globalData";

import type { PropsWithChildren, ReactElement } from "react";

interface Props extends PropsWithChildren {
  name: string;
  esc?: boolean;
}

export default function ModalDialog({ name = "default", esc, children }: Props) {
  const { modal } = useGlobalData();

  const closeDialog = () => useGlobalData.setState({ modal: null });

  return (modal === name && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50" onClick={closeDialog}>
      <dialog
        open
        onClick={e => e.stopPropagation()}
        className="bg-gray6 text-gray2 px-8 py-12 mx-5 shadow-4xl rounded-md max-w-full w-3/4 md:w-auto overflow-y-auto relative"
      >
        {esc && (
          <kbd
            className="cursor-pointer absolute top-6 right-6 text-xs text-gray3 border border-solid drop-shadow-md rounded-md border-orange-500 bg-opacity-50 p-1.5 hover:bg-orange-500 hover:text-white transition-all"
            onClick={closeDialog}
          >
            esc
          </kbd>
        )}
        {children}
      </dialog>
    </div>
  )) as ReactElement<any, any>;
}
