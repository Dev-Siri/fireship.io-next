import Image from "next/image";
import Link from "next/link";

import { getSnippetBySlug, getSnippets } from "@/lib/snippets";
import { formatDate } from "@/utils/helpers";

import Comments from "@/components/Comments";
import Markdown from "@/components/Markdown";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const snippets = getSnippets();

  return snippets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { title, description } = getSnippetBySlug(params.slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://fireship.io/${params.slug}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Snippet({ params }: Props) {
  const { content, title, author, publishdate, datemodified, tags } = getSnippetBySlug(params.slug);

  return (
    <main className="container">
      <article className="w-full" itemScope itemType="http://schema.org/Article">
        <meta itemProp="datePublished" content={publishdate} />
        <meta itemProp="dateModified" content={datemodified} />
        <meta itemProp="image" content="img/featured.png" />
        <meta itemProp="publisher" content="fireship.io" />
        <header>
          <div className="bg-gray6 py-5 px-3 rounded-lg mb-4 flex justify-between mt-3">
            <Link className="flex items-center no-underline" itemProp="author" href="/contributors/kyle-leary/">
              <Image
                className="w-10 h-10 rounded-full block"
                src={`/img/content/contributors/${author?.toLowerCase().replace(" ", "-")}.webp`}
                alt="Kyle Leary avatar"
                height={40}
                width={40}
              />
              <span className="flex flex-col ml-2">
                <span className="no-underline">By {author}</span>
                <span className="text-xs text-gray4">
                  Posted <time itemProp="dateModified">{formatDate(publishdate)}</time>
                </span>
              </span>
            </Link>
            <span>
              {tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <span className={`tag tag-${tag}`}>#{tag}</span>
                </Link>
              ))}
            </span>
          </div>
        </header>
        <section className="prose dark:prose-invert max-w-full lesson-content" itemProp="articleBody">
          <h1 id={title.toLowerCase().replace(" ", "-")} className="gradient-text" itemProp="name headline">
            {title}
          </h1>
          <Markdown content={content} />
        </section>
        <Comments />
      </article>
    </main>
  );
}
