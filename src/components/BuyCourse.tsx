"use client";
import { useMemo, useState, type PropsWithChildren } from "react";

import { rootURL } from "@/store/globalData";
import { usePathname } from "next/navigation";

import { products } from "@/store/products";
import { getCourseIdFromURL } from "@/utils/helpers";

export default function BuyCourse({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const pathname = usePathname();

  const currentCourse = useMemo(() => {
    const id = getCourseIdFromURL(`${rootURL}/${pathname}`);
    return id && (products as any)[id];
  }, [pathname]);

  async function getSession() {
    const { callUserAPI } = await import("@/utils/firebase");

    setLoading(true);
    const response = await callUserAPI<string>({
      fn: "createPaymentSession",
      payload: {
        productId: currentCourse.id,
        price: currentCourse.price,
        productType: "course",
      },
    });
    setUrl(response as string | null);
    if (url) window.open(url, "_blank")?.focus();
    setLoading(false);
  }

  return (
    <>
      {currentCourse?.price ? (
        <>
          <span onClick={getSession} className="btn font-display text-blue-500 cursor-pointer text-xl">
            {loading && children}
            {loading ? "loading..." : "buy this course"}
          </span>
          for <strong className="font-display">${currentCourse?.amount}</strong>.
        </>
      ) : (
        <span className="btn font-display text-xl text-yellow-500 cursor-default">Course not available for single purchase</span>
      )}
      {url && (
        <a className="text-blue-500 block text-center text-sm" target="_blank" href={url}>
          Open Checkout Page
        </a>
      )}
    </>
  );
}
