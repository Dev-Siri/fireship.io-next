import Comments from "@/components/Comments";
import lazy from "next/dynamic";
import Link from "next/link";

import { formatDate } from "@/utils/helpers";

const CourseVideoPlayer = lazy(() => import("@/components/CourseVideoPlayer"));

// ! PLACEHOLDER VALUES
const lastmod = new Date().toISOString();
const publishdate = lastmod;
const datemod = lastmod;
const tags = ["react"];
const github = null,
  youtube = null,
  vimeo = null;
const title = "",
  content = "",
  author = "",
  authorImg = "";

export default function Lesson() {
  return (
    <main className="container">
      <div className="flex w-full justify-between">
        <article itemScope itemType="http://schema.org/Article" className="w-full">
          <meta itemProp="datePublished" content={publishdate} />
          <meta itemProp="dateModified" content={lastmod} />
          <meta itemProp="image" content="img/featured.png" />
          <meta itemProp="publisher" content="fireship.io" />
          <header>
            {/* Video player */}
            {youtube && (
              <div itemProp="video" itemScope itemType="http://schema.org/VideoObject">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${youtube}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${youtube}`} />
                <meta itemProp="thumbnailUrl" content={`featured_image`} />
                <meta itemProp="description" content={`description`} />
                <meta itemProp="uploadDate" content={`publishdate`} />
                <meta itemProp="publisher" content="Fireship" />
              </div>
            )}
            {vimeo && <CourseVideoPlayer video={vimeo} />}
            <div className="bg-gray6 py-5 px-3 rounded-lg mb-4 flex justify-between mt-3">
              {/* {{ $author := .Site.GetPage (print "/contributors/"  (anchorize .Params.Author)) }}
					{{ $authorImg := (print "/contributors/img/"  (anchorize .Params.Author) ".webp") }} */}
              <Link
                className="flex items-center no-underline"
                itemProp="author"
                aria-label={author}
                href="/contributors/{{ anchorize .Params.author }}/"
              >
                <img className="w-10 h-10 rounded-full block" src={authorImg} alt={`${title} avatar`} />
                <span className="flex flex-col ml-2">
                  <span className="no-underline">By {author}</span>
                  <span className="text-xs text-gray4">
                    Posted <time itemProp="dateModified">{formatDate(datemod)}</time>
                  </span>
                </span>
              </Link>
              {/* Tags */}
              <span>
                {tags.map(tag => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <span className={`tag tag-${tag}`}>#{tag}</span>
                  </Link>
                ))}
                {github && (
                  <a className="btn btn-transparent ml-4" href={github}>
                    Source Code
                  </a>
                )}
              </span>
            </div>
          </header>
          {/* Lesson content */}
          <section className="prose dark:prose-invert max-w-full lesson-content" itemProp="articleBody">
            <h1 itemProp="name headline" id={title.toLowerCase().replace(" ", "-")} className="gradient-text">
              {title}
            </h1>
            {content}
          </section>
          <Comments />
        </article>
      </div>
    </main>
  );
}
