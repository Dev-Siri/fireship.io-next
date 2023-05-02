"use client";
import { useEffect, type PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

export default function ClientData({ children }: PropsWithChildren) {
  useEffect(() => {
    const gatherUserData = async () => {
      const response = await fetch("/api/user-data");
      const userInfo = await response.json();

      useGlobalStore.setState(userInfo);
    };

    gatherUserData();
  }, []);

  return <>{children}</>;
}
