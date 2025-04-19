import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Contributor {
  title: string;
  slug: string;
  featured_img: string;
  date: string;
  draft: boolean;
  links: Record<string, string>;
  content: string;
}

const contributorsDir = path.join(process.cwd(), "content", "contributors");

export function getContributors() {
  const fileNames = fs.readdirSync(contributorsDir);

  const contributors = fileNames
    .map(fileName => {
      const filePath = path.join(contributorsDir, fileName);

      if (fs.statSync(filePath).isDirectory()) return;

      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        ...data,
        content,
        slug: fileName.split(".")[0],
        featured_img: `/img/content/contributors/${data.featured_img}`,
      };
    })
    .filter(contributor => contributor !== null);

  return contributors as Contributor[];
}

export function getContributorByName(slug: string) {
  const fullPath = path.join(contributorsDir, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug,
    content,
    featured_img: `/img/content/contributors/${data.featured_img}`,
  } as Contributor;
}
