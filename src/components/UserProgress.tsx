"use client";
import useGlobalStore from "@/store/globalData";

export default function UserProgress() {
  const { userProgress } = useGlobalStore();

  return <>{userProgress?.xp?.toLocaleString("en", { notation: "compact" }) ?? 0} </>;
}
