"use client";
import { PropsWithChildren, ReactElement, useMemo } from "react";

import useGlobalStore, { rootURL } from "@/store/globalData";
import { products } from "@/store/products";
import { getCourseIdFromURL } from "@/utils/helpers";

export function IfPro({ children }: PropsWithChildren) {
  const { userData } = useGlobalStore();

  return (userData?.is_pro && children) as ReactElement<any, any>;
}

export function IfBasic({ children }: PropsWithChildren) {
  const { userData } = useGlobalStore();

  return (!userData?.is_pro && children) as ReactElement<any, any>;
}

export function IfLifetime({ children }: PropsWithChildren) {
  const { userData } = useGlobalStore();

  return (userData?.pro_status === "lifetime" && children) as ReactElement<any, any>;
}

export function IfEnterprise({ children }: PropsWithChildren) {
  const { userData } = useGlobalStore();

  return (userData?.enterprise && children) as ReactElement<any, any>;
}

export function IfCanceled({ children }: PropsWithChildren) {
  const { userData } = useGlobalStore();

  return (userData?.pro_status === "canceled" && children) as ReactElement<any, any>;
}

interface IfAccessProps {
  free?: boolean;
  show: ReactElement<any, any>;
  fallback?: ReactElement<any, any>;
}

export function IfAccess({ show, fallback, free }: IfAccessProps) {
  const { userData } = useGlobalStore();

  const canAccess = useMemo(() => {
    const id = getCourseIdFromURL(rootURL);
    return !!(userData?.is_pro || userData?.courses?.[id] || userData?.products?.[(products as any)[id]?.legacy_sku]);
  }, [userData]);

  return free || canAccess ? show : (fallback as ReactElement<any, any>);
}
