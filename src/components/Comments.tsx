import DiscordCount from "./DiscordCount";
import Discord from "./icons/Discord";

import links from "@/data/links.json";

export default function Comments() {
  return (
    <section id="qna" className="my-12 flex flex-col justify-between items-center">
      <h2 className="text-2xl mb-4">Questions? Let&apos;s chat</h2>
      <a href={links.discord} className="btn btn-purple btn-lg btn-glow btn-display mx-auto">
        <span className="w-8 mr-2">
          <Discord />
        </span>{" "}
        Open Discord
      </a>
      <div className="mt-3">
        {/* @ts-expect-error React Server Component */}
        <DiscordCount />
      </div>
    </section>
  );
}
