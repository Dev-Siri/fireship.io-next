"use client";
import { useState, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";
import { products } from "@/store/products";

interface Props extends PropsWithChildren {
  enterprise?: boolean;
}

const btnO =
  "font-sans cursor-pointer bg-gray6 m-0 text-xs text-gray3 border outline-none border-solid rounded-sm border-orange-500 p-1.5 hover:bg-orange-500 hover:text-white transition-all";

export default function BuyLifetime({ children, enterprise }: Props) {
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState(5);
  const [url, setUrl] = useState<string | null>("");

  const text = enterprise ? "upgrade my team" : "upgrade for life";
  const price = enterprise ? products.enterprise.price : products.lifetime.price;

  function handleSeatChange(val: number) {
    setSeats(val);
    if (seats < 5) {
      setSeats(5);
      useGlobalStore.setState({ toast: { message: "This plan has a 5 seat minimum", type: "error" } });
    }
    if (seats > 50) {
      setSeats(50);
      useGlobalStore.setState({
        toast: {
          message: "Maximum 50 seats. Contact for larger plans",
          type: "error",
        },
      });
    }
  }

  async function getSession() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const response = await callUserAPI<string>({
      fn: "createPaymentSession",
      payload: {
        productType: enterprise ? "enterprise" : "lifetime",
        price,
        seats: enterprise ? seats : 1,
      },
    });

    setUrl(response as string | null);

    if (url) window.open(url, "_blank")?.focus();

    setLoading(false);
  }

  return (
    <>
      {enterprise && (
        <div className="text-center my-3">
          <button className={btnO} onClick={() => handleSeatChange(seats - 1)}>
            -
          </button>
          <input
            type="number"
            className="outline-none border-none text-white mx-auto bg-gray7 p-2 w-12 text-center"
            value={seats}
            onChange={e => {
              handleSeatChange(e.target.valueAsNumber);
            }}
            min="5"
            max="50"
          />
          <button className={btnO} onClick={() => handleSeatChange(seats + 1)}>
            +
          </button>
        </div>
      )}
      <button
        onClick={getSession}
        className={`bg-purple-500 text-white border-none hover:bg-purple-700 outline-none font-sans uppercase font-bold inline-flex cursor-pointer text-center shadow-md no-underline px-5 py-2 text-sm my-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${
          enterprise && "bg-blue-500 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading && children}
        {loading ? "loading..." : text}
      </button>
      {url && (
        <a className="text-blue-500 block text-center text-sm" target="_blank" href={url}>
          Open Checkout Page
        </a>
      )}
    </>
  );
}
