"use client";
import { useMemo, useState, type PropsWithChildren, type ReactElement } from "react";

import useGlobalStore from "@/store/globalData";

const btn =
  "font-sans cursor-pointer bg-gray6 m-0 text-xs text-gray3 border outline-none border-solid rounded-sm border-blue-500 p-1.5 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-60 disabledcursor-not-allowed";

export default function SeatAssign({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");

  const { seats, userData } = useGlobalStore();

  const assignedSeats = useMemo(() => Object.keys(seats?.assigned || {}), [seats]);

  async function addSeat() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    await callUserAPI<string>({ fn: "seatAssign", payload: { email } });

    setLoading(false);
    setEmail("");
  }

  async function removeSeat(rmEmail: string) {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    await callUserAPI<string>({
      fn: "seatAssign",
      payload: { email: rmEmail, revoke: true },
    });
    setLoading(false);
  }

  return (userData?.enterprise && (
    <>
      <h2>Assign Seats</h2>
      <p>
        You have used {assignedSeats.length} of {seats?.seats} seats
      </p>
      <div className="flex flex-col max-w-[500px]">
        {assignedSeats ? (
          assignedSeats.map((seat, i) => (
            <div key={i} className="flex justify-between p-3 bg-gray6 my-1">
              {seat}
              <button className={`${btn} border-red-500 hover:bg-red-500 ml-2`} onClick={() => removeSeat(seat)} disabled={loading}>
                {" "}
                revoke{" "}
              </button>
            </div>
          ))
        ) : (
          <p>You have not assigned any seats yet</p>
        )}
        <div className="flex justify-between p-3 bg-gray6 my-1">
          <input
            className="outline-none border-none text-white bg-gray7 p-3 w-full font-sans mr-3"
            type="email"
            onChange={event => {
              setEmail(event.target.value);
              setIsValid(event.target!.validity.valid);
            }}
            placeholder="email"
            required
          />
          <button className={btn} onClick={addSeat} disabled={loading || !isValid || !email}>
            {loading && children}
            assign
          </button>
        </div>
      </div>
    </>
  )) as ReactElement<any, any>;
}
