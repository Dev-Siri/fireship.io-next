import lazy from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { IfAccess } from "@/components/ConditionalUserDataRender";
import LoadingSpinner from "@/components/LoadingSpinner";

const ScrollShow = lazy(() => import("@/components/ScrollShow"));
const BuyCourse = lazy(() => import("@/components/BuyCourse"));
const CourseVideoPlayer = lazy(() => import("@/components/CourseVideoPlayer"));

export default function Course() {
  return (
    <main>
      <header className="text-center my-12">
        <h1 className="text-6xl mb-0 inline-block mx-auto">{/* {{ .Params.title }} */}</h1>
        <p className="text-gray3 my-1">{/* {{ .Params.description }} */}</p>
      </header>
      <div className="mx-auto w-24 h-1 my-24 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>
      {/* {{ if .Params.vimeo }} */}
      <div className="max-w-3xl mx-auto">
        <CourseVideoPlayer free video={""} />
      </div>
      {/* {{ $author := .Site.GetPage (print "/contributors/"  (anchorize .Params.Author)) }} */}
      {/* {{ $authorImg := (print "/contributors/img/"  (anchorize .Params.Author) ".webp") }} */}
      <div className="flex items-center no-underline justify-center" itemProp="author" title="{{ .Params.author }}">
        <Image className="w-12 h-12 rounded-full block" src="{{ $authorImg }}" alt="{{ $author.Title }} avatar" height={48} width={48} />
        <span className="flex flex-col ml-2">
          <span className="text-lg">
            Taught by
            <Link className="no-underline text-orange-500" href="/contributors/{{ anchorize .Params.author }}/">
              {/* {{ title (.Params.authorname | default .Params.author) }} */}
            </Link>
          </span>
          <span className="text-sm text-gray4">{/* {{ (.Params.authorbio | default "That guy from the Fireship YouTube channel") }} */}</span>
        </span>
      </div>
      <div className="mx-auto w-24 h-1 my-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
      {/* {{ if .Params.stack }} */}
      <div className="text-center mb-10">
        <h2>Tech Stack</h2>
        <div className="flex flex-center justify-center">
          {/* {{ range $index, $element := .Params.stack }} */}
          <ScrollShow delay={/* index */ 1 * 200}>
            <div className="flex rounded-lg bg-black bg-opacity-30 shadow-3xl aspect-square p-6 w-36 h-36 mx-2 border-b-4 border-gray6">
              {/* <img className="m-0" src="/img/icons/{{ . }}.svg" /> */}
            </div>
          </ScrollShow>
          {/* {{ end }} */}
        </div>
      </div>
      <div className="mx-auto w-24 h-1 my-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
      {/* {{ end }} */}
      <article className="max-w-3xl mx-auto">{/* {{ .Content }} */}</article>
      <IfAccess
        show={
          <>
            <div className="mt-12 bg-gray7 rounded-lg shadow-3xl p-8 max-w-sm mx-auto border-green-500 border border-solid text-center">
              <p className="m-0 font-display text-green-500 no-underline text-xl">You have full access to this course 🎉</p>
            </div>
            <div slot="denied" className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl text-white pb-2 inline-block">How to Enroll</h2>
              <div className="mx-auto w-24 h-1 mt-0 mb-24 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
              <div className="bg-gray7 rounded-lg shadow-3xl p-8 max-w-sm mx-auto border-blue-500 border border-solid">
                <BuyCourse>
                  <LoadingSpinner />
                </BuyCourse>
                <p className="mt-0 text-sm text-gray4">Lifetime access for a blazingly low price</p>
              </div>
              <h3 className="text-gray3">OR</h3>
              <div className="bg-gray7 rounded-lg shadow-3xl p-8 max-w-sm mx-auto border-green-500 border border-solid">
                <p className="mb-0">
                  <a href="/pro/" className="font-display text-green-500 no-underline text-xl">
                    Upgrade to PRO
                  </a>
                </p>
                <p className="mt-0 text-sm text-gray4">Unlock all Fireship content && bonus perks</p>
              </div>
            </div>
          </>
        }
      />
      <div className="text-center">
        <h2 className="text-5xl border-gray6 pb-2 inline-block mt-24">Chapters</h2>
        <div className="mx-auto w-24 h-1 mb-16 mt-0 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      </div>
      <div className="flex justify-center">
        <ul className="grid-list pl-0">
          {/* {{ range $index, $page := .Pages }} */}
          <a className="no-underline relative hover:scale-105 transition-transform" href="{{ .RelPermalink }}">
            <li className="max-w-sm overflow-hidden shadow-3xl bg-gray6 p-6 rounded-xl">
              <span className="absolute -top-2 -left-5 font-display leading-6 text-center text-3xl w-10 h-10 rounded-full p-2">
                {/*  {{ printf "%02d" ( add $index 1 )}}  */}
                {/* {{ $page.Params.emoji }} */}
              </span>
              <h5>
                <span className="gradient-text mb-0">{/* {{ printf "%02d" ( add $index 1 )}} */}</span> {/* {{ $page.Title }} */}
              </h5>
              <p className="text-gray3">{/* {{ $page.Description }} */}</p>
            </li>
          </a>
          {/* {{ end }}  */}
        </ul>
      </div>
    </main>
  );
}
