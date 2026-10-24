"use client";

import { useEffect } from "react";

type Options = {
  onSearchFocus: () => void;
  onEscape?: () => void;
};

export function useKeyboardShortcuts({ onSearchFocus, onEscape }: Options) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearchFocus();
      }
      if (e.key === "Escape") {
        onEscape?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearchFocus, onEscape]);
}