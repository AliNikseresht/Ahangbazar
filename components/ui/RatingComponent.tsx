"use client";

import React, { useEffect, useState } from "react";
import { Song } from "@/types/song";
import { useRateSong } from "@/hooks/useRateSong";
import { toast } from "react-toastify";

interface RatingComponentProps {
  song: Song;
}

const RatingComponent = ({ song }: RatingComponentProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { mutate: rateSong, status, error } = useRateSong();

  const isLoading = status === "pending";

  const handleRating = (rating: number) => {
    if (isLoading) return;
    setSelectedRating(rating);
    rateSong({ song, rating });
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("ثبت شد");
    } else if (status === "error") {
      toast.error("خطا: " + (error?.message || "خطای نامشخص"));
    }
  }, [status, error]);

  return (
    <div className="rating p-1 rounded-md" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name={`rating-${song.id}`}
          className="mask mask-star-2 bg-yellow-400 w-5 h-5"
          aria-label={`${star} star`}
          checked={selectedRating === star}
          onChange={() => handleRating(star)}
          disabled={isLoading}
        />
      ))}
    </div>
  );
};

export default RatingComponent;
