"use client";

import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa6";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-x-6 border-b h-16 px-6 items-center border-zinc-500 text-xl mb-5">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex gap-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              key={link.label}
              href={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
