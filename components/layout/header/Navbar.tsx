"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import WebsiteLogo from "./WebsiteLogo";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "خانه", href: "/" },
  { label: "پرطرفدار", href: "/popular" },
  { label: "جدیدترین", href: "/new" },
  { label: "هنرمندان", href: "/artists" },
  { label: "ارتباط با ما", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="relative flex items-center gap-2">
      <div className="order-2 md:order-1">
        <WebsiteLogo />
      </div>
      <ul className="hidden order-1 md:order-2 md:flex items-center lg:gap-1 lg:mt-0.5">
        {navItems.map(({ label, href }) => (
          <li
            key={href}
            className="hover:bg-gray-100 px-3 py-1 rounded-md transition cursor-pointer text-sm"
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>

      <button
        className="md:hidden "
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white rounded-e-2xl shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>

        <ul className="flex flex-col mt-14">
          {navItems.map(({ label, href }) => (
            <li
              key={href}
              className="px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 border-b last:border-b-0 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#00000038] bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
