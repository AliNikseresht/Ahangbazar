import Link from "next/link";
import React from "react";

type Item = {
  id: number;
  title: string;
  subtitle?: string;
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
    <div className="bg-white shadow rounded-lg p-4 space-y-6">
      <h2 className="text-lg font-semibold mb-1 border-b border-gray-300 text-gray-700">
        {title}
      </h2>
      <ul className="space-y-2 max-h-52 lg:max-h-56 overflow-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="hover:bg-gray-100 p-1 rounded-md cursor-pointer transition text-sm"
            onClick={onItemClick}
          >
            <Link href={`/${basePath}/${item.id}`}>
              {item.subtitle ? `${item.title} - ${item.subtitle}` : item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
