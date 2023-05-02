"use client";
import algolia from "algoliasearch/lite";
import lazy from "next/dynamic";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import useGlobalStore from "@/store/globalData";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ModalDialog = lazy(() => import("@/components/ModalDialog"));

const kbd =
  "text-gray3 cursor-pointer text-xs bg-transparent border border-solid rounded-md border-orange-500 bg-opacity-50 p-1.5 hover:bg-orange-500 hover:text-white transition-all";

const APP_ID = "05VYZFXKNM";
const API_KEY = "a0837b31f4379765240c2753fa141aa2";
const client = algolia(APP_ID, API_KEY);
const index = client.initIndex("content");

export default function AlgoliaSearch() {
  const [results, setResults] = useState<any>(null);
  const [activeHit, setActiveHit] = useState(0);
  const [hits, setHits] = useState<any[]>([]);
  const [isSSR, setIsSSR] = useState(true);

  const { modal } = useGlobalStore();
  const router = useRouter();

  const goUp = () => setActiveHit(prevActiveHit => (prevActiveHit <= 0 ? prevActiveHit : prevActiveHit - 1));
  const goDown = useCallback(() => setActiveHit(prevActiveHit => (prevActiveHit >= hits.length - 1 ? prevActiveHit : prevActiveHit + 1)), [hits]);

  const selectHit = useCallback(() => {
    if (hits[activeHit]) {
      const url = hits[activeHit].relpermalink;
      router.push(url);
      useGlobalStore.setState({ modal: null });
    }
  }, [hits, activeHit, router]);

  useEffect(() => {
    function handleSpecialKeys(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          goUp();
        case "ArrowDown":
          goDown();
        case "Enter":
          selectHit();
      }
    }

    setIsSSR(false);
    window.addEventListener("keydown", handleSpecialKeys);

    return () => window.removeEventListener("keydown", handleSpecialKeys);
  }, [goDown, selectHit]);

  async function search(e: ChangeEvent<HTMLInputElement>) {
    const q = (e.target as HTMLInputElement).value;
    const res = await index.search(q, {
      hitsPerPage: 7,
      attributesToSnippet: ["summary"],
      highlightPreTag: '<mark className="high">',
      highlightPostTag: "</mark>",
    });

    setResults(res);
    setHits(results?.hits || []);
    setActiveHit(0);
  }

  if (isSSR) return null;

  return (
    <ModalDialog name="search">
      <form className="overflow-hidden">
        {modal === "search" && (
          <input
            className="bg-gray7 bg-opacity-50 text-white w-full md:w-[768px] font-sans text-xl rounded-none block p-3 border-4 border-solid border-t-0 border-r-0 border-l-0 border-b-purple-500 outline-none focus-visible:outline-none mr-2"
            name="search"
            type="text"
            autoFocus
            placeholder="Search"
            onChange={search}
          />
        )}
      </form>
      <div className="max-w-full min-h-[200px]">
        {!results?.nbHits && <p className="text-gray3 mt-4 text-sm text-center">No results yet</p>}
        {hits.map((hit, i) => (
          <Link
            key={i}
            className={`block no-underline font-sans p-4 my-2 border bg-gray7 bg-opacity-50 shadow-md transition-all border-none text-inherit hover:focus:active:text-inherit hover:focus:active:no-underline ${
              i === activeHit && "bg-orange-500 text-white"
            }`}
            onClick={() => useGlobalStore.setState({ modal: null })}
            href={hit.relpermalink}
            onMouseOver={() => setActiveHit(i)}
            onFocus={() => setActiveHit(i)}
          >
            <span className="text-lg font-bold">{hit.title}</span>
            <span className="text-white font-light"> in {hit.type}</span>
            <span
              className={`text-gray3 text-sm block ${i === activeHit && "text-white"}`}
              dangerouslySetInnerHTML={{ __html: hit._snippetResult.summary.value }}
            />
          </Link>
        ))}
      </div>
      <footer className="text-xs text-gray3 mt-6">
        <kbd className={kbd} onClick={selectHit}>
          ↩
        </kbd>{" "}
        <span className="mr-3">select</span>
        <kbd className={kbd} onClick={goUp}>
          ↑
        </kbd>
        <kbd className={kbd} onClick={goDown}>
          ↓
        </kbd>{" "}
        <span className="mr-3">navigate</span>
        <kbd className={kbd} onClick={() => useGlobalStore.setState({ modal: null })}>
          esc
        </kbd>
        <span className="mr-3">leave</span>
      </footer>
    </ModalDialog>
  );
}
