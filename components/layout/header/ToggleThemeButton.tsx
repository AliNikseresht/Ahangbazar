"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline border-none rounded-full p-1">
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
