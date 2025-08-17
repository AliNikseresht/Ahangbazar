import React, { memo } from "react";
import appLogo from "@/public/ahangbazar-logo.png";
import Image from "next/image";

export const TrackImage = memo(function TrackImage({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  // Validate URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const safeSrc = src && src.trim() && isValidUrl(src) ? src : appLogo.src;

  return (
    <Image
      src={safeSrc}
      alt={alt}
      className={className}
      fill
      style={{ objectFit: "cover" }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
});