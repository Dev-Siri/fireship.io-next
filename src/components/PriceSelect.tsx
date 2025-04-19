"use client";
import useGlobalStore from "@/store/globalData";

interface Props {
  show?: "amount" | "period" | "control";
}

const prices = {
  month: 29,
  quarter: 69,
  year: 199,
} as const;

const btn =
  "font-sans cursor-pointer bg-gray6 m-0 text-xs text-gray3 border outline-none border-solid rounded-md border-orange-500 p-1.5 hover:bg-orange-500 hover:text-white transition-all";
const activeBtn = "bg-orange-500 text-white";

export default function PriceSelect({ show = "amount" }: Props) {
  const { period } = useGlobalStore();

  switch (show) {
    case "amount":
      return (
        <>
          {prices[period]}
          <span className="font-sans text-base text-gray2">/{period}</span>
        </>
      );
    case "period":
      return <span>{period}</span>;
    case "control":
      return (
        <>
          <button className={`${btn} ${period === "month" && activeBtn}`} onClick={() => useGlobalStore.setState({ period: "month" })}>
            Month
          </button>
          <button className={`${btn} ${period === "quarter" && activeBtn}`} onClick={() => useGlobalStore.setState({ period: "quarter" })}>
            Quarter
          </button>
          <button className={`${btn} ${period === "year" && activeBtn}`} onClick={() => useGlobalStore.setState({ period: "year" })}>
            Year
          </button>
        </>
      );
  }
}
