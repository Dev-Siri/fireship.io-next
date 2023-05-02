"use client";
import type { PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

export default function AutoplayToggle({ children }: PropsWithChildren) {
  const { autoplay } = useGlobalStore();

  return (
    <label className="relative inline-block w-10 h-5">
      <input
        className="opacity-0 w-0 h-0 group"
        type="checkbox"
        checked={autoplay}
        onChange={e => useGlobalStore.setState({ autoplay: e.target.checked })}
      />
      {children}
    </label>
  );
}
