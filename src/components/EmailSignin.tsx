"use client";
import { useRef, useState, type FormEvent } from "react";

export default function EmailSignin() {
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const emailEl = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { sendPasswordlessEmail } = await import("@/utils/firebase");

    setLoading(true);
    const { res, serverError } = await sendPasswordlessEmail(emailEl.current!.value, window.location.href);

    setLoading(false);
    setError(serverError!);
    setConfirmation(res);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-gray3 font-bold" htmlFor="email">
        Email
      </label>
      <input
        className={`bg-gray7 bg-opacity-30 text-white text-lg block py-3 px-1 w-full border-b-4 border-b-white border-t-0 border-r-0 border-l-0 rounded-none outline-none focus-visible:outline-none valid:border-b-green-500 ${
          isTouched && "border-b-4 border-b-blue-500"
        }`}
        type="email"
        name="email"
        ref={emailEl}
        onChange={() => setIsValid(emailEl.current!.validity.valid)}
        onFocus={() => {
          if (!isTouched) setIsTouched(true);
        }}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {confirmation && <p className="text-green-500 text-sm">{confirmation}</p>}
      <input
        className={`bg-blue-500 font-sans text-white font-bold inline-block text-center shadow-md px-4 py-3 my-2 w-auto border-none cursor-pointer hover:bg-blue-500 ${
          (!isValid || loading) && "opacity-50 cursor-not-allowed"
        }`}
        type="submit"
        value={loading ? "sending..." : "send"}
      />
    </form>
  );
}
