// @ts-check
import { cpus } from "os";

import configureBundleAnalayzer from "@next/bundle-analyzer";
import configureMDX from "@next/mdx";

import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    cpus: Math.round(cpus().length / 2),
    mdxRs: true,
    serverActions: true,
  },
  typescript: { ignoreBuildErrors: true },
  images: {
    minimumCacheTTL: 60,
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config, { dev }) {
    if (!dev)
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: "all",
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendors: false,
          },
        },
        runtimeChunk: false,
        usedExports: true,
        sideEffects: true,
        moduleIds: "deterministic",
      };

    return config;
  },
};

const withMDX = configureMDX({
  options: {
    rehypePlugins: [rehypeSlug],
  },
});

const withBundleAnalayzer = configureBundleAnalayzer({ enabled: process.env.ANALYZE_BUNDLE === "true" });

export default withBundleAnalayzer(withMDX(nextConfig));
