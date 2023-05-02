import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import type { PropsWithChildren } from "react";

import AlgoliaSearch from "@/components/AlgoliaSearch";
import AppSignin from "@/components/AppSignin";
import ClientData from "@/components/ClientData";
import Footer from "@/components/Footer";
import HiMom from "@/components/HiMom";
import KeyBindings from "@/components/KeyBindings";
import Navbar from "@/components/Navbar";
import ScrollUp from "@/components/ScrollUp";
import ToastMessage from "@/components/ToastMessage";

export const metadata = {
  title: "Fireship - Learn to Code Faster",
  description: "Fast-paced video tutorials and challenging projects for the modern app developer.",
  metadataBase: new URL("https://fireship.io"),
  manifest: "/manifest.json",
  themeColor: "#454e56",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fireship - Learn to Code Faster",
    description: "Fast-paced video tutorials and challenging projects for the modern app developer.",
    url: "https://fireship.io",
    images: "/img/default-cover.png",
    type: "article",
  },
  twitter: {
    title: "Fireship - Learn to Code Faster",
    description: "Fast-paced video tutorials and challenging projects for the modern app developer.",
    site: "@fireship_dev",
    images: "/img/default-cover.png",
    card: "summary",
  },
  icons: {
    icon: "/img/favicon.png",
    apple: "/img/favicon.png",
  },
  other: {
    image: "/img/default-cover.png",
  },
};

const registerSWScript = 'if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));';

const cubano = localFont({
  src: "../../public/fonts/cubano.ttf",
  preload: true,
  display: "swap",
  variable: "--font-cubano",
});

const poppins = Montserrat({
  weight: ["500", "700"],
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`dark block text-[13px] lg:text-base scroll-smooth ${cubano.variable} ${poppins.variable}`}>
      <body>
        <ClientData>
          <KeyBindings>
            <Navbar />
            {children}
            <Footer />
            <AppSignin />
            <AlgoliaSearch />
            <HiMom />
            <ToastMessage />
            <ScrollUp>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  fill="currentColor"
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                />
              </svg>
            </ScrollUp>
          </KeyBindings>
        </ClientData>
        <Script id="reg-sw" dangerouslySetInnerHTML={{ __html: registerSWScript }} strategy="worker" />
      </body>
    </html>
  );
}
