import Link from "next/link";
import React from "react";

type Item = {
  id: string | number;
  title: string;
  subtitle?: string;
  slug?: string;
};

type SidebarBoxProps = {
  title: string;
  items: Item[];
  basePath: "artists" | "songs";
  onItemClick?: () => void;
};

export default function SidebarBox({
  title,
  items,
  basePath,
  onItemClick,
}: SidebarBoxProps) {
  return (
    <div className="bg-white shadow-sm border border-[#40ad6d] rounded-lg p-4 space-y-6">
      <h2 className="text-base font-semibold mb-1 border-b border-gray-100 text-[#242424]">
        {title}
      </h2>
      <ul className="space-y-2 max-h-52 lg:max-h-48 overflow-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="hover:bg-gray-200 p-1 rounded-md cursor-pointer transition text-sm"
            onClick={onItemClick}
          >
            <Link href={`/${basePath}/${item.slug}`}>
              {item.subtitle ? `${item.subtitle} - ${item.title}` : item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
