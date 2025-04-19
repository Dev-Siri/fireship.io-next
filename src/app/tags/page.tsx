import Link from "next/link";

export default function Tags() {
  return (
    <main className="prose dark:prose-invert container">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-5xl mb-1">Tags</h1>
        <p className="my-0 text-gray3">find the content you&apos;re looking for</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      {/* {{ range .Pages }} */}
      <span className="inline-block p-2">
        <Link href="{{.Permalink | relURL }}">
          <span className="tag tag-{{anchorize .Title}} tag-lg">{/* #{{ anchorize .Title}} */}</span>
        </Link>
      </span>
      {/* {{ end }} */}
    </main>
  );
}
