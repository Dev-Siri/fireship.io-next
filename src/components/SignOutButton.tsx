"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

import useGlobalStore from "@/store/globalData";

export default function SignOutButton({ children }: PropsWithChildren) {
  const router = useRouter();

  async function handleSignOut() {
    const { firebaseSignOut } = await import("@/utils/firebase");

    await firebaseSignOut();

    useGlobalStore.setState({ user: null });

    router.refresh();
  }

  return (
    <button className="btn" onClick={handleSignOut}>
      {children}
    </button>
  );
}
