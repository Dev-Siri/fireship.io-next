import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserData {
  email?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  joined?: number;
  stripeCustomerId?: string;
  discordId?: string;
  is_pro?: boolean;
  expires?: number;
  enterprise?: boolean;
  enterpriseOwner?: string;
  pro_status?: "lifetime" | "active" | "past_due" | "expiring" | "canceled" | "enterprise";
  products?: {
    [key: string]: boolean; // legacy course tracking
  };
  subscriptions?: {
    [key: string]: string;
  };
  courses?: {
    [key: string]: boolean;
  };
  sentMail?: {
    [key: string]: boolean;
  };
}

export interface UserProgress {
  xp: number;
  [key: string]: number;
}

export interface Toast {
  type?: "success" | "error" | "info";
  icon?: string;
  message: string;
  msg?: {
    delay?: number;
  };
}

interface GlobalStore {
  autoplay: boolean;
  modal: string | null;
  period: "month" | "quarter" | "year";
  showNavbar: boolean;
  toast: Toast | null;
  userData: UserData | null;
  userProgress: UserProgress | null;
  canAccess: boolean;
  currentCourse: any | null;
  seats: any | null;
}

const useGlobalStore = create(
  persist<GlobalStore>(
    () => ({
      autoplay: true,
      modal: null,
      period: "month",
      showNavbar: true,
      canAccess: false,
      toast: null,
      userData: null,
      currentCourse: null,
      userProgress: null,
      seats: null,
    }),
    { name: "globalData" }
  )
);

export const rootURL = "https://fireship.io";

export default useGlobalStore;
