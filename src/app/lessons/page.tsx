export const metadata = {
  title: "Lessons",
  openGraph: {
    title: "Lessons",
  },
  twitter: {
    title: "Lessons",
  },
};

export default function Lessons() {
  return (
    <main className="prose dark:prose-invert container">
      <header className="text-center mb-8 mt-20 inset-0">
        <h1 className="text-5xl mb-1">Labs</h1>
        <p className="my-0 text-gray3">single dose video lessons and tutorials</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      <ul className="grid-list justify-items-center pl-0">
        {/* {{ $paginator := .Paginate (where .Pages "Type" "lessons") 20 }} */}
        {/* {{ range $paginator.Pages }} */}
        <li className="list-none p-0">{/* {{ partial "card" (dict "context" .) }} */}</li>
        {/* {{ end }} */}
      </ul>
    </main>
  );
}
