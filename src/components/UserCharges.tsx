"use client";
import { useState, type PropsWithChildren } from "react";

const btn =
  "bg-blue-500 text-white border-none hover:bg-blue-600 active:bg-blue-700 font-sans uppercase font-bold inline-flex cursor-pointer text-center no-underline px-5 py-2 text-sm";

export default function UserCharges({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [charges, setCharges] = useState<any[] | null>(null);

  async function getCharges() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const res = (await callUserAPI<any>({ fn: "getCharges", payload: {} })) ?? [];
    setCharges(res.data || []);
    setLoading(false);
  }

  return !charges ? (
    <button className={btn} onClick={getCharges}>
      {loading && children}
      {loading ? "loading..." : "get receipts"}
    </button>
  ) : (
    <>
      <button className={btn} onClick={() => setCharges(null)}>
        Hide Receipts
      </button>
      <ul>
        {charges.map((ch, i) => (
          <li key={i}>
            <a className="text-blue-500" target="_blank" href={ch.receipt_url}>
              {" "}
              {ch.id}
            </a>{" "}
            for
            <strong>${ch.amount / 100}</strong> on {new Date(ch.created * 1000).toLocaleDateString()}
          </li>
        ))}
      </ul>
      {!charges.length && <p>No charges found</p>}
    </>
  );
}
