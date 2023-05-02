"use client";
import { useMemo, useState, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

export default function DeleteAccount({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  async function handleDelete() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const deleted = await callUserAPI<boolean>({
      fn: "deleteAccount",
      payload: {},
    });

    if (deleted) {
      const { firebaseSignOut } = await import("@/utils/firebase");

      await firebaseSignOut();
      useGlobalStore.setState({
        toast: {
          message: "Account terminated, good luck in your future endeavors",
          type: "success",
        },
      });
    }

    setLoading(false);
  }

  function reset() {
    setShow(false);
    setFirstClick(false);
  }

  const btnText = useMemo(() => (firstClick ? "confirm destruction" : "delete account"), [firstClick]);

  return !show ? (
    <span className="text-blue-500 text-sm cursor-pointer" onClick={() => setShow(true)}>
      Delete this Account
    </span>
  ) : (
    <>
      <button
        className="bg-red-500 text-white border-none hover:bg-red-700 outline-none font-sans uppercase font-bold inline-flex cursor-pointer text-center shadow-md no-underline px-5 py-2 text-sm my-0.5 disabled:opacity-70 disabled:cursor-not-allowed btn-red"
        onClick={() => (firstClick ? handleDelete() : setFirstClick(true))}
        disabled={loading}
      >
        {loading && children}
        {loading ? "terminating..." : btnText}
      </button>
      {firstClick && (
        <p className="text-yellow-500 text-sm">
          Final warning! Once you click this button there&apos;s no going back. All account data is lost forever.
          <span onClick={reset} className="text-blue-500 text-sm cursor-pointer">
            nevermind
          </span>
        </p>
      )}
    </>
  );
}
