import lazy from "next/dynamic";

import IfUser from "@/components/IfUser";
import VideoPlayer from "@/components/VideoPlayer";

const ModalAction = lazy(() => import("@/components/ModalAction"));
const ScrollShow = lazy(() => import("@/components/ScrollShow"));
const ImgReveal = lazy(() => import("@/components/ImgReveal"));

export default async function Home() {
  return (
    <main className="prose dark:prose-invert min-w-full container">
      <section className="flex flex-col md:flex-row mt-[54px]">
        <div className="min-w-[50%] flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-6xl mb-0">
            Learn to Code <span className="gradient-text">faster.</span>
          </h1>
          <p className="text-xl text-gray3">
            Fireship is a
            <ImgReveal src="/img/speed.gif" imageSpace="-top-24">
              <span className="text-yellow-500 font-bold">blazingly fast</span>
            </ImgReveal>
            &&
            <ImgReveal src="/img/cat.gif" imageSpace="-top-40">
              <span className="text-pink-500 font-bold">highly-amusing</span>
            </ImgReveal>
            way to level up your programming skills.
          </p>
          <a href="#truth" className="btn btn-green btn-glow">
            Start Here
          </a>
        </div>
        <div className="flex w-full mb-20 relative mt-12 md:my-0 justify-center">
          <div className="w-full mx-auto md:bg-[url('/img/tv.png')] bg-no-repeat bg-cover md:w-[500px] md:max-w-[700px] md:min-h-[300px] mt-20 md:mt-0">
            <VideoPlayer
              src="/fireship-pro.webm"
              captionSrc="/captions/fireship-pro.vtt"
              previewImgUrl="/img/pro-thumbnail.avif"
              className="md:w-[330px] md:h-[185px] relative md:left-[49px] md:top-[23px]"
            />
          </div>
        </div>
      </section>
      <section className="text-center mt-32 snap-proximity">
        <ScrollShow repeat>
          <a href="#truth" className="no-underline">
            <h2 className="bg-red-500 inline-block text-gray7 px-6 py-4 text-6xl shadow-xl">Hard Truth</h2>
            <span className="animate-bounce text-5xl block"> 👇 </span>
          </a>
        </ScrollShow>
      </section>
      <section className="md:h-screen grid place-content-center text-center relative" id="truth">
        <ScrollShow repeat>
          <p className="text-[44px] text-gray3 px-4">
            You
            <ImgReveal src="/img/sad.gif" imageSpace="-top-56">
              <span className="text-red-500 font-display animate-pulse">can&apos;t</span>
            </ImgReveal>
            learn to code by watching videos
          </p>
        </ScrollShow>
        <ScrollShow>
          <a className="animate-bounce mb-[200px] text-2xl no-underline block" href="#solution">
            I&apos;m sad 😢
          </a>
        </ScrollShow>
      </section>
      <section className="text-center md:h-screen grid place-content-center relative" id="solution">
        <div>
          <ScrollShow>
            <h2 className="bg-green-500 inline-block text-gray7 px-6 py-4 text-6xl shadow-xl">Solution</h2>
          </ScrollShow>
          <ScrollShow>
            <p className="text-[25.5px] leading-9 text-gray4 max-w-3xl">
              Fireship is all about
              <ImgReveal src="/img/build.gif" imageSpace="-top-64">
                <span className="text-green-500 font-display animate-pulse">project-based</span>
              </ImgReveal>
              learning. I create <br /> short highly-focused videos that make learning to code addicting.
            </p>
            <a className="animate-bounce mb-[200px] text-2xl no-underline block" href="#fun">
              but like how? 🤔
            </a>
          </ScrollShow>
        </div>
      </section>
      <section className="text-center md:h-screen grid place-content-center relative" id="fun">
        <div>
          <ScrollShow>
            <h2 className="bg-purple-500 inline-block text-gray7 px-6 py-4 text-6xl shadow-xl">Have Fun</h2>
          </ScrollShow>
          <ScrollShow>
            <p className="text-[26px] leading-10 text-gray4 max-w-3xl">
              I built this one-of-a-kind learning platform to give you
              <ImgReveal src="/img/dance.gif" imageSpace="-top-44">
                <span className="text-pink-500 font-display animate-pulse">dopamine</span>
              </ImgReveal>
              hits like XP and meme prizes for every little accomplishment
            </p>
            <IfUser
              show={
                <a className="animate-bounce mb-[200px] text-2xl no-underline block" href="#end">
                  you&apos;re signed in, sweet 🤟
                </a>
              }
              fallback={
                <ModalAction name="signin" type="open">
                  <span className="animate-bounce mb-[200px] text-2xl no-underline block cursor-pointer">
                    login now to start earning useless XP points 💎
                  </span>
                </ModalAction>
              }
            />
          </ScrollShow>
        </div>
      </section>
      <section className="text-center md:h-screen grid place-content-center relative" id="end">
        <ScrollShow>
          <h2 className="bg-yellow-500 inline-block text-gray7 px-6 py-4 text-6xl shadow-xl">Let&apos;s Go</h2>
        </ScrollShow>
        <ScrollShow>
          <p className="text-3xl text-gray4 max-w-3xl">
            There&apos;s tons of free content here, so
            <ImgReveal src="/img/look.gif" imageSpace="-top-36">
              <span className="text-yellow-500 font-display animate-pulse">play</span>
            </ImgReveal>
            around before you upgrade
          </p>
          <a className="animate-bounce mb-[200px] text-2xl no-underline block" href="courses">
            every course starts free, try it out 🚀
          </a>
        </ScrollShow>
      </section>
    </main>
  );
}
