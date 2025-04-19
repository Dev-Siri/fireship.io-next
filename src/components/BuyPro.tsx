"use client";
import { useState, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";
import { products } from "@/store/products";

export default function BuyPro({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const { period } = useGlobalStore();

  async function getSession() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const price = products[period].price;
    const response = await callUserAPI<string>({
      fn: "createSubscriptionSession",
      payload: { price },
    });

    setUrl(response as string | null);

    if (url) window.open(url, "_blank")?.focus();
    setLoading(false);
  }

  return (
    <>
      <button
        className="btn btn-blue bg-blue-500 text-white border-none hover:bg-blue-700 outline-none font-sans uppercase font-bold inline-flex cursor-pointer text-center shadow-md no-underline px-5 py-2 text-sm my-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={getSession}
        disabled={loading}
      >
        {loading && children}
        {loading ? "loading..." : "subscribe"}
      </button>

      {url && (
        <a className="text-blue-500 block text-center text-sm" target="_blank" href={url}>
          Open Checkout Page
        </a>
      )}
    </>
  );
}
