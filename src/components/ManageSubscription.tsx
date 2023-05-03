"use client";
import { useState, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";
import { relativeTime } from "@/utils/helpers";

const btn =
  "border-none bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 font-sans uppercase font-bold inline-flex cursor-pointer text-center no-underline px-5 py-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed";

export default function ManageSubscription({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<any[] | null>(null);

  async function getSubscriptions() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const res = await callUserAPI<any>({ fn: "getSubscriptions", payload: {} });

    setSubs(res?.data || []);
    console.log(subs);

    setLoading(false);
  }

  async function cancel(subscription: string) {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);

    const res = await callUserAPI<any>({
      fn: "cancelSubscription",
      payload: { subscription },
    });

    if (res) {
      await getSubscriptions();
      useGlobalStore.setState({
        toast: {
          message: "Subscription canceled. It was fun while it lasted",
          type: "info",
        },
      });
    }

    setLoading(false);
  }

  async function uncancel(subscription: string) {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const res = await callUserAPI<any>({
      fn: "unCancelSubscription",
      payload: { subscription },
    });
    if (res) {
      await getSubscriptions();
      useGlobalStore.setState({
        toast: {
          message: "Subscription reactivated!",
          type: "success",
        },
      });
    }

    setLoading(false);
  }

  return !subs ? (
    <button onClick={getSubscriptions}>
      {loading && children}
      manage subscription
    </button>
  ) : (
    <>
      <button className={btn} onClick={() => setSubs(null)}>
        Hide Subscriptions
      </button>
      {subs.length ? (
        subs.map(sub => (
          <section className="p-6 my-4 bg-gray6 rounded-lg" key={sub.id}>
            <h3>ID: {sub.id}</h3>
            <p>PRO Status: {sub.status}</p>
            <p>
              Plan: ${sub.plan.amount / 100}
              per {sub.plan.interval_count}
              {sub.plan.interval_count > 1 ? sub.plan.interval + "s" : sub.plan.interval}
            </p>
            {sub.discount && (
              <p>
                Discount: %{sub.discount.coupon.percent_off} off {sub.discount.coupon.duration}
              </p>
            )}
            {!sub.canceled_at && (
              <>
                <p>Next payment {relativeTime(sub.current_period_end)}</p>
                <button className={`bg-red-500 hover:bg-red-600 active:bg-red-700 ${btn}`} onClick={() => cancel(sub.id)} disabled={loading}>
                  {loading && children}
                  Cancel Subscription
                </button>
              </>
            )}
            {sub.canceled_at && sub.status === "active" && (
              <>
                <p className="text-yellow-500">Your subscription is canceled. PRO access will end {relativeTime(sub.cancel_at)}</p>
                <button className={`bg-green-500 hover:bg-green-600 active:bg-green-700 ${btn}`} onClick={() => uncancel(sub.id)} disabled={loading}>
                  {loading && children}
                  Undo Cancellation
                </button>
              </>
            )}
          </section>
        ))
      ) : (
        <p>No subscriptions found</p>
      )}
    </>
  );
}
