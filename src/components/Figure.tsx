import Image from "next/image";

interface Props {
  src: string;
  height: number;
  width: number;
  caption: string;
}

export default function Figure({ src, height, width, caption }: Props) {
  return (
    <figure>
      <Image src={src} alt={caption} height={height} width={width} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
