// This is only for pages that benefit for SSG.
// For SSR (like dashboard/page.tsx), it is recommended to use
// `getServerUser()` and then use the normal ternary ? to : render the pages
"use client";
import { useEffect, useState, type ReactElement } from "react";

import getClientUser from "@/utils/user/client";

interface Props {
  show: ReactElement<any, any>;
  fallback?: ReactElement<any, any>;
}

export default function IfUser({ show, fallback }: Props) {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const user = getClientUser();
    setShowComponent(!!user);
  }, []);

  return showComponent ? show : (fallback as ReactElement<any, any>);
}
