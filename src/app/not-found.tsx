import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 Page not found",
};

export default function NotFound() {
  return (
    <main className="prose dark:prose-invert min-w-full text-center">
      <h1 className="text-5xl mt-12">404 Not Found</h1>
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
      <p>Congrats, you just found the bongo moth!</p>
      <Image className="mx-auto" src="/img/bug.gif" width={480} height={360} alt="bongo moth" />
      <Link className="btn" href="/">
        Go Home
      </Link>
    </main>
  );
}
