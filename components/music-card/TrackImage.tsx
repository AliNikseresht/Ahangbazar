import React, { memo } from "react";
import appLogo from "@/public/ahangbazar-logo.png";

export const TrackImage = memo(function TrackImage({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const safeSrc = src && src.trim() ? src : appLogo.src;
  return (
    <img
      src={safeSrc}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== appLogo.src) img.src = appLogo.src;
      }}
      className={className}
    />
  );
});
