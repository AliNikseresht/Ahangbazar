"use client";

import {
  Heart,
  Home,
  Languages,
  Library,
  Compass,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { Brand } from "@/components/ahang/Brand";
import { copy } from "@/data/ahang";
import type { Language, View } from "@/types";

type Props = {
  view: View;
  language: Language;
  light: boolean;
  onViewChange: (v: View) => void;
  onToggleLight: () => void;
  onToggleLanguage: () => void;
};

export function Sidebar({
  view,
  language,
  light,
  onViewChange,
  onToggleLight,
  onToggleLanguage,
}: Props) {
  const t = copy[language];

  return (
    <aside className="sidebar">
      <Brand />
      <nav>
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
          <Compass size={20} />
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
      <div className="side-lists">
        <p>{t.playlists}</p>
        <button type="button" onClick={() => onViewChange("library")}>
          <Heart size={15} />
          {t.favorites}
        </button>
        <button type="button">
          <Sparkles size={15} />
          {t.curated}
        </button>
      </div>
      <footer>
        <button onClick={onToggleLight}>
          {light ? <Moon size={18} /> : <Sun size={18} />}
          <span>{light ? "Obsidian" : "Ivory"} mode</span>
        </button>
        <button onClick={onToggleLanguage}>
          <Languages size={18} />
          <span>{language === "en" ? "فارسی" : "English"}</span>
        </button>
      </footer>
    </aside>
  );
}