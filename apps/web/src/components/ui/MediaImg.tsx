"use client";

import Image from "next/image";

interface MediaImgProps {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  parallax?: boolean;
}

/** Reproduces the original Nuxt <MediaImg>: <div class="media-img"><img></div> */
export function MediaImg({
  src,
  alt = "",
  className = "",
  sizes,
  width = 800,
  height = 600,
  parallax,
}: MediaImgProps) {
  return (
    <div className={`media-img ${parallax ? "parallax-image" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
      />
    </div>
  );
}