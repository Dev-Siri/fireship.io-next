import Link from "next/link";

import { getContributors } from "@/lib/contributors";

import Markdown from "@/components/Markdown";

export const metadata = {
  title: "Contributors",
  openGraph: {
    title: "Contributors",
  },
  twitter: {
    title: "Contributors",
  },
};

export default async function Contributors() {
  const contributors = getContributors();

  return (
    <main className="container prose dark:prose-invert">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-5xl mb-1">Contributors</h1>
        <p className="my-0 text-gray3">the wonderful humans who make this website possible</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      {contributors.map(({ title, content, slug }) => (
        <article key={slug}>
          <Link className="mb-6 no-underline" href={`/contributors/${slug}`}>
            <h2 className="gradient-text-pink inline-block mb-0">{title}</h2>
          </Link>
          <div className="text-gray3">
            <Markdown content={content} />
          </div>
        </article>
      ))}
    </main>
  );
}
