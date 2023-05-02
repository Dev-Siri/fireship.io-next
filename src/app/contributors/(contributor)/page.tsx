import Image from "next/image";

import Markdown from "@/components/Markdown";
import { getContributorByName, getContributors } from "@/lib/contributors";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const contributors = getContributors();

  return contributors.map(({ slug }) => ({ slug }));
}

export default async function ContributorInfo({ params }: Props) {
  const { title, featured_img, content, links } = getContributorByName(params.slug);

  return (
    <main className="container prose dark:prose-invert">
      <section className="text-center">
        <h1 className="gradient-text">{title}</h1>
        <Image src={featured_img} alt="author image" height={260} width={260} className="mx-auto rounded-full max-w-xs" />
        {Object.keys(links).map(
          title =>
            title && (
              <a key={title} className="btn btn-sm" href={links[title]}>
                {title}
              </a>
            )
        )}
        <Markdown content={content} />
      </section>
      <section>
        <h2 className="text-left">Lessons</h2>
        <div className="grid-list">
          {/* {{ range first 4 (where .Site.Pages "Params.author" .Title) }} */}
          {/* {{ $img := (print .RelPermalink "img/featured.webp") }} */}
          {/* {{ partial "card" (dict "context" . "img" $img) }} */}
          {/* {{ end }} */}
        </div>
      </section>
    </main>
  );
}
