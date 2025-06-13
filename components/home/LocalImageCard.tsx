"use client";
import Image from "next/image";

interface Props {
  index?: number;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function RandomImageCard({
  index = 1,
  width = 800,
  height = 600,
  className = "",
  alt = "Random Art",
}: Props) {
  const imgUrl = `https://source.unsplash.com/${width}x${height}/?art&sig=${index}`;

  return (
    <Image
      src={imgUrl}
      width={width}
      height={height}
      alt={`${alt} ${index}`}
      className={className}
      priority
    />
  );
}
