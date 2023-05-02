import Link from "next/link";

import { getSnippets } from "@/lib/snippets";

export const metadata = {
  title: "Quick Snippets",
  description: "Quick code snippets and articles related to app development",
  openGraph: {
    title: "Quick Snippets",
    description: "Quick code snippets and articles related to app development",
  },
  twitter: {
    title: "Quick Snippets",
    description: "Quick code snippets and articles related to app development",
  },
};

export default function Snippets() {
  const snippets = getSnippets();

  return (
    <main className="prose dark:prose-invert container">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-5xl mb-1">Snippets</h1>
        <p className="my-0 text-gray3">small but helpful code examples</p>
      </header>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      <ul>
        {snippets.map(({ title, tags, slug }) => (
          <Link key={title} className="no-underline" href={`/snippets/${slug}`}>
            <li className="list-none p-4 my-3 bg-gray6 shadow-xl rounded-lg flex justify-between">
              {title}
              <span>
                {tags.map(tag => (
                  <span key={tag} className={`tag tag-${tag}`}>
                    #{tag}
                  </span>
                ))}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
