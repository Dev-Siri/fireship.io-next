"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

export default function AppleSignin({ children }: PropsWithChildren) {
  const router = useRouter();

  async function handleSigninWithApple() {
    const { signInWithApple } = await import("@/utils/firebase");
    const { setCookie } = await import("@/utils/cookies");

    const { res } = await signInWithApple();

    setCookie("auth_token", res);

    router.refresh();
  }

  return (
    <button
      className="bg-white font-sans text-black inline-flex text-base shadow-md px-4 py-3 my-0.5 w-full cursor-pointer border-none"
      onClick={handleSigninWithApple}
    >
      {children}
    </button>
  );
}
