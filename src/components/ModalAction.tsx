"use client";
import type { PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

interface Props extends PropsWithChildren {
  type?: "open" | "close";
  name: string;
}

export default function ModalAction({ type = "open", name = "default", children }: Props) {
  return <span onClick={() => useGlobalStore.setState({ modal: type === "open" ? name : null })}>{children}</span>;
}
