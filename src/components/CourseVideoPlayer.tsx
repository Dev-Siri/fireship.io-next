"use client";
import lazy from "next/dynamic";
import { useEffect, useRef } from "react";

import useGlobalStore from "@/store/globalData";
import { UniversalPlayer } from "@/utils/player";

import Link from "next/link";
import IfUser from "./IfUser";
import LoadingSpinner from "./LoadingSpinner";

const BuyCourse = lazy(() => import("@/components/BuyCourse"));
const ModalAction = lazy(() => import("@/components/ModalAction"));

interface Props {
  video: number | string;
  type?: "youtube" | "vimeo";
  free?: boolean;
}

const btn = "cursor-pointer bg-red-500 text-white font-display outline-none border-none px-4 py-2 mx-1";
const buyBox = "bg-gray7 rounded-lg shadow-3xl p-6 max-w-sm mx-auto border-blue-500 border border-solid";

export default function YoutubePlayer({ video, free, type = "vimeo" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { currentCourse, canAccess } = useGlobalStore();

  let autoplayUnsub: Function;
  let showAutoplayCover = false;
  let timeout: NodeJS.Timeout;
  let countdown: NodeJS.Timeout;

  let player: UniversalPlayer;

  useEffect(() => {
    // Reload video player if user buys course
    const accessUnsub = useGlobalStore.subscribe(({ canAccess }) => {
      if (video && !player && (canAccess || free)) initPlayer();
    });

    // Cleanup: runs on disconnected (destroyed)
    return () => {
      player?.destroy();
      timeout && clearTimeout(timeout);
      countdown && clearInterval(countdown);
      autoplayUnsub && autoplayUnsub();
      accessUnsub();
    };
  });

  async function initPlayer() {
    player = await UniversalPlayer.create(video, ref.current!, type);

    // Autoplay
    const autoplayReferral = window.location.search.includes("autoplay");
    autoplayUnsub = useGlobalStore.subscribe(({ autoplay }) => {
      if (autoplay && autoplayReferral) player.play();
    });

    // Route change on end
    player.onEnded(() =>
      useGlobalStore.setState({
        toast: {
          message: "Well done! You reached the end of this course.",
          type: "success",
          icon: "🍰",
        },
      })
    );
  }

  return (
    <>
      {free || canAccess ? (
        <div className="aspect-video w-full relative bg-black bg-opacity-50">
          <div className="vid" ref={ref} />
          <div
            className={`absolute inset-0 text-lg bg-black bg-opacity-95 hidden justify-center items-center flex-col ${showAutoplayCover && "flex"}
            `}
          >
            <p>Video finished!</p>
            <Link className={`${btn} bg-blue-500`} href="/">
              Go
            </Link>
          </div>
          {false && <iframe title="placeholder" className="absolute top-0 left-0 w-full h-full" />}
        </div>
      ) : (
        <div className="aspect-video flex flex-col items-center justify-center text-center text-xl bg-black bg-opacity-75 animate-pulse">
          <IfUser
            show={
              <>
                <h5 className="text-red-500 hidden md:block">Permission Denied</h5>
                {currentCourse?.price && (
                  <>
                    <div className={buyBox}>
                      <BuyCourse>
                        <LoadingSpinner />
                      </BuyCourse>
                      <p className="my-0 mt-0 text-sm text-gray4">Lifetime access for a blazingly low price</p>
                    </div>
                    <h3 className="text-gray4 font-display hidden md:block">OR</h3>
                  </>
                )}
                <div className={`${buyBox} border-green-500 mt-4`}>
                  <p className="my-0">
                    <a href="/pro/" className="font-display text-green-500 no-underline text-xl">
                      Upgrade to PRO
                    </a>
                  </p>
                  <p className="my-0 mt-0 text-sm text-gray4">Unlock all Fireship content && bonus perks</p>
                </div>
              </>
            }
            fallback={
              <ModalAction name="signin" type="open">
                You must be <span className="font-display text-blue-500 cursor-pointer">signed in</span> to watch.
              </ModalAction>
            }
          />
        </div>
      )}
    </>
  );
}
