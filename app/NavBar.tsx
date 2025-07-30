"use client";

import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa6";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { data: session, status } = useSession();

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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
