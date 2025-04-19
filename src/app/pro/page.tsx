import lazy from "next/dynamic";
import Image from "next/image";

import { IfPro } from "@/components/ConditionalUserDataRender";
import LoadingSpinner from "@/components/LoadingSpinner";

const ModalAction = lazy(() => import("@/components/ModalAction"));
const ModalDialog = lazy(() => import("@/components/ModalDialog"));
const PriceSelect = lazy(() => import("@/components/PriceSelect"));
const BuyLifetime = lazy(() => import("@/components/BuyLifetime"));
const BuyPro = lazy(() => import("@/components/BuyPro"));

export const metadata = {
  title: "pro",
  description: "Upgrade to a pro membership",
  openGraph: {
    title: "pro",
    description: "Upgrade to a pro membership",
  },
  twitter: {
    title: "pro",
    description: "Upgrade to a pro membership",
  },
};

export default function Pro() {
  return (
    <main className="container prose dark:prose-invert p-8">
      <header className="text-center max-w-lg mx-auto">
        <h1>
          Become an <span className="gradient-text-pink">awesome</span> developer
        </h1>
        <p className="text-lg text-gray4">
          Learn the essential skills for modern fullstack app development while having{" "}
          <ModalAction type="open" name="meme">
            <strong className="text-green-400 font-black underline cursor-pointer">tons of fun</strong>
          </ModalAction>{" "}
          in the process.
        </p>
        <IfPro>
          <div className="rounded-lg p-6 bg-gray6 mb-8">
            <h3 className="text-green-500 mt-1">🦄 You are a pro member!</h3>
            <p>Only use this page if purchasing a gift or enterprise account</p>
          </div>
        </IfPro>
      </header>
      <div className="flex flex-col md:flex-row md:items-stretch text-center justify-center items-center mx-auto">
        <div className="flex flex-col items-center justify-center bg-gray6 rounded-xl shadow-xl border-y-8 border-orange-500 p-6 w-full md:w-1/3 m-2 max-w-md">
          <h5 className="text-orange-300">Plan</h5>
          <div>
            <span className="text-3xl font-light">$</span>
            <span className="text-6xl font-display gradient-text">
              <PriceSelect />{" "}
            </span>
            <div className="mt-3">
              <PriceSelect show="control" />{" "}
            </div>
          </div>
          <ul className="list-none text-left p-0 w-xl my-auto">
            <li className="check-green">Unlimited access to PRO courses</li>
            <li className="check-green">Quizzes with hand-picked meme prizes</li>
            <li className="check-green">Invite to private Discord chat</li>
            <li className="check-logo">Free Sticker mailed to your door</li>
          </ul>
          <BuyPro>
            <LoadingSpinner />
          </BuyPro>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray6 rounded-xl shadow-xl border-y-8 border-green-500 p-6 w-full md:w-1/3 m-2 max-w-md">
          <h5 className="text-green-300">Lifetime</h5>
          <div>
            <span className="text-3xl font-light">$</span>
            <span className="text-6xl font-display gradient-text-green">399</span>
            <span>once</span>
          </div>
          <ul className="list-none p-0 text-left my-auto">
            <li className="check-green">All PRO-tier benefits</li>
            <li className="check-green">Single payment, lifetime access</li>
            <li className="check-green">4,200 bonus xp points</li>
            <li className="check-logo">
              Next Level{" "}
              <span className="underline cursor-pointer">
                <ModalAction type="open" name="tshirt">
                  T-shirt
                </ModalAction>
              </span>{" "}
              shipped worldwide
            </li>
          </ul>
          <BuyLifetime>
            <LoadingSpinner />
          </BuyLifetime>
        </div>
      </div>
      <ModalDialog name="meme" esc>
        <Image className="max-w-md mx-auto" height={448} width={448} src="/img/easter-egg.webp" alt="programming is hard" />
        <p>
          Yo! You just found a 20% discount using 👉 <strong>EASTEREGG</strong>
        </p>
      </ModalDialog>
      <ModalDialog name="tshirt" esc>
        <Image className="max-w-md mx-auto" height={448} width={448} src="/img/tshirt.png" alt="Fireship T-shirt" />
        <p>High-quality fitted cotton shirt produced by Next Level Apparel</p>
      </ModalDialog>
      <div className="flex flex-col text-center justify-center items-center mx-auto">
        <h3>Level up your Team</h3>
        <p className="text-lg text-gray4 max-w-lg">Looking to signup of 5 seats or more? Get a big discount with personalized video call setup</p>
        <div className="flex flex-col items-center justify-center bg-gray6 rounded-xl shadow-xl border-y-8 border-blue-500 p-6 w-full md:w-1/3 m-2 max-w-md">
          <h5 className="text-blue-300">Enterprise</h5>
          <div>
            <span className="text-3xl font-light">$</span>
            <span className="text-6xl font-display text-blue-500">299</span>
            <span>/seat</span>
          </div>
          <ul className="list-none text-left p-0 w-xl">
            <li className="check-green">Everything from the Lifetime Plan</li>
            <li className="check-green">Better bulk pricing</li>
            <li className="check-green">5 seat minimum purchase</li>
            <li className="check-logo">Zoom walkthrough with Jeff</li>
          </ul>
          <BuyLifetime enterprise>
            <LoadingSpinner />
          </BuyLifetime>
        </div>
      </div>
    </main>
  );
}
