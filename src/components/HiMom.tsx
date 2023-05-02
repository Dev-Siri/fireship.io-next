import lazy from "next/dynamic";
import Image from "next/image";

const ModalDialog = lazy(() => import("./ModalDialog"));

export default function HiMom() {
  return (
    <ModalDialog name="himom" esc>
      <h1 className="text-pink-500 text-center text-7xl my-12 font-display font-normal">Hi Mom!</h1>
      <Image src="/img/himom.gif" alt="hi mom" height={320} width={238} className="w-64 mx-auto" />
    </ModalDialog>
  );
}
