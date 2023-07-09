"use client";
import { useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { usePathname } from "next/navigation";
import type { SignInState } from "./AppSignin";

interface Props {
  state: SignInState;
}

export default function EmailSignin({ state }: Props) {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const pathname = usePathname();

  const emailEl = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="pathname" value={pathname} />
      <input
        className={`bg-gray7 bg-opacity-30 text-white text-lg block py-3 px-1 w-full border-b-4 border-b-white border-t-0 border-r-0 border-l-0 rounded-none outline-none focus-visible:outline-none valid:border-b-green-500 ${
          isTouched && "border-b-4 border-b-blue-500"
        }`}
        type="email"
        name="email"
        id="email"
        ref={emailEl}
        onChange={() => setIsValid(emailEl.current!.validity.valid)}
        onFocus={() => {
          if (!isTouched) setIsTouched(true);
        }}
        required
      />
      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.confirmation && <p className="text-green-500 text-sm">{state.confirmation}</p>}
      <button
        className={`bg-blue-500 font-sans text-white font-bold inline-block text-center shadow-md px-4 py-3 my-2 w-auto border-none cursor-pointer hover:bg-blue-500 ${
          (!isValid || pending) && "opacity-50 cursor-not-allowed"
        }`}
        type="submit"
      >
        {pending ? "sending..." : "send"}
      </button>
    </>
  );
}
