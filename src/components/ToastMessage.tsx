"use client";
import useGlobalStore, { type Toast } from "@/store/globalData";
import { useEffect, useMemo, useState } from "react";

const defaultIcons = {
  success: "✔️",
  error: "☠️",
  info: "💡",
};

export default function ToastMessage() {
  const [activate, setActivate] = useState(false);
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);

  useEffect(() => {
    let firstTimeout: NodeJS.Timeout;
    let secondTimeout: NodeJS.Timeout;

    useGlobalStore.subscribe(({ toast }) => {
      setCurrentToast(toast);
      clearTimeout(firstTimeout);
      if (toast?.msg) {
        firstTimeout = setTimeout(() => {
          useGlobalStore.setState({ toast: null });
        }, toast?.msg?.delay || 10000);

        // delay hack for better animations
        setActivate(false);
        secondTimeout = setTimeout(() => {
          setActivate(true);
        }, 200);
      }
    });

    return () => {
      clearInterval(firstTimeout);
      clearInterval(secondTimeout);
    };
  }, []);

  const typeClass = useMemo(() => currentToast?.type || "info", [currentToast]);

  return (
    currentToast && (
      <aside
        className={`flex cursor-pointer opacity-0 invisible transition-all ease-in-out z-[999] ${activate && "translate-x-0 visible opacity-100"}`}
        onClick={() => useGlobalStore.setState({ toast: null })}
      >
        <section
          className={`bg-black bg-opacity-50 text-white shadow-xl p-4 hover:line-through ${typeClass === "success" && "text-green-500"} ${
            typeClass === "error" && "text-red-500"
          }`}
        >
          {currentToast.message}
        </section>
        <section className="text-white font-display shadow-xl text-lg w-10 px-2 py-1 grid place-items-center bg-black bg-opacity-80">
          {currentToast.icon ?? defaultIcons[currentToast.type ?? "info"]}
        </section>
      </aside>
    )
  );
}
