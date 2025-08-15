import Link from "next/link";

const links = [
  { label: "خانه", href: "#", active: true },
  { label: "پلی‌لیست", href: "#" },
  { label: "هنرمندان", href: "#" },
];

export function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {links.map(({ label, href, active }) => (
        <Link
          key={label}
          href={href}
          className={`${
            active ? "text-white" : "text-gray-300"
          } hover:text-purple-400 transition-all duration-300 relative group`}
        >
          <span>{label}</span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
        </Link>
      ))}
    </nav>
  );
}
