"use client";

import { Home, Library, Search } from "lucide-react";
import { copy } from "@/data/ahang";
import type { Language, View } from "@/types";

type Props = {
  view: View;
  language: Language;
  onViewChange: (v: View) => void;
};

export function BottomNav({ view, language, onViewChange }: Props) {
  const t = copy[language];

  return (
    <nav className="bottom-nav">
      <button
        className={view === "home" ? "active" : ""}
        onClick={() => onViewChange("home")}
      >
        <Home size={20} />
        <span>{t.home}</span>
      </button>
      <button
        className={view === "search" ? "active" : ""}
        onClick={() => onViewChange("search")}
      >
        <Search size={20} />
        <span>{t.explore}</span>
      </button>
      <button
        className={view === "library" ? "active" : ""}
        onClick={() => onViewChange("library")}
      >
        <Library size={20} />
        <span>{t.library}</span>
      </button>
    </nav>
  );
}