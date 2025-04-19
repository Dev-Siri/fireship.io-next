"use client";
import Image from "next/image";
import { useState, type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  src: string;
  imageSpace?: string;
}

export default function ImgReveal({ children, src, imageSpace }: Props) {
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState(0);

  function leave() {
    setHovered(false);
    setOffset(0);
  }

  return (
    <span
      className="relative px-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={leave}
      onMouseMove={e => setOffset(prevOffset => prevOffset + e.movementX)}
    >
      {children}
      {hovered && (
        <Image
          src={src}
          height={208}
          width={208}
          alt="special effect"
          className={`absolute right-0 ${imageSpace} transform-gpu`}
          style={{ transform: `translateX(${offset || 0}px)` }}
        />
      )}
    </span>
  );
}
