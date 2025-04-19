import Image from "next/image";

export const metadata = {
  title: "Success!",
  openGraph: {
    title: "Success!",
  },
  twitter: {
    title: "Success!",
  },
};

export default function Success() {
  return (
    <main className="text-center prose dark:prose-invert p-8 mx-auto mt-28">
      <h1 className="text-green-500 text-center">Purchase Confirmed!</h1>
      <p>
        Thank you for your order! You should now have access to your content. If you run into any issues email <strong>hello@fireship.io</strong>
      </p>
      <h4>You may now close this tab</h4>
      <Image src="/img/success.gif" alt="success" height={748} width={748} className="mx-auto" />
    </main>
  );
}
