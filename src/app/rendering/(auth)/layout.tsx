"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
//   console.log(pathName) //        /register
  return (
    <div>
      <div className="flex flex-col text-2xl">
        {navLinks.map((link) => {
          const isActive =
            pathName === link.href ||
            (pathName.startsWith(link.href) && link.href !== "/");
          return (
            <Link key={link.name} href={link.href} className={isActive ?"font-bold mr-4":"text-blue-300"}>
              {link.name}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
