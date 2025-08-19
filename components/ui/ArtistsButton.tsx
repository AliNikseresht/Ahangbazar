"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
interface ArtistsButtonProps {
  artistName: string;
}

const ArtistsButton: React.FC<ArtistsButtonProps> = ({ artistName }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      size="default"
      className="mt-2"
    >
      گوش دادن به آهنگ‌ها
    </Button>
  );
};

export default ArtistsButton;
