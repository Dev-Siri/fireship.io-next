import Link from "next/link";

import Discord from "./icons/Discord";
import Github from "./icons/Github";
import Twitter from "./icons/Twitter";
import Youtube from "./icons/Youtube";

import links from "@/data/links.json";

export default function Footer() {
  return (
    <footer className="container text-center my-6 p-8 text-gray3">
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full" />
      <section className="pt-10">
        Find an issue with this page?{" "}
        <a className="text-blue-500" href={links.github_content}>
          Fix it on GitHub
        </a>
      </section>
      <section className="py-3">
        Need help? Email{" "}
        <a href="mailto:hello@fireship.io" className="text-white font-bold">
          hello@fireship.io
        </a>
      </section>
      <div className="flex justify-center items-center my-2">
        <a href={links.youtube} title="youtube">
          <i className="w-6 inline-block mx-2">
            <Youtube />
          </i>
        </a>
        <a href={links.twitter} title="twitter">
          <i className="w-6 inline-block mx-2">
            <Twitter />
          </i>
        </a>
        <a href={links.github} title="github">
          <i className="w-6 inline-block mx-2">
            <Github />
          </i>
        </a>
        <a href={links.discord} title="discord">
          <i className="w-6 inline-block mx-2">
            <Discord />
          </i>
        </a>
      </div>
      <h6>Helpful Links</h6>
      <div className="py-3">
        <Link href="/courses">Courses</Link> | <Link href="/lessons">Labs</Link> | <Link href="/snippets">Snippets</Link> |{" "}
        <Link href="/tags">Tags</Link> | <Link href="/contributors">Contribute</Link> | <Link href="/privacy">Privacy</Link> |{" "}
        <Link href="/terms">Terms</Link>
      </div>
      <p className="text-xs">
        Copyright © 2023 Fireship LLC <br />
      </p>
    </footer>
  );
}
