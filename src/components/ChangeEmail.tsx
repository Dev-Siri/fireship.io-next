"use client";
import { useState, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

export default function ChangeEmail({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");

  async function getSession() {
    const { callUserAPI, firebaseSignOut } = await import("@/utils/firebase");
    setLoading(true);
    const changed = await callUserAPI<boolean>({
      fn: "changeEmail",
      payload: { email },
    });

    if (changed) {
      await firebaseSignOut();
      useGlobalStore.setState({
        toast: {
          message: "Email updated, please sign back in",
          type: "success",
        },
      });
    }

    setLoading(false);
  }
  return !show ? (
    <span className="text-blue-500 text-sm cursor-pointer" onClick={() => setShow(true)}>
      change email
    </span>
  ) : (
    <>
      <input
        type="email"
        className="outline-none border-solid border-gray6 text-white bg-gray7 p-3 w-full font-sans mr-3 my-4"
        onChange={e => {
          setIsValid(e.target.validity.valid);
          setEmail(e.target.value);
        }}
        placeholder="new email"
        required
      />
      {confirmed ? (
        <button
          className="btn btn-blue bg-blue-500 text-white border-none hover:bg-blue-700 outline-none font-sans uppercase font-bold inline-flex cursor-pointer text-center shadow-md no-underline px-5 py-2 text-sm my-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={getSession}
          disabled={loading || !isValid || !email}
        >
          {loading && children}
          {loading ? "loading..." : "confirm change"}
        </button>
      ) : (
        <button
          className="btn btn-blue bg-blue-500 text-white border-none hover:bg-blue-700 outline-none font-sans uppercase font-bold inline-flex cursor-pointer text-center shadow-md no-underline px-5 py-2 text-sm my-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={() => setConfirmed(true)}
          disabled={loading || !isValid || !email}
        >
          change
        </button>
      )}
      <p className="text-yellow-500 text-sm">
        Be careful. If you enter the wrong email, you will not be able to access your account.
        <span onClick={() => setShow(false)} className="text-blue-500 text-sm cursor-pointer">
          nevermind
        </span>
      </p>
    </>
  );
}
