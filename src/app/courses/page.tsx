export const metadata = {
  title: "Courses",
  openGraph: {
    title: "Courses",
  },
  twitter: {
    title: "Courses",
  },
};

export default function Courses() {
  return (
    <main className="prose dark:prose-invert container">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-5xl mb-1">Courses</h1>
        <p className="my-0 text-gray3">challenging multi-step experiences with quizzes and progress-tracking</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>
      <ul className="grid-list justify-items-center pl-0">
        {/* {{ range where .Pages.ByLastmod.Reverse "Params.deprecated" "!=" "true"   }} */}
        <li className="list-none p-0">
          {/* {{ $img := (print .RelPermalink "img/featured.webp") }} */}
          {/* {{ partial "card" (dict "context" . "img" $img) }} */}
        </li>
      </ul>
      <header className="text-center mb-8 mt-20">
        <h1 className="text-5xl mb-1">Past Courses</h1>
        <p className="my-0 text-gray3">these courses might taste a little stale</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      <ul className="grid-list justify-items-center pl-0">
        {/* {{ range where .Pages "Params.deprecated" true }} */}
        <li className="list-none p-0">
          {/* {{ $img := (print .RelPermalink "img/featured.webp") }} */}
          {/* {{ partial "card" (dict "context" . "img" $img) }} */}
        </li>
      </ul>
    </main>
  );
}
