import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { Space_Mono } from "next/font/google";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";

import components from "@/mdx-components";

interface Props {
  content: MDXRemoteProps["source"];
}

const spaceMono = Space_Mono({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export default function Markdown({ content }: Props) {
  return (
    <div className={spaceMono.variable}>
      {/* @ts-expect-error React Server Component */}
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
      />
    </div>
  );
}
