import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next 15 About Page",
  description: "Tutorial of next app",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return <div> {children}</div>;
}
