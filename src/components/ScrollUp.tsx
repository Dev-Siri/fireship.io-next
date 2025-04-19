"use client";
import { useEffect, useState, type PropsWithChildren } from "react";

export default function ScrollUp({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollSpy = () => setShow(window.scrollY > 250);

  useEffect(() => {
    window.addEventListener("scroll", scrollSpy);

    return () => window.removeEventListener("scroll", scrollSpy);
  }, []);

  return (
    <button
      onClick={scrollUp}
      className={`fixed bottom-10 right-5 text-gray4 bg-black bg-opacity-50 rounded-full w-10 h-10 outline-none border-none opacity-0 translate-y-8 transition-all cursor-pointer p-0 grid place-items-center hover:text-orange-500 ${
        show && "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </button>
  );
}
