"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
  children: ReactNode;
};

export function IconButton({
  label,
  active,
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`icon-btn ${active ? "active" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}