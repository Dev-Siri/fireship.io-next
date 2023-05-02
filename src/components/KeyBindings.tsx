"use client";
import { useEffect } from "react";

import type { PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

console.log(
  `%c  
.d888 d8b                           888      d8b          
d88P"  Y8P                          888      Y8P          
888                                 888                   
888888 888 888d888 .d88b.  .d8888b  88888b.  888 88888b.  
888    888 888P"  d8P  Y8b 88K      888 "88b 888 888 "88b 
888    888 888    88888888 "Y8888b. 888  888 888 888  888 
888    888 888    Y8b.          X88 888  888 888 888 d88P 
888    888 888     "Y8888   88888P' 888  888 888 88888P"  
                                                 888      
                                                 888      
                                                 888      `,
  "font-family: monospace; color: orange;"
);

export default function KeyBindings({ children }: PropsWithChildren) {
  useEffect(() => {
    const special = "himom";
    let buffer = "";

    function handleSpecialKeys(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "b") {
        console.log("ctrlb");
        e.preventDefault();
        useGlobalStore.setState(state => ({ showNavbar: !state.showNavbar }));
      }

      if (e.key === "Escape") useGlobalStore.setState({ modal: null });

      if (e.key === "/" || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        useGlobalStore.setState({ modal: "search" });
      }

      if (!special.includes(e.key)) return (buffer = "");

      buffer += e.key;
      if (buffer === special) {
        console.log("HI MOM!");
        useGlobalStore.setState({ modal: "himom" });
        buffer = "";
      }

      if (!special.includes(buffer)) buffer = "";
    }

    window.addEventListener("keydown", handleSpecialKeys);

    return () => window.removeEventListener("keydown", handleSpecialKeys);
  }, []);

  return <>{children}</>;
}
