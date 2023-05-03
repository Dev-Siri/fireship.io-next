"use client";
import { useState, type PropsWithChildren } from "react";

export default function CustomPortal({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  async function getSession() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const redirectURL = await callUserAPI<string>({
      fn: "createPortalSession",
      payload: {},
    });
    if (redirectURL) window.open(redirectURL, "_blank")?.focus();
    setLoading(false);
  }

  return (
    <button
      className="border-none bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 font-sans uppercase font-bold inline-flex cursor-pointer text-center no-underline px-5 py-2 text-sm"
      onClick={getSession}
    >
      {loading && children}
      {loading ? "loading..." : "subscription & invoices"}
    </button>
  );
}
