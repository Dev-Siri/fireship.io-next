"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

export default function GoogleSignin({ children }: PropsWithChildren) {
  const router = useRouter();

  async function handleGoogleSignin() {
    const { signInWithGoogle } = await import("@/utils/firebase");
    const { setCookie } = await import("@/utils/cookies");

    const { res } = await signInWithGoogle();

    setCookie("auth_token", res);

    router.refresh();
  }

  return (
    <button
      className="bg-white font-sans text-base text-black inline-flex shadow-md px-4 py-3 my-0.5 w-full cursor-pointer border-none"
      onClick={handleGoogleSignin}
    >
      {children}
    </button>
  );
}
