import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Snippet {
  title: string;
  lastmod: string;
  publishdate: string;
  datemodified: string;
  author: string;
  draft: boolean;
  description: string;
  tags: string[];
  code: string;
  type: string;
  slug: string;
  content: string;
}

const snippetsDir = path.join(process.cwd(), "content", "snippets");

export function getSnippets() {
  const snippets = fs.readdirSync(snippetsDir).map(file => {
    const fileContents = fs.readFileSync(`${snippetsDir}/${file}`, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
      slug: file.split(".")[0],
    } as Snippet;
  });

  return snippets;
}

export function getSnippetBySlug(slug: string) {
  const fullPath = path.join(snippetsDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
    slug,
  } as Snippet;
}
