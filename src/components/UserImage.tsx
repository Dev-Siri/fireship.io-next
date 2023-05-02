"use client";
import Image from "next/image";

import getClientUser from "@/utils/user/client";

export default function UserImage() {
  const user = getClientUser();

  return <Image src={user?.picture ?? "/img/ui/avatar.svg"} alt="avatar" height={48} width={48} className="max-w-full rounded-full" />;
}
