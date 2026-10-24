"use client";

import { forwardRef } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { Brand } from "@/components/ahang/Brand";
import { IconButton } from "@/components/ahang/IconButton";
import { copy } from "@/data/ahang";
import type { Language, View } from "@/types";

type Props = {
  language: Language;
  light: boolean;
  query: string;
  view: View;
  onQueryChange: (q: string) => void;
  onViewChange: (v: View) => void;
  onToggleLight: () => void;
  onToggleLanguage: () => void;
};

export const Topbar = forwardRef<HTMLInputElement, Props>(function Topbar(
  {
    language,
    light,
    query,
    view,
    onQueryChange,
    onViewChange,
    onToggleLight,
    onToggleLanguage,
  },
  ref,
) {
  const t = copy[language];

  return (
    <header className="topbar">
      <button className="menu" type="button">
        <Menu size={21} />
      </button>
      <div className="mobile-brand">
        <Brand />
      </div>
      <label className="search-trigger">
        <Search size={18} />
        <input
          ref={ref}
          type="search"
          dir="auto"
          enterKeyHint="search"
          autoComplete="off"
          value={query}
          placeholder={t.search}
          onChange={(e) => {
            onQueryChange(e.target.value);
            if (view !== "search") onViewChange("search");
          }}
          onFocus={() => {
            if (view !== "search") onViewChange("search");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
        />
        {query ? (
          <button
            type="button"
            className="search-clear"
            aria-label="Clear"
            onClick={(e) => {
              e.preventDefault();
              onQueryChange("");
              if (ref && typeof ref !== "function" && ref.current) {
                ref.current.focus();
              }
            }}
          >
            <X size={15} />
          </button>
        ) : (
          <kbd>⌘ K</kbd>
        )}
      </label>
      <div>
        <button className="lang" type="button" onClick={onToggleLanguage}>
          {language === "en" ? "فا" : "EN"}
        </button>
        <IconButton label="Change theme" onClick={onToggleLight}>
          {light ? <Moon size={18} /> : <Sun size={18} />}
        </IconButton>
        <span className="avatar">A</span>
      </div>
    </header>
  );
});