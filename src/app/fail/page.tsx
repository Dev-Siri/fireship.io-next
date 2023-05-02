import Image from "next/image";

export const metadata = {
  title: "Canceled",
  openGraph: {
    title: "Canceled",
  },
  twitter: {
    title: "Canceled",
  },
};

export default function Fail() {
  return (
    <main className="text-center prose dark:prose-invert p-8 mx-auto mt-28">
      <h1 className="text-yellow-500 text-center">Purchase Cancelled</h1>
      <p>
        Looks like you we&apos;re not able to complete your purchase. If you ran into any issues or have questions, email{" "}
        <strong>hello@fireship.io</strong>
      </p>
      <h4>You may now close this tab</h4>
      <Image src="/img/disappointed.gif" alt="payment failed" height={243} width={400} className="mx-auto" />
    </main>
  );
}
