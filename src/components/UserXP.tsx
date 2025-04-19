"use client";
import useGlobalStore from "@/store/globalData";

export default function UserXP() {
  const { userProgress } = useGlobalStore();

  function formatXp(num: number) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(num);
  }

  return <>{formatXp(userProgress?.xp ?? 0)}</>;
}
